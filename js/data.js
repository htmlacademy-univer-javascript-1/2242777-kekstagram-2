import { getRandomInt } from "./util";

const TOPIC_COUNT = 25;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Инокентий',
  'Ибрагим',
  'Геральт',
  'Аркадий',
  'Миягу',
  'Энайкин',
  'Совунья'
];

const getRandomElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const createComment = () => ({
  id: getRandomInt(0, 99),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES),
});

const generatePhotoDescription = () => ({
  return :{
    id: getRandomInt(1,25),
    url: `photos/${i}.jpg`,
    description: 'Хэштэг бьюти блог',
    likes: getRandomInt(15,200),
    comments:getRandomElement(MESSAGES),
  }
});

export {generatePhotoDescription};
