var app = new Vue (
    {
        el: '#root',

        data: {
            //User Search
            userSearch: '',

            //Result Movies founded
            searchedMovie: [],

            //Result Tv Series founded
            searchedTv: [],

            //Popular Movies & Tv Series in home
            previewPopular:[],
            previewTopRated:[],

            //Cast Movies & Tv Series
            castMovies: [],
            castTv: [],

            //Visible for Movies & Tv Series
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

                      this.userSearch ='';

                      resultDataMovie.forEach(element => {

                          axios
                           .get('https://api.themoviedb.org/3/movie/' + element.id, {
                               params: {
                               api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                               append_to_response: 'credits'
                               }
                           })
                           .then( (response) => {

                            element.genre = response.data.genres.slice(0, 2);
                            element.cast = response.data.credits.cast.slice(0, 5);

                            this.searchedMovie.push(element)
                           })
                           this.searchedMovie = [];
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

                          this.userSearch ='';

                          resultDataTv.forEach(element => {

                              axios
                            .get('https://api.themoviedb.org/3/tv/' + element.id, {
                                params: {
                                api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                                append_to_response: 'credits'
                                }
                            })
                            .then( (response) => {


                                element.genre = response.data.genres.slice(0, 2);
                                element.cast = response.data.credits.cast.slice(0, 5);

                                this.searchedTv.push(element);
                            })
                            this.searchedTv = [];

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
