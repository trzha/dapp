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
        use: [ 'style-loader', 'css-loader' ]
       
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
    new CopyWebpackPlugin([{ from: "./src/login_teen.html", to: "login_teen.html" }]),
    new CopyWebpackPlugin([{ from: "./src/login_seller.html", to: "login_seller.html" }]),
    new CopyWebpackPlugin([{ from: "./src/query.html", to: "query.html" }]),
    new CopyWebpackPlugin([{ from: "./src/query2.html", to: "query2.html" }]),
    new CopyWebpackPlugin([{ from: "./src/query3.html", to: "query3.html" }]),
    new CopyWebpackPlugin([{ from: "./src/query4.html", to: "query4.html" }]),
    new CopyWebpackPlugin([{ from: "./src/query5.html", to: "query5.html" }]),
    new CopyWebpackPlugin([{ from: "./src/query6.html", to: "query6.html" }]),
    new CopyWebpackPlugin([{ from: "./src/query7.html", to: "query7.html" }]),
    new CopyWebpackPlugin([{ from: "./src/query8.html", to: "query8.html" }]),
  ],
  
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
  
}
