 var Text= "" ;
 var Number= "" ;
 var Email= "" ;
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('SendMessage').setAttribute('onclick','Act_1_2_16()');
});
function Act_1_2_16(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value.toLowerCase() == "1"){
		Text = InputMessage.value;
		 Act_2_3_15();
	 }else{
		 Act_1_2_25();
	 }
}
window.onload = function(){
	 Start(); 
}
function Start(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'fwq';
	 ButtonBlock.append(ButtonOnChat)
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_2_3_15(); DeleteButton();')
}
function Act_1_2_25(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value.toLowerCase().indexOf("привет") + 1 > 0 && InputMessage.value.toLowerCase().indexOf("июль") + 1 > 0 ){
		Text = InputMessage.value;
		 Act_3_6_24();
	 }else{
	 }
}
function Act_2_3_15(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "ваш текст " + Text + "";
	 SendBotMessage("ваш текст " + Text + "");
	 LowerDown();
}
function Act_2_5_19(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "ауц";
	 SendBotMessage("ауц");
	 LowerDown();
}
function Act_3_6_24(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Текст про июль: " + Text + "";
	 SendBotMessage("Текст про июль: " + Text + "");
	 LowerDown();
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
	 LowerDown(); 
}