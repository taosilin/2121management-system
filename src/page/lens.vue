<template>
  <div>
    镜片管理！！
    <el-button type="primary" icon="el-icon-plus" @click="openAddLens">添加镜片</el-button>
    <el-table
      :data="lensList"
      border
      style="width: 100%">

      <el-table-column
        prop="lensID"
        label="镜片ID">
      </el-table-column>

      <el-table-column
        prop="lensName"
        label="镜片名称">
      </el-table-column>

      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>

      <el-table-column
        prop="refractiveIndex"
        label="折射率">
      </el-table-column>

      <el-table-column
        prop="material"
        label="材质">
      </el-table-column>

      <el-table-column
        prop="radian"
        label="弧度">
      </el-table-column>

      <el-table-column
        prop="variety"
        label="品种">
      </el-table-column>

      <el-table-column
        prop="film"
        label="膜层">
      </el-table-column>

      <el-table-column
        prop="design"
        label="设计">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="lensList[scope.$index].state === '0'" effect="dark">待上架</el-tag>
          <el-tag v-else-if="lensList[scope.$index].state === '1'" effect="dark" type="success">已上架</el-tag>
          <el-tag v-else effect="dark" type="info">已下架</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="resultNum">
      </el-pagination>
    </div>

    <!--添加镜片对话框-->
    <el-dialog class="addLens" title="添加镜片" :visible.sync="addLensVisible">
      <el-form
        :model="newLens"
        label-width="100px">

        <el-form-item label="规则编码" >
          <el-input v-model="newLens.lensID"></el-input>
        </el-form-item>

        <el-form-item label="镜片名称" >
          <el-input v-model="newLens.lensName"></el-input>
        </el-form-item>

        <el-form-item label="价格" >
          <el-input v-model="newLens.price">
            <el-button slot="prepend">$</el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="折射率">
          <el-radio-group v-model="newLens.refractiveIndex" size="medium">
            <el-radio-button :key="item.id" v-for="item in refractiveIndexs" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="材质">
          <el-radio-group v-model="newLens.material" size="medium">
            <el-radio-button :key="item.id" v-for="item in materials" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="弧度">
          <el-radio-group v-model="newLens.radian" size="medium">
            <el-radio-button :key="item.id" v-for="item in radians" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="品种">
          <el-radio-group v-model="newLens.variety" size="medium">
            <el-radio-button :key="item.id" v-for="item in varietys" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="膜层">
          <el-radio-group v-model="newLens.film" size="medium">
            <el-radio-button :key="item.id" v-for="item in films" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="设计">
          <el-radio-group v-model="newLens.design" size="medium">
            <el-radio-button :key="item.id" v-for="item in designs" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="newLens.state">
            <el-radio label="0">待上架</el-radio>
            <el-radio label="1">上架中</el-radio>
            <el-radio label="2">已下架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="说明">
          <el-input type="textarea" v-model="newLens.description"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addLensVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddLens">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑镜片对话框-->
    <el-dialog class="updateLens" title="编辑镜片" :visible.sync="updateLensVisible">
      <el-form
        :model="newLens"
        label-width="100px">

        <el-form-item label="规则编码" >
          <el-input v-model="newLens.lensID"
                    :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="镜片名称" >
          <el-input v-model="newLens.lensName"></el-input>
        </el-form-item>

        <el-form-item label="价格" >
          <el-input v-model="newLens.price">
            <el-button slot="prepend">$</el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="折射率">
          <el-radio-group v-model="newLens.refractiveIndex" size="medium">
            <el-radio-button :key="item.id" v-for="item in refractiveIndexs" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="材质">
          <el-radio-group v-model="newLens.material" size="medium">
            <el-radio-button :key="item.id" v-for="item in materials" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="弧度">
          <el-radio-group v-model="newLens.radian" size="medium">
            <el-radio-button :key="item.id" v-for="item in radians" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="品种">
          <el-radio-group v-model="newLens.variety" size="medium">
            <el-radio-button :key="item.id" v-for="item in varietys" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="膜层">
          <el-radio-group v-model="newLens.film" size="medium">
            <el-radio-button :key="item.id" v-for="item in films" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="设计">
          <el-radio-group v-model="newLens.design" size="medium">
            <el-radio-button :key="item.id" v-for="item in designs" :label="item.valueName" ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="newLens.state">
            <el-radio label="0">待上架</el-radio>
            <el-radio label="1">上架中</el-radio>
            <el-radio label="2">已下架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="说明">
          <el-input type="textarea" v-model="newLens.description"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateLensVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateLens">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'lens',
  data() {
    return {
      currentPage: 0,
      pageSize: 20,
      resultNum: 0,
      lensList: [],
      addLensVisible: false,
      updateLensVisible: false,
      newLens: {
        lensID: '',
        lensName: '',
        price: 0.00,
        refractiveIndex: '',
        material: '',
        radian: '',
        variety: '',
        film: '',
        design: '',
        state: '0',
        description: ''
      },

      refractiveIndexs: [],
      materials: [],
      radians: [],
      varietys: [],
      films: [],
      designs: []
    }
  },
  created() {
    axios.post('https://from2121.com:8443/lens/list',{
      page: this.currentPage,
      size: this.pageSize
    }).then(response => {
        this.lensList = response.data.data
      }).catch(error => {       // 发生错误
        console.log(error)
      })
    axios.post('https://from2121.com:8443/lens/total')
    .then(response => {
      this.resultNum = response.data
    }).catch(error => {
      console.log(error)
    })

    axios.post('https://from2121.com:8443/value/attribute',{
      attributeID: "refractiveIndex"
    }).then(response => {
      this.refractiveIndexs = response.data.data
    }).catch(error => {
      console.log(error)
    })

    axios.post('https://from2121.com:8443/value/attribute',{
      attributeID: "material"
    }).then(response => {
      this.materials = response.data.data
    }).catch(error => {
      console.log(error)
    })

    axios.post('https://from2121.com:8443/value/attribute',{
      attributeID: "radian"
    }).then(response => {
      this.radians = response.data.data
    }).catch(error => {
      console.log(error)
    })

    axios.post('https://from2121.com:8443/value/attribute',{
      attributeID: "variety"
    }).then(response => {
      this.varietys = response.data.data
    }).catch(error => {
      console.log(error)
    })

    axios.post('https://from2121.com:8443/value/attribute',{
      attributeID: "film"
    }).then(response => {
      this.films = response.data.data
    }).catch(error => {
      console.log(error)
    })

    axios.post('https://from2121.com:8443/value/attribute',{
      attributeID: "design"
    }).then(response => {
      this.designs = response.data.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      axios.post('https://from2121.com:8443/lens/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.lensList = response.data.data
        })
        .catch(error => {       //发生错误
          console.log(error)
        });
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      axios.post('https://from2121.com:8443/lens/list',{
        page:this.currentPage,
        size:this.pageSize
      })
        .then(response => {
          this.lensList = response.data.data
        })
        .catch(error => {       //发生错误
          console.log(error)
        });
    },

    // 打开添加镜片对话框
    openAddLens(){
      this.newLens = {}
      this.addLensVisible = true
    },

    // 添加镜片
    handleAddLens(){
      axios.post('https://from2121.com:8443/lens/add', {
        lensID: this.newLens.lensID,
        lensName: this.newLens.lensName,
        price: this.newLens.price,
        refractiveIndex: this.newLens.refractiveIndex,
        material: this.newLens.material,
        radian: this.newLens.radian,
        variety: this.newLens.variety,
        film: this.newLens.film,
        design: this.newLens.design,
        state: this.newLens.state,
        description: this.newLens.description
      })
        .then(response => {
          if (response.data.code === 200){
            this.$message({
              showClose: true,
              message: '添加镜片成功！',
              type: 'success'
            })
            location.reload()
          }
          else{
            this.$message({
              showClose: true,
              message: '添加失败，请联系管理员',
              type: 'error'
            })
          }

        }).catch(error => {
          console.log(error)
      })
      this.addLensVisible = false
    },

    // 打开编辑镜片信息对话框
    handleEdit(index, row) {
      console.log(index, row)
      this.newLens = this.lensList[index]
      this.updateLensVisible = true
    },

    // 编辑镜片
    handleUpdateLens(){
      axios.post('https://from2121.com:8443/lens/update', {
        lensID: this.newLens.lensID,
        lensName: this.newLens.lensName,
        price: this.newLens.price,
        refractiveIndex: this.newLens.refractiveIndex,
        material: this.newLens.material,
        radian: this.newLens.radian,
        variety: this.newLens.variety,
        film: this.newLens.film,
        design: this.newLens.design,
        state: this.newLens.state,
        description: this.newLens.description
      })
        .then(response => {
          console.log(response.data)
          if (response.data.code === 200){
            this.$message({
              showClose: true,
              message: '编辑镜片成功！',
              type: 'success'
            })
            location.reload()
          }
          else{
            this.$message({
              showClose: true,
              message: '编辑失败，请联系管理员',
              type: 'error'
            })
          }

        }).catch(error => {
        console.log(error)
      })
      this.updateLensVisible = false
      this.newLens = {}
    },

    // 删除镜片
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该镜片, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('https://from2121.com:8443/lens/delete',{
          lensID : this.lensList[index].lensID
        }).then(response => {
          if (response.data.code === 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            location.reload()
          }
        }).catch(error => {

        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    open1() {
      this.$message({
        showClose: true,
        message: '这是一条消息提示'
      })
    },

    open3() {
      this.$message({
        showClose: true,
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    }

  }
}
</script>

<style scoped>
.addLens {
  text-align: left;
}
.updateLens{
  text-align: left;
}
</style>
