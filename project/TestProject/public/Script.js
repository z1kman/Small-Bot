async function  SendMessageOnServer(Message,Source){
    let url = 'http://localhost:3000/test';
    let mess = {
        message : Message,
        source : Source
    };
    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(mess)
      });
    
    let result = await response.text();
    
}