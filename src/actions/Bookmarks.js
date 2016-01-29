import types from './../constants/ActionTypes';

export function addBookmark(snippet){

	return {
		type: types.ADD_BOOKMARK,
		snippet
	}
}

export function removeBookmark(snippet){

	return {
		type: types.REMOVE_BOOKMARK,
		snippet
	}
}