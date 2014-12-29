var https = require('https');
var qs = require('querystring');
var q = require('q');

var debug = require('debug')('nbrite');

var noop = function () {};

/**
 * Request object constructor
 * @param options
 * @constructor
 */
function Request(options) {
  this.host = 'www.eventbriteapi.com';
  this.endpoint = '/v3';
  this.token = options.token;
}

/**
 * Main request function
 * @param method
 * @param resource
 * @param data
 * @param fn
 * @returns {promise|*|promise}
 */
Request.prototype.request = function (method, resource, data, fn) {
  this.deferred = q.defer();

  if (typeof data === 'function' && !fn) {
    fn = data;
    data = {};
  }

  if (!fn) fn = noop;

  this.callback = fn;

  this.path = ''.concat(this.endpoint, resource);

  // For some reason the url has to end with '/'
  if (this.path.charAt(this.path.length - 1) !== '/') {
    this.path = this.path.concat('/');
  }

  var params = this.prepareData(data);

  this.payload = '';

  this.headers = {};

  if (this.token) {
    this.headers['Authorization'] = 'Bearer ' + this.token;
  }

  if (method === 'GET' || method === 'DELETE') {
    this.payload = qs.stringify(params);
    if (this.payload) this.path = this.path.concat('?', this.payload);
  }
  else {
    this.payload = qs.stringify(params);
    this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  this.headers['Content-Length'] = this.payload ? this.payload.length : 0;

  debug('%s %s', method, this.path);

  var opts = {
    hostname: this.host,
    path: this.path,
    method: method,
    headers: this.headers,
    agent: false
  };

  this.performRequest(opts);

  return this.deferred.promise;
};

Request.prototype.prepareData = function (data) {
  var params = {}

  for (var key in data) {
    if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
      params[key] = JSON.stringify(data[key]);
    }
    else {
      params[key] = data[key]
    }
  }

  return params;
};

/**
 * Function to handle the response
 * @param res
 */
Request.prototype.handleResponse = function (res) {
  var self = this;
  var chunks = '';
  var error;

  res.on('data', function (chunk) {
    chunks += chunk;
  });

  res.on('error', function (err) {
    error = err;
  });

  res.on('end', function () {
    var body;

    debug('response status code: %s content type: %s', res.statusCode, res.headers['content-type']);

    if (!error && (res.headers['content-type'].indexOf('application/json') >= 0)) {
      try {
        body = JSON.parse(chunks);
      }
      catch (e) {
        error = e;
      }
    }

    if (!error && res.statusCode >= 400) {
      var msg = body ? body.error_description || body.error : body || chunks;
      error = new Error(msg);
      error.status_code = body ? body.status_code || res.statusCode : res.statusCode;
      if (body && body.error) { error.type = body.error; }
    }

    if (error) {
      self.deferred.reject(error);
    }
    else {
      self.deferred.resolve(body);
    }

    return self.callback(error, body);
  });
};

/**
 * Perform request
 * @param options
 */
Request.prototype.performRequest = function (options) {
  var self = this;
  var method = options.method;

  var req = https.request(options, function (res) {
    return self.handleResponse(res);
  });

  req.on('error', function (e) {
    self.deferred.reject(e);
    return self.callback(e);
  });

  if (this.payload) { debug('payload: %s', this.payload); }

  req.write(this.payload);

  req.end();
};

module.exports = Request;