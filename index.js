// *TODO - IMPLEMENT CAROUSEL AND BUTTONS//
// const categoryContentCarousel = document.querySelector(
//   ".gallery-content-carousel"
// );

async function getMoviesCategory(category) {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/movies/${category}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjNjMGQ0YmUzZDAwMTU4NDVmZTYiLCJpYXQiOjE2NjgwODQ2NzIsImV4cCI6MTY2OTI5NDI3Mn0.th59j7oiC_O44r-9CiBPXT06JHcIRfYqdq_Ew_isJJk",
        },
      }
    );
    const movies = await response.json();
    console.log(movies);
    displayMovies(movies, category);
  } catch (err) {
    console.error(err.message);
  }
}

async function displayMovies(movies, category) {
  const categoryContent = document.getElementById(category);
  movies.forEach((movie) => {
    categoryContent.innerHTML += `
    <div class="col-md-2 ">
   <a href="details.html?movieId=${movie._id}&category=${movie.category}"><img class="movie-cover" src="${movie.imageUrl}"/></a> 
  </div>`;
  });
}

getMoviesCategory("drama");
getMoviesCategory("comedy");
getMoviesCategory("horror");
