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

function getLocation(plugin: Plugin): PluginLoader<Resources> {
  const location = locations.get(plugin)
  if (location === undefined) {
    throw new PlatformError(
      new Status(Severity.ERROR, platform.status.NoLocationForPlugin, {
        plugin
      })
    )
  }
  return location
}

const loading = new Map<Plugin, Promise<Resources>>()

async function loadPlugin (id: Plugin): Promise<Resources> {
  let pluginLoader = loading.get(id)
  if (pluginLoader === undefined) {
    const status = new Status(Severity.INFO, platform.status.LoadingPlugin, {
      plugin: id
    })
    pluginLoader = monitor(status, getLocation(id)()).then(plugin => plugin.default())
    loading.set(id, pluginLoader)
  }
  return pluginLoader
}

const cachedResource = new Map<string, any>()

export async function getResource<T> (
  resource: Resource<T>
): Promise<T> {
  const cached = cachedResource.get(resource)
  if (cached !== undefined) {
    return cached
  }
  const info = parseId(resource)
  const resources = loading.get(info.component) ?? loadPlugin(info.component)
  const value = (await resources)[info.kind]?.[info.name]
  if (value === undefined) {
    throw new PlatformError(new Status(Severity.ERROR, platform.status.ResourceNotFound, { resource }))
  }
  cachedResource.set(resource, value)
  return value
}
