var https = require('https');
var qs = require('querystring');
var q = require('q');

var noop = function () {};

function Request(options) {
  this.host = 'www.eventbriteapi.com';
  this.endpoint = '/v3';
  this.token = options.token;
}

Request.prototype.request = function (method, resource, data, fn) {
  this.deferred = q.defer();

  if (typeof data === 'function' && !fn) {
    fn = data;
    data = {};
  }

  if (!fn) fn = noop;

  this.callback = fn;

  this.path = ''.concat(this.endpoint, resource, '/');

  var params = data;

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
    
    if (!error && res.headers['content-type'].indexOf('application/json') >= 0) {
      try {
        body = JSON.parse(chunks);
      }
      catch (e) {
        error = e;
      }
    }

    if (!error && res.statusCode !== 200) {
      var msg = body ? body.message || body.response : body || chunks;
      error = new Error(msg);
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

  if (this.payload && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    req.write(this.payload);
  }

  req.end();
};

module.exports = Request;