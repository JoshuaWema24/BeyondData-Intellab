async function subscribeNewsletter() {
    const input = document.getElementById('newsletter-email');
    const btn = document.getElementById('newsletter-btn');
    const msg = document.getElementById('newsletter-msg');
    const email = input.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.style.color = '#f66530';
        msg.textContent = 'Please enter a valid email address.';
        return;
    }

    btn.disabled = true;
    btn.textContent = 'Subscribing... please wait!';
    msg.textContent = '';

    try {
        const res = await fetch('https://intellab-backend.onrender.com/api/subscriptions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
            msg.style.color = '#4ade80';
            msg.textContent = '✓ Subscription successful! Thank you.';
            input.value = '';
        } else if (res.status === 409) {
            msg.style.color = '#f66530';
            msg.textContent = 'This email is already subscribed. Use a different email.';
        } else {
            msg.style.color = '#f66530';
            msg.textContent = data.message || 'Something went wrong. Please try again later.';
        }

    } catch (err) {
        msg.style.color = '#f66530';
        msg.textContent = 'Network error. Please check your connection.';
    } finally {
        btn.disabled = false;
        btn.textContent = 'Subscribe';
    }
}

// Allow pressing Enter in the input field
document.getElementById('newsletter-email').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') subscribeNewsletter();
});