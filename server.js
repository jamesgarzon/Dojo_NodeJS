var http = require("http");
var path = require("path");
var contentType = "text/html";
var fs = require("fs");

function requestEvent(req, res){
	//res.writeHead(200,{"content-type":"text/html"});
	//res.end("<H1>Fin de la peticion</H1>");
	
	var recurso = req.url;
	var ext = path.extname(recurso);
	if(recurso === "/"){
		recurso = "/index.html";
	}		
	recurso ="."+recurso;
	
	switch(ext){
	case ".css":
		contentType = "text/css";
	break;
	case ".js":
		contentType = "text/javascript";
	break;
	}

	fs.exists(recurso, function(exist){

	if(exist){
		fs.readFile(recurso, function(err,data){
		if(err){
			res.writeHead(500);
			res.end("Internal Server Error");
		}else{
			res.writeHead(200,{"content-type":contentType});
			res.end(data);
			
		}
	});
	}else{
		res.writeHead(404);
		res.end("Not Found")
	}
	});



}
var server = http.createServer(requestEvent);
server.listen(8888);
console.log("Server running...");

