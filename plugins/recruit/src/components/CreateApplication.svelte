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
  import { DatePicker, EditBox, Dialog, Tabs, Section } from '@anticrm/ui'
  import { UserBox } from '@anticrm/presentation'
  import type { Person } from '@anticrm/contact'
  import File from './icons/File.svelte'
  import Address from './icons/Address.svelte'
  import Attachment from './icons/Attachment.svelte'

  import { getClient } from '@anticrm/presentation'

  import recruit from '../plugin'

  export let space: Ref<Space>

  const dispatch = createEventDispatcher()

  let candidate: Ref<Person>

  const client = getClient()

  function createCandidate() {
    client.createDoc(recruit.class.Applicant, space, {
      candidate,
    })
  }
</script>

<Dialog label={'Create Application'} 
        okLabel={'Create Application'} 
        okAction={createCandidate}
        on:close={() => { dispatch('close') }}>
  <Tabs/>
  <div class="content">
    <Section icon={File} label={'General Information'}>
      <div class="grid">
        <UserBox _class={recruit.class.Candidate} title='Candidate' caption='Candidates' bind:value={candidate}/>
        <DatePicker title={'Pick due date'} />
      </div>
    </Section>
  </div>
</Dialog>

<style lang="scss">

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