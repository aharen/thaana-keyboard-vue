## WIP

### Installation

```
yarn add thaana-keyboard-vue
```

or with npm

```
npm i thaana-keyboard-vue
```

### Usage

```
<script setup>
import { reactive } from 'vue';
import ThaanaInput from 'thaana-keyboard-vue/src/ThaanaInput.vue';
import ThaanaText from 'thaana-keyboard-vue/src/ThaanaText.vue';

const state = reactive({
  input: null,
  input2: null,
  textarea: null,
  textarea2: null,
});
</script>

<template>
    <ThaanaInput v-model="state.input" />

    <br />

    <ThaanaInput v-model="state.input2" />

    <br />

    <ThaanaText v-model="state.textarea" />

    <br />

    <ThaanaText v-model="state.textarea2" />

    <br />
    <br />

    <code><pre>
      {{ state }}
    </code></pre>
</template>
```