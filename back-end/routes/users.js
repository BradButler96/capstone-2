"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: admin
 **/

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/

router.get("/", ensureAdmin, async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin }
 *
 * Authorization required: admin or same user-as-:username
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const userInfo = await User.get(req.params.username);
    const favorites = await User.getFavorites(req.params.username);
    const buyOrders = await User.getBuys(req.params.username)
    const sellOrders = await User.getSells(req.params.username)

    const buys = buyOrders.map(buy => {
      return {...buy, type: 'buy'}
    })
    const sells = sellOrders.map(sell => {
      return {...sell, type: 'sell'}
    })

    const user = {
      ...userInfo,
      favorites: favorites,
      buys: buys,
      sells: sells
    }
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { username, firstName, lastName, password, email }
 *
 * Returns { firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);

    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:username/favorites", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    req.body.action === '+' ? (
      await User.addFavorite(req.params.username, req.body.id)
    ) : (
      await User.removeFavorite(req.params.username, req.body.id)
    )

    // Get full list of updated favorites to return
    const favoritesArray = await User.getFavorites(req.params.username);
    // return [] instead of [null] if no favorites
    const favorites = favoritesArray

    return res.json({ favorites });
  } catch (err) {
    return next(err);
  }
});

router.post("/:username/trades", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    if (req.body.orderType === 'buy') {
      await User.addBuy(req.body.username, req.body.assetID, req.body.asset, req.body.quantity, req.body.price);
      const userOrders = await User.getBuys(req.body.username);
      const updatedOrders = userOrders.map(order => {
        return { ...order, type: 'buy'}
      })
      return res.json({ updatedOrders });
      
    } else {
      await User.addSell(req.body.username, req.body.assetID, req.body.asset, req.body.quantity, req.body.price)
      const userOrders = await User.getSells(req.body.username)
      const updatedOrders = userOrders.map(order => {
        return { ...order, type: 'sell'}
      })
      return res.json({ updatedOrders });

    }
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
