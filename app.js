const apiUrl = 'https://jsonblob.com/api/1370163375648202752';

function displayEvents() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(events => {
            const eventsList = document.getElementById('events-list');
            if (events.length === 0) {
                eventsList.innerHTML = '<p>No events available. Please create one!</p>';
            } else {
                const eventsHTML = events.map(event => `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text">Date: ${event.date} | Time: ${event.time}</p>
                            <p class="card-text">Location: ${event.location}</p>
                            <a href="edit.html?id=${event.id}" class="btn btn-warning">Edit</a>
                            <button onclick="deleteEvent(${event.id})" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                `).join('');

                eventsList.innerHTML = eventsHTML;
            }
        });
}

function deleteEvent(id) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(events => {
            const updatedEvents = events.filter(event => event.id !== id);
            fetch(apiUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedEvents)
            })
            .then(() => displayEvents());
        });
}

if (window.location.pathname.includes('index.html')) {
    window.onload = () => {
        displayEvents();
    };
}
