import bootstrap from './bootstrap';

import './sass/app.css';


if (ENV !== 'production') {
  // init live reload
  document.write(
    `<script src="http://${(location.host || 'localhost').split(':')[0]}` +
    `:35729/livereload.js?snipver=1"></script>`
  );
}

bootstrap();
