import type { Router } from '@thanhhoajs/thanhhoa';

import { DefaultController } from './default.controller';
import { DefaultService } from './default.service';

export class DefaultModule {
  readonly router: Router;

  constructor() {
    const service = new DefaultService();
    const controller = new DefaultController(service);
    this.router = controller.getRouter();
  }
}
