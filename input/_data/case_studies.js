const fs = require('fs');
const yaml = require("js-yaml");


module.exports = async function() {

  const casestudies = await findThis('directory', './input/_data/case-studies');

  let jsons=[];
  for (let study of casestudies){
    const contents=await findThis('file', './input/_data/case-studies/'+study);
    const json=await yaml.load(contents);
    jsons.push(json[0]);
  }

  return jsons;
}


function findThis(type, name) {
  return new Promise((resolve) => {
    switch (type) {
      case 'directory':
        fs.readdir(name, callback);
        break;
      case 'file':
        fs.readFile(name, 'utf8', callback);
        break;
      default:
    }

    function callback(err, data) {
      if (err) {
        resolve(undefined);
      }
      resolve(data);
    }
  });
}
