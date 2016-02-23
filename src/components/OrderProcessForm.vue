<template>
  {{optType}} - {{order.id}}
  <textarea name="reason" style="width:80%" v-model="reason"></textarea>
  <button type="button" name="button" @click="submitForm()">提交</button>
  <button type="button" name="button" @click="cancel()">取消</button>
</template>
<script>
export default {
  props: {
    order: {
      required: true
    },
    optType: {
      required: true
    }
  },
  data: {
    reason: ' '
  },
  created: function () {
  },
  methods: {
    submitForm: function () {
      console.log(this.reason)
    },
    cancel: function () {
      this.$parent.show = false
    }
  }
}
</script>
