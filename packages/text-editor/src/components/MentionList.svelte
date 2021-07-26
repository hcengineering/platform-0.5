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

export let editor: Editor
export let query: string
export let command: (props: any) => void

export function onKeyDown() {
  console.log("onKeyDown!!!!!!!")
}

function click() {
  command({id: 'fuck-this-id', label: 'Der Label'})
  console.log(editor.getJSON())
  console.log(editor.getHTML())
}

</script>

<div class='x'>
  <h1>HELLO! {query}</h1>
  <button on:click={click}>Hey</button>
</div>

<style lang="scss">

.x {
  position: absolute;
  left: 100px;
  top: 100px;
  background-color: red;
}

</style>