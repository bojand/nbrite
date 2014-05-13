var Request = require('./request');
var builder = require('./build');
var resources = require('./schema').definitions;

var Nbrite = function (options) {
  this.options = options;
};

Nbrite.prototype.request = function (method, resource, params, fn) {
  var req = new Request(this.options);
  return req.request(method, resource, params, fn);
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