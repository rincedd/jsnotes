module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        doc: {
            main: {
                src: ['README.md', 'src/*.js']
            }
        },
        watch: {
            main: {
                files: ['README.md', 'src/*.js'],
                tasks: 'doc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerMultiTask('doc', function() {
        var docco = require('docco-husky'),
            done = this.async();

        docco.document(this.filesSrc, done);
    });
};
