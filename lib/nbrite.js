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

Nbrite.prototype.formatDate = function (date) {
  var d = date;
  if (typeof date === 'string') {
    d = new Date(date);
  }

  if (d instanceof Date) {
    var dateStr = d.toISOString();
    dateStr = dateStr.slice(0, dateStr.lastIndexOf('.'));
    return dateStr.concat('Z');
  }

  return d.toString();
};

builder.build(Nbrite, resources);

module.exports = Nbrite;