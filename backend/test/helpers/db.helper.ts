import { DataSource } from "typeorm";
import { newDb } from 'pg-mem';

// List of all entities in the application
const DEFAULT_ENTITIES = []


/**
 * @description Get mock datasource for testing
 */
export const setupDataSource = async (entities=DEFAULT_ENTITIES): Promise<DataSource> => {
    const db = newDb({
      autoCreateForeignKeyIndices: true,
    });
  
    // Necessary as this is the first function typeorm calls when connecting to a db
    db.public.registerFunction({
      implementation: () => 'auth',
      name: 'current_database',
    });
  
    // Necessary as this is the second function typeorm calls when connecting to a db
    db.public.registerFunction({
      implementation: () =>
        'PostgreSQL 15, compiled by Visual C++ build 1969, 64-bit',
      name: 'version',
    });
  
    const ds: DataSource = await db.adapters.createTypeormDataSource({
      type: 'postgres',
      entities: entities,
      migrationsRun: false,
    });
    await ds.initialize();
    await ds.synchronize();
  
    return ds;
  };