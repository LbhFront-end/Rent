import Vue from 'vue'
import Router from 'vue-router'
//登录前
import index from '@/components/index'
import Test from '@/components/test'
import register from '@/components/login/register'
import certification from '@/components/login/certification'
import reviewing from '@/components/login/reviewing'
import login from '@/components/login/login'
import usePhoneLogin from '@/components/login/usePhoneLogin'
import forgetPassword from '@/components/login/forgetPassword'
import resetPassword from '@/components/login/resetPassword'
import changePasswordSuccess from '@/components/login/changePasswordSuccess'
import successRegister from '@/components/login/successRegister'
// 公共部分
import footer from '@/components/common/footer'
import cephalosome from '@/components/common/cephalosome'
//登录后的首页
import afterLoginIndex from '@/components/afterLogin/afterLogin-index'
// 租房相关
import roomDetail from '@/components/room/roomDetail'
import signUp from '@/components/room/signUp'
import costList from '@/components/room/costList'
import orderShowings from '@/components/room/orderShowings'
import orderSuccess from '@/components/room/orderSuccess'
import completeRentInformation from '@/components/room/completeRentInformation'
//个人中心相关
import personIndex from '@/components/person/personIndex'
import myMessage from '@/components/person/myMessage/myMessage'

// 保洁相关
import cleanList from '@/components/person/cleanList/cleanList'
import cleanComment from '@/components/person/cleanList/cleanComment'
import repairComment from '@/components/person/cleanList/repairComment'
import cleanServerAdd from '@/components/person/cleanList/cleanServerAdd'
// 缴费记录
import paymentRecord from '@/components/person/paymentRecord/paymentRecord'
import paymentRecordPayY from '@/components/person/paymentRecord/paymentRecordPayY'
import paymentRecordPayN from '@/components/person/paymentRecord/paymentRecordPayN'
//设定
import setting from '@/components/person/settings/setting'
import changePhoneNumber from '@/components/person/settings/changePhoneNumber'
import feedback from '@/components/person/settings/feedback'
import messageAdd from '@/components/person/settings/messageAdd'
import changePhoneNumberSuccess from '@/components/person/settings/changePhoneNumberSuccess'

//管理员
import maintenanceIndex from '@/components/maintenance/maintenance-index'
//管理员清洁员
import maintenanceCleanerOrder from '@/components/maintenance/cleaner/maintenance-cleanerOrder'
import maintenanceCleanerOrderDetails from '@/components/maintenance/cleaner/maintenance-cleanerOrderDetails'
import maintenanceMonitorOrder from '@/components/maintenance/cleaner/maintenance-monitorOrder'

//抄表
import maintenanceMRList from '@/components/maintenance/meterReading/maintenanceMRList'
import maintenanceMRListDetails from '@/components/maintenance/meterReading/maintenanceMRListDetails'


Vue.use(Router)
Vue.component('my-footer', footer)
Vue.component('my-cephalosome', cephalosome)

export default new Router({
  routes: [
    // 登录前
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/successRegister',
      name: 'successRegister',
      component: successRegister
    },
    {
      path: '/certification',
      name: 'certification',
      component: certification
    },
    {
      path: '/reviewing',
      name: 'reviewing',
      component: reviewing
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword
    },
    {
      path: '/changePasswordSuccess',
      name: 'changePasswordSuccess',
      component: changePasswordSuccess
    },
    {
      path: '/usePhoneLogin',
      name: 'usePhoneLogin',
      component: usePhoneLogin
    },
    // 登录后公共部分
    {
      path: '/footer',
      name: 'footer',
      component: footer
    },
    {
      path: '/cephalosome',
      name: 'cephalosome',
      component: cephalosome
    },
    //登录后的首页
    {
      path: '/afterLoginIndex',
      name: 'afterLoginIndex',
      component: afterLoginIndex
    },
    //租房相关
    {
      path: '/roomDetail',
      name: 'roomDetail',
      component: roomDetail
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/costList',
      name: 'costList',
      component: costList
    },
    {
      path: '/orderShowings',
      name: 'orderShowings',
      component: orderShowings
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    },
    // 个人中心相关
    {
      path: '/personIndex',
      name: 'personIndex',
      component: personIndex
    },
    {
      path: '/paymentRecord',
      name: 'paymentRecord',
      component: paymentRecord
    },
    {
      path: '/paymentRecordPayN',
      name: 'paymentRecordPayN',
      component: paymentRecordPayN
    },
    {
      path: '/paymentRecordPayY',
      name: 'paymentRecordPayY',
      component: paymentRecordPayY
    },
    //保洁相关
    {
      path: '/cleanList',
      name: 'cleanList',
      component: cleanList
    },
    {
      path: '/repairComment',
      name: 'repairComment',
      component: repairComment
    },
    {
      path: '/cleanComment',
      name: 'cleanComment',
      component: cleanComment
    },
    {
      path: '/cleanServerAdd',
      name: 'cleanServerAdd',
      component: cleanServerAdd
    },
    {
      path: '/myMessage',
      name: 'myMessage',
      component: myMessage
    },
    //设置相关
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/changePhoneNumber',
      name: 'changePhoneNumber',
      component: changePhoneNumber
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/messageAdd',
      name: 'messageAdd',
      component: messageAdd
    },
    {
      path: '/changePhoneNumberSuccess',
      name: 'changePhoneNumberSuccess',
      component: changePhoneNumberSuccess
    },
    // 管理员相关
    {
      path: '/maintenanceIndex',
      name: 'maintenanceIndex',
      component: maintenanceIndex
    },
    // 管理员保洁员
    {
      path: '/maintenanceCleanerOrder',
      name: 'maintenanceCleanerOrder',
      component: maintenanceCleanerOrder
    },
    {
      path: '/maintenanceCleanerOrderDetails',
      name: 'maintenanceCleanerOrderDetails',
      component: maintenanceCleanerOrderDetails
    },
    {
      path: '/maintenanceMonitorOrder',
      name: 'maintenanceMonitorOrder',
      component: maintenanceMonitorOrder
    },
    {
      path: '/maintenanceMRList',
      name: 'maintenanceMRList',
      component: maintenanceMRList
    },
    {
      path: '/maintenanceMRListDetails',
      name: 'maintenanceMRListDetails',
      component: maintenanceMRListDetails
    },
    {
      path: '/completeRentInformation',
      name: 'completeRentInformation',
      component: completeRentInformation
    },
  ]
})
