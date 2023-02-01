/* eslint-disable no-undef */
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n
}

const withTM = require('next-transpile-modules')(['@babel/preset-react'])

module.exports = withTM(nextConfig)
