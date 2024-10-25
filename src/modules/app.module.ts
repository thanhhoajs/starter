import type { ThanhHoa } from '@thanhhoajs/thanhhoa';

import { DefaultModule } from './default/default.module';

export class AppModule {
  constructor(app: ThanhHoa) {
    // Add more modules here
    new DefaultModule(app);
  }
}
