import {
  Controller,
  Get,
  Inject,
  type IRequestContext,
} from '@thanhhoajs/thanhhoa';

import { DefaultService } from './default.service';

@Controller()
export class DefaultController {
  constructor(
    @Inject(DefaultService.name)
    private readonly defaultService: DefaultService,
  ) {}

  @Get()
  hello(): Response {
    return this.defaultService.hello();
  }

  @Get('/user-agent')
  userAgent(context: IRequestContext): Response {
    return this.defaultService.userAgent(context);
  }
}
