const port = 8080;
const server = require('./appserver');
const db = require('./models');

server.listen(port, function() {
    db.sequelize.sync();
  });
  
console.log("Listening on port " + port);

