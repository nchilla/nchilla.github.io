const yaml = require("js-yaml");
const marked = require('marked');
const aml = require("archieml");
const fs = require('fs');
let aspectratios;


async function getVars(){
  fs.readFile('input/_data/aspectratios.json',(err, data) => {
    if (err) throw err;
    aspectratios=JSON.parse(data);
  })
}

module.exports = function(eleventyConfig) {





  getVars();
  // Add a filter using the Config API

  eleventyConfig.addPassthroughCopy("input/js");
  eleventyConfig.addPassthroughCopy("input/assets/video");
  eleventyConfig.addPassthroughCopy("input/assets/fonts");
  eleventyConfig.addPassthroughCopy("input/assets/images");
  eleventyConfig.addPassthroughCopy("input/assets/images-large");
  eleventyConfig.addPassthroughCopy("input/assets/images-preserve-scale");
  eleventyConfig.addPassthroughCopy("input/assets/favicon");
  eleventyConfig.addPassthroughCopy("input/CNAME");
  

  eleventyConfig.addNunjucksFilter( "md", function(value) {
    var result;
      try {
        result = marked.parseInline(value);
        return result;
      } catch (e) {
        return e;
      }
  });

  eleventyConfig.addNunjucksFilter( "merge_objects", function(obj1,obj2) {
    return {...obj1,...obj2};
  });



  eleventyConfig.addNunjucksFilter( "mdblock", function(value) {
    var result;
      try {
        result = marked.parse(value);
        return result;
      } catch (e) {
        return e;
      }
  });




  eleventyConfig.addNunjucksFilter( "getRatio", function(value) {
    return aspectratios.find(a=>a.name==value)?.ratio || 'unknown';
  });



  eleventyConfig.setTemplateFormats("html,css,njk,ttf");

  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  // eleventyConfig.addDataExtension("yaml", contents => console.log(yaml.load(contents)));

  eleventyConfig.addDataExtension("aml", contents => aml.load(contents));

  // You can return your Config object (optional).
  return {
    dir: {
      input: "input",
      output: "site",
      data:'_data'
    }
  };
};
