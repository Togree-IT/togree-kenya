import path from 'path'
import webpack from 'webpack'
import process from 'process'

const isProduction = (process.env.NODE_ENV === 'production')
let fs = require('fs');

let rdir = fs.readdirSync(path.resolve(__dirname, './../assets/js'));
let entObj = {};
rdir.map(key => {
    if (key.match('.min.js')) {
        fs.rmSync(path.resolve(__dirname, './../assets/js/') + '/' + key)
    }
    if (key.match('.js') && !key.match('.min.js')) {
        entObj[key.split('.js').join('')] = './js/' + key;
    }
})


let config = {

    entry: entObj,
    mode: isProduction ? "production" : "development",

    output: {

        filename: /*  './js/bundle.js',  */ "./js/[name].min.js",
        path: path.resolve(__dirname, './../assets')
    },

    context: path.resolve(__dirname, './../assets'),

    plugins: isProduction ? [new webpack.optimize.UglifyJsPlugin()] : []
}


function scripts() {
    return new Promise(resolve => webpack(config, (err, stats) => {

        if (err) console.log('Webpack', err)

        console.log(stats.toString({ /* stats options */ }))

        resolve()
    }))
}

module.exports = { config, scripts }