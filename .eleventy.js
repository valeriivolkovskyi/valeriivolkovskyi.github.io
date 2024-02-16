const pluginWebc = require("@11ty/eleventy-plugin-webc");


module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy(".nojekyll");
  eleventyConfig.addPassthroughCopy("src/styles/index.css");
  eleventyConfig.addPassthroughCopy("public/manifest.json");

  eleventyConfig.addPlugin(pluginWebc, {
    components: ['src/components/**/*.webc', 'src/layouts/**/*.webc']
  });


  return {
    dir: {
      input: "src",
      output: "_site",
      data: '../_data'
    }
  }
};