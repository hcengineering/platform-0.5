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

import type { IntlString } from '@anticrm/platform'
import { getResource } from '@anticrm/platform'
import type { Ref, Class, Obj } from '@anticrm/core'
import type { Connection } from '@anticrm/client'
import type { AnySvelteComponent } from '@anticrm/ui'

import view from '@anticrm/view'

export interface AttributeModel {
  key: string
  label: IntlString
  presenter: AnySvelteComponent
}

export async function buildModel(client: Connection, _class: Ref<Class<Obj>>, keys: string[]): Promise<AttributeModel[]> {
  const model = keys.map(async key => {
    if (key.length === 0) {
      const clazz = client.getHierarchy().getClass(_class) 
      const presenterMixin = client.getHierarchy().as(clazz, view.mixin.AttributePresenter)
      const presenter = await getResource(presenterMixin.presenter)
      return {
        key,
        label: clazz.label,
        presenter
      } as AttributeModel    
    } else {
      const attribute = client.getHierarchy().getAttribute(_class, key)
      const clazz = client.getHierarchy().getClass(attribute.type._class) 
      const presenterMixin = client.getHierarchy().as(clazz, view.mixin.AttributePresenter)
      const presenter = await getResource(presenterMixin.presenter)
      return {
        key,
        label: attribute.label,
        presenter
      } as AttributeModel
    }
  })
  return Promise.all(model)
}