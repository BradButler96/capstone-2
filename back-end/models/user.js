"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
          `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  pfp,
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, pfp, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
      { username, password, firstName, lastName, email, pfp, isAdmin }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username ILIKE $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            pfp,
            is_admin)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, pfp, is_admin AS "isAdmin"`,
        [
          username,
          hashedPassword,
          firstName,
          lastName,
          email,
          pfp,
          isAdmin,
        ],
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username, first_name, last_name, email, is_admin }, ...]
   **/

  static async findAll() {
    const result = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  pfp,
                  is_admin AS "isAdmin"
           FROM users
           ORDER BY username`,
    );

    return result.rows;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  pfp,
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email, isAdmin }
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          firstName: "first_name",
          lastName: "last_name",
          isAdmin: "is_admin",
        });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                pfp,
                                is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
          `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
        [username]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  static async getFavorites(username) {
    const favorites = await db.query(
      `SELECT f.token_id
       FROM favorites f 
       FULL JOIN users u 
       ON f.user_id = u.id
       WHERE u.username LIKE $1`,
       [username]
    )

    // Create array of token ID values instead of array of objects
    // [1] instead of [{token_id: 1}]
    const modifiedFavorites = favorites.rows.map(fav => fav.token_id)

    return modifiedFavorites
  }

  static async addFavorite(username, id) {
    const userQuery = await db.query(
      `SELECT id
       FROM users
       WHERE username = $1`, 
      [username])

    const duplicateCheck = await db.query(
      `SELECT token_id
       FROM favorites
       WHERE token_id = $1
       AND user_id = $2`,
    [id, userQuery.rows[0].id],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Already favorited: ${id}`);
    }

    const favorites = await db.query(
      `INSERT INTO favorites (token_id, user_id)
       VALUES ($1, $2)
       RETURNING token_id`,
       [id, userQuery.rows[0].id]
    )

    return favorites.rows[0]
  }

  static async removeFavorite(username, id) {
    const userQuery = await db.query(
      `SELECT id
       FROM users
       WHERE username = $1`, 
      [username])

    const favorites = await db.query(
      `DELETE 
       FROM favorites
       WHERE token_id = $1
       AND user_id = $2
       RETURNING token_id`,
       [id, userQuery.rows[0].id]
    )

    return favorites.rows[0]
  }

  static async getBuys(username) {
    const userQuery = await db.query(
      `SELECT id
       FROM users
       WHERE username = $1`, 
      [username])

    const buys = await db.query(
      `SELECT *
       FROM buy_orders
       WHERE user_id = $1`,
      [userQuery.rows[0].id]
    ) 

    return buys.rows

  }

  static async getSells(username) {
    const userQuery = await db.query(
      `SELECT id
       FROM users
       WHERE username = $1`, 
      [username])

    const sells = await db.query(
      `SELECT *
       FROM sell_orders
       WHERE user_id = $1`,
      [userQuery.rows[0].id]
    ) 

    return sells.rows
  }

  static async addBuy(username, assetID, asset, quantity, price) {
    const userQuery = await db.query(
      `SELECT id
       FROM users
       WHERE username = $1`, 
      [username])

    const buyOrder = await db.query(
      `INSERT INTO buy_orders (user_id, token_id, token_name, quantity, price)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING user_id, token_id, token_name, quantity, price`,
       [userQuery.rows[0].id, assetID, asset, quantity, price]
    )

    return buyOrder.rows
  }

  static async addSell(username, assetID, asset, quantity, price) {
    const userQuery = await db.query(
      `SELECT id
       FROM users
       WHERE username = $1`, 
      [username])

    const sellOrder = await db.query(
      `INSERT INTO sell_orders (user_id, token_id, token_name, quantity, price)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING user_id, token_id, token_name, quantity, price`,
       [userQuery.rows[0].id, assetID, asset, quantity, price]
    )

    return sellOrder.rows
  }
}

module.exports = User;

