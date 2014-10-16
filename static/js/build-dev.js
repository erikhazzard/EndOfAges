({
    baseUrl: "./",
    appDir: './',
    paths: {
        jquery: "lib/requirejs-jquery.min"
    },
    dir: '../build',
    include: ['lib/almond', 'main'],
    modules: [
        { 
            name: 'main',
            "exclude": ['jquery']
        }
    ],
    
    //SOURCE MAP GENERATION (slow)
    //generateSourceMaps: true,
    //optimize: "uglify2",
    optimize: "none",

    mainConfigFile: 'main.js',

    preserveLicenseComments: false,
    wraps: true
})
