const findOptimalMovie = movies => {
  return movies.filter(m => {
    const { title } = m;

    return title.indexOf('<b>') > -1 && title.split(/<\/?b>/).filter(temp => temp.length).length === 1;
  });
}

const testApiData = {items: [
  { title: '<b>괴물</b>' },
  { title: 'monster' },
  { title: '호수 <b>괴물</b>' }
]}

module.exports = { findOptimalMovie, testApiData };