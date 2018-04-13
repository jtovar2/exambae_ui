var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var imagemin = require('gulp-imagemin');
var iife = require("gulp-iife");
var cleanCSS = require('gulp-clean-css');
var Server = require('karma').Server;

var mainBowerFiles = require('main-bower-files');

var env_vars = require('./env_vars.json');

gulp.task('default', ['serve']);

gulp.task('init', ['lcp', 'sass', 'bower', 'js', 'uglify-js', 'image', 'image-min', 'html', 'index' ]);
// LCP stuff QA
//Stuff for turning string to file
function string_src(filename, string) {
    var src = require('stream').Readable({ objectMode: true })
    src._read = function () {
        this.push(new gutil.File({
            cwd: "",
            base: "",
            path: filename,
            contents: new Buffer(string)
            }))
            this.push(null)
        }
        return src;
}
gulp.task('lcp', function() {
    
    var APP_NAME = "exambae";
    var CONFIG_PATH = "js/config/config.js";
    var LCP = env_vars.LCP;

    var js_clousure_template = "( function(app) { %APP_CONSTANTS% } ) (%APP_NAME%);";
    var js_constant_template = "app.constant( '%ENV_NAME%' , '%ENV_VALUE%');\n"
    var lcp_stuff = env_vars;
    

    js_all_constants_code = "";

    for (var env_name in lcp_stuff)
    {
        var env_value = lcp_stuff[env_name];

        var env_template_dict = {};

        env_template_dict['%ENV_NAME%'] =  env_name;
        env_template_dict['%ENV_VALUE%'] = env_value;

        var js_constant = js_constant_template.replace(/%\w+%/g, function(all) {
           return env_template_dict[all] || all;
           });
        console.log(js_constant);

        js_all_constants_code = js_all_constants_code + js_constant;
    }

    console.log(js_all_constants_code);


    var env_template_dict = {};
    env_template_dict['%APP_CONSTANTS%'] = js_all_constants_code;
    env_template_dict['%APP_NAME%'] = "exambae";

    var config_js = js_clousure_template.replace(/%\w+%/g, function(all) {
               return env_template_dict[all] || all;
               });


    console.log("\n");
    console.log(config_js);

    if( LCP.toUpperCase() === "PR")
    {
    return string_src(CONFIG_PATH , config_js)
        .pipe(gulp.dest('./dist/public'))
        .pipe(gulp.dest('./dev/public'))
        .pipe(gulp.dest('./public'));
    }

    else
    {
    return string_src(CONFIG_PATH, config_js)
        .pipe(gulp.dest('./dist/public'))
        .pipe(gulp.dest('./dev/public'))
        .pipe(gulp.dest('./public'));
    }

});

// Static Server + watching js/scss/html files
gulp.task('serve', ['init'], function() {

    browserSync.init({
        server: {
            baseDir: './dev'
        }
    });

    /* If you use a proxy replace the previous code with the below script replacing 'yourlocal.dev' with your local proxy
       
        browserSync.init({
            proxy: 'yourlocal.dev'
        });

   */

    gulp.watch('./scss/*.scss', ['sass-watch']);

    gulp.watch('./public/images/*', ['image-watch']);

    gulp.watch('./public/**/*.html', ['html-watch']);

    gulp.watch('./public/js/**/*.js', ['js-watch']);

    gulp.watch('./bower_components/**/*.js', ['bower']);
});


gulp.task('index', function() {
    var target = gulp.src('./dev/index.html');
    
    var file_sources = [ './public/js/config/app.js', './public/js/config/config.js', './public/js/factories/**/*.js',
    './public/js/services/**/*.js', './public/js/controllers/**/*.js', './public/js/filters/**/*.js', './public/js/directives/**/*.js', './public/css/**/*.css'];
    
    var bower_css = mainBowerFiles('**/*.css'); 
    var bower_js = mainBowerFiles('**/*.js');

    var sources_list = bower_js.concat(bower_css);
    sources_list = sources_list.concat(file_sources);

    var sources = gulp.src(sources_list, {read: false});

    console.log("ALLLLLL SOURCESSSS*****************************");
    console.log(sources_list); 

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./dev'))
});

