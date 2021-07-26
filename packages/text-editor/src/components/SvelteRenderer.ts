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

import { SvelteComponent } from 'svelte'

export class SvelteRenderer  {

  private component: SvelteComponent

  constructor(comp: typeof SvelteComponent, props: any) {
    const options = { target: document.body, props }
    this.component = new (comp as any)(options)
  }

  updateProps(props: Record<string, any>): void {
    this.component.$set(props)
  }

  onKeyDown(props: Record<string, any>): boolean {
    if (this.component.onKeyDown)
      this.component.onKeyDown()
    return false
  }

  destroy(): void {
    this.component.$destroy()
  }
}