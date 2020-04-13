 var Text= "" ;
 var Number= "" ;
 var Email= "" ;
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('SendMessage').setAttribute('onclick','Act_1_2_9()');
});
function Act_1_2_9(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value >=  1 && InputMessage.value  <= 5){
		 Act_2_3_10();
	 }else{
		 Act_1_2_13();
	 }
}
function Act_1_2_13(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value >=  6 && InputMessage.value  <= 7){
		Text = InputMessage.value;
		 Act_2_4_12();
	 }else{
		 Act_1_2_18();
	 }
}
function Act_1_2_18(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value == 11){
		Text = InputMessage.value;
	 }else{
		 Act_1_2_25();
	 }
}
function Act_1_2_25(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value != "" && !isNaN(InputMessage.value)){
		Text = InputMessage.value;
		 Act_4_9_24();
	 }else{
	 }
}
function Act_2_3_10(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "куц";
	 SendBotMessage("куц");
	 LowerDown();
	 let SendMessage = document.getElementById('SendMessage')
	 SendMessage.setAttribute('onclick','Act_2_3_22();')
}
function Act_2_3_22(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value.indexOf('@') + 1 > 0 && InputMessage.value.indexOf('.') + 1 > 0 && InputMessage.value.indexOf('@') < InputMessage.value.indexOf('.')){
		Text = InputMessage.value;
		 Act_4_9_24();
	 }else{
	 }
}
function Act_2_4_12(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "екц " + Text + "";
	 SendBotMessage("екц " + Text + "");
	 LowerDown();
}
function Act_2_6_21(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "такой вот текст " + Text + "";
	 SendBotMessage("такой вот текст " + Text + "");
	 LowerDown();
}
function Act_3_5_19(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "число " + Text + "";
	 SendBotMessage("число " + Text + "");
	 LowerDown();
	 let SendMessage = document.getElementById('SendMessage')
	 SendMessage.setAttribute('onclick','Act_3_5_20();')
}
function Act_3_5_20(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value != ""){
		Text = InputMessage.value;
		 Act_2_6_21();
	 }else{
	 }
}
function Act_4_9_24(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Ваш email " + Text + "";
	 SendBotMessage("Ваш email " + Text + "");
	 LowerDown();
}
 function DeleteButton(){
	 let Buttons = document.getElementsByClassName("ButtonOnChat");
	 for(let i = 0; i < Buttons.length; i++){
		 Buttons[i].remove();
	}
}