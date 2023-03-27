import express from 'express';
import bodyParser, { OptionsUrlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

import ControllerLoader from './src/common/ControllerLoader';
import config from './config.json';
import Authenticate from './src/mwares/Authenticate';
import {MybatisMapperLoader} from './src/database/mappers/MybatisLoader';
const app = express();

// base middleware
app.use(helmet);
app.use(cors());

const limiter = rateLimit({ // 쓰로틀링
    windowMs : 1000,
    max : 1
});
app.use(limiter);

app.use('/static',express.static('public'));
app.use(bodyParser.urlencoded({extends:true} as OptionsUrlencoded));
app.use(bodyParser.json());
app.use(cookieParser());
// base middleware

// custom middleware
app.use(Authenticate);
// custom middleware

// context loading
ControllerLoader(app);
MybatisMapperLoader();
// context loading

app.listen((process.env.PORT || config.server.port),()=>{
    console.log('server start');
});