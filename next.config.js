const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  i18n,
});
