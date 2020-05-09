<template>
  <div>
    <div id="wrapper" class="typo typo-selection js-toc-content blog-content" style="font-size: 20px!important;">
      <div>
        <div v-html="blog.content" />
      </div>
    </div>
    <div class="aside-btn">
      <el-popover placement="left-end" width="260" trigger="click" title="目录">
        <ol class="js-toc" />
        <el-button
          slot="reference"
          type="info"
          size="mini"
          round
          style="margin-left:7px;margin-top:5px;width:55px;height:26px;"
        >目录
        </el-button>
      </el-popover>
      <a href="#comment" class="comment-a">评论</a>
      <a href="#" class="top-a">
        <i class="el-icon-top" />
      </a>
    </div>
  </div>
</template>

<script>
import '../../../static/css/typo.css'
import '../../../static/css/prism.css'
import Prism from '../../../static/js/prism'
import 'tocbot/dist/tocbot.min.js'
import 'tocbot/dist/tocbot.css'
import { request } from './common/requests'
export default {
  name: 'Content',
  data() {
    return {
      blog: {}
    }
  },
  created() {
    const config = {
      url: '/blog/get_blog/' + this.$route.params.id
    }
    request(config).then(response => {
      this.blog = response.data.data
      console.log(this.blog)
      setTimeout(function() {
        Prism.highlightAll()
        tocbot.init({
          // Where to render the table of contents.
          tocSelector: '.js-toc',
          // Where to grab the headings to build the table of contents.
          contentSelector: '.js-toc-content',
          // Which headings to grab inside of the contentSelector element.
          headingSelector: 'h1, h2, h3',
          // For headings inside relative or absolute positioned containers within content.
          hasInnerContainers: true
        })
      }, 10)
    }).catch(err => {
      console.log(err)
    })
    // console.log(this.$route.params.id);
    // this.$axios.get("http://localhost:8080/blog/getBlog",{
    // 	params: {
    // 		title: this.$route.params.id
    // 	}
    // }).then(response => {
    // 	this.blog = response.data;
    // 	setTimeout(function () {
    // 		Prism.highlightAll();
    // 		tocbot.init({
    // 			// Where to render the table of contents.
    // 			tocSelector: ".js-toc",
    // 			// Where to grab the headings to build the table of contents.
    // 			contentSelector: ".js-toc-content",
    // 			// Which headings to grab inside of the contentSelector element.
    // 			headingSelector: "h1, h2, h3",
    // 			// For headings inside relative or absolute positioned containers within content.
    // 			hasInnerContainers: true
    // 		});
    // 	},10);
    // }).catch(err => {
    // 	console.log(err);
    // });
  },
  methods: {
  }
}
</script>

<style scoped>
  .aside-btn {
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: space-around;
    width: 70px;
    height: 109px;
    background-color: rgb(233, 225, 220);
    right: 10px;
    bottom: 30px;
    margin-right: 0;
    margin-left: auto;
    position: fixed;
    font-weight: bolder;
    font-size: 12px;
  }
  .aside-btn a {
    width: 55px;
    height: 25px;
    margin: auto;
    text-align: center;
    border-radius: 20px;
    text-decoration: none;
  }
  .aside-btn .comment-a {
    margin-top: 10px;
    background-color: #303133;
    color: white;
  }
  .aside-btn .top-a {
    background-color: #409eff;
    color: white;
  }
  .blog-content {
    margin: auto;
    overflow-x: auto;
  }
</style>
