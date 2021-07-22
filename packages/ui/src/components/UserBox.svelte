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
  import type { IntlString } from '@anticrm/platform'
  import Label from './Label.svelte'
  import EditBox from './EditBox.svelte'
  import PopupMenu from './PopupMenu.svelte'
  import UserInfo from './UserInfo.svelte'
  import Add from './icons/Add.svelte'
  import Close from './icons/Close.svelte'

  import chen from '../../img/chen.png'
  import tim from '../../img/tim.png'
  import elon from '../../img/elon.png'
  import kathryn from '../../img/kathryn.png'

  interface IUser {
    avatar: any
    name: string
    title: string
  }

  export let title: IntlString
  export let caption: IntlString | undefined = 'PROJECT MEMBERS'
  export let selected: IUser | undefined = undefined
  export let users: IUser[] = [
    { avatar: chen, name: 'chen', title: 'Rosamund Chen' },
    { avatar: tim, name: 'tim', title: 'Tim Ferris' },
    { avatar: elon, name: 'elon', title: 'Elon Musk' },
    { avatar: kathryn, name: 'kathryn', title: 'Kathryn Minshew' }
  ]
  export let margin: number = 16

  let pressed: boolean = false
  let search: string = ''
</script>

<div class="userBox">
  <PopupMenu {margin} bind:show={pressed}>
    <button
      slot="trigger"
      class="btn"
      class:selected={pressed}
      on:click={(event) => {
        pressed = !pressed
        event.stopPropagation()
      }}
    >
      {#if selected}
        <div class="avatar"><UserInfo user={selected} size={34} avatarOnly /></div>
      {:else}
        <div class="icon">
          {#if pressed}<Close size={16} />{:else}<Add size={16} />{/if}
        </div>
      {/if}
    </button>

    <div class="header">
      <div class="title"><Label label={title} /></div>
      <EditBox label={'Search'} bind:value={search} />
      <div class="caption"><Label label={caption} /></div>
    </div>

    {#each users as user}
      <button class="menu-item" on:click={() => {
        selected = user
        pressed = !pressed
      }}><UserInfo {user} /></button>
    {/each}
  </PopupMenu>

  <div class="selectUser">
    <div class="title"><Label label={title} /></div>
    <div class="user">
      {#if selected}{selected.title}{:else}<Label label={'Not selected'} />{/if}
    </div>
  </div>
</div>

<style lang="scss">
  .userBox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: auto;

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 0;
      width: 36px;
      height: 36px;
      background-color: var(--theme-button-bg-focused);
      border: 1px solid transparent;
      border-radius: 50%;
      outline: none;
      cursor: pointer;

      .icon {
        width: 16px;
        height: 16px;
        opacity: 0.3;
      }

      .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        opacity: 1;
      }

      &.selected {
        background-color: var(--theme-button-bg-focused);
        border: 1px solid var(--theme-bg-accent-color);
        .icon {
          opacity: 0.6;
        }
      }

      &:hover {
        background-color: var(--theme-button-bg-pressed);
        border: 1px solid var(--theme-bg-accent-color);
        .icon {
          opacity: 1;
        }
      }
      &:focus {
        border: 1px solid var(--primary-button-focused-border);
        box-shadow: 0 0 0 3px var(--primary-button-outline);
        .icon {
          opacity: 1;
        }
      }
    }

    .header {
      text-align: left;
      .title {
        margin-bottom: 16px;
        font-size: 14px;
        font-weight: 500;
        color: var(--theme-caption-color);
      }
      .caption {
        margin: 24px 0 10px 7px;
        font-size: 12px;
        font-weight: 600;
        line-height: 0.5px;
        text-transform: uppercase;
        color: var(--theme-content-color);
      }
    }

    .menu-item {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
      margin: 0;
      padding: 6px;
      height: 40px;
      background-color: transparent;
      border: 1px solid transparent;
      border-radius: 8px;
      outline: none;
      cursor: pointer;

      &:hover {
        background-color: var(--theme-button-bg-pressed);
        border: 1px solid var(--theme-bg-accent-color);
        .title {
          color: var(--theme-caption-color);
        }
      }
      &:focus {
        border: 1px solid var(--primary-button-focused-border);
        box-shadow: 0 0 0 3px var(--primary-button-outline);
        z-index: 1;
      }
    }

    .selectUser {
      margin-left: 12px;
      font-size: 14px;
      .title {
        color: var(--theme-content-color);
      }
      .user {
        color: var(--theme-caption-color);
      }
    }
  }
</style>
