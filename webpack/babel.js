var path = require('path');
module.exports = function(path){
  return {
    module: {
      loaders: [
        {
          loader: "babel-loader",

          // Skip any files outside of your project's `src` directory
          include: [
            path.resolve(__dirname, "./"),
          ],

          // Only run `.js` and `.jsx` files through Babel
          test: /\.jsx?$/,

          // Options to configure babel with
          query: {
            plugins: ['transform-runtime'],
            presets: ["es2015", "stage-1", "stage-0", "stage-2", "stage-3"],
          }
        },
      ]
    }
  }
};