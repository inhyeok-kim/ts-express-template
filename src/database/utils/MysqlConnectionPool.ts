import mysql from "mysql2/promise";
import dbconfig from '../dbconfig.json';

let pool : mysql.Pool; 

function getConnectionPool(host:string,user:string,password:string,database:string){
    if(!pool){
        pool = mysql.createPool({
            host :host,
            user : user,
            password : password,
            database : database
        });
    }
    return pool;
}


async function requestQuery(query : string){
    const pool = getConnectionPool(dbconfig.server,dbconfig.user,dbconfig.password,dbconfig.database);
    const conn = await pool.getConnection();
    try {

        const [rows, fields] = await conn.execute(query);
        const data = rows;
        conn.release();
        return data;
    } catch (error) {
        console.error(error);
        conn.release();
    }
}

export default {requestQuery};
