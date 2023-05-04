import {Session} from 'express-session';

declare module "express-session" {
    interface Session {
        test : Test
    }
}

declare interface Test {
    hi : string
}