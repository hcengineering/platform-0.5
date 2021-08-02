//
// Copyright © 2020 Anticrm Platform Contributors.
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
  Tx,
  Storage,
  Ref,
  Doc,
  Class,
  DocumentQuery,
  FindResult,
  FindOptions,
} from '@anticrm/core'
import { getResource } from '@anticrm/platform'
import core, { ModelDb, TxDb, Hierarchy, DOMAIN_TX, DefaultTxFactory } from '@anticrm/core'

async function getModel (): Promise<Tx[]> {
  return import('./model.tx.json') as unknown as Tx[]
}

export async function connect (handler: (tx: Tx) => void): Promise<Storage> {
  const txes = await getModel()

  const hierarchy = new Hierarchy()
  for (const tx of txes) hierarchy.tx(tx)

  const transactions = new TxDb(hierarchy)
  const model = new ModelDb(hierarchy)
  for (const tx of txes) {
    await Promise.all([transactions.tx(tx), model.tx(tx)])
  }

  async function findAll<T extends Doc> (
    _class: Ref<Class<T>>,
    query: DocumentQuery<T>,
    options?: FindOptions<T>
  ): Promise<FindResult<T>> {
    const domain = hierarchy.getClass(_class).domain
    if (domain === DOMAIN_TX) return await transactions.findAll(_class, query, options)
    return await model.findAll(_class, query, options)
  }

  const txFactory = new DefaultTxFactory(core.account.System)

  return {
    findAll,
    tx: async (tx: Tx): Promise<void> => {
      if (tx.objectSpace === core.space.Model) {
        hierarchy.tx(tx)
      }
      await Promise.all([model.tx(tx), transactions.tx(tx)])
      handler(tx)
      // invoke triggers
      const triggers = hierarchy.getClass(tx.objectClass).triggers
      if (triggers !== undefined) {
        for (const trigger of triggers) {
          const impl = await getResource(trigger)
          const txes = await impl(tx, txFactory)
          for (const tx of txes) {
            await Promise.all([model.tx(tx), transactions.tx(tx)])
            handler(tx)      
          }
        }
      }
    }
  }
}
