const http = require('http');
const url = require('url');
const parse = require('querystring');



// storing todos in object and importantly store it in array of objects 
let todos = [
    {id:1,task:'Learn Node.js',completed:false},
    {id:2,task:'Build a Todo App',completed:false}
];




// server 

const server = http.createServer((req,res)=>{

    const parsedUrl = url.parse(req.url,true);
    const pathname = parsedUrl.pathname;
    const method = req.method;
    // console.log("pathname is"+pathname+" Here is method = "+method);
    // pathname is / Here is method = GET
    // pathname is / favicon.ico Here is method = GET

    // Set response headers
    res.setHeader('Content-Type', 'application/json');

    if(pathname == '/tasks' && method == 'GET'){
        res.statusCode = 200;
        res.end(JSON.stringify(todos));
    }else if(pathname.startsWith('/tasks/') && method == 'GET'){
            const taskId = parseInt(pathname.split('/')[2]);
            const task = todos.find(t=>t.id === taskId);
            
            if(task){
                res.statusCode = 200;
                res.end(JSON.stringify(task));
            }else{
                res.statusCode = 404;
                res.end(JSON.stringify({ message: 'Task not found' }));
            }

        // res.end('Else Look Executed here');
    } else if (parsedUrl.pathname === '/tasks' && req.method === 'POST'){
        let body = '';
        req.on('data',chunk =>{
            body+=chunk.toString();
        });

        req.on('end',()=>{
            const newTask = JSON.stringify(body);
            newTask.id = tasks.length + 1; // Assign a new ID
            newTask.completed = false; // Default to incomplete
            todos.push(newTask);
            res.statusCode = 201;
            res.end(JSON.stringify(newTask));
        })
    }else{
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
    }

    
    // res.write("Hello world");
    // res.end();
});




server.listen(3000,()=>{

    console.log("runnning on 3000")
});