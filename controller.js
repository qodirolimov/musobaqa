const validator = require("./validation");
let TEXT = validator.read("text");
module.exports = {
   GET:(req, res) => {
   try{
      
      let id = req.params?.id;
       if(id){
      if(!TEXT.map((t) => t.id).includes(+id))
       throw new Error("Not found " + id + "text"); 
      else res.end(JSON.stringify(TEXT.find(t => t.id == id)));  
    } else res.end(JSON.stringify(TEXT));
      }catch (err) {
        res.end(err.message)
      }
   },
   
   POST: (req, res) => {
      try{
         
       let Text = req.body;
        Text['id']= TEXT.length ? TEXT[TEXT.length-1].id+1 : 1;
        TEXT.push(Text);
        validator.write("text",TEXT); 
        res.end(Text.id + " Text added");
      }catch(error){
         res.end(error.message);
      }
    },
    PUT: (req, res) => {
      try{
       const id = req.params?.id;
       let txt = TEXT.find((u) => u.id == id);
       if(!txt)throw new Error("Not found " + id + "text");
       const { text } = req.body;
       if(text) throw new Error("Not found text!")
       
      txt.text = text ? text : txt.text;
       validator.write("text", TEXT);
        res.end("Text " + id + " updated!");
      }catch(error){
        res.end(error.message);
      }
    },
    DELETE: (req, res) => {
      try{
         const id = req.params?.id;
         if(!users.map((u) => u.id).includes(+id))
           throw new Error("Not found " + id + "-user");
          validator.write(
           "users",users.filter(u=>u.id!=id)
           );  
           
          res.end("User " + id + " deleted!");
      }catch(error){
         res.end(error.message);
      }
   },
};