import { Logger } from '@thanhhoajs/logger';
import {
  cacheControl,
  compress,
  cors,
  helmet,
  rateLimit,
  ThanhHoa,
} from '@thanhhoajs/thanhhoa';

import { runValidators } from './configs';
import { appConfig } from './configs/app.config';
import { AppModule } from './modules/app.module';

const logger = Logger.get('APP');

async function bootstrap() {
  // Validate configs first
  await runValidators();

  const app = new ThanhHoa();

  // Middlewares
  app.use(
    cors({
      origin: 'https://example.com',
      methods: ['GET', 'POST'],
      credentials: true,
    }),
  );

  app.use(helmet({ contentSecurityPolicy: false }));

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      message: 'Too many requests',
      skip: ['/health', '/metrics'],
    }),
  );

  app.use(
    cacheControl({
      maxAge: 3600,
      staleIfError: 86400,
      mustRevalidate: true,
      skip: ['/health'],
    }),
  );

  app.use(
    compress({
      threshold: 1024,
      encoding: ['gzip'],
    }),
  );

  // Register modules
  const appModule = new AppModule();
  app.use(appModule.router);

  app.listen({ port: appConfig.port });
  console.log(`Server is running on http://localhost:${appConfig.port}`);
}

bootstrap().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
