const urlParams = new URLSearchParams(window.location.search);
const eventId = parseInt(urlParams.get('id'), 10);

const events = JSON.parse(localStorage.getItem('events')) || [];
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
        event.time = document.getElementById('time').value;
        event.location = document.getElementById('location').value;

        localStorage.setItem('events', JSON.stringify(events));

        window.location.href = 'index.html';
    });
}
