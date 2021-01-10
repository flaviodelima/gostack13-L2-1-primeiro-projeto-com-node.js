import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const { password: _, ...userResponse } = user;

  return response.json({ userResponse, token });
});

export default sessionsRouter;
