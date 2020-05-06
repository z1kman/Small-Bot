 var Text= "" ;
 var Number= "" ;
 var Email= "" ;
 var DialogueStarted = 0;
 var MessageBeforeDialogue = new Array();
let Dialog = + Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000;
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
	 IncomingMessage.innerHTML = "Привет, я чат-бот, я могу чем то помочь?";
	 SendBotMessage("Привет, я чат-бот, я могу чем то помочь?");
	 LowerDown();
	 DeleteButton();
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
	 ButtonOnChat.value = 'Да';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
	 ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_2_2_6();')
	 Act_1_1_5();
}
function Act_1_1_5(){
	 let ChatForm = document.getElementById("ChatForm");
	 let ButtonBlock = document.createElement('div');
	 let ButtonOnChat = document.createElement('input');
	 ButtonBlock.className = 'ButtonBlock';
	 ChatForm.append(ButtonBlock);
	 ButtonOnChat.className = 'ButtonOnChat';
	 ButtonOnChat.type = 'button';
	 ButtonOnChat.value = 'До свидания';
	 ButtonBlock.append(ButtonOnChat);
	 LowerDown();
}
function Act_2_2_6(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "павпа";
	 SendBotMessage("павпа");
	 LowerDown();
	 DeleteButton();
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
	       variables : "Text=" + Text+ ";" + "Number=" + Number+ ";" + "Email=" + Email}
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