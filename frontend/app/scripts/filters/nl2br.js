'use strict';

/**
 * @ngdoc filter
 * @name frontendApp.filter:nl2br
 * @function
 * @description
 * # nl2br
 * Filter in the frontendApp.
 */
angular.module('frontendApp')
.filter('nl2br', ['$sanitize', function($sanitize) {
	var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
	return function(msg) {
		// ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
		msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
		return $sanitize(msg);
	};
}]);