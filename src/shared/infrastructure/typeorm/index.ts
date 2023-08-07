import { DataSource } from "typeorm"

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "mksolutions",
    password: "mk@1234",
    database: "mkdata",
    entities: [__dirname + "/src/modules/**/infrastructure/typeorm/entities/*.ts"],
    migrations: [__dirname + "/migrations/*.ts"],
    synchronize: true,
})

export default dataSource;
