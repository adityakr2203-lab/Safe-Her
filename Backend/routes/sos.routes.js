const express = require("express");

const router = express.Router();

const { sendSOS } = require("../controllers/sos.controller");

router.post("/send", sendSOS);

module.exports = router;