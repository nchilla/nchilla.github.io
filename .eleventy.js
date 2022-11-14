const yaml = require("js-yaml");
const marked = require('marked');
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

  eleventyConfig.addNunjucksFilter( "getRatio", function(value) {
    return aspectratios.find(a=>a.name==value).ratio;
  });



  eleventyConfig.setTemplateFormats("html,css,njk,ttf");

  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  // eleventyConfig.addDataExtension("yaml", contents => console.log(yaml.load(contents)));


  // You can return your Config object (optional).
  return {
    dir: {
      input: "input",
      output: "site",
      data:'_data'
    }
  };
};
