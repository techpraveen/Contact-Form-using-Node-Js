document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const responseMessage = document.getElementById('responseMessage');

    fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.text())
    .then(data => {
        responseMessage.textContent = data;
        responseMessage.style.color = 'green';
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        responseMessage.textContent = 'Error submitting form';
        responseMessage.style.color = 'red';
    });
});
