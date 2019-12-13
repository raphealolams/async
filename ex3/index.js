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

let p1 = getFile('file1')
let p2 = getFile('file2')
let p3 = getFile('file3')


p1.then(output)
.then(function() {
    return p2
})
.then(output)
.then(function(){
    return p3
})
.then(output)
.then(function() {
    output('Complete!')
})