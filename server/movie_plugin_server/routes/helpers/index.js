const findOptimalMovie = movies => {
  return movies.filter(m => {
    const { title } = m;

    return title.indexOf('<b>') > -1 && title.split(/<\/?b>/).filter(temp => temp.length).length === 1;
  });
}

module.exports = { findOptimalMovie };