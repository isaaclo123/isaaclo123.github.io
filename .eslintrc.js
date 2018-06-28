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
    // problem with @ alias
    'import/no-unresolved':'off',
    // don't require extensions when importing
    'import/extensions': 'off',
    //added to prevent unexpected console statement error
    'no-console':'off',
  },
  "settings": {
    "import/resolver": "webpack",
  }
};
