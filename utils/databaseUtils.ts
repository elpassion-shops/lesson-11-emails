import { Client } from "pg";
import { config } from "../config/configuration";
import { VoteDbClient } from "../services/databaseService";

export function createDbClient(): Client {
  return new Client({
    user: config.database.username,
    host: config.database.host,
    database: config.database.database,
    password: config.database.password,
    port: config.database.port,
  });
}

export async function createVoteClient(data: any): Promise<VoteDbClient> {
  const client = createDbClient();
  const voteClient = await (
    await (await new VoteDbClient(client).connect()).createTable()
  ).insertVote(data.email, data.vote);
  return voteClient;
}
