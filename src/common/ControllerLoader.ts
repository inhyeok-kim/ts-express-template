import {Express} from 'express';
import fs from 'fs';
import path from 'path';
import config from '../../config.json';

export default function ControllerLoader(app : Express){
  if(config.logging.setup){
    console.log('Controller Loading Started.....');
  }
  try {
    const controllerDir = path.join(process.cwd(), 'src/controllers');
    fs.readdirSync(controllerDir).forEach(async (file) => {
      const fileName = file.substring(0,file.indexOf('.'));
      if(fileName.endsWith('Controller')){
        const filePath = path.join(controllerDir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
          return;
        }
        
        const controller = await import(filePath);
        let controllerName = fileName.replace('Controller','');
        controllerName = controllerName == 'Root' ? '/' : "/"+controllerName;
        if (typeof controller.default === 'function') {
          app.use(controllerName.toLowerCase(),controller.default);
        }
      }
    });
    if(config.logging.setup){
      console.log('Controller Loading Success.....');
    }
  } catch (error) {
    if(config.logging.setup){
      console.log('Controller Loading Error.....');
    }
    console.error(error);
  }
}