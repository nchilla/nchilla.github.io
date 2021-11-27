const sharp = require('sharp');
const fs = require('fs');

runStuff();

async function runStuff() {
  // await processImages(
  //   'assets/images/portraits',
  //   'assets/images/processed-portraits',
  //   2000,
  //   'jpg'
  // );
  console.log('done');
}

async function processImages(
  inputDir,
  outputDir,
  size,
  extension,
  resizedDimension
) {
  let unprocessedFiles;
  try {
    unprocessedFiles = await findThis('directory', inputDir);
  } catch (e) {
    console.log(`you are missing the ${inputDir} folder`);
  }
  try {
    await findThis('directory', outputDir);
  } catch (e) {
    console.log(`you are missing the ${outputDir} folder`);
  }
  unprocessedFiles = unprocessedFiles.filter((a) => {
    let fExtension = a.match(/\.[^/.]+$/)[0];
    let acceptableExt = ['.jpg', '.png', '.jpeg', '.webp'];
    return fExtension && acceptableExt.includes(fExtension.toLowerCase());
  });
  console.log(`${unprocessedFiles.length} valid image files in ${inputDir}`);
  // fileNames = unprocessedFiles.map((a) => a.replace(/\.[^/.]+$/, ''));

  for (i = 0; i < unprocessedFiles.length; i++) {
    // 'assets/processed-images/'+folder+'/'+ fileNames[i] + '.jpg'
    // console.log(fileNames[i]);
    let fileName = unprocessedFiles[i].replace(/\.[^/.]+$/, '');
    let processedExists = await findThis(
      'file',
      `${outputDir}/${fileName}.${extension}`
    );
    if (!processedExists) {
      await processThis(
        unprocessedFiles[i],
        fileName,
        size,
        extension,
        inputDir,
        outputDir,
        resizedDimension
      );
    }
  }
}

function processThis(
  oldfile,
  name,
  size,
  extension,
  inputDir,
  outputDir,
  resizedDimension
) {
  return new Promise((resolve) => {
    let img = sharp(`${inputDir}/${oldfile}`);
    console.log(`converting ${name} (scale ${size})`);
    processAsync();

    async function processAsync() {
      let imgMeta = await img.metadata();
      let resize = imgMeta.width > imgMeta.height ? 'width' : 'height';
      resize = resizedDimension ? resizedDimension : resize;
      let options = {};
      options[resize] = size;
      await img
        .toFormat(extension)
        .resize(options)
        .toFile(`${outputDir}/${name}.${extension}`);
      await img.toFormat('webp').toFile(`${outputDir}/${name}.webp`);
      resolve();
    }
  });
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
