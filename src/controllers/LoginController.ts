import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel, { IUser } from '../models/UserModel';
import UserRepository from '../repositories/UserRepository';
import Loaders from '../core/Loaders';

class LoginController {
  public userRepository: UserRepository = UserRepository.Instance;
  public loaders: Loaders = Loaders.Instance;

  public async login(req: Request, res: Response) {
    let isValidPassword = false;
    const user: IUser | null = await this.userRepository.findUserByEmail(
      req.body.email
    );

    if (user) {
      isValidPassword = bcrypt.compareSync(req.body.password, user.password);
    }

    if (!user || !isValidPassword) {
      return res.status(400).send({
        error: true,
        message: 'Email and password fields are invalid'
      });
    }

    const token = jwt.sign(user.toJSON(), this.loaders.JwtToken);

    return res.status(200).send({ error: false, user, token });
  }

  public async signup(req: Request, res: Response) {
    const userFind: IUser | null = await this.userRepository.findUserByEmail(
      req.body.email
    );

    if (userFind) {
      return res
        .status(409)
        .send({ error: true, message: 'Email already exists' });
    }

    const user = new UserModel();
    user.name = req.body.name;
    user.email = req.body.email;
    user.picture = req.body.picture;
    user.password = bcrypt.hashSync(req.body.password, 5);
    user.dateCreated = new Date();
    user.dateUpdated = new Date();

    const userResult = await this.userRepository.createUser(user);
    const token = jwt.sign(userResult.toJSON(), this.loaders.JwtToken);

    return res
      .status(200)
      .send({ error: false, user: userResult.toJSON(), token });
  }

  private getUser = (token: string) => {
    try {
      if (token) {
        return jwt.verify(token, this.loaders.JwtToken);
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  public async validation({ req }: any): Promise<any> {
    const user = this.getUser(req.headers.authorization || '');
    return { user };
  }
}

export default LoginController;
