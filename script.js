// Form submission handler
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const formMessage = document.getElementById('form-message');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Immediately show success message (optimistic UI)
    form.querySelector('.form-row').style.display = 'none';
    submitBtn.style.display = 'none';
    formMessage.innerHTML = '<h3 style="font-size: 2rem; margin-bottom: 0.5rem;">Submitted!</h3><p>Thanks for joining the movement.</p>';
    formMessage.className = 'form-message success';

    // Submit to server in the background
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwlHK0TVNUDbXiU7BycnCdlwYXJm7n_MzEPhxIjyhB2k1M9EPuRP39-8AN85uBsJmWAcw/exec';

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            timestamp: new Date().toISOString()
        })
    }).catch(error => {
        console.error('Error:', error);
        // Note: With no-cors mode, we can't detect most errors
        // The user has already seen the success message
    });
});
