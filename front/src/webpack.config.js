module.exports = {
    // ...

    externals: {
        'Config': JSON.stringify(require('./config.json'))
    }
}