module.exports = {
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',  // Also include .mjs if you're using it
  },
  extensionsToTreatAsEsm: ['.jsx', '.js'], // Treat .js/.jsx as ESM files
  globals: {
    'babel-jest': {
      useESM: true,  // Use ES modules for jest
    },
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)',  // Allow axios or other specific packages
  ],
};
