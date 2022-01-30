chrome.runtime.onMessage.addListener(async (recdMessage) => {
    if (recdMessage.messageType === 'GET_CREDENTIALS_FROM_BG') {
        console.log(recdMessage.messageType)
        const accessCodeText = recdMessage.accessCodeText

        const resp = await fetch('http://localhost:8080/api/v1/pass/access-pass',{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                passToken: accessCodeText
            })
        })
        const result = await resp.json()
        console.log(result)
        const credentials = {
            username: result.data.username,
            passwd: result.data.password
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
