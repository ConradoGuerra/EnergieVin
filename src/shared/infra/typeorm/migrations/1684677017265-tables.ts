import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1684677017265 implements MigrationInterface {
    name = 'Tables1684677017265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wines" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "website" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9533c1931b8e10abae016745f61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wine_prices" ("id" SERIAL NOT NULL, "price" numeric NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "wineId" integer, CONSTRAINT "PK_323bdf652eb3e5bdae83d0bfd25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wine_properties" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" character varying NOT NULL, "wineId" integer, CONSTRAINT "PK_ff9fbf8e0ec8ec8fb26523740c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wine_prices" ADD CONSTRAINT "FK_df528f01322d11d0a0068080d9f" FOREIGN KEY ("wineId") REFERENCES "wines"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wine_properties" ADD CONSTRAINT "FK_20d32bc142b96e257ab295476af" FOREIGN KEY ("wineId") REFERENCES "wines"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wine_properties" DROP CONSTRAINT "FK_20d32bc142b96e257ab295476af"`);
        await queryRunner.query(`ALTER TABLE "wine_prices" DROP CONSTRAINT "FK_df528f01322d11d0a0068080d9f"`);
        await queryRunner.query(`DROP TABLE "wine_properties"`);
        await queryRunner.query(`DROP TABLE "wine_prices"`);
        await queryRunner.query(`DROP TABLE "wines"`);
    }

}
