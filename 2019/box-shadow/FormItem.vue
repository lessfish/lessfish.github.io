<template>
  <el-form-item :label="label" :required="required"><slot/></el-form-item>
</template>

<script>
export default {
  props: {
    label: String,
    required: Boolean
  }
}
</script>