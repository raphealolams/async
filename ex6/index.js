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
    return new Promise(function executor (resolve) {
        fakeAjax(file, resolve)
    })
}

/**
 * Request all files at once in 'parallel' via `getFile(...)`
 * Render as each one finish but only once previous rendering is done
 */


ASQ()
    .seq(
        ...(
            ['file1', 'file2', 'file3']
            .map(getFile)
            .map(function(sq) {
                return function() {
                    return sq.val(output)
                }
            })
        )
    )
    .val(function() {
        output('Complete!')
    })