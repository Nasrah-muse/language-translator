 async function fetchLanguages() {
    const url = 'https://microsoft-translator-text-api3.p.rapidapi.com/languages?api-version=3.0';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '46f2caceafmshd887ef4dfa8600cp18efddjsnb98e0c373744',
            'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();  
        const languages = result.translation;  
        populateLanguageOptions(languages);    
    } catch (error) {
        console.error('Error fetching languages:', error);
    }
}

 function populateLanguageOptions(languages) {
    const selectFrom = document.querySelector('#select-from');
    const selectTo = document.querySelector('#select-to');

    for (const [code, details] of Object.entries(languages)) {
        const name = details.name; 
        const optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.textContent = name;
        selectFrom.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.textContent = name;
        selectTo.appendChild(optionTo);
    }
}

 window.onload = fetchLanguages;

 document.querySelector('#translate-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const from = document.querySelector('#select-from').value;
    const to = document.querySelector('#select-to').value;
    const text = document.querySelector('#text-translate').value;

    const url = `https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=${to}&from=${from}&api-version=3.0`;
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '46f2caceafmshd887ef4dfa8600cp18efddjsnb98e0c373744',
            'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{ text: text }])
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); 
        console.log(result);
         const translatedText = result[0]?.translations[0]?.text || 'Translation failed';
        document.querySelector('#translated-output').textContent = translatedText;
 
    } catch (error) {
        console.error('Error translating text:', error);
    }
});
