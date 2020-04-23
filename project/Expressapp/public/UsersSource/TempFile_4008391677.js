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