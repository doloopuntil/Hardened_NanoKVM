import type { Resource } from 'i18next';

import { applyLocaleExtras } from './locale-extras';

export function getResources(): Resource {
  const resources: Resource = {};

  const modules: Record<string, Resource> = import.meta.glob('./locales/*.ts', { eager: true });

  for (const path in modules) {
    const moduleName = path.split('/').pop()?.replace('.ts', '');
    if (moduleName) {
      const resource = modules[path].default;
      applyLocaleExtras(moduleName, resource);
      resources[moduleName] = resource;
    }
  }

  return resources;
}
