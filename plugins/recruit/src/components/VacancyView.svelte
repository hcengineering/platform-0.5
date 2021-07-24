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
  import { getClient, UserInfo } from '@anticrm/presentation'
  import { Component, ViewSelection, StringPresenter } from '@anticrm/ui'
  import table from '@anticrm/table'
  import recruit from '../plugin'

  export let space: Ref<Space>
  let view: string = 'list'

  const client = getClient()

</script>

<div class="container">
  <div class="toolbar">
    <div style="flex-grow: 1" />
    <ViewSelection bind:selected={view} />
  </div>
  <div class="content">

    <Component is={table.component.TableView} props={
      {
        _class:recruit.class.Applicant, 
        space,
        options: {
          lookup: {
            candidate: recruit.class.Candidate
          }
        },
        model: [
          { 
            label: 'Candidate',
            key: '$lookup.candidate',
            component: UserInfo
          },
          { 
            label: 'Email',
            key: '$lookup.candidate.email',
            component: StringPresenter
          },
          { 
            label: 'City',
            key: '$lookup.candidate.city',
            component: StringPresenter
          },
        ]
      }
    }/>

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
