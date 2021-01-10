import { Migration } from '@mikro-orm/migrations';

export class Migration20210110182037 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_entity" ("id" serial primary key, "username" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "user_entity" add constraint "user_entity_username_unique" unique ("username");');
  }

}
