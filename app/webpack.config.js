const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: 
    "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [
            {loader: "style-loader"},
            {loader: "css-loader"},
       ]
       //include: path.resolve(__dirname, "src/static/css")
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
        include: path.resolve(__dirname, "src/static/font")
      },
      {
        test:/\.(gif|png|svg|jpeg|jpg)$/,
        use:['url-loader']
      }
    ],
    rules: [
      //{ test: /\.json$/, use: 'json-loader',exclude:/node_modules/ },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  plugins: 
  [
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
    new CopyWebpackPlugin([{ from: "./src/login.html", to: "login.html" }]),
    new CopyWebpackPlugin([{ from: "./src/stat-panels.html", to: "stat-panels.html" }]),
    new CopyWebpackPlugin([{ from: "./src/widgets.html", to: "widgets.html" }]),
    
  ],
  
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
  
}
