const apiUrl = "http://localhost:3000/cards"; // Backend URL

const inputText = document.getElementById('inputText');
const addButton = document.getElementById('addButton');
const cardsContainer = document.getElementById('cardsContainer');

// Load cards from the server
async function loadCards() {
  try {
    const response = await fetch(apiUrl);
    const cards = await response.json();
    cards.forEach((card) => addCard(card.text));
  } catch (error) {
    console.error('Error loading cards:', error);
  }
}

// Add a card to the page and send it to the server
addButton.addEventListener('click', async () => {
  const text = inputText.value.trim();
  if (text) {
    addCard(text);
    await saveCardToServer(text);
    inputText.value = '';
  }
});

// Add card to the DOM
function addCard(text) {
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = text;
  cardsContainer.appendChild(card);
}

// Save card to the server
async function saveCardToServer(text) {
  try {
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
  } catch (error) {
    console.error('Error saving card:', error);
  }
}

// Load cards on page load
document.addEventListener('DOMContentLoaded', loadCards);
