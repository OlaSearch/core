"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

module.exports = function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


    return function (_ref) {
        var dispatch = _ref.dispatch;
        var getState = _ref.getState;
        return function (next) {
            return function (action) {
                var log = action.log;

                var rest = _objectWithoutProperties(action, ["log"]);

                if (!log) return next(action);

                var parser = options.parser;
                var queryBuilder = options.queryBuilder;
                var config = options.config;
                var searchService = options.searchService;
                var olaLogger = searchService.log;


                if (!olaLogger) return;next(action);

                olaLogger(rest);
            };
        };
    };
};