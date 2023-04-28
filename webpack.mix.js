let mix = require('laravel-mix');

mix.js('src/js/app.js', 'js');

mix.sass('src/sass/main.scss', 'css')
    .options({
        processCssUrls: false
    });

mix.copy('src/fonts/*', 'dist/fonts')
mix.copy('src/images/*', 'dist/images');
mix.copy('src/images/icons/*', 'dist/images/icons');
mix.version();

mix.setPublicPath('dist');