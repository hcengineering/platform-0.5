//
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
//

import { addLocation } from '@anticrm/platform'

import { loginId } from '@anticrm/login'
// import workbench from '@anticrm/workbench'
// import core from '@anticrm/plugin-core'
// import chunter from '@anticrm/chunter'
// import task from '@anticrm/task'
// import meeting from '@anticrm/meeting'
// import i18n from '@anticrm/platform-i18n'
// import activity from '@anticrm/activity'
// import activityMeta from '@anticrm/activity/src/__meta__'
// import presentation from '@anticrm/presentation'
// import contact from '@anticrm/contact'
// import chunter from '@anticrm/chunter'
// import guidebook from '@anticrm/guidebook'
// import datagen from '@anticrm/data-generator'
// import recruiting from '@anticrm/recruiting'
// import personExtras from '@anticrm/person-extras'
// import calendar from '@anticrm/calendar'

// import '@anticrm/chunter-assets'
// import '@anticrm/task-assets'
// import '@anticrm/meeting-assets'
// import uiMeta from '@anticrm/platform-ui/src/__meta__/meta'
// import workbenchMeta from '@anticrm/workbench/src/__meta__'
// import chunterMeta from '@anticrm/chunter/src/__meta__'
// import recruitingMeta from '@anticrm/recruiting/src/__meta__'
// import presentationMeta from '@anticrm/presentation/src/__meta__'
// import dataGenMeta from '@anticrm/data-generator/src/__meta__'

export function configurePlatform() {

// platform.setMetadata(ui.metadata.LoginApplication, 'login')
// platform.setMetadata(ui.metadata.DefaultApplication, 'workbench')

  // if (process.env.CLIENT === 'dev')
  //   addLocation(core, () => import(/* webpackChunkName: "plugin-core-dev" */ '@anticrm/plugin-core-dev'))
  // else
  //   addLocation(core, () => import(/* webpackChunkName: "plugin-core" */ '@anticrm/plugin-core-impl'))

  addLocation(loginId, () => import(/* webpackChunkName: "login" */ '@anticrm/plugin-login'))
  // addLocation(workbench, () => import(/* webpackChunkName: "workbench" */ '@anticrm/workbench-impl'))
  // addLocation(chunter, () => import(/* webpackChunkName: "chunter" */ '@anticrm/chunter-impl'))
  // addLocation(task, () => import(/* webpackChunkName: "task" */ '@anticrm/task-impl'))
  // addLocation(meeting, () => import(/* webpackChunkName: "meeting" */ '@anticrm/meeting-impl'))
  // platform.addLocation(i18n, () => import(/* webpackChunkName: "platform-i18n" */ '@anticrm/platform-i18n/src/plugin'))
// platform.addLocation(presentation, () => import(/* webpackChunkName: "presentation" */ '@anticrm/presentation/src/plugin'))
// platform.addLocation(contact, () => import(/* webpackChunkName: "contact" */ '@anticrm/contact/src/plugin'))
// platform.addLocation(chunter, () => import(/* webpackChunkName: "chunter" */ '@anticrm/chunter/src/plugin'))
// platform.addLocation(guidebook, () => import(/* webpackChunkName: "guidebook" */ '@anticrm/guidebook/src/plugin'))
// platform.addLocation(recruiting, () => import(/* webpackChunkName: "recruiting" */ '@anticrm/recruiting/src/plugin'))
// platform.addLocation(personExtras, () => import(/* webpackChunkName: "person-extras" */ '@anticrm/person-extras/src/plugin'))
// platform.addLocation(calendar, () => import(/* webpackChunkName: "calendar" */ '@anticrm/calendar/src/plugin'))
// platform.addLocation(activity, () => import(/* webpackChunkName: "activity" */ '@anticrm/activity/src/plugin'))

// platform.addLocation(datagen, () => import(/* webpackChunkName: "datagen" */ '@anticrm/data-generator/src/plugin'))

// uiMeta(platform)
//  loginMeta()
// workbenchMeta(platform)
// activityMeta(platform)
// chunterMeta(platform)
// recruitmentMeta(platform)
// recruitingMeta(platform)
// taskMeta(platform)
// presentationMeta(platform)
// contactMeta(platform)
// dataGenMeta(platform)

}
