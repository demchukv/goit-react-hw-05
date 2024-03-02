
const theMovieDbUrl = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWM4NTM3N2M3MmY5OWY4NTIyNGVkMDA4NGY3MGRjYyIsInN1YiI6IjY1ZTE3ZDhkNTFmOTlhMDE4NTU4YWNkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fzxP-cvSEik5FqFUO24Aj7aRIyshPnBdu32rFJdn6r0',
    accept: 'application/json',
  }
};

const prepareUrl = (path, params) => {

  const searchParams = new URLSearchParams(params);
  const url = `${theMovieDbUrl}${path}?${searchParams}`;

  return { url, options };

}

export default prepareUrl;