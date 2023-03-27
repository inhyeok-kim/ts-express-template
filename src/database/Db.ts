import MysqlConnectionPool from "./utils/MysqlConnectionPool";
import MssqlConnectionPool from "./utils/MssqlConnectionPool";
import dbconfig from "./dbconfig.json";
import mybatis from 'mybatis-mapper';
import config from '../../config.json';

let query : Function;

if(dbconfig.dbType == 'mysql') query = MysqlConnectionPool.requestQuery;
if(dbconfig.dbType == 'mssql') query = MssqlConnectionPool.requestQuery;

export async function execQuery(namespace:string,id:string,param? : any){
    const sql = mybatis.getStatement(namespace,id,param);
    if(config.logging.query){
        console.log(`
            LOG :: QUERY LOGGING SYSTEM
            [NAMESPACE, ID]
            ${namespace}, ${id}
            [PARAMETERS]
            ${param}
            [QUERY]
            ${sql}
        `);
    }
    return await query(sql);
}
