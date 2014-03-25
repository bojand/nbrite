var https = require('https');
var Q = require('q');
var qs = require('querystring');
var builder = require('./build');
var resources = require('./schema').definitions;

var noop = function () {};

var Nbrite = function (access_token) {
  this.hostname = 'www.eventbriteapi.com';
  this.endpoint = '/v3';

  if (access_token) {
    this.auth = 'Bearer ' + access_token;
  }
};

Nbrite.prototype.request = function (method, resource, params, fn) {
  var deferred = Q.defer();

  if (typeof params === 'function' && !fn) {
    fn = params;
    params = {};
  }

  if (!fn) fn = noop;

  var path = ''.concat(this.endpoint, resource, '/');

  var headers = {};
  var data = qs.stringify(params);

  if (this.auth) {
    headers['Authorization'] = this.auth;
  }

  if (method === 'GET' || method === 'DELETE') {
    if (data) path = path.concat('?', data);
  }
  else if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    headers['Content-type'] = 'application/x-www-form-urlencoded';
  }

  headers['Content-length'] = data.length || 0;

  var opts = {
    hostname: this.hostname,
    path: path,
    method: method,
    headers: headers,
    agent: false
  };

  var req = https.request(opts, function (res) {
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
        deferred.reject(error);
      }
      else {
        deferred.resolve(body);
      }

      return fn(error, body);
    });
  });

  req.on('error', function (e) {
    deferred.reject(e);
    return fn(e);
  });

  // write request data if needed
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    req.write(data);
  }

  req.end();

  return deferred.promise;
};

Nbrite.prototype.post = function (path, params, fn) {
  return this.request('POST', path, params, fn);
};

Nbrite.prototype.get = function (path, params, fn) {
  return this.request('GET', path, params, fn);
};

Nbrite.prototype.delete = function (path, params, fn) {
  return this.request('DELETE', path, params, fn);
};

Nbrite.prototype.put = function (path, params, fn) {
  return this.request('PUT', path, params, fn);
};

Nbrite.prototype.patch = function (path, params, fn) {
  return this.request('PATCH', path, params, fn);
};

builder.build(Nbrite, resources);

module.exports = Nbrite;