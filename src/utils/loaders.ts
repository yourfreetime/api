export class Loaders {
  private static _instance: Loaders;
  private database: string;
  private host: string;
  private port: number;

  constructor() {
    if (Loaders._instance) {
      throw new Error("Error: Instantiation failed: Use Loaders.getInstance() instead of new.");
    }

    this.host = process.env['SERVER_HOST'] || '0.0.0.0';
    this.port = parseInt(process.env['SERVER_PORT'] || '4000');

    this.database = process.env['DATABASE'] ||
      process.env['MONGODB_URL'] ||
      process.env['MONGO_PORT_27017_TCP_ADDR'] ||
      'mongodb://localhost:27017';
  }

  public get Database() {
    return this.database;
  }

  public get Host() {
    return this.host;
  }

  public get Port() {
    return this.port;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export default Loaders;
