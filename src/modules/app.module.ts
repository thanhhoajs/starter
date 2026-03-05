import { Router } from '@thanhhoajs/thanhhoa';

import { DefaultModule } from './default/default.module';

export class AppModule {
  readonly router: Router;

  constructor() {
    this.router = new Router();
    const defaultModule = new DefaultModule();
    this.router.use(defaultModule.router);
    // Add more modules here
  }
}
