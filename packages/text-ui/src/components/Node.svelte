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
  export let node: any
</script>

{#if node.nodeType === Node.TEXT_NODE}
  {node.data}
{:else}
  {#if node.nodeName === 'em'}
    <em>
      {#each node.childNodes as kid}
        <svelte:self node={kid}/>
      {/each}
    </em>
  {:else if node.nodeName === 'strong'}
    <strong>
      {#each node.childNodes as kid}
        <svelte:self node={kid}/>
      {/each}
    </strong>
  {:else}
    Unknown { node.nodeName }
  {/if}
{/if}
