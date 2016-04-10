module.exports = function(grunt) {

    var gruntConfig = {

        "clean": {
            "content": ['dist/*', 'public/*']
        },

        "pkg": grunt.file.readJSON('package.json'),
        "uglify": {
            "options": {
                "banner": '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */',
                "wrap": true,
                "sourceMap": true,
                "sourceMapIncludeSources": true,
                "sourceMapName": 'dist/<%= pkg.name %>.min.js.map'
            },
            "build": {
                "src": ['src/*.js'],
                "dest": 'dist/<%= pkg.name %>.min.js'
            },
            "site": {
                "src": ['src/*.js'],
                "dest": 'test/lib/<%= pkg.name %>.min.js'
            },
            "compile": {
                "options": {
                    'compress': false,
                    'beautify': true,
                    'mangle': false
                },
                "src": ['src/*.js'],
                "dest": 'dist/<%= pkg.name %>.js'
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
    grunt.registerTask('compile', ['clean', 'uglify', 'copy', 'watch']);
    grunt.registerTask('default', ['compile']);

};