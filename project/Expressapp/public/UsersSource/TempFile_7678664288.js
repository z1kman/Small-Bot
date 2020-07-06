 var count= "" ;
 var DialogueStarted = 0;
 var MessageBeforeDialogue = new Array();
 var Dialog = + Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000;
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
	 IncomingMessage.innerHTML = "привет! я чат-бот! я могу вам чем то помочь?";
	 SendBotMessage("привет! я чат-бот! я могу вам чем то помочь?");
	 LowerDown();
	 DeleteButton();
	 Act_1_1_3();
}
function Act_1_1_3(){
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
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_2_2_6();')
	 Act_1_1_4();
}
function Act_1_1_4(){
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
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_2_3_10();')
}
function Act_2_2_6(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "чем я могу помочь?";
	 SendBotMessage("чем я могу помочь?");
	 LowerDown();
	 DeleteButton();
	 Act_2_2_7();
}
function Act_2_2_7(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Оформить заказ';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_3_4_12();')
	 Act_2_2_8();
}
function Act_2_2_8(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'Другое';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_3_5_16();')
}
function Act_2_3_10(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "пока!";
	 SendBotMessage("пока!");
	 LowerDown();
	 DeleteButton();
}
function Act_2_6_21(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "для того, чтобы найти ответ на часто задаваемые вопросы перейдите по следующей ссылке: <a href='www.fuishop/questions' target='_blank'>www.fuishop/questions</a>";
	 SendBotMessage("для того, чтобы найти ответ на часто задаваемые вопросы перейдите по следующей ссылке: <a href='www.fuishop/questions' target='_blank'>www.fuishop/questions</a>");
	 LowerDown();
	 DeleteButton();
	InputMessage.value = "" ; 
	 Act_2_6_20();
}
 function Act_2_6_20(){
		 Act_2_2_6(); 
 }
function Act_3_4_12(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "выберите товар";
	 SendBotMessage("выберите товар");
	 LowerDown();
	 DeleteButton();
	 Act_3_4_13();
}
function Act_3_4_13(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'сумка';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_5_9_26();')
	 Act_3_4_14();
}
function Act_3_4_14(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'плащ';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_5_9_26();')
}
function Act_3_5_16(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "опишите ваш вопрос";
	 SendBotMessage("опишите ваш вопрос");
	 LowerDown();
	 DeleteButton();
	 let SendMessage = document.getElementById('SendMessage')
	 SendMessage.setAttribute('onclick','Act_3_5_17(); InputMessage.value = "" ; ')
}
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('SendMessage').setAttribute('onclick','InputMessage.value = ""; Act_3_5_17() InputMessage.value = "" ; ');
});
function Act_3_5_17(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value.toLowerCase().indexOf("проблема") + 1 > 0 ){
		 Act_2_6_21(); 
	 }else{
		 Act_3_5_18();
	 }
}
function Act_3_5_18(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value.toLowerCase().indexOf("вопрос") + 1 > 0 ){
		 Act_2_6_21(); 
	 }else{
		 Act_3_5_19();
	 }
}
function Act_3_5_19(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value.toLowerCase().indexOf("как заказать") + 1 > 0 ){
		 Act_3_7_23(); 
	 }else{
	 }
}
function Act_3_7_23(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "Для того чтобы оформить заказ необходимо выбрать интересующий вас товар и ответить на все действия чаи-бота";
	 SendBotMessage("Для того чтобы оформить заказ необходимо выбрать интересующий вас товар и ответить на все действия чаи-бота");
	 LowerDown();
	 DeleteButton();
	InputMessage.value = "" ; 
	 Act_3_7_22();
}
 function Act_3_7_22(){
		 Act_3_4_12(); 
 }
function Act_5_9_26(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "введите количество необходимого товара";
	 SendBotMessage("введите количество необходимого товара");
	 LowerDown();
	 DeleteButton();
	 let SendMessage = document.getElementById('SendMessage')
	 SendMessage.setAttribute('onclick','Act_5_9_27(); InputMessage.value = "" ; ')
}
function Act_5_9_27(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value >=  0 && InputMessage.value  <= 10){
		count = InputMessage.value;
		 Act_6_10_29(); 
	 }else{
		 Act_5_9_25();
	 }
}
 function Act_5_9_25(){
		 Act_6_11_31(); 
 }
