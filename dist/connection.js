var Client = require("pg").Client;
var client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "pgadmin",
    database: "postgres",
});
module.exports = client;
//# sourceMappingURL=connection.js.map