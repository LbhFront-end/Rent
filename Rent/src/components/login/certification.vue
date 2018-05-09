<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <!-- 实名认证 -->
      <div class="certification flex-x-left flex-y-center flex-col">
          <div class="title flex-x-center flex-y-center flex-col">
              <p>{{title}}</p>
          </div>
          <div v-if="!roomId">
            <!-- 姓名 -->
            <div class="realname flex-x-center flex-y-center flex-col">
                <div class="smallhead">
                    <p>姓名</p>
                </div>
                <div class="content flex-space-between flex-y-center flex-row">
                    <div class="content-main flex-x-center flex-y-center flex-row">
                      <input type="text" class="name" v-model="name" placeholder="请输入您的中文姓名" @blur="checkName()">
                    </div>
                    <div class="content-tip flex-x-center flex-y-center flex-row">
                        <div class="tip-text flex-x-center flex-y-center flex-row" v-if="nameState">
                            <p>{{nameErrorText}}</p>
                        </div>
                        <div class="tip-img flex-x-center flex-y-center flex-row" v-else>
                          
                        </div>
                    </div>
                </div>
            </div>
            <!-- 身份证号码 -->
            <div class="idcard flex-x-center flex-y-center flex-col">
                <div class="smallhead">
                    <p>身份证号码</p>
                </div>
                <div class="content flex-space-between flex-y-center flex-row">
                    <div class="content-main flex-x-center flex-y-center flex-row">
                      <input type="number" class="personalid" v-model="personalId" placeholder="请输入您的身份证" @blur="checkId()">
                    </div>
                    <div class="content-tip flex-x-center flex-y-center flex-row">
                        <div class="tip-text flex-x-center flex-y-center flex-row" v-if="idState">
                            <p>{{idErrorText}}</p>
                        </div>
                        <div class="tip-img flex-x-center flex-y-center flex-row" v-else>
                            
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <!-- 上传身份证图片 -->
          <div class="uploadId flex-space-between flex-y-center flex-row">
              <div class="positive flex-x-center flex-y-center flex-col">
                  <div class="picture flex-x-center flex-y-center flex-col">
                      <input type="file" accept="image/*;" capture="camera" @change="getPositiveFile($event)" >
                      <img :src="positiveImgUrl" alt="">
                  </div>
                  <div class="word flex-x-center flex-y-center flex-col">
                      <p>上传身份证正面(有头像一面)</p>
                  </div>
              </div>
              <div class="negative flex-x-center flex-y-center flex-col">
                  <div class="picture flex-x-center flex-y-center flex-col">
                      <input type="file" accept="image/*;" capture="camera" @change="getNegativeFile($event)" >
                      <img :src="negativeImgUrl" alt="">
                  </div>
                  <div class="word flex-x-center flex-y-center flex-col">
                      <p>上传身份证反面</p>
                  </div>
              </div>
          </div>
          <!-- 下一步 -->
          <div class="next flex-right flex-y-center flex-col">
            <div class="a flex-x-center flex-y-center flex-col" @click="sumbuitImgs()">
              <div class="next-enter"/>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
