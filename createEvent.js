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

    fetch('https://jsonblob.com/api/1370163375648202752')
        .then(response => response.json())
        .then(events => {
            events.push(newEvent);
            return fetch('https://jsonblob.com/api/1370163375648202752', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(events)
            });
        })
        .then(() => {
            window.location.href = 'index.html';
        });
});
