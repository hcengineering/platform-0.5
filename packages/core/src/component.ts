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
import type { Plugin, StatusCode } from '@anticrm/platform'
import { plugin } from '@anticrm/platform'
import type { Account, Class, Doc, Obj, Ref, Space, AnyAttribute, Tx, TxCreateDoc } from './classes'
import type { TxMixin, TxRemoveDoc, TxUpdateDoc } from './tx'

export const coreId = 'core' as Plugin

export default plugin(coreId, {
  class: {
    Obj: '' as Ref<Class<Obj>>,
    Doc: '' as Ref<Class<Doc>>,
    Class: '' as Ref<Class<Class<Obj>>>,
    Attribute: '' as Ref<Class<AnyAttribute>>,
    Tx: '' as Ref<Class<Tx>>,
    TxCreateDoc: '' as Ref<Class<TxCreateDoc<Doc>>>,
    TxMixin: '' as Ref<Class<TxMixin<Doc, Doc>>>,
    TxUpdateDoc: '' as Ref<Class<TxUpdateDoc<Doc>>>,
    TxRemoveDoc: '' as Ref<Class<TxRemoveDoc<Doc>>>,
    Space: '' as Ref<Class<Space>>,
    Account: '' as Ref<Class<Account>>,
  },
  space: {
    Tx: '' as Ref<Space>,
    Model: '' as Ref<Space>
  },
  account: {
    System: '' as Ref<Account>
  },
  status: {
    ObjectNotFound: '' as StatusCode<{ _id: Ref<Doc> }>,
    ItemNotFound: '' as StatusCode<{ _id: Ref<Doc>, _localId: string }>
  }
})
