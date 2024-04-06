// quote_generator.js
document.getElementById('quoteForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const inputs = document.getElementById('inputs').value;
    // Retrieve the user's email or session token from sessionStorage
    const userEmail = sessionStorage.getItem('userEmail'); // Or use getSessionToken() if using tokens
    const data = { inputs, userEmail }; // Include it in the request payload

    try {
        const response = await fetch('https://milestone1server-4a2e0b56cbf7.herokuapp.com/generate-quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data), 
        });

        if (!response.ok) {
            throw new Error('Problem generating quote');
        }

        const responseData = await response.json();

        if (Array.isArray(responseData) && responseData.length > 0 && responseData[0].generated_text) {
            let words = responseData[0].generated_text.split(' '); 
            words.shift(); // Assuming you want to remove the first word for some reason
            let generatedQuote = words.join(' '); 

            document.getElementById('quote').textContent = generatedQuote;
        } else {
            console.error('Received unexpected response structure:', responseData);
            document.getElementById('quote').textContent = 'Received unexpected response. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('quote').textContent = 'Error generating quote. Please try again.';
    }
});
