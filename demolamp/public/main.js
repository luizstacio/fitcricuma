'use strict';
(function() {
  var socket = io(),
      ativo = false,
      $lamapada = document.getElementsByClassName('lampada')[0];
  

  function submit () {
    socket.emit('ch1');
  }

  $lamapada.addEventListener('click', submit);

  socket.on('ch1', function(data){
    ativo = data.ativo;
    if ( ativo ) {
      $lamapada.classList.add('ativo');
    } else {
      $lamapada.classList.remove('ativo');
    }

    console.log(ativo);
  });
}());