const http = require("http");

const callbacks = {};


 async function Server(req,res) {
   res.setHeader("Content-Type", "application/json");
   if(req.url == "/favicon.ico") return;
   let route = req.url.toLowerCase();
   let method = req.method.toUpperCase();
   let url = req.url.split("/");   
   
   console.log(callbacks);

  if(url[1] && checkPath(route)){
      console.log('daaaa')
      let key = checkPath(route);     
      let arg = key.split("/:");     
      req.params = {};
      req.params[arg[0]] = url[1];   
      route = key;                    
   }
   
   if(method == "POST" || method == "PUT") {
   req.body = await new Promise((res, rej) => {
      
     let datas = ""
     req.on("data", (data) => (datas += data));
    req.on("end", () => res(JSON.parse(datas)));
    });
  }
    
  if(callbacks[route]?.[method]) callbacks[route][method](req, res);
   else res.end(`Cannot path ${method}${route}`);
}


function checkPath(route) {
   for(let key in callbacks){
      if("path" in callbacks[key]) {
        let regUrl = route.matchAll(callbacks[key]["path"]);
         if(regUrl[0][0] == regUrl[0]['input']) return key; 
     }
   }
   return 0;
}




function regExp(route){
 let rot = route.split("/:");  
 return new RegExp(`${rot[0]}/\\w+`, "gi"); 
}


class Express {
   #server = http.createServer(Server);
  
   get(route, callback) {        
      route = route.toLowerCase();
      callbacks[route] = callbacks[route] || {};
      callbacks[route]["GET"] = callbacks[route]?.GET || callback;
      if(route.includes(":")) callbacks[route]["path"] = regExp(route);  // users/:id
   }

   post(route, callback) {
      
  route = route.toLowerCase();
      callbacks[route] = callbacks[route] || {};
      callbacks[route]["POST"] = callbacks[route]?.POST || callback;
   }
   
   put(route, callback) {
      route = route.toLowerCase();
      if(route.includes(":")){
         let url = route.split(":");
         return url;
      }
      callbacks[route] = callbacks[route] || {};
      callbacks[route]["PUT"] = callbacks[route]?.PUT || callback;
      if(route.includes(":")) callbacks[route]['path'] = regExp(route);
   }
   
   delete(route, callback) {
      route = route.toLowerCase();
      callbacks[route] = callbacks[route] || {};
      callbacks[route]["DELETE"] = callbacks[route]?.DELETE || callback;
      if(route.includes(":")) callbacks[route]['path'] = regExp(route);
   }

   listen(port, callback) {
      this.#server.listen(port, callback);
   }

   use(data){
     if(data){
      return JSON.stringify();
     }
     return JSON.parse(data);
   }

}

module.exports = Express;

