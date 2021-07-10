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

import type { Resource, Plugin } from './platform'
import { Status, Severity, PlatformError } from './status'
import { parseId } from './ident'
import { monitor } from './event'

import platform from './platform'

type Resources = Record<string, Record<string, any>>

interface PluginModule<R extends Resources> {
  default: () => Promise<R>
}

type PluginLoader<R extends Resources> = () => Promise<PluginModule<R>>

const locations = new Map<Plugin, PluginLoader<Resources>>()

export function addLocation<R extends Resources> (
  plugin: Plugin,
  module: PluginLoader<R>
): void {
  locations.set(plugin, module)
}

async function loadPlugin (id: Plugin): Promise<Resources> {
  const location = locations.get(id)
  if (location === undefined) {
    throw new PlatformError(
      new Status(Severity.ERROR, platform.status.NoLocationForPlugin, {
        plugin: id
      })
    )
  }
  const loaderPromise = location()
  const status = new Status(Severity.INFO, platform.status.LoadingPlugin, {
    plugin: id
  })
  const loadedPlugin = await monitor(status, loaderPromise)
  return await loadedPlugin.default()
}

const cachedResource = new Map<string, any>()
const resources = new Map<Plugin, Resources>()

export async function getResource<T> (
  resource: Resource<T>
): Promise<T | undefined> {
  const cached = cachedResource.get(resource)
  if (cached !== undefined) {
    return cached
  }
  const info = parseId(resource)
  let loaded = resources.get(info.component)
  if (loaded === undefined) {
    loaded = await loadPlugin(info.component)
    resources.set(info.component, loaded)
  }
  const value = loaded[info.kind]?.[info.name]
  if (value !== undefined) {
    cachedResource.set(resource, value)
  }
  return value
}
