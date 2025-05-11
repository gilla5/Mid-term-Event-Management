const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');

fetch('http://localhost:5000/api/events') 
    .then(response => response.json())
    .then(events => {
        const event = events.find(event => event._id === eventId); 

        if (event) {

            document.getElementById('title').value = event.title;
            document.getElementById('date').value = event.date;
            document.getElementById('time').value = event.time;
            document.getElementById('location').value = event.location;


            document.getElementById('editEventForm').addEventListener('submit', function (e) {
                e.preventDefault();

              
                const updatedEvent = {
                    title: document.getElementById('title').value,
                    date: document.getElementById('date').value,
                    time: document.getElementById('time').value,
                    location: document.getElementById('location').value,
                };

               
                fetch(`http://localhost:5000/api/events/${eventId}`, { 
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token') 
                    },
                    body: JSON.stringify(updatedEvent)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Event updated successfully') {
                        alert('Event updated successfully!');
                        window.location.href = 'index.html'; 
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
