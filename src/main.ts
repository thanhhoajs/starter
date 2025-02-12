import { Logger } from '@thanhhoajs/logger';
import { ThanhHoa } from '@thanhhoajs/thanhhoa';
import {
  cacheMiddleware,
  compressionMiddleware,
  corsMiddleware,
  helmetMiddleware,
  rateLimiterMiddleware,
} from '@thanhhoajs/utils';

import { runValidators } from './configs';
import { appConfig } from './configs/app.config';
import { AppModule } from './modules/app.module';

const logger = Logger.get('APP');

async function bootstrap() {
  // Validate configs first
  await runValidators();

  const app = new ThanhHoa();

  // Middlewares
  app.use(corsMiddleware());
  app.use(helmetMiddleware());
  app.use(
    await rateLimiterMiddleware({
      windowMs: 600000, // 10 minute
      maxRequests: 100, // 100 request
      message: 'Too many requests, please try again later',
      skipFailedRequests: false,
      skipSuccessfulRequests: false,
    }),
  );
  app.use(cacheMiddleware());
  app.use(
    compressionMiddleware({
      level: 6,
      library: 'zlib',
      memLevel: 9,
      windowBits: 9,
    }),
  );

  app.listen({ port: appConfig.port, development: true }, [AppModule]);
  console.log(`Server is running on http://localhost:${appConfig.port}`);
}

bootstrap().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
