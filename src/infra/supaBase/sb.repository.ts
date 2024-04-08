import { Injectable } from '@nestjs/common';
import { SupabaseService } from './sb.service';

@Injectable()
export class SupabaseRepository {
  constructor(private supabaseService: SupabaseService) {}

  async findAll(tableName: string) {
    const supabaseClient = await this.supabaseService.getSupabase();
    return supabaseClient.from(tableName).select('*');
  }

async findById(tableName: string, id: string) {
    const data: any = await this.findAll(tableName);
    return data.find((item:any) => item.id === id);
}

async create(tableName: string, data: any) {
    const supabaseClient = await this.supabaseService.getSupabase();
    const { error } = await supabaseClient.from(tableName).insert(data);
    if (error) {
        throw new Error(error.message);
    }
}

  async update(tableName: string, id: string, data: any) {
    const supabaseClient = await this.supabaseService.getSupabase();
    const { error } = await supabaseClient.from(tableName).update(data).match({ id });
    if (error) {
      throw new Error(error.message);
    }
  }

  async delete(tableName: string, id: string) {
    const supabaseClient = await this.supabaseService.getSupabase();
    const { error } = await supabaseClient.from(tableName).delete().match({ id });
    if (error) {
      throw new Error(error.message);
    }
  }
}
