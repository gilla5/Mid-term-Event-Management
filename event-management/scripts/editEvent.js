const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id'); // Event ID passed from the query string

// Get event data from backend
fetch('http://localhost:5000/api/events') // Replace with your backend API URL
    .then(response => response.json())
    .then(events => {
        const event = events.find(event => event._id === eventId); // Use _id for MongoDB ObjectId

        if (event) {
            // Populate form fields with event data
            document.getElementById('title').value = event.title;
            document.getElementById('date').value = event.date;
            document.getElementById('time').value = event.time;
            document.getElementById('location').value = event.location;

            // Listen for form submission
            document.getElementById('editEventForm').addEventListener('submit', function (e) {
                e.preventDefault();

                // Prepare updated event data
                const updatedEvent = {
                    title: document.getElementById('title').value,
                    date: document.getElementById('date').value,
                    time: document.getElementById('time').value,
                    location: document.getElementById('location').value,
                };

                // Make PUT request to update the event
                fetch(`http://localhost:5000/api/events/${eventId}`, { // URL for updating event
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token') // JWT token for authentication
                    },
                    body: JSON.stringify(updatedEvent) // Send updated data
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Event updated successfully') {
                        alert('Event updated successfully!');
                        window.location.href = 'index.html'; // Redirect to events list after successful update
                    } else {
                        alert('Failed to update event.');
                    }
                })
                .catch(err => console.error('Error updating event:', err));
            });
        } else {
            alert('Event not found');
        }
    })
    .catch(err => console.error('Error fetching event:', err));
