function _respond(res, next, status, data, http_code) {
	var response = {
		'status': status,
		'data': data
	};
	res.setHeader('content-type', 'application/json');
	res.writeHead(http_code);
	res.end(JSON.stringify(response));
}

module.exports.success = function (res, next, data) {
	_respond(res, next, 'success', data, 200);
}

module.exports.failure = function(res, next, data, http_code) {
	_respond(res, next, 'failure', data, http_code);
}

//HOW TO USE logger -- helper.logger('info', message)
//operations = get, post, put or delete
module.exports.logger = function(operations, loglevel, message) {
	const log4js = require('./log4js');
	const configurationlog4js = require('./configurationlog4js.json');
	log4js.configure(
		configurationlog4js
	);
 
	const logger = log4js.getLogger();
	if(loglevel ==='info')
	{
	    logger.info(operations + " : " + message);   
	}
	else if(loglevel ==='error')
	{
	    logger.error(operations + " : " + message);  
	}
}

