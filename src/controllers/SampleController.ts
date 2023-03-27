import {Router} from 'express';
import * as SampleService from '../services/SampleService';

const SampleController = Router();

SampleController.get('/',async (req,res)=>{
    const result = await SampleService.sample();
    res.send('test');
});



export default SampleController;
