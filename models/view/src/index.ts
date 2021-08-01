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

import type { IntlString, Asset } from '@anticrm/platform'
import { DOMAIN_MODEL } from '@anticrm/core' 
import { Model, Mixin, Builder } from '@anticrm/model'
import type { AnyComponent } from '@anticrm/ui'

import core, { TDoc, TClass } from '@anticrm/model-core'
import view from './plugin'

@Mixin(view.mixin.AttributeEditor, core.class.Class)
export class TAttributeEditor extends TClass {
  editor!: AnyComponent
}

export function createModel(builder: Builder) {
  builder.createModel(TAttributeEditor)

  builder.mixin(core.class.TypeString, core.class.Class, view.mixin.AttributeEditor, {
    editor: view.component.StringEditor
  })
}

export default view
