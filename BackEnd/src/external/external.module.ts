import { Module } from '@nestjs/common';
import { ExternalImportService } from './external-import.service';

@Module({
  providers: [ExternalImportService],
  exports: [ExternalImportService]
})
export class ExternalModule {}
