"use strict";

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
    ? "postgres:///porttracker_test"
    : process.env.DATABASE_URL || "postgres:///porttracker";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("PostTracker Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri
};
