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
  import type { Ref, Space, Doc } from '@anticrm/core'
  import { TextArea, EditBox, Dialog, Tabs, Section, Grid, DialogHeader } from '@anticrm/ui'
  import type { Candidate } from '@anticrm/recruit'
  import type { Backlink } from '@anticrm/chunter'
  import File from './icons/File.svelte'
  import Address from './icons/Address.svelte'
  import Attachment from './icons/Attachment.svelte'

  import { createQuery } from '@anticrm/presentation'

  import recruit from '../plugin'
  import chunter from '@anticrm/chunter'

  export let object: Candidate
  export let space: Ref<Space>

  let newValues = Object.assign({}, object)

  const dispatch = createEventDispatcher()

  let backlinks: Backlink[]

  const query = createQuery()
  query.query(chunter.class.Backlink, { objectId: object._id }, result => { backlinks = result })
</script>

<Dialog label={recruit.string.CreateCandidate} 
        okLabel={recruit.string.CreateCandidate} 
        okAction={() => {}}
        on:close={() => { dispatch('close') }}>
  <DialogHeader />
  <Tabs/>
  <Section icon={File} label={'Personal Information'}>
    <Grid>
      <EditBox label={'First name *'} placeholder={'John'} bind:value={newValues.firstName} focus/>
      <EditBox label={'Last name *'} placeholder={'Smith'} bind:value={newValues.lastName}/>
      <EditBox label={'Email *'} placeholder={'john.smith@gmail.com'} bind:value={newValues.email}/>
      <EditBox label={'Phone *'} placeholder={'+00 (000) 000 00'} bind:value={newValues.phone}/>
    </Grid>
  </Section>
  <Section icon={Address} label={'Address'}>
    <Grid>
      <EditBox label={'Street'} placeholder={'Broderick st'} />
      <EditBox label={'City *'} placeholder={'Los Angeles'} bind:value={newValues.city}/>
      <EditBox label={'ZIP / Postal code'} placeholder={'26892'} />
      <EditBox label={'Country'} placeholder={'United States'} />
    </Grid>
  </Section>
  <Section icon={Address} label={'Backlinks'}>
    {JSON.stringify(backlinks)}
  </Section>
</Dialog>
