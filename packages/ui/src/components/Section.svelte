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
  import { IntlString } from '@anticrm/platform'
  import type { AnySvelteComponent } from '../types'
  import Label from './Label.svelte'
  import ArrowUp from './icons/Up.svelte'
  import ArrowDown from './icons/Down.svelte'

  export let icon: AnySvelteComponent
  export let title: IntlString
  export let topLine: boolean = false
  export let show: boolean = false
</script>

<div class="section-container" class:topLine={topLine}
  on:click|preventDefault={() => {
    show = !show
  }}
>
  <svelte:component this={icon} size={20} />
  <div class="title"><Label label={title} /></div>
  <div class="arrow">{#if show}<ArrowDown />{:else}<ArrowUp />{/if}</div>
</div>
{#if show}<div class="section-content"><slot/></div>{/if}

<style lang="scss">
  .section-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    height: 80px;
    min-height: 80px;
    cursor: pointer;
    user-select: none;

    &.topLine {
      border-top: 1px solid var(--theme-menu-divider);
    }

    .title {
      flex-grow: 1;
      margin-left: 12px;
      font-weight: 500;
      color: var(--theme-caption-color);
    }
    .arrow {
      margin: 8px;
    }
  }
  .section-content {
    margin: 16px 0 54px;
  }
</style>