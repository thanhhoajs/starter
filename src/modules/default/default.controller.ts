import { type IRequestContext, Router } from '@thanhhoajs/thanhhoa';

import type { DefaultService } from './default.service';

export class DefaultController {
  private readonly router: Router;

  constructor(private readonly defaultService: DefaultService) {
    this.router = new Router();
    this.router.get('/', () => this.hello());
    this.router.get('/user-agent', (ctx) => this.userAgent(ctx));
  }

  getRouter(): Router {
    return this.router;
  }

  hello(): Response {
    return this.defaultService.hello();
  }

  userAgent(context: IRequestContext): Response {
    return this.defaultService.userAgent(context);
  }
}
