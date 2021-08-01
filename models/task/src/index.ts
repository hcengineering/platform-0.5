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

import { Builder, Model, TypeString, UX, Trigger } from '@anticrm/model'
import type { Ref, Doc, Class} from '@anticrm/core'
import { TSpace, TDoc } from '@anticrm/model-core'
import type { Project, Task } from '@anticrm/task'
import type { Employee } from '@anticrm/contact'

import workbench from '@anticrm/model-workbench'
import core from '@anticrm/model-core'
import task from './plugin'

@Model(task.class.Project, core.class.Space)
export class TProject extends TSpace implements Project {}

@Model(task.class.Task, core.class.Doc)
export class TTask extends TDoc implements Task {
  assignee!: Ref<Employee>
}

export function createModel(builder: Builder) {
  builder.createModel(TProject, TTask)
  builder.mixin(task.class.Project, core.class.Class, workbench.mixin.SpaceView, {
    view: task.component.TaskView
  })
  builder.createDoc(workbench.class.Application, core.space.Model, {
    label: task.string.ApplicationLabelTask,
    icon: task.icon.Task,
    navigatorModel: {
      spaces: [
        {
          label: task.string.Projects,
          spaceClass: task.class.Project,
          addSpaceLabel: task.string.CreateProject,
          createComponent: task.component.CreateProject
        }
      ]
    }
  })
  builder.createDoc(task.class.Project, core.space.Model, {
    name: 'demo',
    description: 'Demo Project',
    private: false,
    members: []
  })
}

