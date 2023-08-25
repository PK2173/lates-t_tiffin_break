const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.HOST ,
    user: process.env.DATAUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
});

knex.schema
  .createTable("user", (table) => {
    table.increments("user_id").notNullable();
    table.string("username").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("phoneNo").notNullable().unique();
    table.timestamp("create_at").defaultTo(knex.fn.now());
  })
  .then((result) => {
    console.log("table user created");
  })
  .catch((err) => {
    // console.log(err);
  });

module.exports = knex;


// Host: sql6.freesqldatabase.com
// Database name: sql6641129
// Database user: sql6641129
// Database password: uCxQj5UvjX
// Port number: 3306