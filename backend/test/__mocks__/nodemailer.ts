// use mock for nodemailer
import nodemailer from 'nodemailer'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailermock = require('nodemailer-mock').getMockFor(nodemailer)
module.exports = nodemailermock
