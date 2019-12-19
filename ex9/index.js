const ASQ = require('asynquence');

$(document).ready(function() {
    let $btn = $('#btn'),
        $list = $('#list'),
        clicks = ASQ.react.chan(),
        msgs = ASQ.react.chan(),
        queuedClick;

    $btn.click(listenToClicks);

    ASQ().runner(
        ASQ.csp.go(sampleClicks),
        ASQ.csp.go(logClick)
    );

    function listenToClicks(event) {
        if (!queuedClick) {
            queuedClick = ASQ.csp.putAsync(clicks, event);
            queuedClick.then(function(){
                queuedClick = null
            });
        }
    }

    // sample clicks channel
    function *sampleClicks() {
        while (true) {
            yield ASQ.csp.take(
                ASQ.csp.timeout(1000)
            );

            yield ASQ.csp.take(clicks)
            yield ASQ.csp.put(msgs, 'clicked!')
        }
    }

    // subscribe to sampled message channel
    function *logClick() {
        while (true) {
            let msg = yield ASQ.csp.take(msgs)
            $list.append( $('<div>' + msg + '</div>'))
        }
    }
})

