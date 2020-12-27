import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddDefaltUuidToIdsColumn1607387448666
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE appointments ALTER COLUMN id SET DEFAULT uuid_generate_v4()',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE appointments ALTER COLUMN id DROP DEFAULT',
    );
  }
}