function Act_6_10_29(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "оформление успешно завершено";
	 SendBotMessage("оформление успешно завершено");
	 LowerDown();
	 DeleteButton();
}
function Act_6_11_31(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "вы выбрали не подходящее количество товара. Пожалуйста, выберите количество товаров от 0 до 10";
	 SendBotMessage("вы выбрали не подходящее количество товара. Пожалуйста, выберите количество товаров от 0 до 10");
	 LowerDown();
	 DeleteButton();
	InputMessage.value = "" ; 
	 Act_6_11_30();
}
 function Act_6_11_30(){
		 Act_5_9_26(); 
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
 async function  SendMessageOnServer(Message,Source){//отправка сообщений на сервер
	 let url = 'http://localhost:3000/publish';
	 let ProjectName = document.getElementById('FrameChatBot').getAttribute('ProjectName');
	 let err = document.getElementById('LabelErrorChatBot');
	 let DateNow = new Date();
	 let mess = {
	       message : Message,
	       source : Source,
	       dialog : Dialog,
	       project : ProjectName,
	       date : DateNow.getDate() + "." + (DateNow.getMonth() + 1) + "." + DateNow.getFullYear(),
	       time : DateNow.getHours() + ":" + DateNow.getMinutes() + ":" + DateNow.getSeconds(),
	       variables : "count=" + count}
	if(!err.hasAttribute('hidden')){
	      err.setAttribute('hidden','hidden');
	      err.innerHTML = "";
	}; 
	if(DialogueStarted == 0){
	    MessageBeforeDialogue.push(mess);
	     if(Source == "User" || Source == "Btn"){
	       fetch(url, { 
	           method: 'POST',
	           headers: {
	               'Content-Type': 'application/json;charset=utf-8'
	           },
	           body: JSON.stringify(mess)
	        }).then(response => response.json()).then(result => {
	               if (result.dialog != 500) { 
	               for(let i = 0; i< MessageBeforeDialogue.length; i++){
	                     document.getElementById('FrameChatBot').setAttribute('dialog',result.dialog);
	                     MessageBeforeDialogue[i].dialog = result.dialog;
	                     Dialog = result.dialog;
	                   }
	              } else {
	                  if(err.hasAttribute('hidden')){
	                       err.removeAttribute('hidden');
	                   }
	              err.innerHTML = "Ошибка! сообщение не отправлено на сервер";
	               }
	               DialogueStarted = 1;
	            if(DialogueStarted == 1){
	                for(let i = 0; i <  MessageBeforeDialogue.length; i++){
	                    fetch(url, { 
	                          method: 'POST',
	                        headers: {
	                            'Content-Type': 'application/json;charset=utf-8'
	                        },
	                        body: JSON.stringify(MessageBeforeDialogue[i])
	                     }).then(response => response.json()).then(result => {
	                        if (result.dialog != 500) { 
	                             Dialog = result.dialog;
	                           } else {
	                            if(err.hasAttribute('hidden')){
	                                    err.removeAttribute('hidden');
	                            }
	                            err.innerHTML = "Ошибка! сообщение не отправлено на сервер";
	                        }
	                    })
	                }
	                DialogueStarted = 2;
	            }
	        })
	    }
	}
	if(DialogueStarted == 2){
	    fetch(url, { 
	        method: 'POST',
	        headers: {
	                'Content-Type': 'application/json;charset=utf-8'
	        },
	        body: JSON.stringify(mess)
	    }).then(response => response.json()).then(result => {
	            if (result.dialog != 500) { 
	                  document.getElementById('FrameChatBot').setAttribute('dialog',result.dialog);
	                  Dialog = result.dialog;
	        } else {
	        if(err.hasAttribute('hidden')){
	               err.removeAttribute('hidden');
	        }
	    err.innerHTML = "Ошибка! сообщение не отправлено на сервер";
	    }})
	}
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