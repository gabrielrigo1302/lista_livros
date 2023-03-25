import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    BookModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UserModule,
    MongooseModule.forRoot(process.env.DB_MONGO),
  ],
})
export class AppModule {}
