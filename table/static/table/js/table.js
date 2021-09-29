const table = {
    template: `
      <div class="container-fluid">
        <table class="table table-hover table-bordered mt-3 text-center">
          <thead>
            <tr>
              <th scope="col" class="col-3">Date</th>
              <th scope="col" class="col-3">Title</th>
              <th scope="col" class="col-3">Quantity</th>
              <th scope="col" class="col-3">Distance</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="el in tables">
            <td>[[ el.date ]]</td>
            <td>[[ el.title ]]</td>
            <td>[[ el.quantity ]]</td>
            <td>[[ el.distance ]]</td>
          </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-center buttons mb-3">
          <template v-if="showPrevButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" @click="loadPrev()" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
          </template>
          <template v-if="showNextButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" @click="loadNext()" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
            </svg>
          </template>
        </div>
        <hr>
        <div class="d-flex justify-content-center">
        <form @submit.prevent="searchTable" class="mt-5">
          <h3 class="text-center mb-2">Search</h3>
            <select class="form-control mb-2 w-100" v-model="searchColumn">
              <option disabled value="">Please select column</option>
              <option value="title">Title</option>
              <option value="quantity">Quantity</option>
              <option value="distance">Distance</option>
            </select>
            <div v-if="searchColumn == 'title'">
            <select class="form-control mb-2" v-model="searchTerm">
              <option disabled>Please select option</option>
              <option value="">Contains</option>
              <option value="=">Exact match</option>
            </select>
            </div>
            <div v-else-if="searchColumn == 'quantity'">
              <select class="form-control mb-2" v-model="lteORgteQuantity">
                  <option disabled>Please select option</option>
                  <option value="">Contains</option>
                  <option value="=">Exact match</option>
                  <option value="qgte">GTE</option>
                  <option value="qlte">LTE</option>
              </select>
            </div>

            <div v-else-if="searchColumn == 'distance'">
              <select class="form-control mb-2" v-model="lteORgteDistance">
                  <option disabled>Please select option</option>
                  <option value="">Contains</option>
                  <option value="=">Exact match</option>
                  <option value="dgte">GTE</option>
                  <option value="dlte">LTE</option>
              </select>
            </div>
            <div v-if="searchColumn != '' ">
                <input v-model="searchQuery" placeholder="Value" class="form-control">
            </div>
            <div class="d-flex justify-content-center my-3">
                <button class="btn btn-secondary">search</button>
            </div>
          </form>
        </div>

      </div>
    `,
    data (){
        return{
            tables: [],
            currentPage: 1,
            searchQuery: "",
            searchColumn: "",
            searchTerm: "",
            lteORgteQuantity: "",
            lteORgteDistance: "",
            showNextButton: false,
            showPrevButton: false,
        }
    },

    methods:{
        loadThis() {
            this.currentPage
            this.getTable()
        },
        loadNext() {
            this.currentPage ++
            this.getTable()
        },
        loadPrev() {
            this.currentPage --
            this.getTable()
        },
        getTable() {
            let fetchQuery;
            if (this.lteORgteDistance == 'dgte' || this.lteORgteDistance == 'dlte') {
                fetchQuery = fetch(`/table/?page=${this.currentPage}&?search=&search_fields&${this.lteORgteDistance}=${this.searchQuery}`)
            } else if (this.lteORgteQuantity == 'qgte' || this.lteORgteQuantity == 'qlte') {
                fetchQuery = fetch(`/table/?page=${this.currentPage}&?search=&search_fields&${this.lteORgteQuantity}=${this.searchQuery}`)
            } else {
                fetchQuery = fetch(`/table/?page=${this.currentPage}&search=${this.searchQuery}&search_fields=${this.searchTerm}${this.lteORgteDistance}${this.lteORgteQuantity}${this.searchColumn}`)
            }
            fetchQuery.then((response) => {
                return response.json()
            })
            .then(data => {

                this.showPrevButton = false
                if (data.previous) {
                    this.showPrevButton = true
                }

                this.showNextButton = false
                if (data.next) {
                    this.showNextButton = true
                }

                this.tables = data.results
            })
        },
        searchTable() {
            this.getTable()
            this.lteORgteDistance = ""
            this.lteORgteQuantity = ""
            this.searchTerm = ""
        },
    },
    delimiters: ['[[', ']]'],
    mounted: function(){
        this.getTable();
    }
}