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
		 Act_2_3_26();
	 }else{
		 Act_1_2_22();
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
	 ButtonOnChat.setAttribute('onclick','SendUserClickOnButton(this.value);Act_2_3_15();')
	 if(ButtonOnChat.hasAttribute('onclick') != null){
		 let AttributeContains = ButtonOnChat.getAttribute('onclick')
		 ButtonOnChat.setAttribute('onclick', AttributeContains + 'document.getElementById("SendMessage").setAttribute("onclick","Act_2_3_26();");');
	 }else{
		 ButtonOnChat.setAttribute('onclick','document.getElementById("SendMessage").setAttribute("onclick","Act_2_3_26();");'); 
	 }
}
function Act_1_2_22(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value.toLowerCase().indexOf("привет") + 1 > 0 && InputMessage.value.toLowerCase().indexOf("июль") + 1 > 0 ){
		Text = InputMessage.value;
		 Act_3_6_24();
	 }else{
		 Act_1_2_2();
	 }
}
 function Act_1_2_2(){
	 let SendMessage = document.getElementById('SendMessage');
	 SendMessage.setAttribute('onclick','Act_2_5_19(); SendMessage.removeAttribute("onclick");');
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
	 let SendMessage = document.getElementById('SendMessage')
	 SendMessage.setAttribute('onclick','Act_2_3_26();')
}
function Act_2_3_26(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value.toLowerCase().indexOf("12") + 1 > 0 ){
		Text = InputMessage.value;
		 Act_2_5_19();
	 }else{
	 }
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
	 Act_2_5_26();
}
function Act_2_5_26(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = '1';
	 ButtonBlock.append(ButtonOnChat)
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','SendUserClickOnButton(this.value);Act_3_7_29();')
	 Act_2_5_27();
}
function Act_2_5_27(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = '2';
	 ButtonBlock.append(ButtonOnChat)
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','SendUserClickOnButton(this.value);Act_3_8_31();')
	 if(ButtonOnChat.hasAttribute('onclick') != null){
		 let AttributeContains = ButtonOnChat.getAttribute('onclick')
		 ButtonOnChat.setAttribute('onclick', AttributeContains + 'document.getElementById("SendMessage").setAttribute("onclick","Act_3_8_26();");');
	 }else{
		 ButtonOnChat.setAttribute('onclick','document.getElementById("SendMessage").setAttribute("onclick","Act_3_8_26();");'); 
	 }
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
	 let SendMessage = document.getElementById('SendMessage')
	 SendMessage.setAttribute('onclick','Act_3_6_23();')
}
 function Act_3_6_23(){
	 let SendMessage = document.getElementById('SendMessage');
	 SendMessage.setAttribute('onclick','Act_2_5_19(); SendMessage.removeAttribute("onclick");');
 }
function Act_3_7_29(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "нажатие на кнопку 1";
	 SendBotMessage("нажатие на кнопку 1");
	 LowerDown();
}
function Act_3_8_31(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "нажатие на кнопку 2";
	 SendBotMessage("нажатие на кнопку 2");
	 LowerDown();
	 let SendMessage = document.getElementById('SendMessage')
	 SendMessage.setAttribute('onclick','Act_3_8_26();')
}
function Act_3_8_26(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value != ""){
		Text = InputMessage.value;
		 Act_4_7_28();
	 }else{
	 }
}
function Act_4_7_28(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Вот так " + Text + "";
	 SendBotMessage("Вот так " + Text + "");
	 LowerDown();
}
 function DeleteButton(){
	 let Buttons = document.getElementsByClassName("ButtonOnChat");
	 for(let i = 0; i < Buttons.length; i++){
		 Buttons[i].remove();
	}
}