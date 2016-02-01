"use strict";

module.exports = {
	get: function get(key) {

		if (localStorage.getItem(key)) {
			return JSON.parse(localStorage.getItem(key));
		}

		return false;
	},
	set: function set(key, value) {

		localStorage.setItem(key, JSON.stringify(value));
	}
};