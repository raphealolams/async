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
    fakeAjax(file, function(text) {
        handleResponse(file, text)
    })
}

let responses = {};

function handleResponse(fileName, contents) {
    if (!(fileName in responses)) {
        responses[fileName] = contents
    }

    let fileNames = ['file1', 'file2', 'file3']

    for (let i = 0; fileNames.length; i++) {
        if (fileNames[i] in responses) {
            if (typeof responses[fileNames[i]] === 'string') {
                output(responses[fileNames[i]])
                responses[fileNames[i]] = false
            }
        }
        else {
            return
        }
    }

    output('Complete!')
}

getFile('file1')
getFile('file2')
getFile('file3')
