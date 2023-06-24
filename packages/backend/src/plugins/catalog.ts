import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { GithubMultiOrgEntityProvider, defaultUserTransformer } from '@backstage/plugin-catalog-backend-module-github';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  // The org URL below needs to match a configured integrations.github entry
  // specified in your app-config.
  const githubOrgEntityProvider = GithubMultiOrgEntityProvider.fromConfig(env.config, {
    id: 'production',
    githubUrl: 'https://github.com',
    orgs: ['theflyingbirdsmc'],
    logger: env.logger,
    schedule: env.scheduler.createScheduledTaskRunner({
      frequency: { minutes: 60 },
      timeout: { minutes: 15 },
    }),
    userTransformer: async (user, ctx) => {
      const entity = await defaultUserTransformer(user, ctx);

      if (entity && user.organizationVerifiedDomainEmails?.length) {
        entity.spec.profile!.email = user.organizationVerifiedDomainEmails[0];
      }

      return entity;
    },
  });

  builder.addEntityProvider(githubOrgEntityProvider);
  builder.addProcessor(new ScaffolderEntitiesProcessor());

  const { processingEngine, router } = await builder.build();
  await processingEngine.start();

  return router;
}
