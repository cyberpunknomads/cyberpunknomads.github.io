document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('video');

    // Be om tillgång till webbkameran
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(error) {
                console.log("Något gick fel när kameran försökte anslutas: ", error);
            });
    } else {
        alert('Din webbläsare stöder inte mediaDevices.getUserMedia');
    }

    // Funktion för att hämta och visa användarens position
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            document.getElementById("location").innerHTML = "Geolocation stöds inte av denna webbläsare.";
        }
    }

    // Funktion för att visa position
    function showPosition(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        document.getElementById("location").innerHTML = "Latitude: " + latitude + 
        "<br>Longitude: " + longitude;
    }

    // Hantera fel
    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                document.getElementById("location").innerHTML = "Användaren nekade begäran om Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                document.getElementById("location").innerHTML = "Platsinformation är inte tillgänglig."
                break;
            case error.TIMEOUT:
                document.getElementById("location").innerHTML = "Begäran om att få användarens plats tog för lång tid."
                break;
            case error.UNKNOWN_ERROR:
                document.getElementById("location").innerHTML = "Ett okänt fel uppstod."
                break;
        }
    }

    // Kalla på funktionen för att hämta plats
    getLocation();
});

