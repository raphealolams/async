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
    let text, fn;

    fakeAjax(file, function(response) {
        if (fn) fn(response)
        else text = response
    })

    return function(cb) {
        if (text) cb(text)
        else fn = cb
    }
}

let th1 = getFile('file1')
let th2 = getFile('file2')
let th3 = getFile('file3')


th1(function(text1) {
    output(text1)
    th2(function(text2) {
        output(text2)
        th3(function(text3){
            output(text3)
            output('Complete!')
        })
    })
})