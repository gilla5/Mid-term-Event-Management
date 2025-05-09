document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('token', token);
        window.location.href = 'index.html';
    } else {
        const { message } = await res.json();
        alert(message || 'Login failed.');
    }
});
