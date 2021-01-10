import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json({ ok: true });
  }
}
