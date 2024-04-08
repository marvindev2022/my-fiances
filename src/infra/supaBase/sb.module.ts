// supabase/supabase.module.ts

import { Module } from '@nestjs/common';
import { SupabaseService } from './sb.service';

@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
