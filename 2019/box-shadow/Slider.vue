<template>
  <form-item :label="label" :required="required">
    <el-slider 
      :value="value" 
      :max="max"
      show-input 
      @input="handleChange"
    />
  </form-item>
</template>

<script>
import FormItem from './FormItem'

export default {
  props: {
    max: {
      type: Number
    },
    value: {
      type: Number
    },
    label: {
      type: String
    },
    required: {
      type: Boolean
    }
  },
  methods: {
    handleChange (value) {
      this.$emit('input', value)
    }
  },
  components: {
    FormItem
  }
}
</script>
