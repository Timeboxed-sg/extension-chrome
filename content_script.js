// listen for access code from popup
chrome.runtime.onMessage.addListener(async (recdMessage) => {
    if (recdMessage.messageType === "ACCESS_CODE_FROM_POPUP") {
        console.log(recdMessage.messageType)
        accessCodeText = recdMessage.accessCodeText

        // ask background script to retrieve credentials
        let message = {
            messageType: "GET_CREDENTIALS_FROM_BG",
            accessCodeText: accessCodeText
        }

        chrome.runtime.sendMessage(message, (response) => {
            if (chrome.runtime.lastError) {
                // TODO: error handling
                // console.error("Error communicating from content_script to background!")
            } else {
                console.log("Sent message from content_script to background!")
                console.log(response)
            }
        })
    }
})

// listen for credentials from background script
chrome.runtime.onMessage.addListener(async (recdMessage) => {
    if (recdMessage.messageType === 'WITH_CREDENTIALS_FROM_BG') {
        console.log(recdMessage.messageType)
        const credentials = recdMessage.credentials

        const username = credentials.username
        const passwd = credentials.passwd

        // TODO: still a bit buggy?
        // fill username
        let usernameField = document.getElementById("id_userLoginId")
        usernameField.value = username
        usernameField.setAttribute("value", username)
        usernameField.classList.add("hasText");
        usernameField.dir = 'ltr'

        // disable show password button
        let showPasswdButton = document.getElementById("id_password_toggle")
        showPasswdButton.disabled = true

        // fill password
        let passwdField = document.getElementById("id_password");
        passwdField.value = passwd
        passwdField.setAttribute("value", passwd)
        passwdField.classList.add("hasText")
        passwdField.dir = 'ltr'
    }
});
