module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'SgLgCommunications',
      externals: {
        react: 'React'
      }
    }
  }
}
