 var Text= "" ;
 var Number= "" ;
 var Email= "" ;
window.onload = function(){
	 Start(); 
}
function Start(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "fwq";
	 SendBotMessage("fwq");
	 LowerDown();
	 DeleteButton();
	 Act_1_2_5();
}
function Act_1_2_5(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "<img src='http://localhost:3000/uploads/567fde06dfc57c6e7a89147d19f435b1' class='ImageBot' id = 'Image 1 2 5' onclick = 'ClickImage(id)' width = '200px'>"
	 SendBotMessage(" Вывод изобржаения:http://localhost:3000/uploads/567fde06dfc57c6e7a89147d19f435b1");
	 DeleteButton();
	 LowerDown();
	 let SendMessage = document.getElementById('SendMessage')
	 SendMessage.setAttribute('onclick','Act_1_2_2(); InputMessage.value = "" ; ')
}
 function Act_1_2_2(){
		 Act_2_3_6(); 
 }
function Act_2_3_6(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "fqw";
	 SendBotMessage("fqw");
	 LowerDown();
	 DeleteButton();
	 Act_2_3_7();
}
function Act_2_3_7(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'fqw';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_3_4_10(); DeleteButton();')
	 Act_2_3_8();
}
function Act_2_3_8(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'fwqf';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_3_5_12(); DeleteButton();')
}
function Act_3_4_10(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "gegew";
	 SendBotMessage("gegew");
	 LowerDown();
	 DeleteButton();
}
function Act_3_5_12(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "rwqrwq";
	 SendBotMessage("rwqrwq");
	 LowerDown();
	 DeleteButton();
}
 function DeleteButton(){
	 let Buttons = document.getElementsByClassName("ButtonOnChat");
	 let btn = new Array();
	 for(let i = 0; i < Buttons.length; i++){
		 btn.push(Buttons[i]);
	 }
	 for(let i = 0; i < btn.length; i++){
		 btn[i].remove();
	}
}
 function GenerateOutMessage(Message){
	 let MessageUser = document.createElement('div');
	 let OutgoingMessage = document.createElement('div');//содержимое блока сообщения
	 let InputMessage = document.getElementById('InputMessage');//Поле ввода сообщения на форме
	 let ChatForm = document.getElementById('ChatForm'); //блок с чатом
	 let SendMessage = document.getElementById('SendMessage');
	 MessageUser.className = 'MessageUser';
	 OutgoingMessage.className = 'OutgoingMessage';
	 ChatForm.append(MessageUser);
	 MessageUser.append(OutgoingMessage);
	 OutgoingMessage.innerHTML = Message;
	 InputMessage.value = "";
	 LowerDown(); 
}
 async function  SendMessageOnServer(Message,Source){//отправка сообщений на сервер
	 let url = 'http://localhost:3000/publish';
	 let ProjectName = document.getElementById('FrameChatBot').getAttribute('ProjectName');
	 let err = document.getElementById('LabelErrorChatBot');
	 let mess = {
	   message : Message,
	   source : Source,
	   project : ProjectName
	 }; 
	 if(!err.hasAttribute('hidden')){
	   err.setAttribute('hidden','hidden');
	   err.innerHTML = "";
	 }; 
	 let response = await fetch(url, { 
	   method: 'POST',
	   headers: {
	       'Content-Type': 'application/json;charset=utf-8'
	    },
	    body: JSON.stringify(mess) 
	 }); 
	 if (response.ok) { // если HTTP-статус в диапазоне 200-299 
	   } else {
	   if(err.hasAttribute('hidden')){
	       err.removeAttribute('hidden');
	    }
	    err.innerHTML = "Ошибка! сообщение не отправлена на сервер";
	 }; 
}
 function OpenChatBot(){
	 let FormChatBot = document.getElementById('FormChatBot');
	 let DivImgCloseBot = document.getElementById('DivImgCloseBot');
	 if(FormChatBot.hasAttribute('hidden')){
	       FormChatBot.removeAttribute('hidden');
	       DivImgCloseBot.removeAttribute('hidden')
	 }
}
 function CloseChatBot(){
	 let FormChatBot = document.getElementById('FormChatBot');
	 let DivImgCloseBot = document.getElementById('DivImgCloseBot');
	 FormChatBot.setAttribute('hidden','hidden');
	 DivImgCloseBot.setAttribute('hidden','hidden');
}
 function LowerDown(){
	 document.getElementById('ChatForm').scrollTop = document.getElementById('ChatForm').scrollHeight;
}