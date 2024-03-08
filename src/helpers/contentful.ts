const contentful = require("contentful");

export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, //
});

// const contentful = require('contentful')

// const client = contentful.createClient({
//   space: 'i2foq9m1bsfn',
//   environment: 'master', // defaults to 'master' if not set
//   accessToken: 'Z0Kf9U7fciUPK6q3ffrq-2Dlt9-oSbFNDUWGjeTVU1M'
// })

// client.getEntry('6SH0qVaxvUbLsjaLLKuyr')
//   .then((entry) => console.log(entry))
//   .catch(console.error)
