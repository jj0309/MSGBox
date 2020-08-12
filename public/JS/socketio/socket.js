window.addEventListener('load',()=>{
    var socket = io();
    document.querySelector('#messageForm').addEventListener('submit',(event)=>{
        event.preventDefault(); // no reload
        console.log('enter')
        socket.emit('chat message',document.querySelector('.textBox').value);
        document.querySelector('.textBox').value='';
        return false;
    });
    socket.on('chat message',(receivedMessage)=>{
        document.querySelector('.MessageBox').appendChild(newMessage(receivedMessage));
    })
})

const newMessage=(message)=>{
    let newNode = document.createElement('div');
    newNode.innerHTML = message;
    return newNode;
}