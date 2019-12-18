const ASQ = require('asynquence');
function fakeAjax(url, cb) {
    let fakeResponse = {
        'file1': 'file One First',
        'file2': 'file two second',
        'file3': 'file three third'
    };

    const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 10;

    console.log('requesting ' + url);


    setTimeout(function() {
        cb(fakeResponse[url]);
    }, randomDelay);
}

function output(text) {
    console.log(text);
}

function getFile(file) {
    return ASQ(function(done) {
        fakeAjax(file, done);
    });
}

/**
 * Request all files at once in 'parallel' via `getFile(...)`
 * Render as each one finish but only once previous rendering is done
 */

ASQ().runner(function *main (){
    let p1 = getFile('file1');
    let p2 = getFile('file2');
    let p3 = getFile('file3');

    output(yield p1);
    output(yield p2);
    output(yield p3);
    output('Complete!');
});


