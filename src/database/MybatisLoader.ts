import dbconfig from './dbconfig.json';
import mybatis from 'mybatis-mapper';
import fs from 'fs';
import path from 'path';
import config from '../../config.json';

export function MybatisMapperLoader(){
  if(config.logging.setup){
    console.log('DB Mapper Loading Started.....');
    console.log(`Database type : ${dbconfig.dbType}`);
  }
  const mappers : string[] = [];
  try {
    const mapperDir = path.join(process.cwd(), '/static/mappers/'+dbconfig.dbType);
    fs.readdirSync(mapperDir).forEach(async (file) => {
      const mapperName = file.substring(0,file.indexOf('.'));
      if(mapperName.endsWith('mapper')){

        const filePath = path.join(mapperDir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
          return;
        }
        
        mappers.push(filePath);

      }
    });
    mybatis.createMapper(mappers);

    if(config.logging.setup){
      console.log('DB Mapper Loading Success.....');
    }
  } catch (error) {
    if(config.logging.setup){
      console.log('DB Mapper Loading Error.....');
    }
    console.error(error);
  }
}
