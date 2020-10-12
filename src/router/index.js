import Vue from 'vue'
import Router from 'vue-router'
import login from "../page/login"
import index from "../components/index"
import home from "../page/home"
import product from "../page/product"
import transaction from "../page/transaction"
import configuration from "../page/configuration"
import comment from "../page/comment"
import frame from "../page/frame"
import lens from "../page/lens"
import addFrame from "../page/addFrame"
import addProduct from "../page/addProduct"
import order from "../page/order"
import orderDetail from "../page/orderDetail"
import coupon from "../page/coupon"
import productDetail from "../page/productDetail"
import manageFrame from "../page/manageFrame"
import commonProblem from "../page/commonProblem"
import lensStock from "../page/lensStock"
import stockDetail from "../page/stockDetail"
import classification from "../page/classification"
import refund from "../page/refund"
import color from "../page/color"
import lensAttribute from "../page/lensAttribute"
import frameAttribute from "../page/frameAttribute"
import reviewOrder from "../page/reviewOrder"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      component: index,
      meta: { title: '自述文件' },
      children: [
        {
          path: '/home',
          component: home,
          meta: { title: '控制台' }
        },
        {
          path: '/product',
          component: product,
          meta: { title: '商品管理' }
        },
        {
          path: '/transaction',
          component: transaction,
          meta: { title: '交易管理' }
        },
        {
          path: '/configuration',
          component: configuration,
          meta: { title: '配置管理' }
        },
        {
          path: '/comment',
          component: comment,
          meta: { title: '评论管理' }
        },
        {
          path: '/frame',
          component: frame,
          meta: { title: '镜框管理' }
        },
        {
          path: '/lens',
          component: lens,
          meta: { title: '镜片管理' }
        },
        {
          path: '/addFrame',
          component: addFrame,
          meta: { title: '添加镜框' }
        },
        {
          path: '/addProduct',
          component: addProduct,
          meta: { title: '添加商品' }
        },
        {
          path: '/order',
          component: order,
          meta: { title: '订单管理' }
        },
        {
          path: '/orderDetail',
          component: orderDetail,
          meta: { title: '订单详情' }
        },
        {
          path: '/coupon',
          component: coupon,
          meta: { title: '优惠券管理' }
        },
        {
          path: '/productDetail',
          component: productDetail,
          meta: { title: '商品详情' }
        },
        {
          path: '/manageFrame',
          component: manageFrame,
          meta: { title: '管理镜框' }
        },
        {
          path: '/commonProblem',
          component: commonProblem,
          meta: { title: '常见问题' }
        },
        {
          path: '/lensStock',
          component: lensStock,
          meta: { title: '镜片库存' }
        },
        {
          path: '/stockDetail',
          component: stockDetail,
          meta: { title: '库存盘点' }
        },
        {
          path: '/classification',
          component: classification,
          meta: { title: '分类管理' }
        },
        {
          path: '/refund',
          component: refund,
          meta: { title: '退款管理' }
        },
        {
          path: '/color',
          component: color,
          meta: { title: '镜框颜色' }
        },
        {
          path: '/lensAttribute',
          component: lensAttribute,
          meta: { title: '镜片属性' }
        },
        {
          path: '/frameAttribute',
          component: frameAttribute,
          meta: { title: '镜框参数' }
        },
        {
          path: '/reviewOrder',
          component: reviewOrder,
          meta: { title: '审单管理' }
        }
      ]
    }
  ]
})
