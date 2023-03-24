import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    BookModule,
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:gVfcS9imF7WpCui9@listalivros.zyzp4jq.mongodb.net/lista_livros?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
