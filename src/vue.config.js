module.exports = {
    devServer: {
      open: process.platform === 'darwin',
      port: 8081,
      https: true,
      historyApiFallback: true,
      hotOnly: false,
    }
  }