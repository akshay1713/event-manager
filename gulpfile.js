'use strict';
const gulp = require('gulp');
const concat = require('gulp-continuous-concat');
const watch = require('gulp-watch');


const scripts = {
	custom_js : [
				'redux_state_manager.js',
				'utils.js',
				'initialize.js'
	],
	views_js : [
				'navbar-view.js',
				'home-view.js',
				'team-view.js',
				'event-view.js'
	],
	external_js : [
					'react.js',
					'react-dom.js',
					'redux.js',
					'react-redux.js',
					'jquery.js',
					'routie.js'
	]
};

const files = [];
const external_files = [];
scripts['external_js'].forEach((script) => {
	external_files.push('client_scripts/external_js/'+script);
});
function add_files(type){
	scripts[type].forEach((script) => {
		files.push('client_scripts/'+type+'/'+script);
	});
}
files.push('client_scripts/start.js');
add_files('views_js');
add_files('custom_js');
files.push('client_scripts/end.js');

gulp.task('combine_custom', () => {
 	return gulp.src(files)
	 	.pipe(watch(files))
    	.pipe(concat('combined.js'))
    	.pipe(gulp.dest('public/js'));
});

gulp.task('combine_external', () => {
	return gulp.src(external_files)
		.pipe(watch(external_files))
		.pipe(concat('external.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('default',['combine_custom','combine_external']);
