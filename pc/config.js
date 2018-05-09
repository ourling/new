// 存放未编译的文件夹
//const ROOT_DEV = 'src-ecb';
const ROOT_DEV = 'src-model';
//const ROOT_DEV = 'src-do';
//const ROOT_DEV = 'src-waimai';
//const ROOT_DEV = 'src';
// 存放编译过后的文件夹
//const ROOT_DIST = 'dist-ecb';
const ROOT_DIST = 'dist-model';
//const ROOT_DIST = 'dist-do';
//const ROOT_DIST = 'dist-waimai';
//const ROOT_DIST = 'dist';
// 存放公共JS文件夹
const ROOT_PUBLIC = '../public';
// 存放公共CSS文件夹
const ROOT_PUBLICCSS = '../publicCss';


module.exports = {

    rootDev: ROOT_DEV,
    rootDist: ROOT_DIST,

    // 未编译的路径
    dev: {
        css: ROOT_DEV + '/css/**/*.css',
        scss: ROOT_DEV + '/scss/**/*.scss',
        fonts: ROOT_DEV + '/fonts/**/*.*',
        html: ROOT_DEV + '/html/**/*.html',
        images: [ROOT_DEV + '/images/**/*.{png,jpg,gif,ico}'],
        js: ROOT_DEV + '/js/**/*.js',
        es6: ROOT_DEV + '/js/**/*.es6',
        json: ROOT_DEV + '/json/**/*.*',
        publicJS: ROOT_PUBLIC + '/**/*.*',
        publicCss: ROOT_PUBLICCSS + '/**/*.*'
    },
    ignore: {
        js: '!' + ROOT_DEV + '/js/user/vue-waterfall.min.js'
    },
    //压缩文件
    distmin: {
        css: ROOT_DIST + '/css/**/*.css',
        images: [ROOT_DIST + '/images/**/*.{png,jpg,gif,ico}'],
        js: ROOT_DIST + '/js/**/*.js'
    },
    // 编译过后的路径
    dist: {
        css: ROOT_DIST + '/css/',
        fonts: ROOT_DIST + '/fonts/',
        html: ROOT_DIST + '/html/',
        images: ROOT_DIST + '/images/',
        js: ROOT_DIST + '/js/',
        json: ROOT_DIST + '/json/',
        publicJS: ROOT_DIST + '/plugins/',
        publicCss: ROOT_DIST + '/pluginsCss/'
    }
};
