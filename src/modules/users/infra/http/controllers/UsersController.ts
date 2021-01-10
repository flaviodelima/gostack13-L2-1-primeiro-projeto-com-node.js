import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserservice from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserservice);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json({ name: user.name, email: user.email });
  }
}
