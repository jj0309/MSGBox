window.addEventListener('load',()=>{
    var socket = io();
    const roomName = window.location.pathname.split('/');
    socket.emit('subscribe',roomName[2]);
    document.querySelector('#messageForm').addEventListener('submit',(event)=>{
        event.preventDefault(); // no reload
        socket.emit('send message',document.querySelector('#sendMSGBox').value);
        document.querySelector('#sendMSGBox').value='';
        return false;
    });
    let scrollable = document.querySelector(".MessageBox");
    scrollable.scrollTop = scrollable.scrollHeight - scrollable.clientHeight;
    socket.on('return message',data=>{ 
        document.querySelector('.MessageBox').appendChild(newMessage(data));
        scrollable.scrollTop = scrollable.scrollHeight - scrollable.clientHeight;
    })
})

const newMessage=(data)=>{
    let templateHtml = document.querySelector('#MSGTemplate').innerHTML;
    let newNode = document.createElement('div');
    newNode.innerHTML = templateHtml;
    newNode.querySelector('.TextUserName').innerHTML = data.surname;
    newNode.querySelector('.MessageValue').innerHTML = data.sentMSG;
    return newNode;
}