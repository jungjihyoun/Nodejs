//http모듈을 제공한다.
//프로토콜 http
const http = require('http');
//html파일을 읽어오자
const fs = require('fs');


//8080번 포트에 서버가 연결되어 있다
//직접 들어가서 접근할 수 있다.
const server = http.createServer(async(req,res)=>{
    // 여기에 어떻게 응답할지 적는다
    try{
        res.writeHead(200,{'Content-Type' : 'text/html; charset= utf-8'});
        const data = await fs.readFile('./server2.html');
        res.end(data);    //서버에서 html파일을 읽고 전송
    } catch(error){
        console.error(err);
        res.writeHead(200,{'Content-Type' : 'text/plain; charset = utf-8'});
        res.end(message);
    }
})
    .listen(8080);

server.on('listening' , () => {
    console.log('8080번 포트에서 서버 대기 중입니다');
});
server.on('error',(error) =>{
    console.error(error);
});