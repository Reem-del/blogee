import { create, router as _router, defaults } from 'json-server';
import { join } from 'path';
try{
const server=create();
const router=_router(join(__dirname,'Data','db.json'));
const middlewares=defaults()
server.use(middlewares)
server.use(router)
const Port=3001;
server.listen(3001,()=>{
    console.log(`json server running on port ${Port}`)})
}
catch(error){(console.log(error))}

