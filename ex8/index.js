const ASQ = require('asynquence');

$(document).ready(function() {
    let $btn = $('#btn'),
        $list = $('#list'),
        clicks = ASQ.react.of(),
        msgs = ASQ.react.of(),
        latest;

    $btn.click(function(event) {
        latest = event
        clicks.push(event)
    })

    setInterval(function() {
        if (latest) {
            msgs.push('Clicked!')
            latest = null
        }
    }, 1000)

    clicks.val(function(event) {
        latest = event
    })

    msgs.val(function(msg) {
        $list.append( $('<div>' + msg + '</div>'))
    })
})

