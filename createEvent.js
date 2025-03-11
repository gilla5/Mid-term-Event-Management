document.getElementById('addEventForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;

    const newEvent = {
        id: Date.now(),
        title,
        date,
        time,
        location
    };

    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(newEvent);

    localStorage.setItem('events', JSON.stringify(events));

    window.location.href = 'index.html'; 
});
