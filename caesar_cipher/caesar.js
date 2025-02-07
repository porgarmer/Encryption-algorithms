const encryptOrDecrypt = document.getElementById("encrypt-or-decrypt")
const messageLabel = document.getElementById("message-label")
const message = document.getElementById("message")
const shift = document.getElementById("shift")
const convertedMessageLabel = document.getElementById("converted-message-label")
const convertedMessage = document.getElementById("converted-message")
const saveButton = document.getElementById("save")

saveButton.addEventListener("click", () => {
    let newMessage = caesarCipher(message.value, parseInt(shift.value), encryptOrDecrypt.value)
    convertedMessage.value = newMessage
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

function caesarCipher(message, shift, action) {
    const alphabet = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 6,
        h: 7,
        i: 8,
        j: 9,
        k: 10,
        l: 11,
        m: 12,
        n: 13,
        o: 14,
        p: 15,
        q: 16,
        r: 17,
        s: 18,
        t: 19,
        u: 20,
        v: 21,
        w: 22,
        x: 23,
        y: 24,
        z: 25
    }

    if (!message) {
        alert("Please provide a message")
    }
    else if (!shift) {
        alert("Please provide a shift value")

    }
    
    if (action === "encrypt") {
        let encodedMessage = ''
        Array.prototype.forEach.call(message, (character)=>{
            if (isAlpha(character)) {
                let letterPosition = alphabet[character.toLowerCase()]
                letterPosition += shift

                if (letterPosition < 0) {
                    while (letterPosition < 0) {
                        letterPosition += 26
                    }

                }else{
                    while (letterPosition > 25) {
                        letterPosition -= 26
                    }
                }
              
                let newLetter = ''
                Object.entries(alphabet).forEach(([letter, position]) => {
                    if (position === letterPosition) {
                        if (character === character.toUpperCase()) {
                            newLetter = letter.toUpperCase()
                        }
                        else{
                            newLetter = letter
                        }
                    }
                })

                encodedMessage += newLetter
            }else{
                encodedMessage += character
            }
        })

        return encodedMessage
    }else{
        let decodedMessage = ''
        Array.prototype.forEach.call(message, (character)=>{
            if (isAlpha(character)) {
                let letterPosition = alphabet[character.toLowerCase()]
                letterPosition -= shift
                
                if (letterPosition > 25) {
                    while (letterPosition > 25) {
                        letterPosition -= 26
                    }

                }else{
                    while (letterPosition < 0) {
                        letterPosition += 26
                    }
                }

                let newLetter = ''
                Object.entries(alphabet).forEach(([letter, position]) => {
                    if (position === letterPosition) {
                        if (character === character.toUpperCase()) {
                            newLetter = letter.toUpperCase()
                        }
                        else{
                            newLetter = letter
                        }
                    }
                })

                decodedMessage += newLetter
            }else{
                decodedMessage += character
            }
        })

        return decodedMessage
    }
}