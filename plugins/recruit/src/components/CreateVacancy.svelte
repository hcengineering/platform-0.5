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
  import { TextArea, EditBox, Dialog, ToggleWithLabel, Tabs, Section } from '@anticrm/ui'

  import { getClient } from '@anticrm/workbench'
  import File from './icons/File.svelte'

  import recruit from '../plugin'
  import core from '@anticrm/core'

  const dispatch = createEventDispatcher()

  let name: string = ''
  let description: string = ''

  const client = getClient()

  function createVacancy() {
    client.createDoc(recruit.class.Vacancy, core.space.Model, {
      name,
      description,
      private: false,
      members: []
    })
  }
</script>

<Dialog label={recruit.string.CreateVacancy} 
        okLabel={recruit.string.CreateVacancy} 
        okAction={createVacancy}
        on:close={() => { dispatch('close') }}>
  <Tabs/>
  <div class="content">
    <Section icon={File} label={'Personal Information'}>
      <div class="grid">
        <div class="row"><EditBox label={recruit.string.VacancyName} bind:value={name} placeholder="Software Engineer"/></div>
        <div class="row"><TextArea label={recruit.string.VacancyDescription} bind:value={description}/></div>
        <div class="row"><ToggleWithLabel label={recruit.string.MakePrivate} description={recruit.string.MakePrivateDescription}/></div>
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