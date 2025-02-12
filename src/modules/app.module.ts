import { Module } from '@thanhhoajs/thanhhoa';

import { DefaultModule } from './default/default.module';

@Module({
  imports: [
    DefaultModule,
    // Add more modules here
  ],
})
export class AppModule {}
