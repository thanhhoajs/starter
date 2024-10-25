import {
  corsMiddleware,
  helmetMiddleware,
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

app.listen({ port: appConfig.port, development: true });
