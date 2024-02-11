const pluginWebc = require("@11ty/eleventy-plugin-webc");


module.exports = function(eleventyConfig) {
  // eleventyConfig.addPassthroughCopy("src/css/bundle.css");

  eleventyConfig.addPlugin(pluginWebc, {
    components: 'src/components/**/*.webc'
  });


  return {
    dir: {
      input: "src",
      output: "_site",
      htmlTemplateEngine: "webc"
    }
  }
};