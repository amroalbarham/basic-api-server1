'use strict';


const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const foodRoute = require('./routes/food');
const clothRouter = require('./routes/clothes');
const notfundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');



app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/v1/clothes', clothRouter);
app.use('/api/v1/foods', foodRoute);
app.use('*',notfundHandler);
app.use(errorHandler);




function start(port) {
  app.listen(port,()=>{
    console.log(`listen on port ${port}`);
  });
}
// app.listen(3000, () => {
//   console.log(`listen on port 3000`);
// });
module.exports = {
  start, app,
};
