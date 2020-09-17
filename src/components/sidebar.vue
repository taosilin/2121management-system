<template>
  <div class="sidebar">
      <el-menu class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="collapse"
        background-color="#545c64"
        text-color="#bfcbd9"
        active-text-color="#72c9fa"
        unique-opened
        router>

        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-submenu
                  v-if="subItem.subs"
                  :index="subItem.index"
                  :key="subItem.index"
                >
                  <template slot="title">{{ subItem.title }}</template>
                  <el-menu-item
                    v-for="(threeItem,i) in subItem.subs"
                    :key="i"
                    :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item>
                </el-submenu>
                <el-menu-item
                  v-else
                  :index="subItem.index"
                  :key="subItem.index"
                >{{ subItem.title }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
  </div>
</template>

<script>
import bus from './bus'
export default {
  name: "sidebar",
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-s-marketing',
          index: 'home',
          title: '控制台'
        },
        {
          icon: 'el-icon-s-shop',
          index: 'mall',
          title: '商城管理',
          subs:[
            {
              index: 'product',
              title: '商品管理',
              subs:[
                {
                  index: 'frame',
                  title: '镜框管理'
                },
                {
                  index: 'lens',
                  title: '镜片管理'
                },
                {
                  index: 'product',
                  title: '商品管理'
                }
              ]
            },
            {
              index: 'transaction',
              title: '交易管理',
              subs: [
                {
                  index: 'order',
                  title: '订单管理'
                }
              ]
            },
            {
              index: 'configuration',
              title: '配置管理'
            },
            {
              index: 'comment',
              title: '评论管理'
            }
          ]
        },
        {
          icon: 'el-icon-s-grid',
          index: 'stock',
          title: '库存管理'
        },
        {
          icon: 'el-icon-present',
          index: 'market',
          title: '营销活动'
        },
        {
          icon: 'el-icon-setting',
          index: 'system',
          title: '系统管理'
        }
      ]
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
  }
}
</script>

<style scoped>
.sidebar{
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  width: 250px;
  text-align: left;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