gulp.task('html', function() {
    console.log("we in html ");
    return gulp.src('./public/**/*.html')
        .pipe(gulp.dest('./dev'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('image', function() {
    return gulp.src('./public/images/*')
        .pipe(gulp.dest('./dev/public/images'))
        .pipe(gulp.dest('./dist/public/images'))
        .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(gulp.dest('./dev/public/css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/public/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(gulp.dest('./dev/public/js'))
});

gulp.task('dist:js', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(gulp.dest('./dist/public/js'))
});


gulp.task('bower', ['index', 'index:dist'], function() {
    var bowerFiles_js = mainBowerFiles('**/*.js');
    var bower_css = mainBowerFiles('**/*.css'); 
    console.log(bowerFiles_js.concat(bower_css));  
    return gulp.src(bowerFiles_js.concat(bower_css) , {base: "bower_components/"})
        .pipe(gulp.dest('./dev/bower_components'))
        .pipe(gulp.dest('./dist/bower_components'));
});

gulp.task('image-watch', ['image', 'image-min'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('html-watch', ['html'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('sass-watch', ['sass', 'index', 'index:dist'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('js-watch', ['js', 'uglify-js', 'index', 'index:dist'], function(done) {
    browserSync.reload();
    done();
});

//DIST:

gulp.task('image-min', function() {
    gulp.src(['./public/**/*.png', './public/**/*.jpg', './public/**/*.gif', './public/**/*.jpeg'])
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/public'));
});

gulp.task('uglify-js', function() {
    return gulp.src(['./public/js/config/app.js' ,'./public/js/config/config.js' , './public/js/factories/**/*.js', './public/js/services/**/*.js', './public/js/controllers/**/*.js', './public/js/filters/**/*.js', './public/js/directives/**/*.js'])
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./public/js/min/'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/min/'));
});

gulp.task('index:dist', function() {
    var target = gulp.src('./dist/index.html');


    var file_sources = [ './public/js/config/app.js', './public/js/config/config.js', './public/js/factories/**/*.js',
    './public/js/services/**/*.js', './public/js/controllers/**/*.js', './public/js/filters/**/*.js', './public/js/directives/**/*.js', './public/css/**/*.css'];
    
    var bower_css = mainBowerFiles('**/*.css'); 
    var bower_js = mainBowerFiles('**/*.js');

    var sources_list = bower_js.concat(bower_css);
    sources_list = sources_list.concat(file_sources);

    var sources = gulp.src(sources_list, {read: false}); 


    return target.pipe(inject(sources))
        .pipe(gulp.dest('./dist'))
});

gulp.task('dist:iife', function() {
    return gulp.src('./public/js/min/all.min.js')
        .pipe(iife())
        .pipe(rename('./js/min/anonymous.min.js'))
        .pipe(gulp.dest('./public'))
        .pipe(gulp.dest('./dist/public'));
});

gulp.task('serve:dist', ['dist:package'], function() {

    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    /* If you use a proxy replace the previous code with the below script replacing 'yourlocal.dev' with your local proxy
       
        browserSync.init({
            proxy: 'yourlocal.dev'
        });

   */

    gulp.watch('./scss/*.scss', ['sass-watch']);

    gulp.watch('./public/images/*', ['image-watch']);

    gulp.watch('./public/**/*.html', ['html-watch']);

    gulp.watch('./public/js/**/*.js', ['js-watch']);

    gulp.watch('./bower_components/**/*.js', ['bower']);
});

gulp.task('dist:package', ['lcp','sass', 'bower','dist:js', 'uglify-js', 'image', 'image-min', 'html', 'dist:iife', 'index:dist']);


//TDD

/* Run test once and exit */

gulp.task('spec', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

/* Watch for file changes and re-run tests on each change */

gulp.task('serve:spec', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});
