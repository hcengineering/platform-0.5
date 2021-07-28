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
import { getClient, UserInfo } from '@anticrm/presentation'
import { EditStylish, IconSearch } from '@anticrm/ui'
import ScrollBox from '../../../presentation/node_modules/@anticrm/ui/src/components/ScrollBox.svelte'

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
    let height = popup.getBoundingClientRect().height
    let y = clientRect().top - height - 16
    if (clientRect().top - height - 16 < 20) {
      y = 20
      height = clientRect().top - 36
    }
    style = `left: ${x}px; top: ${y}px; height: ${height}px`
  }
}

//$: items(query).then(result => persons = result)

</script>

<div>
  <div bind:this={popup} class='completion' {style}>
    <EditStylish icon={IconSearch} placeholder={'Search for someone'} />
    <div class="caption">SUGGESTED</div>
    <div class="scroll">
      {#each items as item}
        <UserInfo size={36} value={item} />
      {/each}
    </div>
    <!-- <h1>HELLO! {query}</h1>
    <button on:click={click}>Hey</button> -->
  </div>
</div>

<style lang="scss">

.completion {
  position: absolute;
  padding: 16px;
  background-color: var(--theme-button-bg-hovered);
  border: 1px solid var(--theme-bg-accent-hover);
  border-radius: 12px;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, .1);

  .caption {
    margin: 8px 0;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: .5px;
    color: var(--theme-content-trans-color);
  }
  .scroll {
    display: grid;
    grid-auto-flow: row;
    gap: 12px;
    height: calc(100% - 71px);
    overflow-y: auto;
  }
}

</style>