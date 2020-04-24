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
	 IncomingMessage.innerHTML = "приветы";
	 SendBotMessage("приветы");
	 LowerDown();
	 DeleteButton();
	 Act_1_2_4();
}
function Act_1_2_4(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "<img src='http://localhost:3000/uploads/9bc2c4b9335a1bb94e16cd75f604bd24' class='ImageBot' id = 'Image 1 2 4' onclick = 'ClickImage(id)' width = '200px'>"
	 SendBotMessage(" Вывод изобржаения:http://localhost:3000/uploads/9bc2c4b9335a1bb94e16cd75f604bd24");
	 DeleteButton();
	 LowerDown();
	 let SendMessage = document.getElementById('SendMessage')
	 SendMessage.setAttribute('onclick','Act_1_2_5(); InputMessage.value = "" ; ')
}
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('SendMessage').setAttribute('onclick','InputMessage.value = ""; Act_1_2_5() InputMessage.value = "" ; ');
});
function Act_1_2_5(){
	 let InputMessage = document.getElementById('InputMessage');
	 if(InputMessage.value.toLowerCase() == "1"){
		 Act_2_3_7(); 
	 }else{
		 Act_1_2_2();
	 }
}
 function Act_1_2_2(){
		 Act_2_4_9(); 
 }
function Act_2_3_7(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "<img src='http://localhost:3000/uploads/3763b5983a961eb851eeb62850c17c75' class='ImageBot' id = 'Image 2 3 7' onclick = 'ClickImage(id)' width = '200px'>"
	 SendBotMessage(" Вывод изобржаения:http://localhost:3000/uploads/3763b5983a961eb851eeb62850c17c75");
	 DeleteButton();
	 LowerDown();
}
function Act_2_4_9(){
	 let ChatForm = document.getElementById("ChatForm");
	 let MessageBot = document.createElement('div');
	 let IncomingMessage = document.createElement('div');
	 MessageBot.className = 'MessageBot';
	 ChatForm.append(MessageBot);
	 IncomingMessage.className = 'IncomingMessage';
	 MessageBot.append(IncomingMessage);
	 IncomingMessage.innerHTML = "<img src='http://localhost:3000/uploads/b5f9a569fb0b7eb2dceb21df780b79fc' class='ImageBot' id = 'Image 2 4 9' onclick = 'ClickImage(id)' width = '200px'>"
	 SendBotMessage(" Вывод изобржаения:http://localhost:3000/uploads/b5f9a569fb0b7eb2dceb21df780b79fc");
	 DeleteButton();
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
	 InputMessage.value = "";
	 LowerDown(); 
}
 async function  SendMessageOnServer(Message,Source){//отправка сообщений на сервер
	 let url = 'http://localhost:3000/publish';
	 let ProjectName = document.getElementById('FrameChatBot').getAttribute('ProjectName');
	 let err = document.getElementById('LabelErrorChatBot');
	 let mess = {
	   message : Message,
	   source : Source,
	   project : ProjectName
	 }; 
	 if(!err.hasAttribute('hidden')){
	   err.setAttribute('hidden','hidden');
	   err.innerHTML = "";
	 }; 
	 let response = await fetch(url, { 
	   method: 'POST',
	   headers: {
	       'Content-Type': 'application/json;charset=utf-8'
	    },
	    body: JSON.stringify(mess) 
	 }); 
	 if (response.ok) { // если HTTP-статус в диапазоне 200-299 
	   } else {
	   if(err.hasAttribute('hidden')){
	       err.removeAttribute('hidden');
	    }
	    err.innerHTML = "Ошибка! сообщение не отправлена на сервер";
	 }; 
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