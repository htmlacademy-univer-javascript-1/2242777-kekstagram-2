import { getRandomInt } from './util';

const TOPIC_COUNT = 25;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = ['хэштег бьюти блог', 'подпись для лайков', 'котэ'];

const NAMES = [
  'Инокентий',
  'Ибрагим',
  'Геральт',
  'Аркадий',
  'Миягу',
  'Энайкин',
  'Совунья'
];

const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

const generateId = getRandomInt(1,TOPIC_COUNT);
const generatePhotoId = getRandomInt(1,TOPIC_COUNT);
const generateCommentId = getRandomInt(1, 300);

const createComment = () => ({
  return :{
    id: generateCommentId,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES),
  }
});

const generatePhotoDescription = () => ({
  return :{
    id: generateId,
    url: `./photos/${generatePhotoId}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInt(15,200),
    comments:Array.from({length: getRandomInt(1, 30)}, createComment),
  }
});

const numberPhotoUsers = Array.from({ length: TOPIC_COUNT }, generatePhotoDescription);

export {numberPhotoUsers,createComment,generatePhotoDescription};
