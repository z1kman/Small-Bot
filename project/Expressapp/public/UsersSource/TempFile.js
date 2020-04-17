 var Email= "" ;
 var Text= "" ;
 var Number= "" ;
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('SendMessage').setAttribute('onclick','Act_1_2_19()');
});
function Act_1_2_19(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value != ""){
		Text = InputMessage.value;
		 Act_4_6_21();
	 }else{
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
	 ButtonOnChat.value = '2';
	 ButtonBlock.append(ButtonOnChat)
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','SendUserClickOnButton(this.value);Act_4_7_24();')
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
	 let SendMessage = document.getElementById('SendMessage')
	 SendMessage.setAttribute('onclick','Act_4_6_38();')
}
function Act_4_6_38(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value != ""){
		Email = InputMessage.value;
		 Act_5_10_31();
	 }else{
	 }
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
function Act_5_10_31(){
	 let InputMessage = document.getElementById('InputMessage');
	 try{
		
		if(Text == '123'){Number = 15;
		 Act_5_9_28();
		}
		 else{
		 Act_5_10_35();
	 }
	}catch (e) { 
	 alert("Ошибка в условии:if(Text == '123'){Number = 15;}");
	}
}
function Act_5_10_35(){
	 let InputMessage = document.getElementById('InputMessage');
	 try{
		
		if(Text == '231'){
		 Act_5_9_28();
		}
		 else{
		 Act_5_10_29();
	 }
	}catch (e) { 
	 alert("Ошибка в условии:if(Text == '231'){}");
	}
}
 function Act_5_10_29(){
		 Act_6_12_33();
 }
function Act_5_9_28(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "число " + Number + "";
	 SendBotMessage("число " + Number + "");
	 LowerDown();
}
function Act_6_12_33(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Не выполнилось условие";
	 SendBotMessage("Не выполнилось условие");
	 LowerDown();
}
 function DeleteButton(){
	 let Buttons = document.getElementsByClassName("ButtonOnChat");
	 for(let i = 0; i < Buttons.length; i++){
		 Buttons[i].remove();
	}
}