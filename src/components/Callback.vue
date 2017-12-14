<template>
</template>
<script>

import Auth from '../auth/Auth.js';

const auth = new Auth();

export default {
  name: '',
  mounted() {
    this.$nextTick(() => {
      auth.handleAuthentication();
    });
  },
};
</script>