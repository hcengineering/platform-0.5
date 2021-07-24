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
  import type { Person } from '@anticrm/contact'

  import chen from '../../img/chen.png'

  export let value: Person
  export let subtitle: string | undefined = undefined
  export let size: 24 | 32 | 34 | 36 = 24
  export let avatarOnly: boolean = false
</script>

<div class="user-container">
  <div style="width: {size}px; height: {size}px;"><img style="width: {size}px; height: {size}px;" src={chen} alt={''}/></div>
  {#if !avatarOnly}
    <div class="caption">
      {#if subtitle}<div class="subtitle">{subtitle}</div>{/if}
      <div class="title">{value.firstName + ' ' + value.lastName}</div>
    </div>
  {/if}
</div>

<style lang="scss">
  .user-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;

    .caption {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin-left: 8px;
      color: var(--theme-caption-color);

      .subtitle {
        opacity: .4;
      }
      .title {
        max-width: 150px;
        font-weight: 500;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>