const translateBtn = document.getElementById('translate-btn');
const startOverBtn = document.getElementById('start-over-btn');
const originalTextEl = document.getElementById('original-text');
const translatedTextEl = document.getElementById('translated-text');
const resultsSection = document.getElementById('results-section');

translateBtn.addEventListener('click', async () => {
    const textToTranslate = document.getElementById('text-to-translate').value;
    const selectedLanguage = document.querySelector('input[name="language"]:checked');

    if (textToTranslate && selectedLanguage) {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: textToTranslate,
                language: selectedLanguage.value
            })
        });

        if (response.ok) {
            const data = await response.json();
            originalTextEl.innerText = textToTranslate;
            translatedTextEl.innerText = data.translation;
            resultsSection.style.display = 'block';
        } else {
            alert('Error fetching translation');
        }
    } else {
        alert('Please enter text and select a language.');
    }
});

startOverBtn.addEventListener('click', () => {
    document.getElementById('text-to-translate').value = '';
    resultsSection.style.display = 'none';
});