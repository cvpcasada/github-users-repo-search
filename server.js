const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = process.env.NODE_ENV !== 'production' ? require('./webpack.config') : require('./webpack.production');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
