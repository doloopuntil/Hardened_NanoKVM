import type { Resource } from 'i18next';

export function getResources(): Resource {
  const resources: Resource = {};

  const modules: Record<string, Resource> = import.meta.glob('./locales/*.ts', { eager: true });

  for (const path in modules) {
    const moduleName = path.split('/').pop()?.replace('.ts', '');
    if (moduleName) {
      resources[moduleName] = modules[path].default;
    }
  }

  return resources;
}
