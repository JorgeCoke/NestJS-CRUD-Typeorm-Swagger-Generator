import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      logging: 'all',
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'default',
      synchronize: true,
      entities: [`${__dirname}/**/model/**.entity{.ts,.js}`],
      cache: {
        duration: 1000, // 1 seconds
      },
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
