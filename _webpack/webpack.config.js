
module.exports = {
  entry: "./src/entry.js",
  output: {
    path: __dirname,
    filename: "../assets/js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  mode: 'production'
};
