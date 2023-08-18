#!/usr/bin/env node

const kvconsole = require("@llllvvuu/kvconsole").kvconsole

kvconsole
  .log(`random value ${Math.ceil(Math.random() * 5)}`, Math.random())
  .then(_ => process.exit(0))
