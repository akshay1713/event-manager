module.exports = {
  ensureAuthenticated:	function(ctx,next) {
	 if (ctx.isAuthenticated()) {
	    return next();
	 }
	 console.log("unauthenticated user, redirecting to home page");
	 ctx.redirect('/');
	 }
}