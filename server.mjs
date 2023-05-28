import express from "./express.js";
import controller from "./controller.js";

const app = new express();
const PORT = 3000;


app.get("/", controller.GET);
app.get("/", controller.GET);
app.post("/", controller.POST);
app.put("/", controller.PUT);
app.delete("/", controller.DELETE);

app.listen(PORT,console.log(`Server: http://localhost:${PORT}`));