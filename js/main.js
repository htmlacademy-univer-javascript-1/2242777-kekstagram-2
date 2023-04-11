function getRandomInt (from, to) {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength (string, length) {
  return string.length <= length;
}

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

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)]

const createComment = () => ({
  id: getRandomInt(0, 99),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createTopic = () => ({
  id: 'будет изменено' ,
  url: 'будет изменено',
  description: 'фотография 9х12, с наивной подписью на память',
  likes: getRandomInt(15, 200),
  comments: createComment(),
});
const similarTopics = Array.from({length: TOPIC_COUNT}, createTopic);
similarTopics.forEach((item, index) => {
  item.id = index + 1;
  item.url = `photos/${index + 1}.jpg`;
  if (index>0) {
    item.comments.id = similarTopics[index-1].comments.id + getRandomNum(0, 5);
  }
});

console.log(similarTopics);
