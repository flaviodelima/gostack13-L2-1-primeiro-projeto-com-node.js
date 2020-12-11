import { MigrationInterface, QueryRunner } from 'typeorm';

export default class GenerateUserUuidAutomatically1607660339718
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE public.users ALTER COLUMN id SET DEFAULT uuid_generate_v4()',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;',
    );
  }
}
