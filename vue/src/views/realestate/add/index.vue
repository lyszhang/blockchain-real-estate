<template>
  <div class="app-container">
    <el-form ref="ruleForm" v-loading="loading" :model="ruleForm" :rules="rules" label-width="100px">

      <el-form-item label="业主" prop="proprietor">
        <el-select v-model="ruleForm.proprietor" placeholder="请选择业主" @change="selectGet">
          <el-option
            v-for="item in accountList"
            :key="item.accountId"
            :label="item.userName"
            :value="item.accountId"
          >
            <span style="float: left">{{ item.userName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.accountId }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="adState">
        <el-select v-model="ruleForm.adState" placeholder="请选择状态">
          <el-option label="使用中" value="使用中" />
          <el-option label="空白" value="空白" />
          <el-option label="维护中" value="维护中" />
        </el-select>
      </el-form-item>
      <el-form-item label="广告位链接" prop="adLink">
        <el-input style="width:200px" v-model="ruleForm.adLink" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { queryAccountList } from '@/api/account'
import { createRealEstate } from '@/api/realEstate'

export default {
  name: 'AddRealeState',
  data() {
    var checkArea = (rule, value, callback) => {
      callback()
    }
    return {
      ruleForm: {
        proprietor: '',
        adState: '',
        adLink: ''
      },
      accountList: [],
      rules: {
        proprietor: [
          { required: true, message: '请选择业主', trigger: 'change' }
        ],
        adState: [
          { validator: checkArea, trigger: 'blur' }
        ],
        adLink: [
          { validator: checkArea, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'accountId'
    ])
  },
  created() {
    queryAccountList().then(response => {
      if (response !== null) {
        // 过滤掉管理员
        this.accountList = response.filter(item =>
          item.userName !== '管理员'
        )
      }
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否立即创建?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.loading = true
            createRealEstate({
              accountId: this.accountId,
              proprietor: this.ruleForm.proprietor,
              adState: this.ruleForm.adState,
              adLink: this.ruleForm.adLink
            }).then(response => {
              this.loading = false
              if (response !== null) {
                this.$message({
                  type: 'success',
                  message: '创建成功!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '创建失败!'
                })
              }
            }).catch(_ => {
              this.loading = false
            })
          }).catch(() => {
            this.loading = false
            this.$message({
              type: 'info',
              message: '已取消创建'
            })
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    selectGet(accountId) {
      this.ruleForm.proprietor = accountId
    }
  }
}
</script>

<style scoped>
</style>
