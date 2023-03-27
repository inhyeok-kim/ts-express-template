import {execQuery} from '../database/Db'

export function sample(){
    return execQuery("sample-mapper",'select',{id:"hihi"});
}