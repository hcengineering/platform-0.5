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
  import type { Ref, Space, Doc } from '@anticrm/core'
  import { getClient } from '@anticrm/presentation'

  import { Component, StringPresenter, ViewSelection, showModal } from '@anticrm/ui'
  import { UserInfo } from '@anticrm/presentation'
  import recruit from '../plugin'
  import table from '@anticrm/table'

  import CardView from './CardView.svelte'
  import KanbanView from './KanbanView.svelte'

  import EditCandidate from './EditCandidate.svelte'

  export let space: Ref<Space>
  export let view: string = 'list'

  const client = getClient()

  function onClick(ev: CustomEvent) {
    console.log(ev.detail)
    showModal(EditCandidate, { object: ev.detail })
  }

</script>

<div class="container">
  <div class="toolbar">
    <div style="flex-grow: 1" />
    <ViewSelection bind:selected={view} />
  </div>
  <div class="content">

    {#if view === 'list'}

    <Component is={table.component.TableView} props={
      {
        _class:recruit.class.Candidate, 
        space, 
        model: [
          { 
            label: 'Candidate',
            key: '',
            component: UserInfo
          },
          { 
            label: 'Email',
            key: 'email',
            component: StringPresenter
          },
          { 
            label: 'Phone',
            key: 'phone',
            component: StringPresenter
          },
          { 
            label: 'City',
            key: 'city',
            component: StringPresenter
          },
        ]
      }
    } on:click={onClick}/>

    {:else if view === 'card'}
      <CardView />
    {:else if view === 'kanban'}
      <KanbanView />
    {/if}

  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: auto;
      min-height: 40px;
      height: 40px;
      margin: 40px 40px 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      width: auto;
      height: 100%;
      margin: 40px;
    }
  }
</style>
