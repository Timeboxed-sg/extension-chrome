// get submit button from popup.html
let submitAccessCodeButton = document.getElementById("submitAccessCodeButton");

// when the button is clicked, send the access code to the content script
submitAccessCodeButton.addEventListener("click", async () => {
    let accessCodeField = document.getElementById("accessCodeField")
    let accessCodeText = accessCodeField.value

    let [tab] = await chrome.tabs.query({
        active: true, currentWindow: true
    });

    // send to content script
    let message = {
        messageType: "ACCESS_CODE_FROM_POPUP",
        accessCodeText: accessCodeText
    }

    chrome.tabs.sendMessage(tab.id, message, (response) => {
        if (chrome.runtime.lastError) {
            // TODO: error handling
            // console.error("Error communicating from popup to content_script!")
        } else {
            console.log("Sent message from popup to content_script!")
            console.log(response)
        }
    });
});
