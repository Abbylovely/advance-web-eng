class Movie{
    constructor(title,director,year){
        this.title=title
        this.director=director
        this.year=year
    }
}
const default_movies=[
    {
    title: 'Jurassic Park',
    director: 'John Doe',
    year: '1990'
  },
  {
    title:'mean girls',
    direction:'Abigail N',
    year:'2011'
  },
  {
    title: 'The Dead Pool',
    director: 'Mathew Albison',
    year: '2014'
  },
  {
    title: 'The Avengers',
    director: 'Joss Whedon',
    year: '2012'
  }
]
class UI{
  static addMovieToList = (movie) => {
    const list = document.getElementById('movie-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${movie.title}</td><td>${movie.director}</td><td>${movie.year}</td>`
    list.appendChild(row)
  }
  static displayMovies = () => {
    defaultMovies.forEach(movie => UI.addMovieToList(movie))
  }  
}
UI.displayMovies()