if (process.env.ENVIROMENT === 'production'){
  // If set as production on Heroku
  module.exports = require('./prod');
}else if (process.env.ENVIROMENT === 'staging'){
  // If set as staging on Heroku
  module.exports = require('./staging');
}else{
  // If set local
  module.exports = require('./dev');
};
