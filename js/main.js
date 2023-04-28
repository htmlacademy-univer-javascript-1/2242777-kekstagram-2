import {createDescriptionOfPhoto} from './data.js';
import {createThumbnail} from './thumbnails.js';

const descriptionsOfPhotos = Array.from({length: 12}, createDescriptionOfPhoto);
createThumbnail(descriptionsOfPhotos);
