const fs = require('fs').promises;   //fs가 프로미스를 지원하게 바꿔줌

//파일읽기
fs.readFile('./readme.txt')
    .then(() =>{
        console.log(data);
        console.log(data.toString());
    }).catch((err) => {
    throw err;
    });

//파일쓰기
fs.writeFile('./writeme.txt', '글이 입력됩니다.')
    .then(()=>{
        return fs.readFile('./writeme.txt');
    })
    .catch((data) =>{
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });