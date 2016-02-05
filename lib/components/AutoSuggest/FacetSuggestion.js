"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FacetSuggestion = function FacetSuggestion(props) {
    var facets = props.facets;
    var query = props.query;
    var name = props.name;
    var addFacet = props.addFacet;
    var dispatch = props.dispatch;
    var onSubmit = props.onSubmit;
    var limit = props.limit;
    var suggestedTerm = props.suggestedTerm;

    if (suggestedTerm) return _react2.default.createElement("noscript", null);

    var facet = facets.filter(function (item) {
        return item.name == name;
    });
    var values = [].concat.apply([], facet.map(function (item) {
        return item.values;
    })).splice(0, limit);

    var q = query.q;

    return _react2.default.createElement(
        "div",
        { className: "ola-facet-suggestions" },
        values.map(function (value, idx) {

            return _react2.default.createElement(
                "div",
                {
                    className: "ola-facet-suggestion",
                    key: idx,
                    onClick: function onClick() {

                        dispatch(addFacet(facet[0], value.name));

                        /* Prevent race condition */

                        setTimeout(function () {
                            onSubmit && onSubmit();
                        }, 0);
                    }
                },
                _react2.default.createElement(
                    "strong",
                    null,
                    q
                ),
                " in ",
                value.name
            );
        })
    );
};

FacetSuggestion.defaultProps = {
    limit: 3
};

module.exports = FacetSuggestion;