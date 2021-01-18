const timeout = setTimeout(()=>{
    console.log('1.5sec');
},1500);

const interval = setInterval(()=>{
    console.log('1sec');
},1000);

const timeout2 = setTimeout(()=>{
    console.log('Not Run');
},3000);

setTimeout(()=>{
    clearTimeout(timeout2);
    clearInterval(interval);
},2500);

const immediate = setImmediate(()=>{
    console.log(' run immediatly');
});

const immeiate2 = setImmediate(()=>{
    console.log(' Not Run ');
});

clearImmediate(immeiate2);



