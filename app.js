navigator.getUserMedia = navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia;


function bindEvent(peer) {
    peer.on('error', function (err) {
        console.log('error', err);
    })

    peer.on('signal', function (data) {
        document.querySelector('#offer').textContent = JSON.stringify(data)
    })
    peer.on('stream', function (stream) {
        let video = document.querySelector('#recepcionVid');
        video.srcObject  = stream;
        video.play();
    })


    document.querySelector('#incoming').addEventListener('submit', function (e) {
        e.preventDefault();      
        peer.signal(JSON.parse(e.target.querySelector('textarea').value));
        
    })

}


function startPeer(initiator) {
    
    navigator.getUserMedia({
        video: true,
        audio: true
    }, function (stream) {
            let peer = new SimplePeer({
                initiator: initiator,
                stream: stream,
                trickle: false
            })
            bindEvent(peer);
            let emisor = document.querySelector('#emisorVid');
            emisor.srcObject  = stream;
            emisor.play();
    }, function(){}) 
}

$('#start').click(function (e) {
    startPeer(true);
});
$('#recibir').click(function (e) {
    startPeer(false);
});






// if (peer == null) {
//     peer = new SimplePeer({
//        initiator: false,
//        trickle: false
//     })
//     bindEvent(peer);
// }