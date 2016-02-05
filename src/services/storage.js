module.exports = {
	get: function(key){

		if(window.localStorage.getItem(key)){
			return JSON.parse(localStorage.getItem(key))
		}

		return false;
	},
	set: function(key, value){

		window.localStorage.setItem(key, JSON.stringify(value))
	}
}