var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
webdriverio
    .remote(options)
    .init()
    .url('https://openweathermap.org/')
    .getTitle().then(function(title) {
        console.log('Title was: ' + title);
    })
    .end();
//--->>> tests at  :  ./test/specs/**/*.js
//--->>> errors at : ./errorShots/
