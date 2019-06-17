/*
    ROUTEMAP.JS
    - sets the available endpoints that the app could offer
*/

module.exports = function (app) {

    app.use('/', require('./routes/index'));

    var map = function (url, routeFile) {
        url = '/'+url
        routeFile = routeFile || url;
        // console.log(routeFile)
        app.use(url, require('./routes/' + routeFile));
    };

    map('admin');
    map('websites');
    map('articles');
    map('filters');
    // map('domains');
    // map('stash-articles', 'stashArticles');
    // map('logs');
    // map('db_pedia');
    // map('nlp');
    // map('login');
    // map('logout');
    // map('admin-logs', 'adminLogs');
    // map('media-meter', 'mediaMeter'); //call after login
    // map('reader');
    // map('users');
    // map('versions', 'versions');
    // map('issues');
    // map('api');
    // map('access');
    // map('mmi', 'mediaWebRaw'); 
    // map('maintenance');
    // map('social-media', 'socialMedia');
    // map('download');
    // map('data_collector');
    // map('metawhale');
    // map('mmi2');
};