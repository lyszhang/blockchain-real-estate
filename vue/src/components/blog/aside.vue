<template>
  <div>
    <div class="aside-block">
      <el-card :body-style="{ padding: '0px' }">
        <el-avatar
          :size="70"
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          @error="errorHandler"
          fit="fill"
          style="margin:20px 140px auto;"
        >
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
        <div class="aside-btm">
          <span class="name">feige</span>
          <span class="aside-btm-tag">一生清贫怎敢如繁化</span>
          <div class="bottom clearfix">
            <div class="num">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <div class="text">
              <span>文章</span>
              <span>分类</span>
              <span>评论</span>
            </div>

          </div>
        </div>
      </el-card>
    </div>
    <div class="aside-block">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="aside-title">分类</span>
        </div>
        <ul class="type">
          <li v-for="(type,index) in data.data" :key="index">{{ type.typeName }}</li>
        </ul>
      </el-card>
    </div>
    <div class="demo-image__placeholder">
      <el-card class="box-card">
        <div class="block">
          <el-image :src="src" :preview-src-list="srcList" style="width: 300px; height: 250px" >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { request } from './common/requests'
export default {
  name: 'Aside',
  // eslint-disable-next-line vue/require-prop-types
  props: {
    contentImg: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      data: {},
      src: 'http://localhost:8000/file/bug.jpg',
      srcList: [
        'http://localhost:8000/file/bug.jpg'
      ]
    }
  },
  watch: {
    contentImg(newV, oldV) {
      console.log(newV)
    }
  },
  mounted() {
    console.log(this.contentImg)
  },
  created() {
    const config = {
      url: '/type/get_types',
      params: {
        page: 1,
        limit: 30,
        searchContent: null
      }
    }
    request(config)
      .then(response => {
        this.data = response.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    errorHandler: function() {
      return 'error'
    }
  }
}
</script>

<style scoped>
  .text {
    margin-left: 5px;
  }
  .num,.text {
    width: 160px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    font-weight: bolder;
    font-size: 20px;
    color: #66d9ef;
  }
  .aside-block {
    width: 345px;
    height: auto;
    margin-bottom: 10px;
  }
  .aside-btm {
    margin:0 115px auto;
    width: 340px;
  }
  .aside-btm .name {
    font-size: 25px;
    font-weight: 800;
    margin-left: 40px;
  }
  .aside-btm .aside-btm-tag {
    font-size: 20px;
    font-weight: bolder;
    margin-left: -29px;
  }
  .aside-btm .name,.aside-btm-tag {
    display: block;
    margin-bottom: 5px;
  }
  .bottom {
    margin-left: -19px;
  }
  .type {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .type li {
    font-weight: 700;
    font-size: 20px;
    margin: 5px;
    color: slategray;
    cursor: pointer;
  }
  .type li:hover {
    color: #409eff;
  }
  .aside-title,.article-title {
    font-size: 20px;
    font-weight: 700;
    color: slategray;
    margin-left: 120px;
  }
  .article {
    width: 340px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 30px auto;
    font-size: 20px;
    font-weight: 700;
    color: #888888;
  }
  .article li:hover {
    color: #e6db74;
    cursor: pointer;
  }
</style>
