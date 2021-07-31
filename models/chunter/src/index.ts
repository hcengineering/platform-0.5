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
import type { Backlink, Channel, Message } from '@anticrm/chunter'

import workbench from '@anticrm/model-workbench'
import core from '@anticrm/model-core'
import chunter, { server } from './plugin'

@Model(chunter.class.Channel, core.class.Space)
@UX(chunter.string.Channel, chunter.icon.Hashtag)
export class TChannel extends TSpace implements Channel {}

@Model(chunter.class.Message, core.class.Doc)
@Trigger(server.trigger.OnMessage)
export class TMessage extends TDoc implements Message {
  content!: string
}

@Model(chunter.class.Backlink, core.class.Doc)
export class TBacklink extends TDoc implements Backlink {
  objectId!: Ref<Doc>
  backlinkId!: Ref<Doc>
  backlinkClass!: Ref<Class<Doc>>
}

export function createModel(builder: Builder) {
  builder.createModel(TChannel, TMessage, TBacklink)
  builder.mixin(chunter.class.Channel, core.class.Class, workbench.mixin.SpaceView, {
    view: chunter.component.ChannelView
  })
  builder.createDoc(workbench.class.Application, {
    label: chunter.string.ApplicationLabelChunter,
    icon: chunter.icon.Chunter,
    navigatorModel: {
      spaces: [
        {
          label: chunter.string.Channels,
          spaceClass: chunter.class.Channel,
          addSpaceLabel: chunter.string.CreateChannel,
          createComponent: chunter.component.CreateChannel
        }
      ]
    }
  })
  builder.createDoc(chunter.class.Channel, {
    name: 'general',
    description: 'General Channel',
    private: false,
    members: []
  })
  builder.createDoc(chunter.class.Channel, {
    name: 'random',
    description: 'Random Talks',
    private: false,
    members: []
  })
}

