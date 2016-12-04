var webpack = require("webpack");

module.exports = {
    entry : {
        'app' : './assets/app/main.ts'
    },
    
    resolve : {
        extensions: ['.js', '.ts']
    },
    
    module : {
        loaders : [
            {
                test : /\.ts$/,
                loaders : [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader'    
                ]
            },
            {
                test : /\.html$/,
                loader : 'html'
            },
            {
                test : /\.css$/,
                loader : 'raw'
            }
        ]
    },
    
    plugins : [
        new webpack.ContextReplacementPlugin(
            // Path separators for bot *nix and Windows platforms
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            './src' // Location of src
        )    
    ]
};