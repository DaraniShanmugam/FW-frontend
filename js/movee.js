class MoveE {
  constructor(apiKey) {
    console.log("inside constructor");
    if (!apiKey) {
      console.error("API Key is required");
      return;
    }
    this.API_KEY = apiKey;
    this.BASE_URL = `http://www.omdbapi.com/?apikey=${this.API_KEY}&`;
    console.log(">>", this.BASE_URL);
  }

  async _baseRequest(url) {
    try {
      let response = await fetch(url);
      response = await response.json();
      // response = response.json();

      if (response.Response == "False") {
        console.log("false");
        return {
          success: false,
          message: response.Error
        };
      }

      return {
        success: true,
        data: response
      };
    } catch (err) {
      if (window["DEBUG"] === true) {
        console.error(err);
      }
      console.error(err);
      return {
        success: false,
        message: "Some error occurred"
      };
    }
  }

  async search(k, page) {
    //   return {
    //       success: true,
    //       data: {"Search":[{"Title":"Captain America: The First Avenger","Year":"2011","imdbID":"tt0458339","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg"},{"Title":"The Toxic Avenger","Year":"1984","imdbID":"tt0090190","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNzViNmQ5MTYtMmI4Yy00N2Y2LTg4NWUtYWU3MThkMTVjNjk3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"The Toxic Avenger Part II","Year":"1989","imdbID":"tt0098503","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BODhiNTljYTctMmIzZC00ZGVkLTk2NmItN2RjMzY3ZTYyNDczXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Citizen Toxie: The Toxic Avenger IV","Year":"2000","imdbID":"tt0212879","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMWI0NWY0ODUtNGY3Yy00ZDU1LTllYjUtMDFkYWEzZGQwY2I1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"The Toxic Avenger Part III: The Last Temptation of Toxie","Year":"1989","imdbID":"tt0098502","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNjVlNzFjMGItMTEwYy00OTc0LWFmY2ItM2U0MmQyYWI5Njk3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Avenger","Year":"2006","imdbID":"tt0473445","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTMzMjMwMjcyNl5BMl5BanBnXkFtZTcwNTA1NDgzMQ@@._V1_SX300.jpg"},{"Title":"Knives of the Avenger","Year":"1966","imdbID":"tt0059045","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYmM1NGI1M2QtYWU2Zi00N2RjLWJjODgtYjhkN2ViOWY2YmEzXkEyXkFqcGdeQXVyNTE1MTU0Mzc@._V1_SX300.jpg"},{"Title":"Samurai Avenger: The Blind Wolf","Year":"2009","imdbID":"tt1243972","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTAwNjc4MTkyNjBeQTJeQWpwZ15BbWU3MDg3NTQyMzI@._V1_SX300.jpg"},{"Title":"The Avenger","Year":"1962","imdbID":"tt0056174","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTY0NjM1NjgyNl5BMl5BanBnXkFtZTYwNzAyMjg5._V1_SX300.jpg"},{"Title":"The Avenger","Year":"1960","imdbID":"tt0054257","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNzU5YzM3MmEtNTE2MS00MzVjLWI5Y2EtNGU3M2YwMGYzMGQ0XkEyXkFqcGdeQXVyMDExMzA0Mw@@._V1_SX300.jpg"}],"totalResults":"102","Response":"True"}
    //   }
    if (k.length < 3) {
      return {
        success: false,
        message: "Search key must be at least 3 characters long."
      };
    }

    let url = `${this.BASE_URL}s=${k}`;

    if (page && typeof page == typeof 1 && page > 1 && page <= 100)
      url += `&page=${Math.floor(page)}`;

    return await this._baseRequest(url);
  }

  async getMovie(id) {
    //   return {
    //       success: false,
    //       message: "Some error!"
    //   }
    // return {
    //   success: true,
    //   data: {
    //     Title: "Coco",
    //     Year: "2017",
    //     Rated: "PG",
    //     Released: "22 Nov 2017",
    //     Runtime: "105 min",
    //     Genre: "Animation, Adventure, Family, Fantasy, Music, Mystery",
    //     Director: "Lee Unkrich, Adrian Molina(co-director)",
    //     Writer:
    //       "Lee Unkrich (original story by), Jason Katz (original story by), Matthew Aldrich (original story by), Adrian Molina (original story by), Adrian Molina (screenplay by), Matthew Aldrich (screenplay by)",
    //     Actors:
    //       "Anthony Gonzalez, Gael García Bernal, Benjamin Bratt, Alanna Ubach",
    //     Plot:
    //       "Despite his family's baffling generations-old ban on music, Miguel (voice of newcomer Anthony Gonzalez) dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz (voice of Benjamin Bratt). Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector (voice of Gael García Bernal), and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
    //     Language: "English, Spanish",
    //     Country: "USA",
    //     Awards: "Won 2 Oscars. Another 86 wins & 28 nominations.",
    //     Poster:
    //       "https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_SX300.jpg",
    //     Ratings: [
    //       { Source: "Internet Movie Database", Value: "8.4/10" },
    //       { Source: "Rotten Tomatoes", Value: "97%" },
    //       { Source: "Metacritic", Value: "81/100" }
    //     ],
    //     Metascore: "81",
    //     imdbRating: "8.4",
    //     imdbVotes: "303,592",
    //     imdbID: "tt2380307",
    //     Type: "movie",
    //     DVD: "27 Feb 2018",
    //     BoxOffice: "$208,487,719",
    //     Production: "Disney/Pixar",
    //     Website: "N/A",
    //     Response: "True"
    //   }
    // };
    console.log(this.BASE_URL);
    let url = `${this.BASE_URL}i=${id}&plot=full`;
    console.log(url);
    return await this._baseRequest(url);
  }
}
