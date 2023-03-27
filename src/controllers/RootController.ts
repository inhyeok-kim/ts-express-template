import express, { Request, Response } from 'express';

const RootController = express.Router();

RootController.get('/', async(req:Request,res:Response)=>{
    res.send('hello');
});

export default RootController;