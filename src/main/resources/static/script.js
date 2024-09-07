var stompClient = null;

function connect() {
    console.log("Attempting to connect...");

    // Creating SockJS connection and passing the WebSocket endpoint
    let socket = new SockJS("/server1");
    stompClient = Stomp.over(socket);

    // Establish WebSocket connection
    stompClient.connect({}, function(frame) {
        console.log("Connected: " + frame);

        // Hide the login card and show chat room UI
        $('#loginCard').hide();
        $('#welcomeMessage').hide();
        $('#chat-room').removeClass('d-none');

        // Subscribe to the topic to receive messages
        stompClient.subscribe("/topic/return-to", function(response) {
            showMessage(JSON.parse(response.body));  // Parse and show the message
        });
    }, function(error) {
        console.error("STOMP connection error: " + error);
        alert("Could not connect to WebSocket server. Please try again later.");
        // Optionally, you can retry the connection or prompt the user to refresh
    });
}

function showMessage(message) {
    $("#message-container-table").append(
        `<tr><td><b>${message.name}:</b> ${message.content}</td></tr>`
    );
}

function sendMessage() {
    let jsonObj = {
        name: localStorage.getItem("name"),  // Retrieve the user's name from local storage
        content: $("#message-value").val()   // Get the message from the input field
    };

    // Check if STOMP client is connected before sending the message
    if (stompClient && stompClient.connected) {
        stompClient.send("/app/message", {}, JSON.stringify(jsonObj));
        $("#message-value").val('');  // Clear the input field after sending
    } else {
        alert("You are not connected to the WebSocket server.");
    }
}

$(document).ready(function() {
    // Check for stored name and timestamp in local storage
    const storedName = localStorage.getItem("name");
    const nameStoreTimestamp = localStorage.getItem("nameStoreTimestamp");

    // Validate if the stored name is recent (within 2 minutes)
    if (storedName && nameStoreTimestamp) {
        const currentTime = Date.now();
        const storedTime = parseInt(nameStoreTimestamp);

        if (currentTime - storedTime < 2 * 60 * 1000) {
            console.log(`Stored name found: ${storedName}`);
            alert(`Welcome back, ${storedName}!`);
            connect();  // Auto-connect to WebSocket if name is found
        } else {
            localStorage.removeItem("name");
            localStorage.removeItem("nameStoreTimestamp");
        }
    }

    // Show the login form when login button is clicked
    $('#loginBtn').click(function() {
        $('#welcomeMessage').fadeOut(function() {
            $('#loginCard').fadeIn();
        });
    });

    // Send message when the send button is clicked
    $('#send-btn').click(function() {
        sendMessage();
    });

    // Handle login form submission
    $('#enterBtn').click(function() {
        const name = $('#nameInput').val().trim();  // Get the user's entered name

        if (name) {
            console.log(`Name "${name}" entered.`);
            alert(`Welcome, ${name}!`);

            // Store the user's name and the timestamp in local storage
            localStorage.setItem("name", name);
            localStorage.setItem("nameStoreTimestamp", Date.now().toString());

            connect();  // Connect to the WebSocket after login
        } else {
            console.log("No name entered.");
            alert('Please enter your name.');
        }
    });

    // Handle user logout
    $('#logout').click(function() {
        localStorage.removeItem("name");
        localStorage.removeItem("nameStoreTimestamp");
        location.href = "/";  // Redirect to the home page after logout
    });
});
