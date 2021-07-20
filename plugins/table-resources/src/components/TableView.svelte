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

import { onDestroy } from 'svelte'
import type { Ref, Class, Doc, Space } from '@anticrm/core'
import type { AttributeModel } from '@anticrm/table'

import { Label } from '@anticrm/ui'

import { getClient } from '@anticrm/workbench'

export let _class: Ref<Class<Doc>>
export let space: Ref<Space>
export let model: AttributeModel[]

let objects: Doc[]

let client = getClient()
let unsubscribe = () => {}

$: {
  unsubscribe()
  unsubscribe = client.query(_class, { space }, result => { objects = result })
}

onDestroy(unsubscribe)

function getValue(doc: Doc, key: string): any {
  return (doc as any)[key]
}

</script>

<table class="table-body">
  <tr class="tr-head">
    {#each model as attribute}
      <th><Label label = {attribute.label}/></th>
    {/each}
  </tr>
  {#if objects}
    {#each objects as object (object._id)}
      <tr class="tr-body">
      {#each model as attribute}
        <td><svelte:component this={attribute.component} value={getValue(object, attribute.key)}/></td>
      {/each}
      </tr>
    {/each}
  {/if}
</table>

<style lang="scss">
.table-body {
  display: table;
  border-collapse: collapse;

  td {
    align-items: center;
    height: 64px;
    padding: 6px 20px;
    color: var(--theme-content-accent-color);
  }
  th {
    align-items: center;
    height: 50px;
    padding: 0 20px;
    font-weight: 500;
    text-align: left;
    color: var(--theme-content-trans-color);
  }
  .tr-head {
    position: sticky;
    top: 0;
    background-color: var(--theme-bg-color);
    border-bottom: 1px solid var(--theme-bg-focused-color);
    box-shadow: 0 1px 0 var(--theme-bg-focused-color);
    z-index: 5;
  }
  .tr-body {
    position: relative;
    border-top: 1px solid var(--theme-bg-accent-hover);
    &:nth-child(2) {
      border-top: 1px solid transparent;
    }
    &:last-child {
      border-bottom: 1px solid transparent;
    }
  }
  .tr-body:hover {
    & > td {
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
      background-color: var(--theme-button-bg-enabled);
      &:first-child {
        border-radius: 12px 0 0 12px;
      }
      &:last-child {
        border-radius: 0 12px 12px 0;
      }
    }
  }
}
</style>