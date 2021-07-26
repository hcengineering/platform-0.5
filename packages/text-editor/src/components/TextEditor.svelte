<!--
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
-->

<script lang="ts">

import { onMount, onDestroy } from 'svelte'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import Mention from '@tiptap/extension-mention'

import MentionList from './MentionList.svelte'
import { SvelteRenderer } from './SvelteRenderer'

let element: HTMLElement
let editor: Editor

onMount(() => {
  editor = new Editor({
    element: element,
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Placeholder.configure({placeholder: 'Type something...'}),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: {
          items: query => {
            return [
              'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
            ].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
          },
          render: () => {
            let component: any

            return {
              onStart: props => {
                component = new SvelteRenderer(MentionList, props)
              },
              onUpdate(props) {
                component.updateProps(props)
              },
              onKeyDown(props) {
                return component.onKeyDown(props)
              },
              onExit() {
                component.destroy()
              },
            }
          },
        },
      }),
    ],
    // content: 'dfgdfg',
    onTransaction: () => {
      // force re-render so `editor.isActive` works as expected
      editor = editor
    },
  })
})

onDestroy(() => {
  if (editor) {
    editor.destroy()
  }
})

</script>

<div bind:this={element} />

<style lang="scss" global>

.ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }

  /* Placeholder (at the top) */
  p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #ced4da;
    pointer-events: none;
    height: 0;
  }

}

</style>