<template>
  <div>
    <h3>Welcome</h3>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    console.log(this.$route.params);
  }
}
</script>
