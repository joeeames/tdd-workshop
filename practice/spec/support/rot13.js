module.exports.transform = function(char) {
    let aChars = char.split('');
    return aChars.map(c => transformChar(c)).join('')
    
    // let xformedStr = '';
    // for(let i=0; i < char.length; i++) {
    //     xformedStr += transformChar(char[i]);
    // }
    // return xformedStr;
}

function transformChar(char) {
    if(char === '') return '';
    let charCode = char.charCodeAt(0);
    if(isBetween(char, 'a', 'm') || isBetween(char, 'A', 'M')) {
        charCode += 13;
    } else if(isBetween(char, 'n', 'z') || isBetween(char, 'N', 'Z')) {
        charCode -= 13;
    } else {
        return char
    }
    return String.fromCharCode(charCode)
}

function isBetween(char, startChar, endChar) {
    let charCode = char.charCodeAt(0);
    return charCode >= startChar.charCodeAt(0) && charCode <= endChar.charCodeAt(0)    
}