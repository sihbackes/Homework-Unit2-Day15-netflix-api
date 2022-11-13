const params = new URLSearchParams(window.location.search);
const movieId = params.get("movieId");
const movieCategory = params.get("category");

async function getMovie() {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/movies/${movieCategory}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjNjMGQ0YmUzZDAwMTU4NDVmZTYiLCJpYXQiOjE2NjgwODQ2NzIsImV4cCI6MTY2OTI5NDI3Mn0.th59j7oiC_O44r-9CiBPXT06JHcIRfYqdq_Ew_isJJk",
      },
    }
  );
  const movies = await response.json();
  const movie = movies.find((movie) => movie._id === movieId);
  console.log(movie);
  return movie;
}

function renderMovie(movie) {
  const boxContent = document.querySelector("#movie-details");
  console.log(boxContent);
  boxContent.innerHTML = `
  <img src="${movie.imageUrl}" class="card-img-top img-details" alt="${movie.name}" />
  <h1 class="display-4">${movie.name}</h1>
  <p>${movie.description}</p>
  <h3 class="mb-3">${movie.category}£<h3>
  <h6 class="pl-2 py-3 bg-light">Server Details</h6>
  <ul class="list-group list-group-flush mb-4">
    <li class="list-group-item pl-2"><b>id: </b>${movie._id}</li>
    <li class="list-group-item pl-2"><b>createdAt: </b>${movie.createdAt}</li>
    <li class="list-group-item pl-2"><b>updatedAt: </b>${movie.updatedAt}</li>
  </ul>`;
}
window.onload = async () => {
  const movie = await getMovie();
  renderMovie(movie);
};

async function onDelete() {
  try {
    if (confirm("Do you really want to delete this movie?")) {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjNjMGQ0YmUzZDAwMTU4NDVmZTYiLCJpYXQiOjE2NjgwODQ2NzIsImV4cCI6MTY2OTI5NDI3Mn0.th59j7oiC_O44r-9CiBPXT06JHcIRfYqdq_Ew_isJJk",
        },
      };
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/movies/${movieId}`,
        options
      );
      if (response.ok) {
        window.location.assign("index.html");
      } else {
        alert("Error while deleting!");
      }
    }
  } catch (error) {
    alert(`Some erorr occured: ${error}`);
  }
}

function onEdit() {
  window.location.assign(
    `backoffice.html?movieId=${movieId}&category=${movieCategory}`
  );
}
