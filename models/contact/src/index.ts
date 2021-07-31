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

import { Builder, Model, Prop, TypeString } from '@anticrm/model'
import type { IntlString } from '@anticrm/platform'

import { TDoc } from '@anticrm/model-core'
import type { Contact, Person, Organization } from '@anticrm/contact'

import core from '@anticrm/model-core'
import { ids as contact } from './plugin'

@Model(contact.class.Contact, core.class.Doc)
export class TContact extends TDoc implements Contact {
}

@Model(contact.class.Person, contact.class.Contact)
export class TPerson extends TContact implements Person {
  @Prop(TypeString(), 'FIRST NAME' as IntlString)
  firstName!: string
  lastName!: string
  email!: string
  phone!: string
  city!: string
}

@Model(contact.class.Organization, contact.class.Contact)
export class TOrganization extends TContact implements Organization {
  name!: string
}

export function createModel(builder: Builder) {
  builder.createModel(TContact, TPerson, TOrganization)
}

export { contact as default }