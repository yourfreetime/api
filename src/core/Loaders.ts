class Loaders {
  private static _instance: Loaders;
  private database: string;
  private host: string;
  private port: number;
  private jwtToken: string;

  constructor() {
    if (Loaders._instance) {
      throw new Error(
        'Error: Instantiation failed: Use Loaders.getInstance() instead of new.'
      );
    }

    this.host = process.env['HOST'] || '0.0.0.0';
    this.port = parseInt(process.env['PORT'] || '4000');
    this.jwtToken = process.env['JWT_TOKEN'] || '';

    this.database =
      process.env['DATABASE'] ||
      process.env['MONGODB_URL'] ||
      process.env['MONGO_PORT_27017_TCP_ADDR'] ||
      'mongodb://localhost:27017';

    if (process.env['MONGODB_DATABASE']) {
      this.database = `${this.database}/${process.env['MONGODB_DATABASE']}`;
    }
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

  public get JwtToken() {
    return this.jwtToken;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export default Loaders;
