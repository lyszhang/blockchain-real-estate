(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-683ba244"],{"1c0b":function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"c",(function(){return o}));var n=a("b775");function i(t){return Object(n["a"])({url:"/createRealEstate",method:"post",data:t})}function o(t){return Object(n["a"])({url:"/queryRealEstateList",method:"post",data:t})}},"2e4e":function(t,e,a){"use strict";(function(t){a("8e6e"),a("ac6a"),a("456d");var n=a("bd86"),i=a("2f62"),o=a("5723"),r=a("1c0b"),l=a("945e"),s=a("8d49");function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function u(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){Object(n["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}e["a"]={name:"RealeState",data:function(){var e=function(t,e,a){e<=0?a(new Error("必须大于0")):a()};return{loading:!0,loadingDialog:!1,realEstateList:[],dialogCreateSelling:!1,dialogCreatePublishing:!1,dialogCreateDonating:!1,realForm:{price:0,salePeriod:0},rules:{price:[{validator:e,trigger:"blur"}],salePeriod:[{validator:e,trigger:"blur"}]},DonatingForm:{proprietor:""},rulesDonating:{proprietor:[{required:!0,message:"请选择业主",trigger:"change"}]},publishForm:{picImg:t},accountList:[],uploadActionUrl:"http://localhost:8000/api/v1/upload",uploadData:{accountId:this.accountId,objectOfSale:""},valItem:{}}},computed:u({},Object(i["b"])(["accountId","roles","userName","balance"])),created:function(){var t=this;"admin"===this.roles[0]?Object(r["c"])().then((function(e){null!==e&&(t.realEstateList=e),t.loading=!1})).catch((function(e){t.loading=!1})):Object(r["c"])({proprietor:this.accountId}).then((function(e){null!==e&&(t.realEstateList=e),t.loading=!1})).catch((function(e){t.loading=!1}))},methods:{getAdHref:function(t){return t},openDialog:function(t){this.dialogCreateSelling=!0,this.valItem=t},openPublishDialog:function(t){this.dialogCreatePublishing=!0,this.valItem=t},openDonatingDialog:function(t){var e=this;this.dialogCreateDonating=!0,this.valItem=t,Object(o["b"])().then((function(t){null!==t&&(e.accountList=t.filter((function(t){return"管理员"!==t.userName&&t.accountId!==e.accountId})))}))},createSelling:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;e.$confirm("是否立即出租?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then((function(){e.loadingDialog=!0,Object(l["a"])({objectOfSale:e.valItem.realEstateId,seller:e.valItem.proprietor,price:e.realForm.price,salePeriod:e.realForm.salePeriod}).then((function(t){e.loadingDialog=!1,e.dialogCreateSelling=!1,null!==t?e.$message({type:"success",message:"出租成功!"}):e.$message({type:"error",message:"出租失败!"}),setTimeout((function(){window.location.reload()}),1e3)})).catch((function(t){e.loadingDialog=!1,e.dialogCreateSelling=!1}))})).catch((function(){e.loadingDialog=!1,e.dialogCreateSelling=!1,e.$message({type:"info",message:"已取消出租"})}))}))},getfileData:function(){return this.uploadData.accountId=this.accountId,this.uploadData.objectOfSale=this.valItem.realEstateId,this.uploadData},createPublishing:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;e.$confirm("是否立即发布?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then((function(){e.loadingDialog=!0,Object(r["publishOnRealEstate"])({accountId:e.accountId,objectOfSale:e.valItem.realEstateId,img:e.publishForm.picImg}).then((function(t){e.loadingDialog=!1,e.dialogCreatePublishing=!1,null!==t?e.$message({type:"success",message:"发布成功!"}):e.$message({type:"error",message:"发布失败!"}),setTimeout((function(){window.location.reload()}),1e3)})).catch((function(t){e.loadingDialog=!1,e.dialogCreatePublishing=!1}))})).catch((function(){e.loadingDialog=!1,e.dialogCreatePublishing=!1,e.$message({type:"info",message:"已取消发布"})}))}))},createDonating:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;e.$confirm("是否立即捐赠?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then((function(){e.loadingDialog=!0,Object(s["a"])({objectOfDonating:e.valItem.realEstateId,donor:e.valItem.proprietor,grantee:e.DonatingForm.proprietor}).then((function(t){e.loadingDialog=!1,e.dialogCreateDonating=!1,null!==t?e.$message({type:"success",message:"捐赠成功!"}):e.$message({type:"error",message:"捐赠失败!"}),setTimeout((function(){window.location.reload()}),1e3)})).catch((function(t){e.loadingDialog=!1,e.dialogCreateDonating=!1}))})).catch((function(){e.loadingDialog=!1,e.dialogCreateDonating=!1,e.$message({type:"info",message:"已取消捐赠"})}))}))},resetForm:function(t){this.$refs[t].resetFields()},selectGet:function(t){this.DonatingForm.proprietor=t}}}}).call(this,"/index.js")},"49fc":function(t,e,a){"use strict";var n=a("4b94"),i=a.n(n);i.a},"4b94":function(t,e,a){},"8d49":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"d",(function(){return r})),a.d(e,"a",(function(){return l}));var n=a("b775");function i(t){return Object(n["a"])({url:"/queryDonatingList",method:"post",data:t})}function o(t){return Object(n["a"])({url:"/queryDonatingListByGrantee",method:"post",data:t})}function r(t){return Object(n["a"])({url:"/updateDonating",method:"post",data:t})}function l(t){return Object(n["a"])({url:"/createDonating",method:"post",data:t})}},"945e":function(t,e,a){"use strict";a.d(e,"c",(function(){return i})),a.d(e,"d",(function(){return o})),a.d(e,"b",(function(){return r})),a.d(e,"e",(function(){return l})),a.d(e,"a",(function(){return s}));var n=a("b775");function i(t){return Object(n["a"])({url:"/querySellingList",method:"post",data:t})}function o(t){return Object(n["a"])({url:"/querySellingListByBuyer",method:"post",data:t})}function r(t){return Object(n["a"])({url:"/createSellingByBuy",method:"post",data:t})}function l(t){return Object(n["a"])({url:"/updateSelling",method:"post",data:t})}function s(t){return Object(n["a"])({url:"/createSelling",method:"post",data:t})}},e825:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-alert",{attrs:{type:"success"}},[a("p",{attrs:{align:"left"}},[t._v("账户ID: "+t._s(t.accountId))]),t._v(" "),a("p",{attrs:{align:"left"}},[t._v("用户名: "+t._s(t.userName))]),t._v(" "),a("p",{attrs:{align:"left"}},[t._v("余额: ￥"+t._s(t.balance)+" 元")]),t._v(" "),a("p",{attrs:{align:"left"}},[t._v("当发起出租、捐赠、使用后，担保状态为true")]),t._v(" "),a("p",{attrs:{align:"left"}},[t._v("当担保状态为false时，才可发起出租、捐赠或使用")])]),t._v(" "),0==t.realEstateList.length?a("div",{staticStyle:{"text-align":"center"}},[a("el-alert",{attrs:{title:"查询不到数据",type:"warning"}})],1):t._e(),t._v(" "),a("el-row",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{gutter:20}},t._l(t.realEstateList,(function(e,n){return a("el-col",{key:n,attrs:{span:6,offset:1}},[a("el-card",{staticClass:"realEstate-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[t._v("\n          担保状态:\n          "),a("span",{staticStyle:{color:"rgb(255, 0, 0)"}},[t._v(t._s(e.encumbrance))])]),t._v(" "),a("div",{staticClass:"item"},[a("el-tag",[t._v("广告位ID: ")]),t._v(" "),a("span",[t._v(t._s(e.realEstateId))])],1),t._v(" "),a("div",{staticClass:"item"},[a("el-tag",{attrs:{type:"success"}},[t._v("业主ID: ")]),t._v(" "),a("span",[t._v(t._s(e.proprietor))])],1),t._v(" "),a("div",{staticClass:"item"},[a("el-tag",{attrs:{type:"warning"}},[t._v(" 状态: ")]),t._v(" "),a("span",[t._v(t._s(e.adState)+" ")])],1),t._v(" "),a("div",{staticClass:"item"},[a("el-tag",{attrs:{type:"danger"}},[t._v("广告位链接: ")]),t._v(" "),a("span",[t._v(t._s(e.adLink)+" ")])],1),t._v(" "),a("div",{staticClass:"item"},[a("el-tag",{attrs:{type:"danger"}},[t._v("广告内容链接: ")]),t._v(" "),a("el-link",{attrs:{href:t.getAdHref(e.contentImg)}},[t._v(t._s(e.contentImg)+" ")])],1),t._v(" "),e.encumbrance||"admin"===t.roles[0]?t._e():a("div",[a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.openDialog(e)}}},[t._v("出租")]),t._v(" "),a("el-divider",{attrs:{direction:"vertical"}}),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.openDonatingDialog(e)}}},[t._v("捐赠")]),t._v(" "),a("el-divider",{attrs:{direction:"vertical"}}),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.openPublishDialog(e)}}},[t._v("发布广告")])],1),t._v(" "),"admin"===t.roles[0]?a("el-rate"):t._e()],1)],1)})),1),t._v(" "),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingDialog,expression:"loadingDialog"}],attrs:{visible:t.dialogCreateSelling,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogCreateSelling=e},close:function(e){return t.resetForm("realForm")}}},[a("el-form",{ref:"realForm",attrs:{model:t.realForm,rules:t.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"价格 (元)",prop:"price"}},[a("el-input-number",{attrs:{precision:2,step:1e4,min:0},model:{value:t.realForm.price,callback:function(e){t.$set(t.realForm,"price",e)},expression:"realForm.price"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"有效期 (天)",prop:"salePeriod"}},[a("el-input-number",{attrs:{min:1},model:{value:t.realForm.salePeriod,callback:function(e){t.$set(t.realForm,"salePeriod",e)},expression:"realForm.salePeriod"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.createSelling("realForm")}}},[t._v("立即出租")]),t._v(" "),a("el-button",{on:{click:function(e){t.dialogCreateSelling=!1}}},[t._v("取 消")])],1)],1),t._v(" "),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingDialog,expression:"loadingDialog"}],attrs:{visible:t.dialogCreatePublishing,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogCreatePublishing=e},close:function(e){return t.resetForm("publishForm")}}},[a("el-form",{ref:"publishForm",attrs:{model:t.publishForm,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"图片",prop:"picImg"}},[a("el-upload",{attrs:{action:t.uploadActionUrl,accept:"image/jpeg,image/gif,image/png",data:t.getfileData(),multiple:"",limit:3,"file-list":t.files}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("请上传图片格式文件")])],1)],1)],1)],1),t._v(" "),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingDialog,expression:"loadingDialog"}],attrs:{visible:t.dialogCreateDonating,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogCreateDonating=e},close:function(e){return t.resetForm("DonatingForm")}}},[a("el-form",{ref:"DonatingForm",attrs:{model:t.DonatingForm,rules:t.rulesDonating,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"业主",prop:"proprietor"}},[a("el-select",{attrs:{placeholder:"请选择业主"},on:{change:t.selectGet},model:{value:t.DonatingForm.proprietor,callback:function(e){t.$set(t.DonatingForm,"proprietor",e)},expression:"DonatingForm.proprietor"}},t._l(t.accountList,(function(e){return a("el-option",{key:e.accountId,attrs:{label:e.userName,value:e.accountId}},[a("span",{staticStyle:{float:"left"}},[t._v(t._s(e.userName))]),t._v(" "),a("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[t._v(t._s(e.accountId))])])})),1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.createDonating("DonatingForm")}}},[t._v("立即捐赠")]),t._v(" "),a("el-button",{on:{click:function(e){t.dialogCreateDonating=!1}}},[t._v("取 消")])],1)],1)],1)},i=[],o=a("2e4e"),r=o["a"],l=(a("49fc"),a("2877")),s=Object(l["a"])(r,n,i,!1,null,null,null);e["default"]=s.exports}}]);