module.exports = {
  "extends": [
    "airbnb-base",
  ],
  "plugins": [
    "import",
  ],
  "env": {
    "browser": true,
    "node": true,
  },
  "rules": {
    //added to prevent unexpected console statement error
    'no-console':'off',
  },
  "settings": {
    "import/resolver": "webpack",
  }
};