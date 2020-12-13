import { Router } from 'express';

import CreateUserservice from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserservice();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // that's the classes solution, but it brakes contract with the interface for user
    // delete user.password;

    return response.json({ name: user.name, email: user.email });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
