import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const { password: _, ...userResponse } = user;

    return response.json({ userResponse, token });
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
