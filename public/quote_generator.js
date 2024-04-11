document.getElementById('quoteForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const inputs = document.getElementById('inputs').value;
    const headers = {
        'Content-Type': 'application/json',
    };
    const data = { inputs };

    try {
        // Attempt to generate the quote
        const quoteResponse = await fetch('https://milestone1server-4a2e0b56cbf7.herokuapp.com/generate-quote', {
            method: 'POST',
            credentials: 'include',
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!quoteResponse.ok) {
            throw new Error('Problem generating quote');
        }

        const quoteData = await quoteResponse.json();

        // Process the quote response
        if (Array.isArray(quoteData) && quoteData.length > 0 && quoteData[0].generated_text) {
            let words = quoteData[0].generated_text.split(' ');
            words.shift();
            let generatedQuote = words.join(' ');

            document.getElementById('quote').textContent = generatedQuote;
        } else {
            console.error('Received unexpected response structure:', quoteData);
            document.getElementById('quote').textContent = 'Received unexpected response. Please try again.';
        }

        // Check the API usage
        const usageResponse = await fetch('https://milestone1server-4a2e0b56cbf7.herokuapp.com/api-usage', {
            method: 'GET',
            credentials: 'include',
            headers: headers,
        });

        if (usageResponse.ok) {
            const usageData = await usageResponse.json();
            if (usageData.apiCallsMade > 20) {
                // Show a warning message about exceeding the free limit
                alert('You have exceeded your free API call limit of 20. You may continue using the service, but please be aware that you have surpassed the free quota.');
            }
        } else {
            console.error('Failed to fetch API usage data');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('quote').textContent = 'Error generating quote. Please try again.';
    }
});
