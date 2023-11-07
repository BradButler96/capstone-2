"use strict";

const express = require("express");
const Crypto = require("../models/crypto");
const router = express.Router();

router.get('/browse', async (req, res, next) => {
  try {
    let tokenIDs = await Crypto.getIDsByRank(req.query.start, req.query.limit, req.query.sort)
    const tokenQuotes = await Crypto.getQuotesByID(tokenIDs)
    tokenIDs = tokenIDs.split(',');
    const tokens = []
    tokenIDs.map(i => tokens.push(tokenQuotes.data[i])) 

    
    // **************************************************
    // **************************************************
    // **************************************************
    // Write function to sort by cmc_rank
    // **************************************************
    // **************************************************
    // **************************************************




    // let tokenIDs = await Crypto.getIDsByRank(req.query.start, req.query.limit, req.query.sort)
    // const tokenInfo = await Crypto.getInfoByID(tokenIDs)
    // tokenIDs = tokenIDs.split(',');
    // const tokens = []
    // tokenIDs.map(i => tokens.push(tokenInfo.data[i]))    

    return res.json({ tokens })

  } catch (err) {
    return next(err);
  }
});

// router.get('/:id', async (req, res, next) => {
//     try {
//       let tokenIDs = await Crypto.getIDsByRank(req.query.start, req.query.limit, req.query.sort)
//       const tokenInfo = await Crypto.getInfoByID(tokenIDs)
//       tokenIDs = tokenIDs.split(',');
//       const tokens = []
//       tokenIDs.map(i => tokens.push(tokenInfo.data[i]))    
  
//       return res.json({ tokens })
  
//     } catch (err) {
//       return next(err);
//     }
// })



module.exports = router;
