//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
// Copyright © 2021 Hardcore Engineering Inc.
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

import type { Plugin, Asset } from '@anticrm/platform'
import { plugin } from '@anticrm/platform'
import type { Ref, Mixin, UXObject, Space, FindOptions } from '@anticrm/core'

import type { Class, Doc } from '@anticrm/core'
import type { AnyComponent } from '@anticrm/ui'

export interface AttributeEditor extends Class<Doc> {
  editor: AnyComponent
}

export interface AttributePresenter extends Class<Doc> {
  presenter: AnyComponent
}

export interface ViewletDescriptor extends Doc, UXObject {
  component: AnyComponent
}

export interface Viewlet extends Doc {
  attachTo: Ref<Class<Space>>
  descriptor: Ref<ViewletDescriptor>
  open: AnyComponent
  options?: FindOptions<Doc>
  config: any
}

export const viewId = 'view' as Plugin

export default plugin(viewId, { 
  mixin: {
    AttributeEditor: '' as Ref<Mixin<AttributeEditor>>,
    AttributePresenter: '' as Ref<Mixin<AttributePresenter>>
  },
  class: {
    ViewletDescriptor: '' as Ref<Class<ViewletDescriptor>>,
    Viewlet: '' as Ref<Class<Viewlet>>
  },
  viewlet: {
    Table: '' as Ref<ViewletDescriptor>
  },
  icon: {
    Table: '' as Asset
  }
})
