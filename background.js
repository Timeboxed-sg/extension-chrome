chrome.runtime.onMessage.addListener(async (recdMessage) => {
    if (recdMessage.messageType === 'GET_CREDENTIALS_FROM_BG') {
        console.log(recdMessage.messageType)
        const accessCodeText = recdMessage.accessCodeText

        // TODO: call timeboxed API to populate credentials
        const credentials = {
            username: "test@gmail.com",
            passwd: "1234password"
        }

        let [tab] = await chrome.tabs.query({
            active: true, currentWindow: true
        });

        let message = {
            messageType: "WITH_CREDENTIALS_FROM_BG",
            credentials: credentials
        }

        chrome.tabs.sendMessage(tab.id, message, (response) => {
            if (chrome.runtime.lastError) {
                // TODO: error handling
                // console.error("Error communicating from background to content_script!")
            } else {
                console.log("Sent message from background to content_script!")
                console.log(response)
            }
        });
    }
});
