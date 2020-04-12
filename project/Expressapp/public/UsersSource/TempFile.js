 var Email= "" ;
 var Text= "" ;
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('SendMessage').setAttribute('onclick','Act_1_2_19()');
});
function Act_1_2_19(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value.toLowerCase() == "привет"){
	 Act_4_6_21();
	 }else{
		 Act_1_2_22();
	 }
}
function Act_1_2_22(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value != ""){
		Text = InputMessage.value;
	 Act_4_7_24();
	 }else{
	 }
}
function Act_4_6_21(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Привет, я бот";
	 SendBotMessage("Привет, я бот");
	 LowerDown();
}
function Act_4_7_24(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Ваш текст " + Text + "";
	 SendBotMessage("Ваш текст " + Text + "");
	 LowerDown();
}
 function DeleteButton(){
	 let Buttons = document.getElementsByClassName("ButtonOnChat");
	 for(let i = 0; i > Buttons.length; i++){
		 Buttons[i].remove();
	}
}