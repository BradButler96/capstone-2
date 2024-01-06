"use strict";

const express = require("express");
const Crypto = require("../models/crypto");
const router = express.Router();

router.get('/browse', async (req, res, next) => {
  try {
    // Get token IDs in order of market cap
    let tokenIDs = await Crypto.getIDsByRank(req.query.start, req.query.limit)
    // Get information using token IDs
    const tokenQuotes = await Crypto.getQuotesByID(tokenIDs)
    // Create array of objects from object returned by API call
    const tokens = Object.keys(tokenQuotes.data).map(key => tokenQuotes.data[key])

    return res.json({ tokens })

  } catch (err) {
    return next(err);
  }
});

router.get('/token', async (req, res, next) => {
  try {
    const token = await Crypto.getTokenInfo(req.query)
    return res.json({ token })

  } catch (err) {
    return next(err);
  }
});

router.get('/token/favorites', async (req, res, next) => {
  try {
    const token = await Crypto.getQuotesByID(req.query.tokenIDs)
    return res.json({ token })

  } catch (err) {
    return next(err);
  }
});

router.get('/categories/list', async (req, res, next) => {
  try {
    const categories = await Crypto.getCats()
    return res.json({ categories })

  } catch (err) {
    return next(err);
  }
});

router.get('/categories', async (req, res, next) => {
  try {
    const category = await Crypto.getCatID(req.query.tokenID)
    return res.json({ category })

  } catch (err) {
    return next(err);
  }
});

router.get('/categories/:catID', async (req, res, next) => {
  try {
    const tokens = await Crypto.getTokensByCat(req.query.catID)
    return res.json({ tokens })

  } catch (err) {
    return next(err);
  }
});




module.exports = router;
