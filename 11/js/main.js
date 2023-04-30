import {createDescriptionOfPhoto} from './data.js';
import {createThumbnail} from './thumbnails.js';
import {openForm} from './form.js';
import {addHandlersToZoomSettings} from './zoom.js';
import {filterEditor} from './filter.js';

const descriptionsOfPhotos = Array.from({length: 12}, createDescriptionOfPhoto);

createThumbnail(descriptionsOfPhotos);

openForm();
addHandlersToZoomSettings();
filterEditor();
