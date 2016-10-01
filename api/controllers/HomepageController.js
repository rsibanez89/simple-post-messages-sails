/**
 * HomepageController
 *
 * @description :: Server-side logic for managing homepages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function(req, res, next) {
		console.log("MessageController  was called");
		res.view('homepage');
	}
};
