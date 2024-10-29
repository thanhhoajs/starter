import {
  cacheMiddleware,
  compression,
  corsMiddleware,
  helmetMiddleware,
  rateLimiter,
  ThanhHoa,
} from '@thanhhoajs/thanhhoa';

import { runValidators } from './configs';
import { appConfig } from './configs/app.config';
import { AppModule } from './modules/app.module';

runValidators();

const app = new ThanhHoa();

new AppModule(app);

app.use(corsMiddleware());
app.use(helmetMiddleware());
app.use(
  rateLimiter({
    windowMs: 600000, // 10 minute
    maxRequests: 100, // 100 request
    message: 'Too many requests, please try again later',
    skipFailedRequests: false,
    skipSuccessfulRequests: false,
  }),
);
app.use(cacheMiddleware());
app.use(
  compression({
    level: 6,
    library: 'zlib',
    memLevel: 9,
    windowBits: 9,
  }),
);

app.listen({ port: appConfig.port, development: true });
