<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="settings">
            <!-- box -->
            <el-slider v-model="box.width" show-input :max="1000" />
            <el-slider v-model="box.height" show-input :max="1000" />
            <el-color-picker v-model="box.backgroundColor"></el-color-picker>

            <!-- box-shadow -->
            <el-slider v-model="shadowSetting.hShadow" show-input :max="50" />
            <el-slider v-model="shadowSetting.vShadow" show-input :max="50" />
            <el-slider v-model="shadowSetting.blur" show-input :max="50" />
            <el-slider v-model="shadowSetting.spread" show-input :max="50" />
            <el-color-picker v-model="shadowSetting.color" show-alpha></el-color-picker>
            <el-switch
              v-model="shadowSetting.isInset"
              active-text="inset"
              inactive-text="default">
            </el-switch>
          </div>
        </el-col>
        <el-col :span="16">
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
  }
}
</script>

<style>
body {
  max-width: 1000px;
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