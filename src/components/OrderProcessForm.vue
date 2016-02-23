<template>
  <p>{{optType}} - {{order.id}}</p>
  <textarea name="reason" style="width:100%" v-model="reason"></textarea>
  <p>
    <button type="button" name="button" @click="submitForm()">提交</button>
    <button type="button" name="button" @click="cancel()">取消</button>
  </p>
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
  data: function () {
    return {
      reason: ''
    }
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
