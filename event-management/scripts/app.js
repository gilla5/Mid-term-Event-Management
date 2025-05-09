window.onload = async () => {
    const eventsList = document.getElementById('events-list');
    try {
        const res = await fetch('http://localhost:3000/api/events');
        const events = await res.json();

        if (events.length === 0) {
            eventsList.innerHTML = '<p>No events found.</p>';
        } else {
            events.forEach(event => {
                const eventCard = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text">${event.date} at ${event.time}</p>
                            <p class="card-text">${event.location}</p>
                            <a href="edit.html?id=${event._id}" class="btn btn-warning">Edit</a>
                            <button onclick="deleteEvent('${event._id}')" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                `;
                eventsList.innerHTML += eventCard;
            });
        }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};

async function deleteEvent(eventId) {
    try {
        await fetch(`http://localhost:3000/api/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        location.reload();
    } catch (error) {
        console.error('Error deleting event:', error);
    }
}
