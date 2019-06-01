const { User } = require('../../models/user');
const { ObjectID } = require('mongodb');
const redis = require("redis");
const client = require('../../routes/helpers/redisClient')();;
const { trimMovie } = require('../../routes/helpers');

// User
const users = [
  {
    _id: '123456',
    _likes: ['20482'],
    _histories: [{
      _id: new ObjectID(),
      movie_id: '99999',
      created_at: new Date().getTime()
    }]
  }
];

const movies = [
  { title: '<b>괴물</b>',
  link: 'https://movie.naver.com/movie/bi/mi/basic.nhn?code=20482',
  image: 'https://ssl.pstatic.net/imgmovie/mdi/mit110/0272/27260_P22_125837.jpg',
  subtitle: 'Fight Club',
  pubDate: '1999',
  director: '데이빗 핀처|',
  actor: '브래드 피트|에드워드 노튼|헬레나 본햄 카터|',
  userRating: '8.88',
  movie_id: '20482' },
  { title: '<b>파이트 클럽</b>',
  link: 'https://movie.naver.com/movie/bi/mi/basic.nhn?code=99999',
  image: 'https://ssl.pstatic.net/imgmovie/mdi/mit110/0272/27260_P22_125837.jpg',
  subtitle: 'Fight Club',
  pubDate: '1999',
  director: '데이빗 핀처|',
  actor: '브래드 피트|에드워드 노튼|헬레나 본햄 카터|',
  userRating: '8.88',
  movie_id: '99999'
  }
]

const populateUsers = async done => {
  try {
    await User.deleteMany({});
    await User.insertMany(users);

    await client.hmsetAsync(users[0]._likes[0], trimMovie(movies[0]));
    await client.hmsetAsync(users[0]._histories[0].movie_id, trimMovie(movies[1]));

    done();
  } catch (e) {
    done(e);
  }
};

module.exports = { users, populateUsers, client };
