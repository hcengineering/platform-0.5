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
  import { createEventDispatcher } from 'svelte'
  import type { Ref, Space } from '@anticrm/core'
  import { TextArea, EditBox, Dialog, Tabs, Section } from '@anticrm/ui'
  import File from './icons/File.svelte'
  import Address from './icons/Address.svelte'
  import Attachment from './icons/Attachment.svelte'

  import { getClient } from '@anticrm/workbench'

  import recruit from '../plugin'

  export let space: Ref<Space>

  const dispatch = createEventDispatcher()

  let firstName: string = ''
  let lastName: string = ''

  const client = getClient()

  function createCandidate() {
    client.createDoc(recruit.class.Candidate, space, {
      firstName,
      lastName
    })
  }
</script>

<Dialog label={recruit.string.CreateCandidate} 
        okLabel={recruit.string.CreateCandidate} 
        okAction={createCandidate}
        on:close={() => { dispatch('close') }}>
  <div class="header">
    <div class="user-container">
      <div class="avatar"></div>
      <div class="info">
        <div class="name">Candidate Name</div>
        <div class="title">Candidate title</div>
      </div>
    </div>
  </div>
  <Tabs/>
  <div class="content">
    <Section icon={File} title={'Personal Information'}>
      <div class="grid">
        <EditBox label={'First name *'} placeholder={'John'} bind:value={firstName}/>
        <EditBox label={'Last name *'} placeholder={'Smith'} bind:value={lastName}/>
        <EditBox label={'Email *'} placeholder={'john.smith@gmail.com'} />
        <EditBox label={'Phone *'} placeholder={'+00 (000) 000 00'} />
      </div>
    </Section>
    <Section icon={Address} title={'Address'} topLine>
      <div class="grid">
        <EditBox label={'Street'} placeholder={'Broderick st'} />
        <EditBox label={'City *'} placeholder={'Los Angeles'} />
        <EditBox label={'ZIP / Postal code'} placeholder={'26892'} />
        <EditBox label={'Country'} placeholder={'United States'} />
      </div>
    </Section>
  </div>
</Dialog>


<style lang="scss">

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 640px;
    min-height: 240px;
    background-image: url(../../img/header-green.png);
    background-repeat: no-repeat;
    background-clip: border-box;
    background-size: cover;
    border-radius: 20px;

    .user-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #C4C4C4;
      }

      .info {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;

        .name {
          font-size: 16px;
          font-weight: 500;
          line-height: 150%;
          color: var(--theme-caption-color);
        }
        .title {
          font-size: 12px;
          font-weight: 500;
          color: var(--theme-caption-color);
          opacity: .6;
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 24px;
      row-gap: 40px;
      
      .row {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    }
  }

</style>