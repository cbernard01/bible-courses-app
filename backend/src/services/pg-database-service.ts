import {Connection, IDatabaseDriver, MikroORM} from "@mikro-orm/core";
import config from "../mikro-orm.config";


class PgDatabaseService {
  private _db: MikroORM<IDatabaseDriver<Connection>>;


  get db(): MikroORM<IDatabaseDriver<Connection>> {
    if (!this._db) throw new Error('Cannot access PG Database Service');

    return this._db;
  }


  async connect() {
    this._db = await MikroORM.init(config);
  }

  async runMigrations() {
    await this._db.getMigrator().up();
  }

}

export const pgDatabaseService = new PgDatabaseService();
