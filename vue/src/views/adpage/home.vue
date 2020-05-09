<template>
  <div>
    <Header/>
    <div class="container">
      <section class="blog-list">
        <Content/>
      </section>
      <section class="hidden-mobile">
        <Aside/>
      </section>
    </div>
    <Comment/>
  </div>
</template>

<script>
import Header from '../../components/blog/header'
import Content from '../../components/blog/content'
import Aside from '../../components/blog/aside'
import Comment from '../../components/blog/comment'
import '../../../static/css/container.css'
import { queryRealEstateList } from '@/api/realEstate'
import { mapGetters } from 'vuex'
export default {
  name: 'Blog',
  components: {
    Header,
    Content,
    Aside,
    Comment
  },
  computed: {
    ...mapGetters([
      'accountId',
      'roles',
      'userName',
      'balance'
    ])
  },
  data() {
    return {
      contentImg: ''
    }
  },
  created() {
    const accountId = this.$route.params.id
    queryRealEstateList({ proprietor: accountId }).then(response => {
      if (response !== null) {
        console.log(response)
        this.contentImg = response[0].contentImg
        console.log(this.contentImg)
      }
      this.loading = false
    }).catch(_ => {
      this.loading = false
    })
  },
  methods: {
    getAdHref: function(val) {
      return val
    }
  }
}
</script>

<style scoped>
  .blog-list {
    border: 1px dashed burlywood;
    padding: 2px;
    border-radius: 20px;
    background-color: whitesmoke;
  }
</style>
