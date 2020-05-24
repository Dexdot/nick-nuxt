const contentful = require('contentful');
const keys = require('./keys.js');

// Get keys
const space = keys.SPACE_ID;
const accessToken = keys.ACCESS_TOKEN;

// Client instance
const client = contentful.createClient({ accessToken, space });

export default client;
