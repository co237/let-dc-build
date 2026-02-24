// Form submission handler
document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const formMessage = document.getElementById('form-message');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Disable button during submission
    submitBtn.disabled = true;
    btnText.textContent = 'Submitting...';

    // Hide previous messages
    formMessage.className = 'form-message';
    formMessage.style.display = 'none';

    try {
        // Replace this URL with your Google Apps Script web app URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwlHK0TVNUDbXiU7BycnCdlwYXJm7n_MzEPhxIjyhB2k1M9EPuRP39-8AN85uBsJmWAcw/exec';

        const response = await fetch(scriptURL, {
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
        });

        // Since we're using no-cors mode, we can't read the response
        // We'll assume success if no error was thrown
        formMessage.textContent = 'Thanks for joining the movement!';
        formMessage.className = 'form-message success';
        form.reset();

    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = 'Something went wrong. Please try again.';
        formMessage.className = 'form-message error';
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        btnText.textContent = 'Submit';
    }
});
