//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import type {
  Ref,
  Doc,
  Type,
  PropertyType,
  Attribute,
  Tx,
  Class,
  Obj,
  Data,
  TxCreateDoc,
  Domain,
  TxMixin,
  Mixin,
  Space,
  ExtendedAttributes,
  Trigger,
} from '@anticrm/core'
import {
  ClassifierKind,
  generateId,
  DefaultTxFactory,
} from '@anticrm/core'
import type { IntlString, Asset } from '@anticrm/platform'
import toposort from 'toposort'

import core from './component'

type NoIDs<T extends Tx> = Omit<T, '_id' | 'objectId'>

interface ClassTxes {
  _id: Ref<Class<Obj>>
  extends?: Ref<Class<Obj>>
  domain?: Domain
  label?: IntlString
  icon?: Asset
  triggers?: Trigger[]
  txes: Array<NoIDs<Tx>>
  kind: ClassifierKind
}

const transactions = new Map<any, ClassTxes>()

function getTxes (target: any): ClassTxes {
  const txes = transactions.get(target)
  if (txes === undefined) {
    const txes = { txes: [] } as unknown as ClassTxes
    transactions.set(target, txes)
    return txes
  }
  return txes
}

export function Prop (type: Type<PropertyType>, label?: IntlString, icon?: Asset) {
  return function (target: any, propertyKey: string): void {
    const txes = getTxes(target)
    const tx: NoIDs<TxCreateDoc<Attribute<PropertyType>>> = {
      _class: core.class.TxCreateDoc,
      space: core.space.Tx,
      modifiedBy: core.account.System,
      modifiedOn: Date.now(),
      objectSpace: core.space.Model,
      objectClass: core.class.Attribute,
      attributes: {
        type,
        name: propertyKey,
        label,
        icon,
        attributeOf: txes._id // undefined, need to fix later
      }
    }
    txes.txes.push(tx)
  }
}

export function Model<T extends Obj> (
  _class: Ref<Class<T>>,
  _extends: Ref<Class<Obj>>,
  domain?: Domain
) {
  return function classDecorator<C extends new () => T> (constructor: C): void {
    const txes = getTxes(constructor.prototype)
    txes._id = _class
    txes.extends = _class !== core.class.Obj ? _extends : undefined
    txes.domain = domain
    txes.kind = ClassifierKind.CLASS
  }
}

export function Mixin<T extends Obj> (
  _class: Ref<Class<T>>,
  _extends: Ref<Class<Obj>>,
) {
  return function classDecorator<C extends new () => T> (constructor: C): void {
    const txes = getTxes(constructor.prototype)
    txes._id = _class
    txes.extends = _extends
    txes.kind = ClassifierKind.MIXIN
  }
}

export function UX<T extends Obj> (
  label: IntlString,
  icon?: Asset,
) {
  return function classDecorator<C extends new () => T> (constructor: C): void {
    const txes = getTxes(constructor.prototype)
    txes.label = label
    txes.icon = icon
  }
}

export function Trigger (
  trigger: Trigger,
) {
  return function classDecorator<C extends new () => Doc> (constructor: C): void {
    const txes = getTxes(constructor.prototype)
    let triggers = txes.triggers
    if (triggers === undefined) {
      triggers = []
      txes.triggers = triggers
    }
    triggers.push(trigger)
  }
}

function generateIds (objectId: Ref<Doc>, txes: NoIDs<TxCreateDoc<Attribute<PropertyType>>>[]): Tx[] {
  return txes.map((tx) => {
    const withId = {
      _id: generateId<Tx>(),
      objectId: generateId(),
      ...tx
    }
    withId.attributes.attributeOf = objectId as Ref<Class<Obj>>
    return withId
  })
}

const txFactory = new DefaultTxFactory(core.account.System)

function _generateTx (tx: ClassTxes): Tx[] {
  const objectId = tx._id
  const createTx = txFactory.createTxCreateDoc(
    core.class.Class,
    core.space.Model,
    {
      domain: tx.domain,
      kind: ClassifierKind.CLASS,
      extends: tx.extends,
      label: tx.label,
      icon: tx.icon,
      triggers: tx.triggers,
    },
    objectId
  )
  return [createTx, ...generateIds(objectId, tx.txes as NoIDs<TxCreateDoc<Attribute<PropertyType>>>[])]
}

export class Builder {
  private readonly txes: Tx[] = []
  // private readonly hierarchy = new Hierarchy()

  createModel (...classes: Array<new () => Obj>): void {
    const txes = classes.map((ctor) => getTxes(ctor.prototype))
    const byId = new Map<string, ClassTxes>()

    txes.forEach((tx) => {
      byId.set(tx._id, tx)
    })

    const generated = this.generateTransactions(txes, byId)

    for (const tx of generated) {
      this.txes.push(tx)
      // this.hierarchy.tx(tx)
    }
  }

  private generateTransactions (
    txes: ClassTxes[],
    byId: Map<string, ClassTxes>
  ): Tx[] {
    const graph = this.createGraph(txes)
    const sorted = toposort(graph)
      .reverse()
      .map((edge) => byId.get(edge))
    return sorted.flatMap((tx) => (tx != null ? _generateTx(tx) : []))
  }

  private createGraph (txes: ClassTxes[]): [string, string | undefined][] {
    return txes.map(
      (tx) => [tx._id, tx.extends] as [string, string | undefined]
    )
  }

  // do we need this?
  createDoc<T extends Doc>(
    _class: Ref<Class<T>>,
    space: Ref<Space>,
    attributes: Data<T>,
    objectId?: Ref<T>,
  ): void {
    this.txes.push(
      txFactory.createTxCreateDoc(
        _class,
        space,
        attributes,
        objectId
      )
    )
  }

  mixin<D extends Doc, M extends D> (
    objectId: Ref<D>,
    objectClass: Ref<Class<D>>,
    mixin: Ref<Mixin<M>>,
    attributes: ExtendedAttributes<D, M>,
  ): void {
    this.txes.push(txFactory.createTxMixin(objectId, objectClass, mixin, attributes))
  }  

  getTxes (): Tx[] {
    return this.txes
  }
}

// T Y P E S

export function TypeString (): Type<string> {
  return { _class: core.class.TypeString }
}
