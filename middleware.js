module.exports = {
  ensureAuthenticated:	function(ctx,next) {
	 if (ctx.isAuthenticated()) {
	    return next();
	 }
	 ctx.redirect('/');
	 }
}