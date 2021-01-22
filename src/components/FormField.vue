<template>
  <div class="box-form">
    <label :for="name">{{ label }} <span v-if="required">*</span></label>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      required: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style scoped>
  input,
  select {
    margin-top: 8px;
  }
  span {
    color: red;
    font-size: 1.1rem;
  }
  .box-form {
    border-radius: 5px;
    width: 500px;
    padding: 8px 30px;
    margin-bottom: 4px;
  }
</style>