let self;
export default {
  name: "certification",
  data() {
    return {
      title: "",
      //姓名
      name: "",
      nameState: true,
      nameErrorText: "",
      // 身份证号码
      personalId: "",
      idState: true,
      idErrorText: "",
      //正面身份证
      positiveImgUrl: "../../../static/img/idid1.png",
      //反面身份证
      negativeImgUrl: "../../../static/img/idid.png",
      roomId: "",
      access_token: "",
      front: "front",
      back: "back",
      a: "",
      b: "",
      failureTime: ""
    };
  },
  created() {
    self = this;
    self.roomId = self.$route.query.id;
    if (self.roomId) {
      self.title = "请完善您的资料";
    } else {
      self.title = "实名认证";
    }
    self.getToken();
  },
  methods: {
    //获取百度云文字识别的api-Token
    getToken() {
      self.$axios
        .post("/pms/idauth/getAuth")
        .then(function(response) {
          self.access_token = response.data[0].access_token;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //中文姓名检查
    checkName() {
      self.nameState = true;
      var nameReg = /^([\u4e00-\u9fa5\·]{1,10})$/;
      if (!self.name) {
        self.nameErrorText = "姓名不可为空";
        return;
      } else if (!nameReg.test(self.name)) {
        self.nameErrorText = "请检查姓名是否有误";
        return;
      } else {
        self.nameState = false;
        return;
      }
    },
    //身份证检查
    checkId() {
      self.idState = true;
      var idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!self.personalId) {
        self.idErrorText = "不可空";
        return;
      } else if (!idReg.test(self.personalId)) {
        self.idErrorText = "有误";
        return;
      } else {
        self.idState = false;
        return;
      }
    },
    //获取正面身份证
    getPositiveFile(e) {
      var file = e.target.files[0];
      var r = new FileReader();
      r.onload = function(e) {
        self.positiveImgUrl = e.target.result;
        self.a = self.positiveImgUrl.replace("data:image/jpeg;base64,", "");
      };
      r.readAsDataURL(file);
    },
    //获取反面身份证
    getNegativeFile(e) {
      var file = e.target.files[0];
      var r = new FileReader();
      r.onload = function(e) {
        self.negativeImgUrl = e.target.result;
        self.b = self.negativeImgUrl.replace("data:image/jpeg;base64,", "");
        // console.log(self.negativeImgUrl);
      };
      r.readAsDataURL(file);
    },
    sumbuitImgs() {
      if (self.roomId) {
        self.checkReady();
      } else {
        self.saveImgs();
        self.$router.push("/reviewing");
      }
    },
    checkReady() {
      //反
      self
        .$axios({
          url: "/v1/idcard?access_token=" + self.access_token,
          method: "post",
          data: {
            detect_direction: false,
            id_card_side: self.back,
            image: self.b
          },
          transformRequest: [
            function(data) {
              let ret = "";
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  "=" +
                  encodeURIComponent(data[it]) +
                  "&";
              }
              return ret;
            }
          ]
        })
        .then(function(response) {
          var day = new Date();
          var year = day.getFullYear();
          var month = day.getMonth() + 1;
          var date = day.getDate();
          if (month < 10) {
            month = "0" + month;
          }
          if (date < 10) {
            month = "0" + month;
          }
          var now = [year, month, date].join("");
          self.failureTime = response.data.words_result.失效日期.words;
          if (now > self.failureTime) {
            Toast({
              className: "successMessage",
              message: "身份证过期，请上传其他身份证",
              iconClass: "icon icon-success",
              duration: 2000
            });
            return false;
          }
          Toast({
            className: "successMessage",
            message: "上传成功",
            iconClass: "icon icon-success",
            duration: 2000
          });
        })
        .catch(function(error) {
          Toast({
            className: error,
            message: "请检查您的信息是否缺漏或者有误！",
            position: "top",
            duration: 2000
          });
          console.log(error);
        });
      // 正
      self
        .$axios({
          url: "/v1/idcard?access_token=" + self.access_token,
          method: "post",
          data: {
            detect_direction: false,
            id_card_side: self.front,
            image: self.a
          },
          transformRequest: [
            function(data) {
              let ret = "";
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  "=" +
                  encodeURIComponent(data[it]) +
                  "&";
              }
              return ret;
            }
          ]
        })
        .then(function(response) {
          self.personalId = response.data.words_result.公民身份号码.words;
          self.name = response.data.words_result.姓名.words;
          self.saveImgs();
          self.$router.push({
            path: "/completeRentInformation",
            query: { id: self.roomId, name: self.name, idcard: self.personalId }
          });
          Toast({
            className: "successMessage",
            message: "上传成功",
            iconClass: "icon icon-success",
            duration: 2000
          });
        })
        .catch(function(error) {
          Toast({
            className: error,
            message: "请检查您的信息是否缺漏或者有误！",
            position: "top",
            duration: 2000
          });
          console.log(error);
        });
    },
    //保存图片
    saveImgs() {
      var base64Array = "";
      base64Array = self.negativeImgUrl + "&" + self.positiveImgUrl;
      if (
        self.personalId &&
        self.name &&
        self.negativeImgUrl != "../../../static/img/idid.png" &&
        self.positiveImgUrl != "../../../static/img/idid.png"
      ) {
        var storage = window.localStorage;
        var userId = storage.getItem("userId");
        self
          .$axios({
            url: "/pms/api_user/upload_realname",
            method: "post",
            data: {
              name: self.name,
              userId: userId,
              personId: self.personalId,
              base64: base64Array
            },
            transformRequest: [
              function(data) {
                // Do whatever you want to transform the data
                let ret = "";
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
                }
                return ret;
              }
            ]
          })
          .then(function(response) {
            Toast({
              className: "toast",
              message: "提交成功",
              position: "top",
              duration: 2000
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        Toast({
          className: "toast",
          message: "请检查您的信息是否缺漏或者有误！",
          position: "top",
          duration: 2000
        });
      }
    }
  }
};
</script>
