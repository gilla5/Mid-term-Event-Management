let events = [
    { id: 1, title: "Music Concert", date: "2025-05-10", time: "19:00", location: "City Arena" },
    { id: 2, title: "Art Exhibition", date: "2025-06-15", time: "10:00", location: "Art Gallery" },
    { id: 3, title: "Tech Conference", date: "2025-07-20", time: "09:00", location: "Convention Center" },
    { id: 4, title: "Food Festival", date: "2025-08-05", time: "12:00", location: "Park Grounds" },
];

// Function to display events on the page
function displayEvents(page = 1) {
    const eventsPerPage = 2; 
    const start = (page - 1) * eventsPerPage;
    const end = page * eventsPerPage;
    const paginatedEvents = events.slice(start, end);

    if (paginatedEvents.length === 0) {
        document.getElementById('events-list').innerHTML = '<p>No events available.</p>';
    } else {
        let eventsHTML = paginatedEvents.map(event => `
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
        generatePagination(page, Math.ceil(events.length / eventsPerPage));
    }
}

// Function to generate pagination links
function generatePagination(currentPage, totalPages) {
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" onclick="displayEvents(${i})">${i}</a>
        </li>`;
    }
    document.getElementById('pagination').innerHTML = paginationHTML;
}

// Function to delete an event (mock implementation)
function deleteEvent(id) {
    events = events.filter(event => event.id !== id);
    displayEvents(1); // Refresh the event list after deletion
}

// Initialize the page
if (window.location.pathname.includes('index.html')) {
    displayEvents();
}
