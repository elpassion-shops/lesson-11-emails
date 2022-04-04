import pg, {ClientConfig, QueryResult} from 'pg';
class PostgresClient {
    private client: pg.Client;
    constructor(user: string, password: string, host: string, port: number, database: string) {
        this.client = new pg.Client({
            user,
            password,
            host,
            port,
            database
        });
    }
    public async connect(): Promise<void> {
        await this.client.connect();
    }
    public async query(query: string, values?: any[]): Promise<pg.QueryResult> {
        return await this.client.query(query, values);
    }
    public async end(): Promise<void> {
        await this.client.end();
    }
}

export class VoteDbClient {
    private client: PostgresClient;
    constructor(client: any) {
        this.client = new PostgresClient(client.user, client.password, client.host, client.port, client.database);
    }
    public async connect(): Promise<void> {
        await this.client.connect();
    }
    public async end(): Promise<void> {
        await this.client.end();
    }
    public async createTable(): Promise<QueryResult> {
        return await this.client.query(`CREATE TABLE IF NOT EXISTS votes (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            vote INT NOT NULL
        )`);
    }
    public async insertVote(email: string, vote: number): Promise<QueryResult> {
        const result = await this.client.query(`SELECT * FROM votes WHERE email = $1`, [email]);
        if (result.rows.length > 0) {
            return await this.updateVote(email, vote);
        } else {
            return this.client.query(`INSERT INTO votes (email, vote) VALUES ($1, $2)`, [email, vote]);
        }
    }
    public async updateVote(email: string, vote: number): Promise<pg.QueryResult> {
        return await this.client.query(`UPDATE votes SET vote = $1 WHERE email = $2`, [vote, email]);
    }
    public async getVote(email: string): Promise<pg.QueryResult> {
        return await this.client.query(`SELECT * FROM votes WHERE email = '${email}'`);
    }
}