const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
const exchangeRateText = document.getElementById('exchange-rate');

// Free API key from exchangerate-api.com
const API_KEY = '7f1c85d90c8e8a1b3a3e8e0f';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

async function getExchangeRate(from, to) {
    try {
        const response = await fetch(`${BASE_URL}/${API_KEY}/pair/${from}/${to}`);
        const data = await response.json();
        return data.conversion_rate;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        alert('Failed to fetch exchange rate. Please try again later.');
        return null;
    }
}

async function convertCurrency() {
    const fromValue = fromCurrency.value;
    const toValue = toCurrency.value;
    const amountValue = parseFloat(amount.value);

    if (isNaN(amountValue) || amountValue < 0) {
        alert('Please enter a valid amount');
        return;
    }

    const rate = await getExchangeRate(fromValue, toValue);
    
    if (rate) {
        const convertedAmount = (amountValue * rate).toFixed(2);
        result.value = convertedAmount;
        exchangeRateText.textContent = `1 ${fromValue} = ${rate} ${toValue}`;
    }
}

function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
}

// Event Listeners
convertBtn.addEventListener('click', convertCurrency);
swapBtn.addEventListener('click', swapCurrencies);
amount.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') convertCurrency();
});

// Initial conversion
convertCurrency();