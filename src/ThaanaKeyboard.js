export let tkState = {
    thaanaText: null,
    latinChar: '',
    char: '',
    oldValue: '',
}

export const tkBeforeInputEvent = (event) => {
    const e = event
    const t = e.target

    if (-1 !== ['insertCompositionText', 'insertText'].indexOf(e.inputType)) {
        tkState.latinChar = e.data.charAt(e.data.length - 1);
        tkState.char = tkGetChar(tkState.latinChar)
        tkState.oldValue = t.value
    }
    return;
};

export const tkInputEvent = (event) => {
    const e = event
    const t = e.target

    // run ONLY for insertText inputType (handles backspace)
    if (-1 === ['insertCompositionText', 'insertText'].indexOf(e.inputType)) return

    // run ONLY for charmap
    if (tkState.char === tkState.latinChar) return

    const target = e.target

    const cursorStart = target.selectionStart
    const cursorEnd = target.selectionEnd

    // remove the original latin char
    target.value = '' // reset the value first
    target.value = tkState.oldValue.split(tkState.latinChar).join('')

    //remove selection 
    const selectionStart = Number(target.dataset.start)
    const selectionEnd = Number(target.dataset.end)

    if ((selectionEnd - selectionStart) > 0)
        target.value = target.value.substring(0, selectionStart) + target.value.substring(selectionEnd)

    // recreate text with newChar
    let newValue = target.value.substring(0, cursorStart - 1)
    newValue += tkState.char
    newValue += target.value.substring(cursorStart - 1)

    // update the target with newChar
    target.value = newValue

    // maintain cursor location
    target.selectionStart = cursorStart
    target.selectionEnd = cursorEnd

    tkState.thaanaText = target.value
};

export const tkSelectionChangeEvent = (e) => {
    const activeElement = document.activeElement
    activeElement.dataset.start = activeElement.selectionStart
    activeElement.dataset.end = activeElement.selectionEnd
}

export const tkGetChar = (char) => {
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