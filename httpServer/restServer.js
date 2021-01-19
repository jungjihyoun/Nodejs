// ##########서버를 만들고 , 클라이언트에 요청을 받아서 데이터를 보내는 과정
const http = require('http');
const fs = require('fs').promises;

const question = {};
const users = {}; // 데이터 저장용

http.createServer(async (req, res) => {
    try {
        //http method가 get 요청이고 url이 / 일 때
        if (req.method === 'GET') {
            if (req.url === '/') {
                const data = await fs.readFile('./restFront.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
            } else if (req.url === '/about') {
                const data = await fs.readFile('./about.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
                //json 가져오는 코드
            }else if (req.url === '/Q&A'){
                const data = await fs.readFile('./Q&A.html');
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8'});
                return res.end(data);
            }
            else if (req.url === '/users') {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                return res.end(JSON.stringify(users));
            }
            //########### /도 /about도 /users도 아니면 ###################
            try {
                // ex css , js 파일 등 get 요청이 왔을 때 여기서 걸려서 보내줌
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch (err) {
                // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
            }

            // *사용자 등록저장
        } else if (req.method === 'POST') {
            if (req.url === '/user') {
                //데이터를 서버에서 받아서 처리를 해야함
                let body = '';
                // 요청의 body를 stream 형식으로 받음
                // chunk들을 모아서 on end 할 대 바디로 받는다..
                req.on('data', (data) => {
                    body += data;
                });
                // 요청의 body를 다 받은 후 실행됨
                return req.on('end', () => {
                    console.log('POST 본문(Body):', body);
                    const {name} = JSON.parse(body);
                    const id = Date.now();
                    users[id] = name;
                    // 201 : 성공적으로 생성됨! 이라는 의미
                    res.writeHead(201, {'Content-Type': 'text/plain; charset=utf-8'});
                    res.end('ok');
                });
            } else if (req.url === '/Q&A') {
                let body2 = '';
                req.on('data', (data) => {
                    body2 += data;
                });
                return req.on('end', () => {
                    console.log('POST 본문(Body):', body2);
                    const {question} = JSON.parse(body2);
                    const que = Date.now();
                    question[que] = question;
                    // 201 : 성공적으로 생성됨! 이라는 의미
                    res.writeHead(201, {'Content-Type': 'text/plain; charset=utf-8'});
                    res.end('ok');
                });
            }
        }
            // *사용자 정보 수정
        else if (req.method === 'PUT') {
            if (req.url.startsWith('/user/')) {
                // user 아이디를 가지고 와서 수정
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                return req.on('end', () => {
                    console.log('PUT 본문(Body):', body);
                    users[key] = JSON.parse(body).name;
                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end('ok');
                });
            }
            // * 사용자 삭제
        } else if (req.method === 'DELETE') {
            if (req.url.startsWith('/user/')) {
                // user 아이디를 가지고 와서 삭제
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('ok');
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
})
    .listen(8082, () => {
        console.log('8082번 포트에서 서버 대기 중입니다');
    });