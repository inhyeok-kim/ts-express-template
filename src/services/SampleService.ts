import * as SampleDao from '../daos/SampleDao';
export async function sample(){
    const result = await SampleDao.sample();
    return result;
}