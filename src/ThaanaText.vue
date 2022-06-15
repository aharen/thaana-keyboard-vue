<script setup>
import { onMounted } from 'vue';
import { tkState, tkBeforeInputEvent, tkInputEvent, tkSelectionChangeEvent } from './ThaanaKeyboard'

const emits = defineEmits(['update:modelValue']);

const inputEvent = (event) => {
    tkInputEvent(event);

    emits('update:modelValue', tkState.thaanaText);
}

onMounted(() => {
    document.addEventListener('selectionchange', tkSelectionChangeEvent)
})
</script>

<template>
    <textarea 
        type="text" 
        v-model="tkState.thaanaText" 
        v-on:beforeinput="tkBeforeInputEvent"
        v-on:input="inputEvent"
        ref="inputField">
    </textarea>
</template>