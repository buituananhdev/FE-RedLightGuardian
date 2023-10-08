<template>
  <div class=''>
    <div class='container px-0'>
      <div style="display: flex; justify-content: center; flex-direction: row;">
        <client-only>
          <v-paginate v-model="currentPage" :page-count="pageCount" :click-handler="onClickPage" :page-range="3"
            :prev-text="iconPrev" :first-last-button="true" :first-button-text="null" :last-button-text="null"
            :next-text="iconNext" :container-class="'pagination'" :page-class="'page-item'"
            :page-link-class="'page-link'" :prev-class="'page-item'" :prev-link-class="'page-link'"
            :next-class="'page-item'"  :next-link-class="'page-link'">
          </v-paginate>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  props: ['baseUrl', 'optionParam', 'ClassObject', 'paging', 'startFetch', 'startPageCount'],
  data() {
    return {
      currentPage: 1,
      pageCount: 10,
      objectResults: [],
      isBeforeFetch: false,
      isPage1Loading: false,
      fetchingData: true,
      startPageCountData: 0,
      // iconFirst: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			// 					<path d="M11 17.9999L12 16.9999L7.00005 11.9999L12 7L11 6L5 11.9999L11 17.9999Z" fill="#8D92AA"/>
			// 					<path opacity="0.5" d="M18 17.9999L19 16.9999L14.0001 11.9999L19 7L18 6L12 11.9999L18 17.9999Z" fill="#8D92AA"/>
			// 				</svg>
			// 				`,
      // iconLast: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			// 					<path d="M13 6.00014L12 7.00014L16.9999 12.0001L12 17L13 18L19 12.0001L13 6.00014Z" fill="#8D92AA"/>
			// 					<path opacity="0.5" d="M6 6.00014L5 7.00014L9.99995 12.0001L5.00003 17L6.00003 18L12 12.0001L6 6.00014Z" fill="#8D92AA"/>
			// 				</svg>`,
      iconNext: 
      `
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1524_24914)">
        <path d="M7.65625 13.825L11.4729 10L7.65625 6.175L8.83125 5L13.8313 10L8.83125 15L7.65625 13.825Z" fill="#707EAE"/>
        </g>
        <defs>
        <clipPath id="clip0_1524_24914">
        <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
        </clipPath>
        </defs>
      </svg>
      `
      ,
      iconPrev: 
      `
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1524_15824)">
        <path d="M13.3391 13.825L9.5224 10L13.3391 6.175L12.1641 5L7.16406 10L12.1641 15L13.3391 13.825Z" fill="#707EAE"/>
        </g>
        <defs>
        <clipPath id="clip0_1524_15824">
        <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
        </clipPath>
        </defs>
      </svg>
      `
    }
  },

  watch: {
    "$route.query": function (newVal, oldVal) {
      if (newVal?.hasOwnProperty('page')) {
        this.isPage1Loading = false;
        this.currentPage = newVal.page ? +newVal.page : this.currentPage;
      } else {
        this.currentPage = 1;
        this.isPage1Loading = true;
      }
      this.fetchingData = true;
      this.startPageCountData = 0;
      this.fetchData();
    }
  },

  async fetch() {
    try {
      this.$emit('before-fetch', true);
      this.currentPage = this.$route.query.page ? +this.$route.query.page : this.currentPage;
      if (!this.fetchingData || !this.baseUrl) {
        if (this.startPageCountData) {
          this.pageCount = this.startPageCountData;
        } else {
          this.pageCount = 0;
        }
        this.$emit('before-fetch', false);
        return;
      }
      this.isBeforeFetch = true;
      if (this.currentPage === 1 && this.isPage1Loading) {
        this.$emit('before-fetch', this.isBeforeFetch);
      }
      var queryParam = this.$route.query;
      console.log("queryParam")
      console.log(queryParam); 
      console.log("querySearch1")
      var querySearch = this.stringifyQuery(queryParam);
      console.log("querySearch", querySearch);
      const result = await this.$axios.$get(`${this.baseUrl}?${querySearch ? querySearch : ('page=' + this.currentPage)}&paging=${this.paging}${this.optionParam ? ('&' + this.optionParam) : ''}`);
      console.log("result", result);
      this.objectResults = result['data'];
      this.pageCount = result['meta']['total_pages'];
      this.isBeforeFetch = false;
      this.$emit('before-fetch', this.isBeforeFetch);
      this.$emit('fetch-success', this.objectResults);
      this.$emit('total-count', result['meta']['total_count']);
      console.log("result2", result);
    } catch (error) {
      console.log("error", error);
      this.$emit('fetch-error', false);
    }
  },
  created() {
    this.fetchingData = this.startFetch;
    this.startPageCountData = this.startPageCount;
  },
  mounted() {

  },

  methods: {
    stringifyQuery(query) {
      try{
        var result = qs.stringify(query);
      return result ? result : "";
      }catch(e){
        console.log("errrrrrrrrrrrrr")
      }

    },
    async fetchData() {
      try {
        console.log("fetchhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        this.$emit('before-fetch', true);
        this.currentPage = this.$route.query.page ? +this.$route.query.page : this.currentPage;
        console.log('current page: ' + this.currentPage);
        if (!this.fetchingData || !this.baseUrl) {
          if (this.startPageCountData) {
            this.pageCount = this.startPageCountData;
          } else {
            this.pageCount = 0;
          }
          this.$emit('before-fetch', false);
          return;
        }
        this.isBeforeFetch = true;
        if (this.currentPage === 1 && this.isPage1Loading) {
          this.$emit('before-fetch', this.isBeforeFetch);
        }
        var queryParam = this.$route.query;
        var querySearch = this.stringifyQuery(queryParam);
        const result = await this.$axios.$get(`${this.baseUrl}?${querySearch ? querySearch : ('page=' + this.currentPage)}&paging=${this.paging}${this.optionParam ? ('&' + this.optionParam) : ''}`);
        console.log("dataFetch", result)
        this.objectResults = result['data'];
        this.pageCount = result['meta']['total_pages'];
        this.isBeforeFetch = false;

        this.$emit('before-fetch', this.isBeforeFetch);
        this.$emit('fetch-success', this.objectResults);
        this.$emit('total-count', result['meta']['total_count']);
      } catch (error) {
        this.$emit('fetch-error', false);
      }
    },
    onClickPage(pageNum) {
      this.$router.push({
        name: this.$route.name || '',
        params: this.$route.params || {},
        query: { ...this.$route.query, page: pageNum },
        hash: this.$route.hash
      });
      setTimeout(() => {
        this.$emit('click-page');
      });
    }
  },
}

</script>
<style lang="scss" scoped>

</style>