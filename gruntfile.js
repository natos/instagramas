module.exports = function(grunt) {

    var gruntConfig = {

        "clean": {
            "content": ['dist/*', 'public/*']
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
            },
            "site": {
                "src": [
                    'src/jquery-ajax.js',
                    'src/*.js'

                ],
                "dest": 'test/lib/<%= pkg.name %>.min.js'
            }
        },
        "watch": {
            "scripts": {
                "files": ['src/*.js'],
                "tasks": ['compile'],
                "options": {
                    "spawn": false,
                }
            }
        },
        copy: {
            site: {
                expand: true,
                cwd: 'test',
                src: '**',
                dest: 'public/'
            }
        }
    };

    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // Compile web site
    grunt.registerTask('compile', ['clean', 'uglify', 'copy']);
    grunt.registerTask('default', ['compile']);

};