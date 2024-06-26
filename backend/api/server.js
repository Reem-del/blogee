const jsonServer=require('json-server');
const path=require('path');
try{
const server=jsonServer.create();
const router=jsonServer.router(path.join(__dirname,'db.json'));
const middlewares=jsonServer.defaults()
server.use(middlewares)
server.use(router)
const Port=3001;
server.listen('port',()=>{
    console.log(`json server running on port ${Port}`)})
}
catch(error){(console.log(error))}

module.exports=server
