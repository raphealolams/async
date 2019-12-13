const ASQ = require('asynquence');
function fakeAjax(url, cb) {
    let fakeResponse = {
        'file1': 'file One First',
        'file2': 'file two second',
        'file3': 'file three third'
    }

    const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 10

    console.log('requesting ' + url)


    setTimeout(function() {
        cb(fakeResponse[url])
    }, randomDelay)
}

function output(text) {
    console.log(text)
}

function getFile(file) {
    return ASQ(function(done) {
        fakeAjax(file, done)
    })
}


getFile('file1')
.val(output)
.seq(getFile('file2'))
.val(output)
.seq(getFile('file3'))
.val(output)
.val(function() {
    output('Complete!')
})