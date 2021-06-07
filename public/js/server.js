'use strict'//保证安全
var path = require("path");
var http = require("http");
var serv = http.createServer();
var url = require('url');
var fs = require("fs");
serv.listen(5000,"localhost");

const PORT = '5000';
function rdata(fileName,res){
        fs.readFile(fileName,(err,data)=>{
                if(err){
                        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
                        res.write("<h1>404 Error</h1>");
                        res.end("<p>找不到此网页！</p>")
                }
                else{
                        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
                        res.end(data);
                }
        })
}

serv.on("listening",()=>{
    console.log(`The server is running at http://localhost:${PORT}`);
});



serv.on("request",(req,res)=>{
    var urlStr = req.url;
    var parseStr = url.parse(urlStr);
    var filePath = path.resolve(__dirname,"../");
// var filePath = "D:/ALL/大二第一学期/WEB/semester_project/project"+"/html/";
    var querstring = require("querystring");

    switch(parseStr.pathname){
        case "/":
                var fileName = filePath.concat("\\index.html");
                console.log(fileName);
                rdata(fileName,res);
                break;

        case "/check":
                var parstr1 = url.parse(req.url);
                var parstr2 = querstring.parse(parstr1.query);
                if((parstr2.username !="me")||(parstr2.pass !="123")){
                        var fileName = filePath + "login.html";
                        rdata(fileName,res);
                }
                else{
                        var fileName = filePath+"/check.html";
                        rdata(fileName,res);
                }
                var fileName = filePath+"/index.html";
                rdata(fileName,res);
                break;

        case "/user":
                var fileName = filePath+"/user.html";
                rdata(fileName,res);
                break;

        case "/help":
                var fileName = filePath+"/help.html";
                rdata(fileName,res);
                break;  

        case "/login":
                var fileName = filePath+"/login.html";
                rdata(fileName,res);
                break;  

        default:
                var fileName = filePath+"/error.html";
                rdata(fileName,res);
                break;
    }

});