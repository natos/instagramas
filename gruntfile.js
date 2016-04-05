module.exports = function(grunt) {

    var gruntConfig = {

        "clean": {
            "content": ['dist/*']
        },

        "pkg": grunt.file.readJSON('package.json'),
        "uglify": {
            "options": {
                "banner": '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
                "wrap": true,
                "sourceMap": true,
                "sourceMapIncludeSources": true,
                "sourceMapName": 'dist/<%= pkg.name %>.min.js.map'
            },
            "build": {
                "src": [
                    'src/jquery-ajax.js',
                    'src/*.js'

                ],
                "dest": 'dist/<%= pkg.name %>.min.js'
            }
        },
        "watch": {
            "scripts": {
                "files": ['src/*.js'],
                "tasks": ['uglify'],
                "options": {
                    "spawn": false,
                }
            }
        }
    };

    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Compile web site
    grunt.registerTask('compile', ['clean', 'uglify']);
    grunt.registerTask('default', ['compile']);

};