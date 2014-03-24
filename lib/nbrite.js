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
    params = null;
  }

  if (!fn) fn = noop;

  var path = ''.concat(this.endpoint, resource, '/');
  var data = '';

  var headers = {};

  if (this.auth) {
    headers['Authorization'] = this.auth;
  }

  if (params) {
    data = qs.stringify(params);

    if (data && method === 'GET') {
      path = path.concat('?', data);
    }
    else if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      headers['Content-Length'] = data.length;
    }
  }

  var opts = {
    hostname: this.hostname,
    path: path,
    method: method,
    headers: headers
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

      try {
        body = JSON.parse(chunks);
      }
      catch (e) {
        error = e;
      }

      if (!error && res.statusCode !== 200) {
        error = body;
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
  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
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