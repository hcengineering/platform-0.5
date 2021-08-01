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

import type { IntlString, Asset } from '@anticrm/platform'
import type { Ref, Class, Doc, Obj, Space, Mixin, FindOptions } from '@anticrm/core'
import type { Plugin } from '@anticrm/platform'
import type { AnyComponent } from '@anticrm/ui'
import type { ViewletDescriptor } from '@anticrm/view'
import { writable } from 'svelte/store'

import { plugin } from '@anticrm/platform'

export interface Application extends Doc {
  label: IntlString
  icon: Asset
  navigatorModel?: NavigatorModel
}

export interface SpacesNavModel {
  label: IntlString
  spaceClass: Ref<Class<Space>>
  addSpaceLabel: IntlString
  createComponent: AnyComponent
  component?: AnyComponent
}

export interface NavigatorModel {
  spaces: SpacesNavModel[]
}

export interface ViewConfiguration {
  class: Ref<Class<Doc>> // show object of this class
  createItemDialog?: AnyComponent  
}

export interface SpaceView extends Class<Obj> {
  view: ViewConfiguration
}

export const workbenchId = 'workbench' as Plugin

export default plugin(workbenchId, {
  class: {
    Application: '' as Ref<Class<Application>>
  },
  mixin: {
    SpaceView: '' as Ref<Mixin<SpaceView>>
  }
})
