import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserservice from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
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
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = await new UpdateUserAvatarService();
    await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json({ ok: true });
  },
);

export default usersRouter;
