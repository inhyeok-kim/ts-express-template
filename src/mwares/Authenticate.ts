import express from 'express';

export default function(req: express.Request, res: express.Response, next: express.NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
        const elapsed = Date.now() - start;
        console.log(`${req.method} ${req.url} ${elapsed}ms`);
    });
    next();
}