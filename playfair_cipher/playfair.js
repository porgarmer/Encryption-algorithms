const encryptOrDecrypt = document.getElementById("encrypt-or-decrypt")
const messageLabel = document.getElementById("message-label")
const message = document.getElementById("message")
const keyword = document.getElementById("keyword")
const cipherTextMatrix = document.getElementById("cipher-text-matrix")
const defaultCipherText = document.getElementById("default-cipher-text")
const matrixFromKeyword = document.getElementById("matrix-from-keyword")
const convertedMessageLabel = document.getElementById("converted-message-label")
const convertedMessage = document.getElementById("converted-message")
const saveButton = document.getElementById("save")
let matrix = ''
window.onload = () => {
    matrix = generatePlayfairCipherMatrix()
    displayMatrix(matrix)
}

saveButton.addEventListener("click", () => {
    let newMessage = playfairCipher(message.value, matrix, encryptOrDecrypt.value)
    convertedMessage.value = newMessage

})


matrixFromKeyword.addEventListener("click", () => {
    if (keyword.value === '') {
        alert("Please provide a keyword")
    }else{
        matrix = generatePlayfairCipherMatrix(keyword.value)
        displayMatrix(matrix)
    }
})

defaultCipherText.addEventListener("click", () => {
    matrix = generatePlayfairCipherMatrix()
    displayMatrix(matrix)
})

encryptOrDecrypt.addEventListener("change", () => {
    if (encryptOrDecrypt.value === "encrypt") {
        messageLabel.innerHTML = "Message to Encrypt"
        convertedMessageLabel.innerHTML = "Encrypted Message"
    }
    else{
        messageLabel.innerHTML = "Message to Decrypt"
        convertedMessageLabel.innerHTML = "Decrypted Message"
    }
})


function isAlpha(ch){
    return typeof ch === "string" && ch.length === 1
           && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}

function generatePlayfairCipherMatrix(keyword='') {
    const alphabet = 'abcdefghiklmnopqrstuvwxyz'

    // let matrix = Array.from(Array(5), () => new Array(5))
    let matrix =  [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
      ];
    if (keyword === '') {
        let j = 0
        for (let i = 0; i < matrix.length; i++) {
            for (let k = 0; k < matrix.length; k++) {
                matrix[i][k] = alphabet[j]
                j++
            }            
        }
        return matrix
    }
    else{
        keyword = keyword.toLowerCase().replace('/j/g', 'i')
        keyword = getUniqueKeywordString(keyword); // Store unique letters from keyword
        const filteredAlphabet = removeKeywordLetters(keyword, alphabet)
        let j = 0
        for (let i = 0; i < matrix.length; i++) {
            for (let k = 0; k < matrix.length; k++) {
                if (keyword[j]) {
                    matrix[i][k] = keyword[j]
                }
                j++
            }    
        }

        j = 0
        for (let i = 0; i < matrix.length; i++) {
            for (let k = 0; k < matrix.length; k++) {
                if (matrix[i][k]=='') {
                    matrix[i][k] = filteredAlphabet[j]
                    j++

                }
            }    
        }
        return matrix
    }
}
function getUniqueKeywordString(keyword) {
    keyword = keyword.toLowerCase().replace(/j/g, 'i').replace(/[^a-z]/g, ''); // Replace 'J' with 'I'
    let uniqueKeywordSet = new Set(keyword); // Store unique letters from keyword
    return [...uniqueKeywordSet].join(''); // Convert Set to string
}

function removeKeywordLetters(keyword, alphabet) {
    let uniqueKeywordSet = new Set(keyword); // Store unique letters from keyword
    return alphabet.split('').filter(letter => !uniqueKeywordSet.has(letter)).join('');
}


function displayMatrix(matrix) {
    let i = -1
    for (let row of cipherTextMatrix.rows) {
        let j = 0
            for(let cell of row.cells) {
                cell.innerText = matrix[i][j]; // your code below
                j++
            }
        i++
    }
}

function playfairCipher(message, matrix, action) {
    message = message.toLowerCase().replace(/j/g, 'i').replace(/[^a-z]/g, '');
    let pairs = createPairs(message);
    let cipherText = '';

    for (let pair of pairs) {
        let [row1, col1] = findPosition(pair[0], matrix);
        let [row2, col2] = findPosition(pair[1], matrix);
        
        if (row1 === row2) { // Same row
            if (action === 'encrypt') {
                cipherText += matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
            } else {
                cipherText += matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5];
            }
        } else if (col1 === col2) { // Same column
            if (action === 'encrypt') {
                cipherText += matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
            } else {
                cipherText += matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2];
            }
        } else { // Rectangle swap
            cipherText += matrix[row1][col2] + matrix[row2][col1];
        }
    }
    return cipherText;
}
//help (length = 4)
function createPairs(message) {
    let pairs = [];
    for (let i = 0; i < message.length; i += 2) {
        if (i + 1 < message.length) {
            if (message[i] === message[i + 1]) {
                pairs.push([message[i], 'x']);
                i--; // Adjust index to process next character properly
            } else {
                pairs.push([message[i], message[i + 1]]);
            }
        } else {
            pairs.push([message[i], 'x']); // Pad last character with 'x'
        }
    }
    console.log(pairs   )
    return pairs;
}

function findPosition(letter, matrix) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === letter) {
                return [i, j];
            }
        }
    }
    return null;
}
