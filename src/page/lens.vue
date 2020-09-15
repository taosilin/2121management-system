<template>
  <div>
    镜片管理！！
    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加镜片</el-button>
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

      <el-table-column
        prop="stock"
        label="库存量">
      </el-table-column>

      <el-table-column
        prop="state"
        label="状态">
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

    <el-dialog class="addLens" title="添加镜片" :visible.sync="dialogFormVisible">
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

        <el-form-item label="折射率" >
          <el-select v-model="newLens.refractiveIndex" placeholder="请选择折射率">
            <el-option label="1.56" value="1.56"></el-option>
            <el-option label="1.59" value="1.59"></el-option>
            <el-option label="1.60" value="1.60"></el-option>
            <el-option label="1.67" value="1.67"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="材质" >
          <el-select v-model="newLens.material" placeholder="请选择材质">
            <el-option label="UNO-400" value="UNO-400"></el-option>
            <el-option label="PC" value="PC"></el-option>
            <el-option label="PC 抗蓝光" value="PC 抗蓝光"></el-option>
            <el-option label="树脂MR-7" value="树脂MR-7"></el-option>
            <el-option label="树脂MR-7 灰" value="树脂MR-7 灰"></el-option>
            <el-option label="树脂MR-8" value="树脂MR-8"></el-option>
            <el-option label="树脂MR-8 灰" value="树脂MR-8 灰"></el-option>
            <el-option label="亚克力变灰" value="亚克力变灰"></el-option>
            <el-option label="亚克力变茶" value="亚克力变茶"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="弧度" >
          <el-select v-model="newLens.radian" placeholder="请选择弧度">
            <el-option label="球面" value="球面"></el-option>
            <el-option label="非球面" value="非球面"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="品种" >
          <el-select v-model="newLens.variety" placeholder="请选择品种">
            <el-option label="光学" value="光学"></el-option>
            <el-option label="基片变色" value="基片变色"></el-option>
            <el-option label="膜层变色" value="膜层变色"></el-option>
            <el-option label="光学墨镜" value="光学墨镜"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设计" >
          <el-select v-model="newLens.variety" placeholder="请选择设计">
            <el-option label="单光" value="单光"></el-option>
            <el-option label="渐进" value="渐进"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="库存量" >
          <el-input v-model="newLens.stock"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="newLens.state">
            <el-radio label="待上架" value="0"></el-radio>
            <el-radio label="上架中" value="1"></el-radio>
            <el-radio label="已下架" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="说明">
          <el-input type="textarea" v-model="newLens.description"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "lens",
  data() {
    return {
      currentPage: 0,
      pageSize: 20,
      resultNum: 0,
      lensList: [],
      dialogFormVisible: false,
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
        stock: 0,
        state: '0',
        description: ''
      }
    }
  },
  created() {
    axios.post('http://localhost:8088/lens/list',{
      page:this.currentPage,
      size:this.pageSize
    })
      .then(response=>{
        this.lensList = response.data.data;
        this.resultNum = response.data.data.length;
      })
      .catch(function (error) {       //发生错误
        console.log(error);
      });
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped>
.addLens{
  text-align: left;
}
</style>
