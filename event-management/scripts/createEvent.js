document.getElementById('createEventForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;

    try {
        const response = await fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title, date, time, location })
        });

        if (!response.ok) {
        
            const error = await response.json();
            throw new Error(error.message || 'Failed to create event');
        }

       
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error creating event:', error);
        alert('There was an error creating the event: ' + error.message);
    }
});
