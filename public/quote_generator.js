document.getElementById('quoteForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const inputs = document.getElementById('inputs').value;

    // Include the token in the request headers
    const headers = {
        'Content-Type': 'application/json', 
    };

    const data = { inputs }; // Payload does not need the userEmail anymore

    try {
        const response = await fetch('https://milestone1server-4a2e0b56cbf7.herokuapp.com/generate-quote', {
            method: 'POST',
            credentials: 'include',
            headers: headers, // Use the headers variable
            body: JSON.stringify(data), 
        });

        if (!response.ok) {
            throw new Error('Problem generating quote');
        }

        const responseData = await response.json();

        if (Array.isArray(responseData) && responseData.length > 0 && responseData[0].generated_text) {
            let words = responseData[0].generated_text.split(' '); 
            words.shift(); 
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