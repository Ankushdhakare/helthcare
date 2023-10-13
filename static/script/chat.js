function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage() {
    let firstMessage = "How can i help you?"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "I love Code Palace!";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}
// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function micButton() {
    const setInputValue = document.getElementById("textInput");
    recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setInputValue.value = result;
        window.recording = result
    };

    return window.recording;
}
// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});

function sendButton() {
    getResponse();
}



const img = document.querySelector("#img");
var upload_image = "";
img.addEventListener("change",function() {
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
        upload_image = reader.result;
        console.log(upload_image);
        document.querySelector(".chat_container").style.backgroundImage = `url(${upload_image})`;
    });
    // reader.readAsDataURL(this.file[0]);
});

function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('preview');
        output.src = reader.result;
        output.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
}

micButton.addEventListener("change", function () {
    const audio = micButton.files[0];
    console.log(audio)
    if (audio) {
        // For simplicity, let's display the image in the chat box as a URL
        const audioURL = URL.createObjectURL(audio);
        console.log(audioURL)
        sendMessage(` <audio controls>
        <source src="${audioURL}"/>
        </audio>`);
        micButton.value = ""; // Clear the selected file
    }
});