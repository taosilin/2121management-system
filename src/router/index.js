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
import system from "../page/system"
import editFrame from "../page/editFrame"
import editProduct from "../page/editProduct"
import administrator from "../page/administrator"


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
          meta: {
            title: '控制台',
            requireAuth: true // 判断是否需要登录
          }
        },
        {
          path: '/product',
          component: product,
          meta: {
            title: '商品管理',
            requireAuth: true
          }
        },
        {
          path: '/transaction',
          component: transaction,
          meta: {
            title: '交易管理',
            requireAuth: true
          }
        },
        {
          path: '/configuration',
          component: configuration,
          meta: {
            title: '配置管理',
            requireAuth: true
          }
        },
        {
          path: '/comment',
          component: comment,
          meta: {
            title: '评论管理',
            requireAuth: true
          }
        },
        {
          path: '/frame',
          component: frame,
          meta: {
            title: '镜框管理',
            requireAuth: true
          }
        },
        {
          path: '/lens',
          component: lens,
          meta: {
            title: '镜片管理',
            requireAuth: true
          }
        },
        {
          path: '/addFrame',
          component: addFrame,
          meta: {
            title: '添加镜框',
            requireAuth: true
          }
        },
        {
          path: '/addProduct',
          component: addProduct,
          meta: {
            title: '添加商品',
            requireAuth: true
          }
        },
        {
          path: '/order',
          component: order,
          meta: {
            title: '订单管理',
            requireAuth: true
          }
        },
        {
          path: '/orderDetail',
          component: orderDetail,
          meta: {
            title: '订单详情',
            requireAuth: true
          }
        },
        {
          path: '/coupon',
          component: coupon,
          meta: {
            title: '优惠券管理',
            requireAuth: true
          }
        },
        {
          path: '/productDetail',
          component: productDetail,
          meta: {
            title: '商品详情',
            requireAuth: true
          }
        },
        {
          path: '/manageFrame',
          component: manageFrame,
          meta: {
            title: '管理镜框',
            requireAuth: true
          }
        },
        {
          path: '/commonProblem',
          component: commonProblem,
          meta: {
            title: '常见问题',
            requireAuth: true
          }
        },
        {
          path: '/lensStock',
          component: lensStock,
          meta: {
            title: '镜片库存',
            requireAuth: true
          }
        },
        {
          path: '/stockDetail',
          component: stockDetail,
          meta: {
            title: '库存盘点',
            requireAuth: true
          }
        },
        {
          path: '/classification',
          component: classification,
          meta: {
            title: '分类管理',
            requireAuth: true
          }
        },
        {
          path: '/refund',
          component: refund,
          meta: {
            title: '退款管理',
            requireAuth: true
          }
        },
        {
          path: '/color',
          component: color,
          meta: {
            title: '镜框颜色',
            requireAuth: true
          }
        },
        {
          path: '/lensAttribute',
          component: lensAttribute,
          meta: {
            title: '镜片属性',
            requireAuth: true
          }
        },
        {
          path: '/frameAttribute',
          component: frameAttribute,
          meta: {
            title: '镜框参数',
            requireAuth: true
          }
        },
        {
          path: '/reviewOrder',
          component: reviewOrder,
          meta: {
            title: '审单管理',
            requireAuth: true
          }
        },
        {
          path: '/system',
          component: system,
          meta: {
            title: '系统管理',
            requireAuth: true
          }
        },
        {
          path: '/editFrame',
          component: editFrame,
          meta: {
            title: '编辑镜框',
            requireAuth: true
          }
        },
        {
          path: '/editProduct',
          component: editProduct,
          meta: {
            title: '编辑商品',
            requireAuth: true
          }
        },
        {
          path: '/administrator',
          component: administrator,
          meta: {
            title: '管理员',
            requireAuth: true
          }
        }
      ]
    }
  ]
})
