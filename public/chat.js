const form=document.querySelector('#chat-form');
const chat=document.querySelector('.chat-messages');
const type=document.querySelector('#typing');
const msg=document.querySelector('#msg');
const btn=document.querySelector('.btn');
/*-----------------------------*/

const user=prompt("Whats your name::")||"Anonymous";


const socket = io();
socket.on('message', (data)=>{
    console.log(data);
    const div = document.createElement('div');
  div.classList.add('message');
 div.innerHTML=`<p class="text">
 ${data}
</p>`
 
  
  document.querySelector('.chat-messages').appendChild(div)
  
chat.scrollTop = chat.scrollHeight;

})


socket.on('messages', (data)=>{
    console.log(data);
    chats(data);
chat.scrollTop = chat.scrollHeight;

})


form.addEventListener('submit',(e)=>{
    e.preventDefault();
   const data={message:msg.value,name:user}
   console.log(data);
  socket.emit('chatmessage',data);
  msg.value='';



} )


msg.addEventListener('keypress',()=>{
  socket.emit('keydown',"typing.......");
})

socket.on('type',(data)=>{
  type.innerHTML=data;
 
})
msg.addEventListener('keypress',(e)=>{
  if(e.keyCode === 13){
    socket.emit('keydown',"-----");
    socket.on('type',(data)=>{
      type.innerHTML=data;
    })

  }
  })

function chats(message){
 
 const div = document.createElement('div');
  div.classList.add('message');
 div.innerHTML=`<p class='meta'>${message.name}</p><p class="text">
 ${message.message}
</p>`
 
  
  document.querySelector('.chat-messages').appendChild(div);
}





