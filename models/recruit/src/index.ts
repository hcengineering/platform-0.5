//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
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
//

import { Builder, Model } from '@anticrm/model'

import { TSpace } from '@anticrm/model-core'
import type { Vacancy, Candidates, Candidate } from '@anticrm/recruit'

import workbench from '@anticrm/model-workbench'
import core from '@anticrm/model-core'
import contact, { TPerson } from '@anticrm/model-contact'
import recruit from './plugin'

@Model(recruit.class.Vacancy, core.class.Space)
export class TVacancy extends TSpace implements Vacancy {}

@Model(recruit.class.Candidates, core.class.Space)
export class TCandidates extends TSpace implements Candidates {}

@Model(recruit.class.Candidate, contact.class.Person)
export class TCandidate extends TPerson implements Candidate {}

export function createModel(builder: Builder) {
  builder.createModel(TVacancy, TCandidates)
  builder.createDoc(workbench.class.Application, {
    label: recruit.string.RecruitApplication,
    icon: recruit.icon.RecruitApplication,
    navigatorModel: {
      spaces: [
        {
          label: recruit.string.Vacancies,
          spaceClass: recruit.class.Vacancy,
          addSpaceLabel: recruit.string.CreateVacancy,
          createComponent: recruit.component.CreateVacancy
        },
        {
          label: recruit.string.CandidatePools,
          spaceClass: recruit.class.Candidates,
          addSpaceLabel: recruit.string.CreateCandidates,
          createComponent: recruit.component.CreateCandidates
        }
      ],
      spaceView: recruit.component.RecruitingView
    }
  })
  builder.createDoc(recruit.class.Candidates, {
    name: 'public',
    description: 'Public Candidates',
    private: false,
    members: []
  })
}
