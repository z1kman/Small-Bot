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
	 IncomingMessage.innerHTML = "привет, я чат бот!Я могу вам чем-то помочь?";
	 SendBotMessage("привет, я чат бот!Я могу вам чем-то помочь?");
	 LowerDown();
	 DeleteButton();
	 Act_1_2_6();
}
function Act_1_2_6(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Да';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_2_3_9();')
	 Act_1_2_7();
}
function Act_1_2_7(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Нет';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_2_5_16();')
}
 function Act_1_2_2(){
		 Act_2_3_9(); 
 }
function Act_2_3_9(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Выберите, чем я могу вам помочь или опишите ваш вопрос";
	 SendBotMessage("Выберите, чем я могу вам помочь или опишите ваш вопрос");
	 LowerDown();
	 DeleteButton();
	 Act_2_3_10();
}
function Act_2_3_10(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Досуг';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_3_6_14();')
	 Act_2_3_11();
}
function Act_2_3_11(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Здоровье';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_3_8_19();')
	 Act_2_3_12();
}
function Act_2_3_12(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Образование';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_3_7_17();')
}
function Act_2_5_16(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "До свидания";
	 SendBotMessage("До свидания");
	 LowerDown();
	 DeleteButton();
}
function Act_3_6_14(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Для того, чтобы перейти на страницу досуга нажмите на эту ссылку:<a href='https://www.mos.ru/pgu/ru/application/dogm/077060701/#step_1' target='_blank'>https://www.mos.ru/pgu/ru/application/dogm/077060701/#step_1</a>  ewqewrwqrqwwq";
	 SendBotMessage("Для того, чтобы перейти на страницу досуга нажмите на эту ссылку:<a href='https://www.mos.ru/pgu/ru/application/dogm/077060701/#step_1' target='_blank'>https://www.mos.ru/pgu/ru/application/dogm/077060701/#step_1</a>  ewqewrwqrqwwq");
	 LowerDown();
	 DeleteButton();
	 Act_3_6_27();
}
function Act_3_6_27(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "<a href='https://www.mos.ru/pgu/ru/application/dogm/077060701/#step_1' target='_blank'>https://www.mos.ru/pgu/ru/application/dogm/077060701/#step_1</a> gerer";
	 SendBotMessage("<a href='https://www.mos.ru/pgu/ru/application/dogm/077060701/#step_1' target='_blank'>https://www.mos.ru/pgu/ru/application/dogm/077060701/#step_1</a> gerer");
	 LowerDown();
	 DeleteButton();
	InputMessage.value = "" ; 
	 Act_3_6_13();
}
 function Act_3_6_13(){
		 Act_6_11_24(); 
 }
function Act_3_8_19(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Чтобы перейти в раздел здоровье нажмите на ссылку: <a href='https://www.mos.ru/services/catalog/cat/10532/' target='_blank'>https://www.mos.ru/services/catalog/cat/10532/</a>";
	 SendBotMessage("Чтобы перейти в раздел здоровье нажмите на ссылку: <a href='https://www.mos.ru/services/catalog/cat/10532/' target='_blank'>https://www.mos.ru/services/catalog/cat/10532/</a>");
	 LowerDown();
	 DeleteButton();
	InputMessage.value = "" ; 
	 Act_3_8_18();
}
 function Act_3_8_18(){
		 Act_6_11_24(); 
 }
function Act_3_7_17(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Для того чтобы перейти на вкладку образование нажмите на ссылку: <a href='https://www.mos.ru/services/catalog/cat/3532/' target='_blank'>https://www.mos.ru/services/catalog/cat/3532/</a>";
	 SendBotMessage("Для того чтобы перейти на вкладку образование нажмите на ссылку: <a href='https://www.mos.ru/services/catalog/cat/3532/' target='_blank'>https://www.mos.ru/services/catalog/cat/3532/</a>");
	 LowerDown();
	 DeleteButton();
	InputMessage.value = "" ; 
	 Act_3_7_16();
}
 function Act_3_7_16(){
		 Act_6_11_24(); 
 }
function Act_6_11_24(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Я еще могу чем то помочь?";
	 SendBotMessage("Я еще могу чем то помочь?");
	 LowerDown();
	 DeleteButton();
	 Act_6_11_25();
}
function Act_6_11_25(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Да';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_2_3_9();')
	 Act_6_11_26();
}
function Act_6_11_26(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Нет';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_2_5_16();')
}
 function DeleteButton(){
	 let Buttons = document.getElementsByClassName("ButtonBlock");
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
 function ClickImage(id){//увеличение изображения 
	 let body = document.body 
	 let divNewInstrumentPanel = document.createElement('div');//фиксированная панель во весь экран 
	 let divAddNewInstrumentPanel = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий 
	 let Cwidth = document.documentElement.clientWidth; 
	 let Cheight = document.documentElement.clientHeight; 
	 let img = document.getElementById(id); 
	  let ImgOpen = document.createElement('img'); 
	  //----------Создание фиксированной панели----------- 
	 divNewInstrumentPanel.className="NewInstrumentPanel"; 
	 divNewInstrumentPanel.setAttribute("id","NewInstrumentPanel"); 
	 body.prepend(divNewInstrumentPanel); 
	 ImgOpen.src = img.src; 
	 ImgOpen.className = "OpenImg"; 
	 ImgOpen.id = img.id; 
	 ImgOpen.setAttribute('onclick','OnClickImgExit()'); 
	 if(img.naturalWidth > img.naturalHeight){ 
	  if(img.naturalWidth > Cwidth - 400){ 
		 ImgOpen.width = img.naturalWidth/2;  
	}else{ 
		 ImgOpen.width = img.naturalWidth; 
	 } 
	 }else if(img.naturalWidth <= img.naturalHeight){ 
		 if(img.naturalHeight > Cheight - 400){ 
			ImgOpen.height = img.naturalHeight/2;  
		 }else{ 
			 ImgOpen.height = img.naturalHeight;  
		} 
	} 
	 divNewInstrumentPanel.append(ImgOpen); 
} 
 function OnClickImgExit(){//закрытие всплывающего окна  
	 let NewInstrumentPanel = document.getElementById("NewInstrumentPanel"); 
	 NewInstrumentPanel.parentNode.removeChild(NewInstrumentPanel); 
} 
 function LowerDown(){
	 document.getElementById('ChatForm').scrollTop = document.getElementById('ChatForm').scrollHeight;
}