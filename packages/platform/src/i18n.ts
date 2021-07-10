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

import type { IntlString } from './platform'
import { getResource } from './resource'
import { IntlMessageFormat } from 'intl-messageformat'

const locale = 'en'

type StringsLocation = Record<string, () => Promise<Record<string, string>>>

export function getLocale (): string {
  return locale
}

export async function loadStringsStatic (
  location: StringsLocation
): Promise<Record<string, string>> {
  const loader = location[locale]
  if (loader === undefined) throw new Error('no strings found')
  return await loader()
}

const compiledStrings = new Map<string, IntlMessageFormat>()

export async function translate<P extends {}> (
  string: IntlString<P>,
  params: P
): Promise<string> {
  let compiled = compiledStrings.get(string)
  if (compiled === undefined) {
    try {
      const translation = await getResource(string)
      compiled = new IntlMessageFormat(translation, locale)
      compiledStrings.set(string, compiled)
    } catch (err) {
      return string
    }
  }
  return compiled.format(params) as string
}
