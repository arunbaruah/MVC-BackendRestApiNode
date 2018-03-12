const port = 8080; //in production env, we maintain the post and other info in config
const server = require('./appserver');
const db = require('./models');

server.listen(port, function() {
    db.sequelize.sync();
  });
  
console.log("Listening on port " + port);

