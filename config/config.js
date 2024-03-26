const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.DATABASE_URL)
module.exports = {
    development: {
        use_environment_url: true,
        url: process.env.DATABASE_URL,
    },
    production: {
      use_environment_url: true,
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
      dialectOptions:{
        
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        
      }
    },
    staging: {
      use_environment_url: true,
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
      dialectOptions:{
        
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        
      }
    },
    test: {},
};