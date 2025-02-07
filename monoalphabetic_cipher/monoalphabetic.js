const encryptOrDecrypt = document.getElementById("encrypt-or-decrypt")
const messageLabel = document.getElementById("message-label")
const message = document.getElementById("message")
const cipherText = document.getElementById("cipher-text")
const defaultCipherText = document.getElementById("default-cipher-text")
const randomizeCipherText = document.getElementById("randomize-cipher-text")
const convertedMessageLabel = document.getElementById("converted-message-label")
const convertedMessage = document.getElementById("converted-message")
const saveButton = document.getElementById("save")
let cipherTextAlphabet;

window.onload = () => {
    cipherTextAlphabet = generateMonoalphabeticCipher();
    cipherText.value = displayCipherTextAlphabet();
}

saveButton.addEventListener("click", () => {
    let newMessage = monoalphabeticCipher(message.value, cipherTextAlphabet, encryptOrDecrypt.value);
    convertedMessage.value = newMessage;

})

randomizeCipherText.addEventListener("click", () => {
    cipherTextAlphabet = generateMonoalphabeticCipher(randomize=true);
    cipherText.value = displayCipherTextAlphabet();

})

defaultCipherText.addEventListener("click", () => {
    cipherTextAlphabet = generateMonoalphabeticCipher();
    cipherText.value = displayCipherTextAlphabet();
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

function generateMonoalphabeticCipher(randomize=false) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    if (randomize) {
        const shuffled = [...alphabet].sort(() => Math.random() - 0.5); // Shuffle the alphabet randomly
        return Object.fromEntries(alphabet.map((char, index) => [char, shuffled[index]]));

    }
    else{
        const cipherValue = 'zyxwvutsrqponmlkjihgfedcba'.split('');
        return Object.fromEntries(alphabet.map((char, index) => [char, cipherValue[index]]));

    }
}

function displayCipherTextAlphabet() {
    let cipherTextAlphabetDisplay = ''
    Object.entries(cipherTextAlphabet).forEach(([key, value]) => {
        cipherTextAlphabetDisplay += value
    });

    return cipherTextAlphabetDisplay
}

function monoalphabeticCipher(message, cipherTextAlphabet, action) {
    if (!message) {
        alert("Please provide a message")
    }
    
    if (action === "encrypt") {
        let encodedMessage = ''
        Array.prototype.forEach.call(message, (character) => {
            if (isAlpha(character)) {
                let newLetter = ''
                newLetter = cipherTextAlphabet[character.toLowerCase()]
                if (character === character.toUpperCase()) {
                    newLetter = newLetter.toUpperCase()
                }
                encodedMessage += newLetter
            }
            else{
                encodedMessage += character
            }
        })

        return encodedMessage
    }

    else{
        let decodedMessage = ''
        Array.prototype.forEach.call(message, (character) => {
            if (isAlpha(character)) {
                let newLetter = ''
                newLetter = Object.keys(cipherTextAlphabet).find(key => cipherTextAlphabet[key] == character.toLowerCase())
                if (character === character.toUpperCase()) {
                    newLetter = newLetter.toUpperCase()
                }

                decodedMessage += newLetter
            }
            else{
                decodedMessage += character
            }
        })

        return decodedMessage
    }
    
}