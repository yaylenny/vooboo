<script>
  import item from "../item.vue";
  export default{
    mixins:[ item ],
    props: {
      icon: String,
      isBoxed: Boolean,
      isFullwidth: Boolean,
      isRight: Boolean
    }
  }
</script>
<template>
  <div class="file">
    <label class="file-label">
      <input type="file" class="file-input" :name="name" />
      <span class="file-cta">
        <span class="file-icon" v-if="icon">
          <i :class="'fas fa-'+icon"></i>
        </span>
        <span class="file-label">{{label}}</span>
      </span>
    </label>
  </div>
</template>
