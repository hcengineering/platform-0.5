//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
// Copyright © 2021 Hardcore Engineering Inc.
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

import type { Plugin } from '@anticrm/platform'
import type { Tx, TxCreateDoc, Data, Ref, Doc, TxFactory } from '@anticrm/core'
import type { Message, Backlink } from '@anticrm/chunter'

import core from '@anticrm/core'
import chunter from '@anticrm/chunter'

export const chunterServerId = 'chunter-server' as Plugin

function extractBacklinks(backlinkId: Ref<Doc>, kids: NodeListOf<HTMLElement>): Data<Backlink>[] {
  const result: Data<Backlink>[] = []
  for (const kid of kids) {
    if (kid.nodeName === 'span') {
      result.push({ 
        objectId: kid.getAttribute('data-id') as Ref<Doc>,
        backlinkId,
        backlinkClass: chunter.class.Message
      })
    }
    result.push(...extractBacklinks(backlinkId, kid.childNodes as NodeListOf<HTMLElement>))
  }
  return result
}

function getBacklinks(backlinkId: Ref<Doc>, content: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'application/xhtml+xml')
  return extractBacklinks(backlinkId, doc.childNodes as NodeListOf<HTMLElement>)
}

async function OnMessage(tx: Tx, txFactory: TxFactory): Promise<Tx[]> {
  if (tx._class === core.class.TxCreateDoc) {
    const createTx = tx as TxCreateDoc<Message>
    const content = createTx.attributes.content
    const backlinks = getBacklinks(tx.objectId, content)
    return backlinks.map(backlink => txFactory.createTxCreateDoc(chunter.class.Backlink, chunter.space.Backlinks, backlink))
  }
  return []
}

export default async () => ({
  trigger: {
    OnMessage,
  }
})
