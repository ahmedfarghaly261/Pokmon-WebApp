import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const ds = new DataSource(dataSourceOptions);
        return ds.initialize();
      },
    },
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
