<!--
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
-->

<script lang="ts">
  import type { Ref, Space } from '@anticrm/core'
  import { getClient } from '@anticrm/presentation'
  import type { Message } from '@anticrm/chunter'
  import chunter from '../plugin'

  import { onDestroy } from 'svelte'
  import { default as MessageComponent } from './Message.svelte'

  export let space: Ref<Space> | undefined

  let messages: Message[] | undefined
  let unsubscribe = () => {}
  const client = getClient()

  $: {
    unsubscribe()
    unsubscribe = client.query(chunter.class.Message, { space }, result => { messages = result })
  }

  onDestroy(unsubscribe)
</script>

<div class="channel-container">
  {#if messages}
    {#each messages as message}
      <MessageComponent {message}/>
    {/each}
  {/if}
</div>

<style lang="scss">
  .channel-container {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
</style>
