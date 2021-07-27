<!--
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
-->

<script lang="ts">

import { Editor } from '@tiptap/core'
import type { FindResult, Doc } from '@anticrm/core'
import type { Person } from '@anticrm/contact'
import contact from '@anticrm/contact'
import { getClient } from '@anticrm/presentation'

export let items: Person[]
export let editor: Editor
export let query: string
export let clientRect: () => ClientRect
export let command: (props: any) => void

let popup: HTMLElement

export function onKeyDown() {
  console.log("onKeyDown!!!!!!!")
}

function click() {
  command({id: 'fuck-this-id', label: 'Der Label'})
  console.log(editor.getJSON())
  console.log(editor.getHTML())
}

let persons: Person[] = []

let style = 'visibility: hidden'
$: {
  if (popup) {
    const x = clientRect().left
    const height = popup.getBoundingClientRect().height
    const y = clientRect().top - height - 16
    style = `left: ${x}px; top: ${y}px;`
  }
}

//$: items(query).then(result => persons = result)

</script>

<div>
  <div bind:this={popup} class='completion' {style}>
    {#each items as item}
      {item.firstName}
    {/each}
    <h1>HELLO! {query}</h1>
    <button on:click={click}>Hey</button>
  </div>
</div>

<style lang="scss">

.completion {
  position: absolute;
  background-color: red;
}

</style>