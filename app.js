function initializeEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];

    if (events.length === 0) {
        const defaultEvents = [
            {
                id: 1,
                title: "Concert: The Weekend",
                date: "2025-05-12",
                time: "19:00",
                location: "Madison Square Garden"
            },
            {
                id: 2,
                title: "Tech Conference 2025",
                date: "2025-06-10",
                time: "09:00",
                location: "San Francisco Convention Center"
            },
            {
                id: 3,
                title: "Art Gallery Opening",
                date: "2025-04-22",
                time: "18:00",
                location: "Downtown Art Museum"
            }
        ];
        localStorage.setItem('events', JSON.stringify(defaultEvents)); 
    }
}

function displayEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];

    if (events.length === 0) {
        document.getElementById('events-list').innerHTML = '<p>No events available. Please create one!</p>';
    } else {
        let eventsHTML = events.map(event => `
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

        document.getElementById('events-list').innerHTML = eventsHTML;
    }
}

function deleteEvent(id) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.filter(event => event.id !== id);
    localStorage.setItem('events', JSON.stringify(events));
    displayEvents(); 
}


if (window.location.pathname.includes('index.html')) {
    window.onload = () => {
        initializeEvents();
        displayEvents();
    };
}
