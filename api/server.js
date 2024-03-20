const jsonServer=require('json-server');
const path=require('path');
const server=jsonServer.create();
const router=jsonServer.router(path.join(__dirname,'Data','db.json'));
const middlewares=jsonServer.defaults()
server.use(middlewares)
server.use(router)
const Port=3001;
server.listen('port',()=>{
    console.log(`json server running on port ${Port}`)
})
module.exports=server