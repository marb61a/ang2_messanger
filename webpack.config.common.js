var webpack = require("webpack");

module.exports = {
    entry : {
        'app' : './assets/app/main.ts'
    },
    
    resolve : {
        extensions: ['.js', '.ts']
    }
};