## WIP

### Usage

```
<script setup>
import { reactive } from 'vue';
import ThaanaInput from './ThaanaInput.vue';

const state = reactive({
  thaanaText: null,
});
</script>

<template>
    <ThaanaInput v-model="state.thaanaText" />
    <div>
      {{ state.thaanaText }}
    </div>
</template>
```