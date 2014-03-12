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
        var done = this.async();

        grunt.util.spawn({
            cmd: 'node_modules/.bin/docco-husky',
            args: this.filesSrc,
            opts: {
                stdio: 'inherit'
            }
        }, done);
    });
};
