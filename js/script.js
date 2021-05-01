var app = new Vue (
    {
        el: '#root',

        data: {
            thisId: 0,
            userSearch: '',
            serchedMovie: [],
            serchedTv: [],
            previewPopular:[],
            previewTopRated:[],
        },

        methods: {

            //Converter vote in number from 1 to 5
            convertVote(data){

                let normalAverage = data.vote_average;

                let convertAverage = Math.ceil(normalAverage / 2);


                return convertAverage
            },


            //search content after press button or enter
            searchEnter() {
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

                      this.serchedMovie = resultDataMovie;

                      console.log(this.serchedMovie)

                      this.userSearch ='';

                      this.serchedMovie.forEach(element => {

                          this.thisId = element.id

                          axios
                           .get('https://api.themoviedb.org/3/movie/' + this.thisId, {
                               params: {
                               api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                               append_to_response: 'credits'
                               }
                           })
                           .then( (response) => {



                           })

                      });

                  })

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

                          this.serchedTv = resultDataTv
                          console.log(this.serchedTv)

                          this.userSearch ='';

                          this.serchedTv.forEach(element => {

                              this.thisId = element.id

                              axios
                            .get('https://api.themoviedb.org/3/tv/' + this.thisId, {
                                params: {
                                api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                                append_to_response: 'credits'
                                }
                            })
                            .then( (response) => {


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
