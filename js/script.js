var app = new Vue (
    {
        el: '#root',

        data: {
            thisId: 0,
            userSearch: '',
            searchedMovie: [],
            searchedTv: [],
            previewPopular:[],
            previewTopRated:[],
            genreMovies: [],
            visibleTv: true,
            visibleMovie: true
        },

        methods: {


            //Converter vote in number from 1 to 5
            convertVote(data){

                let normalAverage = data.vote_average;

                let convertAverage = Math.ceil(normalAverage / 2);


                return convertAverage
            },

            //Return Home
            home() {
                
                this.searchedMovie = [];
                this.searchedTv = [];
            },

            //Show only Movies
            btnMovies(){

              this.visibleTv = false;
              this.visibleMovie = true;

            },

            //Show only Tv Series
            btnTv(){

              this.visibleMovie = false;
              this.visibleTv = true;

            },

            //Show All
            btnAll(){

                this.visibleMovie = true;
                this.visibleTv = true;
  
            },

            //search content after press button or enter
            searchEnter() {

              //Movie Api Call
              axios
                  .get('https://api.themoviedb.org/3/search/movie', {
                      params: {
                      api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                      query: this.userSearch,
                      language: 'it'
                  }
                  })
                  .then( (response) => {

                      const resultDataMovie = response.data.results;

                      this.searchedMovie = resultDataMovie;

                      this.lastSearch = this.userSearch;

                      this.userSearch ='';

                      this.searchedMovie.forEach(element => {

                          this.thisId = element.id

                          axios
                           .get('https://api.themoviedb.org/3/movie/' + this.thisId, {
                               params: {
                               api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                               append_to_response: 'credits'
                               }
                           })
                           .then( (response) => {

                             let genreMovieArray = [];
                             let castMovieArray = [];

                             this.genreMovieArray = response.data.genres;
                             this.genreMovies = this.genreMovieArray
                             console.log(genreMovieArray)

                           })

                      });

                  })

                  //Tv Series Api Call
                  axios
                      .get('https://api.themoviedb.org/3/search/tv', {
                          params: {
                          api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                          query: this.userSearch,
                          language: 'it'
                      }
                      })
                      .then( (response) => {

                          const resultDataTv = response.data.results;

                          this.searchedTv = resultDataTv

                          this.lastSearch = this.userSearch;

                          this.userSearch ='';

                          this.searchedTv.forEach(element => {

                              this.thisId = element.id

                              axios
                            .get('https://api.themoviedb.org/3/tv/' + this.thisId, {
                                params: {
                                api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                                append_to_response: 'credits'
                                }
                            })
                            .then( (response) => {

                              let genreTvArray = [];
                              let castTvArray = [];

                              this.genreTvArray = response.data.genres;
                            })

                          });

                      })

            },


        },

        mounted() {

            axios
                .get('https://api.themoviedb.org/3/movie/popular', {
                params: {
                api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                language: 'it'
             }
             })
                .then( (response) => {

                const popularData = response.data.results;

                this.previewPopular = popularData;

             });


             axios
                .get('https://api.themoviedb.org/3/movie/top_rated', {
                params: {
                api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                language: 'it'
             }
             })
                .then( (response) => {

                const topData = response.data.results;

                this.previewTopRated = topData;

             });

        }
    }
)
