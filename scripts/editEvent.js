const urlParams = new URLSearchParams(window.location.search);
const eventId = parseInt(urlParams.get('id'), 10);

fetch('https://jsonblob.com/api/1370163375648202752')
    .then(response => response.json())
    .then(events => {
        const event = events.find(event => event.id === eventId);
        
        if (event) {
            document.getElementById('title').value = event.title;
            document.getElementById('date').value = event.date;
            document.getElementById('time').value = event.time;
            document.getElementById('location').value = event.location;

            document.getElementById('editEventForm').addEventListener('submit', function(e) {
                e.preventDefault();

                event.title = document.getElementById('title').value;
                event.date = document.getElementById('date').value;
                event.time = document.getElementById('time').value
