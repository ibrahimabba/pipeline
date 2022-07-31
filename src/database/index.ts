/* eslint-disable prettier/prettier */
import neo4j from 'neo4j-driver';
import { Query } from 'neo4j-driver-core/types/types';
import { env } from '../utils/env';

// Create Neo4j driver instance
const driver = neo4j.driver(
  env('AURA_ENDPOINT'),
  neo4j.auth.basic(env('AURA_USERNAME'), env('AURA_PASSWORD')),
);

const session = driver.session({ database: 'neo4j' });

async function executeCypherQuery(statement: Query, params = {}) {
  try {
    const result = await session.run(statement, params);
    return result;
  } catch (error) {
    throw error;
  } finally {
  }
}

export { executeCypherQuery, session };
