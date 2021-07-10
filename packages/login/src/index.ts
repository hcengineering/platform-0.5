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

import type { Plugin, Metadata } from '@anticrm/platform'
import { plugin } from '@anticrm/platform'

export interface LoginInfo {
  email: string
  workspace: string
  server: string
  port: string
  token: string
  secondFactorEnabled: boolean
}

export const ACCOUNT_KEY = 'anticrm-account'

export function currentAccount (): LoginInfo | null {
  const account = localStorage.getItem(ACCOUNT_KEY)
  return account ? JSON.parse(account) : null
}

export const loginId = 'login' as Plugin

export default plugin(loginId, {
  metadata: {
    AccountsUrl: '' as Metadata<string>
  }
})
