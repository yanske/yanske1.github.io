
module.exports = {
  entry: "./webpack/entry.js",
  output: {
    path: __dirname + '/assets/js/',
    filename: "bundle.js"
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
