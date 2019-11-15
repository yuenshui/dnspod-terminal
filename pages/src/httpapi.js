'use strict';

const fetch = require("node-fetch");
const _ = require("underscore");
const contentType = require("./contentType.json");

var API = {};
/**
 *
 * @param {string} url
 * @param {object} options
 * fetch settings {
 *   method: "POST/GET",
 *   body: "string/stream",
 *   headers: {
 *
 *   }
 * }
 * options.type => options.headers['Content-Type']
 */
API.http = function(url, options = {}) {
  let startTime = new Date().getTime();
  if (!options.type) options.type = 'url';
  if (options.data) {
    if (options.type == 'url') {
      if(_.isObject(options.data)) {
        options.body = Object.keys(options.data).map(key => key + "=" + encodeURIComponent(options.data[key])).join('&');
      } else {
        options.body = options.data;
      }
    } else {
      options.body = JSON.stringify(options.data);
    }
    delete options.data;
  }
  if (options.type) {
    if (!options.headers) options.headers = {};
    options.headers["Content-Type"] = contentType[options.type]
      ? contentType[options.type]
      : options.type;
    delete options.type;
  }
  return new Promise(function(resolve, reject) {
    fetch(url, options)
      .then(res => {
        let endTime = new Date().getTime();
        console.log(url, "used:", endTime - startTime, JSON.stringify(options));
        if (res.ok) {
          let data = {};
          try {
            data = res.json();
          } catch (err) {
            data = res;
          }
          resolve(data);
        } else {
          let out = {
            msg: "http res error:",
            data: res,
            url: url,
            options: options
          };
          reject(out);
        }
      })
      .catch(err => {
        reject({ msg: "http error:", data: err, url: url, options: options });
      });
  });
};

module.exports = API;