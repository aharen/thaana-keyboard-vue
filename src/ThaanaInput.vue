<script setup>
import { onMounted, reactive } from 'vue';

const emits = defineEmits(['update:modelValue']);

const state = reactive({
    thaanaText: null,
    latinChar: '',
    char: '',
    oldValue: '',
});

const beforeInputEvent = (event) => {
    const e = event
    const t = e.target

    if (-1 !== ['insertCompositionText', 'insertText'].indexOf(e.inputType)) {
        state.latinChar = e.data.charAt(e.data.length - 1);
        state.char = getChar(state.latinChar)
        state.oldValue = t.value
    }
    return;
};

const inputEvent = (event) => {
    const e = event
    const t = e.target

    // run ONLY for insertText inputType (handles backspace)
    if (-1 === ['insertCompositionText', 'insertText'].indexOf(e.inputType)) return

    // run ONLY for charmap
    if (state.char === state.latinChar) return

    const target = e.target
    
    const cursorStart = target.selectionStart
    const cursorEnd = target.selectionEnd

    // remove the original latin char
    target.value = '' // reset the value first
    target.value = state.oldValue.split(state.latinChar).join('')

    //remove selection 
    const selectionStart = Number(target.dataset.start)
    const selectionEnd = Number(target.dataset.end)
    
    if( ( selectionEnd - selectionStart ) > 0 )
        target.value =  target.value.substring(0, selectionStart) + target.value.substring(selectionEnd)

    // recreate text with newChar
    let newValue = target.value.substring(0, cursorStart - 1)
    newValue += state.char
    newValue += target.value.substring(cursorStart - 1)

    // update the target with newChar
    target.value = newValue

    // maintain cursor location
    target.selectionStart = cursorStart
    target.selectionEnd = cursorEnd

    state.thaanaText = target.value
    emits('update:modelValue', state.thaanaText);
};

const selectionChangeEvent = (e) => {
    const activeElement = document.activeElement
    activeElement.dataset.start = activeElement.selectionStart
    activeElement.dataset.end = activeElement.selectionEnd
}

const getChar = (char) => {
    const keyMap = {
        'q': 'ް',
        'w': 'އ',
        'e': 'ެ',
        'r': 'ރ',
        't': 'ތ',
        'y': 'ޔ',
        'u': 'ު',
        'i': 'ި',
        'o': 'ޮ',
        'p': 'ޕ',
        'a': 'ަ',
        's': 'ސ',
        'd': 'ދ',
        'f': 'ފ',
        'g': 'ގ',
        'h': 'ހ',
        'j': 'ޖ',
        'k': 'ކ',
        'l': 'ލ',
        'z': 'ޒ',
        'x': '×',
        'c': 'ޗ',
        'v': 'ވ',
        'b': 'ބ',
        'n': 'ނ',
        'm': 'މ',
        'Q': 'ޤ',
        'W': 'ޢ',
        'E': 'ޭ',
        'R': 'ޜ',
        'T': 'ޓ',
        'Y': 'ޠ',
        'U': 'ޫ',
        'I': 'ީ',
        'O': 'ޯ',
        'P': '÷',
        'A': 'ާ',
        'S': 'ށ',
        'D': 'ޑ',
        'F': 'ﷲ',
        'G': 'ޣ',
        'H': 'ޙ',
        'J': 'ޛ',
        'K': 'ޚ',
        'L': 'ޅ',
        'Z': 'ޡ',
        'X': 'ޘ',
        'C': 'ޝ',
        'V': 'ޥ',
        'B': 'ޞ',
        'N': 'ޏ',
        'M': 'ޟ',
        ',': '،',
        ';': '؛',
        '?': '؟',
        '<': '>',
        '>': '<',
        '[': ']',
        ']': '[',
        '(': ')',
        ')': '(',
        '{': '}',
        '}': '{',
    }

    return keyMap[char] || char
}

onMounted(() => {
    document.addEventListener('selectionchange', selectionChangeEvent)
})
</script>

<template>
    <input 
        type="text" 
        v-model="state.thaanaText" 
        v-on:beforeinput="beforeInputEvent"
        v-on:input="inputEvent"
        v-on:selectionchange="selectionChangeEvent"
        ref="inputField"  />
</template>
