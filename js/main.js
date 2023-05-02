
import {openForm} from './form.js';
import {addHandlersToZoomSettings} from './zoom.js';
import {getData} from './server.js';
import {createThumbnails} from './thumbnails.js';
import {imageFiltering} from './filters.js';

getData(createThumbnails);
getData(imageFiltering);
openForm();
addHandlersToZoomSettings();

