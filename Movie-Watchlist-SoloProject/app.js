



    const SearchBtn = document.getElementById('SearchBtn')
    const Movies = document.getElementById('Movies')
    const MyListArr = []

    // Getting data from the api and render the data on the screen
    SearchBtn.addEventListener('click', async() => {

        const MovieTitleInput = document.getElementById("TitleInput").value
        const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=ca8b4e42&s=${MovieTitleInput}`)
        const data = await res.json()
           data.id = data
           Movies.innerHTML = ``
           data.Search.map( Movie => {
               const MovieFolder = document.createElement("div")
               MovieFolder.innerHTML = `
                             <div class="MovieInfo">

                                 <div class="MoviePosterContainer">
                                     <img class="ApiPoster" src="${Movie.Poster}">
                                 </div>

                                  <div class="InfoContainerColumn">
                                        <div class="TitleSection">
                                           <h2>${Movie.Title}</h2>
                                           <p> Year: ${Movie.Year}</p>
                                        </div>

                                         <div id="MidInfo" class="MidInfo">
                                            <i data-imdbid="${Movie.imdbID}" class="fa-solid fa-circle-plus"></i>
                                            <p>watchlist</p>
                                        </div>
                                  </div>
                              </div>
                           `
               Movies.append(MovieFolder)
           })
        // Listening for clicks on the plus icons and pushing the target data into a new array so i can display the added movies
        document.querySelectorAll(".fa-circle-plus").forEach((Plus) => {
            Plus.addEventListener("click", () => {
                const IMDB = Plus.dataset.imdbid
                const FindTargetArray = data.Search.find(Movie => Movie.imdbID === IMDB)
                 MyListArr.push(FindTargetArray)
            })

        })

        ClearInput()

    })

document.getElementById('MyMovieList').addEventListener("click", RenderWatchList)

    function RenderWatchList() {

         document.getElementById('searchBlock').innerHTML = ``
         Movies.innerHTML = ``

         document.getElementById("MovieHeader").innerHTML = `
          <header class="MyList-Header">
            <h1 class="MyList-Title"> My Movies </h1>
            <a href="main.html"> <i class="fa-solid fa-house"></i> </a>
          </header>  
         `
        MyListArr.forEach( ListedMovie => {
            const AddedMovies = document.createElement('div')
                AddedMovies.innerHTML = `
                             <div class="MovieInfo">

                                 <div>
                                     <img class="ApiPoster" src="${ListedMovie.Poster}">
                                 </div>

                                  <div class="InfoContainerColumn">
                                        <div class="TitleSection">
                                           <h2>${ListedMovie.Title}</h2>
                                           <p> Year: ${ListedMovie.Year}</p>
                                        </div>

                                         <div id="MidInfo" class="MidInfo">
                                            <i data-imdbid="${ListedMovie.imdbID}" class="fa-solid fa-minus"></i>
                                            <p>watchlist</p>
                                        </div>
                                  </div>
                      
                              </div>                  
                           `
                     Movies.append(AddedMovies)

                    AddedMovies.querySelector(".fa-minus").addEventListener('click', () => {
                        MyListArr.splice(0,1)
                        RenderWatchList()

                        if ( MyListArr.length === 0){
                            Movies.innerHTML = `
                            <h1 class="FilmIconText">
                                You have no movies in your List... Add some 
                            </h1>
                            `
                        }
                    })


        })

    }

    function ClearInput() {
        document.getElementById('TitleInput').value = ""
    }

