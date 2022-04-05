import pg, { Client } from "pg";
class DatabaseService {
  private client: pg.Client;

  constructor(
    user: string | undefined,
    password: string | undefined,
    host: string,
    port: number,
    database: string | undefined
  ) {
    this.client = new pg.Client({
      user,
      password,
      host,
      port,
      database,
    });
  }
  public async connect(): Promise<this> {
    await this.client.connect();
    return this;
  }
  public async query(
    query: string,
    values?: (string | number)[]
  ): Promise<pg.QueryResult> {
    return this.client.query(query, values);
  }
  public async end(): Promise<void> {
    await this.client.end();
  }
}

export class VoteDbClient extends DatabaseService {
  constructor(client: Client) {
    super(
      client.user,
      client.password,
      client.host,
      client.port,
      client.database
    );
  }
  public async createTable(): Promise<this> {
    await this.client.query(`CREATE TABLE IF NOT EXISTS votes (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            vote INT NOT NULL
        )`);
    return this;
  }
  public async insertVote(email: string, vote: number): Promise<this> {
    const result = await this.client.query(
      `SELECT * FROM votes WHERE email = $1`,
      [email]
    );
    if (result.rows.length > 0) {
      await this.updateVote(email, vote);
      return this;
    } else {
      await this.client.query(
        `INSERT INTO votes (email, vote) VALUES ($1, $2)`,
        [email, vote]
      );
      return this;
    }
  }

  public async updateVote(
    email: string,
    vote: number
  ): Promise<pg.QueryResult> {
    return await this.client.query(
      `UPDATE votes SET vote = $1 WHERE email = $2`,
      [vote, email]
    );
  }
  public async getVote(email: string): Promise<pg.QueryResult> {
    return await this.client.query(
      `SELECT * FROM votes WHERE email = '${email}'`
    );
  }
}
