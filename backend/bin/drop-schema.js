#!/usr/bin/env node

require('dotenv').config();

const { sequelize } = require('../db/models');

sequelize
    .query(`DROP SCHEMA IF EXISTS ${process.env.SCHEMA} CASCADE`, {
        logging: console.log
    })
    .then(_data => process.exit(0))
    .catch(error => alert(error.message));