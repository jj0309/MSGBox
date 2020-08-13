window.addEventListener('load',()=>{
    var socket = io();
    const roomName = window.location.pathname.split('/');
    socket.emit('subscribe',roomName[2]);
    document.querySelector('#messageForm').addEventListener('submit',(event)=>{
        event.preventDefault(); // no reload
        socket.emit('send message',document.querySelector('.textBox').value);
        document.querySelector('.textBox').value='';
        return false;
    });
    socket.on('return message',data=>{ document.querySelector('.MessageBox').appendChild(newMessage(data));
    })
})

const newMessage=(data)=>{
    let newNode = document.createElement('div');
    newNode.innerHTML = data.surname+': '+data.sentMSG;
    return newNode;
}