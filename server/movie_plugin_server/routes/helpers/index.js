const config = require('../../config');

const findOptimalMovie = movies => {
  return movies.filter(m => {
    const { title } = m;

    return title.indexOf('<b>') > -1 && title.split(/<\/?b>/).filter(temp => temp.length).length === 1;
  });
}

const movieApiReq = async q => {
  const { data } = await axios(
    `https://openapi.naver.com/v1/search/movie.json?query=${encodeURI(
      q
    )}`,
    {
      headers: {
        'X-Naver-Client-Id': config.NAVER_API.CLIENT_ID,
        'X-Naver-Client-Secret': config.NAVER_API.CLIENT_SECRET
      }
    }
  );

  return data;
}

const testApiData = {items: [
  { title: '<b>괴물</b>',
  link: 'https://movie.naver.com/movie/bi/mi/basic.nhn?code=27260',
  image: 'https://ssl.pstatic.net/imgmovie/mdi/mit110/0272/27260_P22_125837.jpg',
  subtitle: 'Fight Club',
  pubDate: '1999',
  director: '데이빗 핀처|',
  actor: '브래드 피트|에드워드 노튼|헬레나 본햄 카터|',
  userRating: '8.88' },
  { title: 'monster',
  link: 'https://movie.naver.com/movie/bi/mi/basic.nhn?code=27260',
  image: 'https://ssl.pstatic.net/imgmovie/mdi/mit110/0272/27260_P22_125837.jpg',
  subtitle: 'Fight Club',
  pubDate: '1999',
  director: '데이빗 핀처|',
  actor: '브래드 피트|에드워드 노튼|헬레나 본햄 카터|',
  userRating: '8.88' },
  { title: '호수 <b>괴물</b>',
  link: 'https://movie.naver.com/movie/bi/mi/basic.nhn?code=27260',
  image: 'https://ssl.pstatic.net/imgmovie/mdi/mit110/0272/27260_P22_125837.jpg',
  subtitle: 'Fight Club',
  pubDate: '1999',
  director: '데이빗 핀처|',
  actor: '브래드 피트|에드워드 노튼|헬레나 본햄 카터|',
  userRating: '8.88' }
]}

module.exports = { findOptimalMovie, testApiData, movieApiReq };