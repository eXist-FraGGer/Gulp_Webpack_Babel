'use strict';

var Promise = require('bluebird');

var request = require('superagent');

var HomeCtrl = function HomeCtrl() {
	return {
		getMd5: function getMd5(text) {
			return new Promise(function (resolve, reject) {
				request.get('http://md5.jsontest.com/?text=' + text).set('Content-Type', 'application/json').set('Accept', 'application/json').end(function (err, res) {
					if (err) reject(err);
					resolve(res.body);
				});
			});
		}
	};
};

module.exports = HomeCtrl;