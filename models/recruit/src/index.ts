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

import { Builder, Model, UX } from '@anticrm/model'
import type { Ref } from '@anticrm/core'
import { TSpace, TDoc } from '@anticrm/model-core'
import type { Vacancy, Candidates, Candidate, Applicant } from '@anticrm/recruit'

import workbench from '@anticrm/model-workbench'
import core from '@anticrm/model-core'
import view from '@anticrm/model-view'
import contact, { TPerson } from '@anticrm/model-contact'
import recruit from './plugin'
import { Person } from '@anticrm/contact'

@Model(recruit.class.Vacancy, core.class.Space)
@UX(recruit.string.Vacancy, recruit.icon.Vacancy)
export class TVacancy extends TSpace implements Vacancy {}

@Model(recruit.class.Candidates, core.class.Space)
@UX(recruit.string.CandidatePools, recruit.icon.RecruitApplication)
export class TCandidates extends TSpace implements Candidates {}

@Model(recruit.class.Candidate, contact.class.Person)
export class TCandidate extends TPerson implements Candidate {}

@Model(recruit.class.Applicant, core.class.Doc)
export class TApplicant extends TDoc implements Applicant {
  candidate!: Ref<Person>
}

export function createModel(builder: Builder) {
  builder.createModel(TVacancy, TCandidates, TCandidate, TApplicant)

  builder.mixin(recruit.class.Vacancy, core.class.Class, workbench.mixin.SpaceView, {
    view: {
      class: recruit.class.Applicant,
      createItemDialog: recruit.component.CreateApplication
    },
  })

  builder.mixin(recruit.class.Candidates, core.class.Class, workbench.mixin.SpaceView, {
    view: {
      class: recruit.class.Candidate,
      createItemDialog: recruit.component.CreateCandidate
    },
  })

  builder.mixin(recruit.class.Candidate, core.class.Class, view.mixin.AttributePresenter, {
    presenter: recruit.component.CandidatePresenter
  })

  builder.createDoc(workbench.class.Application, core.space.Model, {
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
      ]
    }
  })
  builder.createDoc(recruit.class.Candidates, core.space.Model, {
    name: 'public',
    description: 'Public Candidates',
    private: false,
    members: []
  }, recruit.space.CandidatesPublic)

  builder.createDoc(view.class.Viewlet, core.space.Model, {
    attachTo: recruit.class.Candidate,
    descriptor: view.viewlet.Table,
    config: ['', 'email', 'phone', 'city']
  })
}

export { default as default } from './plugin'
