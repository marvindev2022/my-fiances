// supabase/supabase.service.ts

import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import env from 'src/env';


const supabaseUrl = 'https://rcrpbmsznplqghtwnqma.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey!)

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://rcrpbmsznplqghtwnqma.supabase.co',
      env.SUPABASE_KEY
    );
  }

  async fetchData(tableName: string) {
    const { data, error } = await this.supabase.from(tableName).select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getSupabase() {
    return this.supabase;
  }

 

}
