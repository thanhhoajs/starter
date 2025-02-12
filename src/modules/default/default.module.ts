import { Module } from '@thanhhoajs/thanhhoa';

import { DefaultController } from './default.controller';
import { DefaultService } from './default.service';

@Module({
  controllers: [DefaultController],
  providers: [DefaultService],
})
export class DefaultModule {}
