import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
const compression = require('compression')
import { config } from "./config/config";

//Import 
import { auth } from "./middleware/auth";


// Router import
const index = require('./routes/index')
const user = require('./routes/user')

const PORT = config.prot || 3000;
const app: Express = express();
app.use(compression())
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware
app.use(auth)
//Use router
app.use('/', index);
app.use('/user', user)

// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next) {
    res.status(404).json({
        status: 404,
        mss: "404, Not found!",
        data: {}
    })
  });
  
  // error handler
  app.use(function(err:any, req:Request, res:Response, next:any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    //console.log("Mssss",res.locals.message)
    // render the error page
    res.status(err.status || 500 ).json({
        status: err.status,
        mss: `${err.status}, ${err.message}`,
        data: {}
    })
  });

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

module.exports = app;
