import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      // não gosto do fato de que não vou ser notificado disso
      // TODO: logar casos em que os arquivos não são encontrados ou retornar erro
      return;
    }
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
