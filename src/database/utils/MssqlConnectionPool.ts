import mssql from 'mssql';
import dbconfig from '../dbconfig.json';

let pool : any;

function getConnectionPool(server:string,user:string,password:string,database:string){
    if(!pool){
        pool = new mssql.ConnectionPool({
            server :server,
            user : user,
            password : password,
            database : database
        });
    }
    return pool;
}

async function requestQuery(query : string){
    try {
        const pool = getConnectionPool(dbconfig.server,dbconfig.user,dbconfig.password,dbconfig.database);
        await pool.connect()
        const request = new mssql.Request(pool);
        const result = await request.query(query);
        const data = result.recordset;
        pool.close();
        return data;
    } catch (error) {
        console.error(error);
        pool.close();
    }
}

export default {requestQuery};
