var app = new Vue (
    {
        el: '#root',

        data: {
            userSearch: '',
            resultArray: []
        },

        methods: {

            searchEnter() {
                axios
                .get('https://api.themoviedb.org/3/search/multi', {
                params: {
                api_key: 'a21d6a53ae3ba4432e6ec0b5967e1ce3',
                query: this.userSearch
                }
                })
                .then( (response) => {
            
                const resultData = response.data.results;
            
                this.resultArray = resultData;
                })

            },

            
        },

        mounted() {

               

        }
    }
) 
