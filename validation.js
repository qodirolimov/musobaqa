const fs = require("fs");
const path = require("path");

module.exports = {
   read:(link)=> 
  JSON.parse(
   fs.readFileSync(path.join(__dirname, "database", link + ".json"))
   ),
  write: (link, data)=>{
   fs.writeFileSync(
      path.join(__dirname, "database", link + ".json"),
      JSON.stringify(data, null, 4)
   );
  },
};