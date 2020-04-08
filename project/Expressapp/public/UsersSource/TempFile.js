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
	 IncomingMessage.innerHTML = "Привет, я чат бот";
	 SendBotMessage("Привет, я чат бот");
	 LowerDown();
	 Act_1_2_7();
}
function Act_1_2_7(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Чем я могу вам помочь?";
	 SendBotMessage("Чем я могу вам помочь?");
	 LowerDown();
	 Act_1_2_8();
}
function Act_1_2_8(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Что-то подсказать?";
	 SendBotMessage("Что-то подсказать?");
	 LowerDown();
	 Act_1_2_13();
}
function Act_1_2_13(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Аллилуя";
	 SendBotMessage("Аллилуя");
	 LowerDown();
	 Act_1_2_21();
}
function Act_1_2_21(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Матрешка";
	 SendBotMessage("Матрешка");
	 LowerDown();
	 Act_1_2_22();
}
function Act_1_2_22(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Снеговик";
	 SendBotMessage("Снеговик");
	 LowerDown();
	 Act_1_2_23();
}
function Act_1_2_23(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "и";
	 SendBotMessage("и");
	 LowerDown();
	 Act_1_2_24();
}
function Act_1_2_24(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Дед мороз";
	 SendBotMessage("Дед мороз");
	 LowerDown();
	 Act_1_2_10();
}
function Act_1_2_10(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Привет';
	 ButtonBlock.append(ButtonOnChat)
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','SendUserClickOnButton(this.value);Act_3_9_36()')
	 Act_1_2_11();
}
function Act_1_2_11(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Пока';
	 ButtonBlock.append(ButtonOnChat)
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','SendUserClickOnButton(this.value);Act_3_10_38()')
	 Act_1_2_15();
}
function Act_1_2_15(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'может быть';
	 ButtonBlock.append(ButtonOnChat)
	 LowerDown();
	 Act_1_2_18();
}
function Act_1_2_18(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'пока мб';
	 ButtonBlock.append(ButtonOnChat)
	 LowerDown();
}
function Act_3_9_36(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Кактус";
	 SendBotMessage("Кактус");
	 LowerDown();
}
function Act_3_10_38(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Озиз';
	 ButtonBlock.append(ButtonOnChat)
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','SendUserClickOnButton(this.value);Act_4_11_40()')
}
function Act_4_11_40(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "заданий нет";
	 SendBotMessage("заданий нет");
	 LowerDown();
}