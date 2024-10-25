import type { IRequestContext } from '@thanhhoajs/thanhhoa';

import type { DefaultService } from './default.service';

export class DefaultController {
  constructor(private readonly defaultService: DefaultService) {}

  hello(): Response {
    return this.defaultService.hello();
  }

  userAgent(context: IRequestContext): Response {
    return this.defaultService.userAgent(context);
  }
}
