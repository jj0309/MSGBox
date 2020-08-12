window.addEventListener('load',()=>{
    var socket = io();

    socket.emit('join','room');

    document.querySelector('#messageForm').addEventListener('submit',(event)=>{
        event.preventDefault(); // no reload
        socket.emit('send message',document.querySelector('.textBox').value);
        document.querySelector('.textBox').value='';
        return false;
    });
    socket.on('return message',(receivedMessage)=>{
        document.querySelector('.MessageBox').appendChild(newMessage(receivedMessage));
    })
})

const newMessage=(message)=>{
    let newNode = document.createElement('div');
    newNode.innerHTML = message;
    return newNode;
}