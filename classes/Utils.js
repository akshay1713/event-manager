const Utils = {

    getPostParams: (ctx,param) => {
        return ctx.request.body[param];
    },

    getUrlParams: (ctx,param) => {
        return ctx.params.param
    },

    getSessionParam: (ctx,param) => {
        return ctx.session.passport.user[param];
    }
};

module.exports = Utils;