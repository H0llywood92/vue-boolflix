var app = new Vue (
    {
        el: '#root',

        data: {
            userSearch: '',
            resultArray: []
        },

        methods: {

            //Converter vote in number from 1 to 5
            convertVote(data){

                let normalAverage = data.vote_average;

                let convertAverage = Math.ceil(normalAverage / 2);


                return convertAverage
            },


            searchEnter() {
                axios
                    .get('https://api.themoviedb.org/3/search/multi', {
                        params: {
                        api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                        query: this.userSearch,
                        language: 'it'
                    }
                    })
                    .then( (response) => {
            
                        const resultData = response.data.results;
            
                        this.resultArray = resultData;

                        this.userSearch ='';
                    })
               
            },
            

            
        },

        mounted() {

               

        }
    }
) 
