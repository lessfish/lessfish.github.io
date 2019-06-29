<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="10">
          <div class="settings">
            <!-- box -->
            <el-form  label-width="150px">
              <slider v-model="box.width" label="box-width" :max="1000"/>
              <slider v-model="box.height" label="box-height" :max="1000"/>
              <form-item label="box 颜色选择">
                 <el-color-picker v-model="box.backgroundColor"></el-color-picker>
              </form-item>
             
              <!-- box-shadow -->
              <slider v-model="shadowSetting.hShadow" label="h-shadow" :max="50" :required="true"/>
              <slider v-model="shadowSetting.vShadow" label="v-shadow" :max="50" :required="true"/>
              <slider v-model="shadowSetting.blur" label="blur" :max="50"/>
              <slider v-model="shadowSetting.spread" label="spread" :max="50"/>
              <form-item label="shadow 颜色选择">
                <el-color-picker v-model="shadowSetting.color" show-alpha></el-color-picker>
              </form-item>
              <form-item label="设置 inset">
                <el-switch
                  v-model="shadowSetting.isInset"
                  active-text="inset"
                  inactive-text="default">
                </el-switch>
              </form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="box" :style="[boxBaseStyle, boxShadowStyle]"></div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Slider from './Slider'
import FormItem from './FormItem'

Vue.use(ElementUI)

export default {
  data () {
    return {
      box: {
        width: 200,
        height: 200,
        backgroundColor: '#409EFF'
      },
      shadowSetting: {
        hShadow: 10,
        vShadow: 10,
        blur: 5,
        spread: 5,
        color: 'rgba(0, 0, 0, 1)',
        isInset: false,
      }
    }
  },
  computed: {
    boxBaseStyle () {
      const { width, height, backgroundColor } = this.box 

      return {
        width: width + 'px',
        height: height + 'px',
        backgroundColor: backgroundColor
      }
    },
    boxShadowStyle () {
      const { hShadow, vShadow, blur, spread, color, isInset } = this.shadowSetting

      return {
        boxShadow: `${hShadow}px ${vShadow}px ${blur}px ${spread}px ${color} ${isInset ? 'inset' : ''}`
      }
    }
  },
  components: {
    Slider, FormItem
  }
}
</script>

<style>
body {
  max-width: 1280px;
  margin: 0 auto;
}

.el-main {
  height: 600px;
}

.box {
  margin-left: 150px;
  margin-top: 100px;
}
</style>