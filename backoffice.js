const params = new URLSearchParams(window.location.search);
const movieId = params.get("movieId");
const movieCategory = params.get("category");

window.onload = async () => {
  if (movieId) {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/movies/${movieCategory}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjNjMGQ0YmUzZDAwMTU4NDVmZTYiLCJpYXQiOjE2NjgwODQ2NzIsImV4cCI6MTY2OTI5NDI3Mn0.th59j7oiC_O44r-9CiBPXT06JHcIRfYqdq_Ew_isJJk",
        },
      }
    );
    const movies = await response.json();
    const movie = movies.find((movie) => movie._id === movieId);
    console.log(movies);
    let addMovie = document.getElementById("add-movie");
    addMovie.innerText = "Edit Movie";
    addMovie.classList.remove("btn-primary");
    addMovie.classList.add("btn-success");

    document.querySelector("#movie-name").value = movie.name;
    document.querySelector("#movie-description").value = movie.description;
    document.querySelector("#movie-category").value = movie.category;
    document.querySelector("#movie-image").value = movie.imageUrl;
  }
};

async function addNewMovie(event) {
  event.preventDefault();
  const newMovie = {
    name: document.querySelector("#movie-name").value,
    description: document.querySelector("#movie-description").value,
    category: document.querySelector("#movie-category").value.toLowerCase(),
    imageUrl: document.querySelector("#movie-image").value,
  };

  const options = {
    method: movieId ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjNjMGQ0YmUzZDAwMTU4NDVmZTYiLCJpYXQiOjE2NjgwODQ2NzIsImV4cCI6MTY2OTI5NDI3Mn0.th59j7oiC_O44r-9CiBPXT06JHcIRfYqdq_Ew_isJJk",
    },
    body: JSON.stringify(newMovie),
  };
  try {
    const endpoint = movieId
      ? `https://striveschool-api.herokuapp.com/api/movies/${movieId}`
      : "https://striveschool-api.herokuapp.com/api/movies/";

    const response = await fetch(endpoint, options);
    if (response.ok) {
      alert(
        movieId ? "Movie edited successfully!" : "Movie added successfully!"
      );
      document.querySelector("#movie-name").value = "";
      document.querySelector("#movie-description").value = "";
      document.querySelector("#movie-category").value = "";
      document.querySelector("#movie-image").value = "";
    } else {
      throw new Error("ERROR WHILE EXECUTING THE TRY BLOCK!");
    }
  } catch (error) {
    console.error(error);
  }
}
