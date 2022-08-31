import { Sequelize } from "sequelize";
import { Express } from "express";

export type BootstrapArgs = {
    driver: Sequelize,
    app: Express,
    port: number
}

export async function bootstrap(args: BootstrapArgs, cb?: () => void) {
    await args.driver.sync();
    console.log("database is ready");

    args.app.listen(args.port, cb);
}