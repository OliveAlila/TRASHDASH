let score = 0;  // Initialize score

// Select all items and bins
const items = document.querySelectorAll('.item');
const bins = document.querySelectorAll('.bin');
const scoreElement = document.getElementById('score');  // Score display element

// Add drag events to items
items.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
});

bins.forEach(bin => {
    bin.addEventListener('dragover', handleDragOver);
    bin.addEventListener('drop', handleDrop);
});

// Start drag operation and set the item's type in dataTransfer
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-type'));
    e.target.classList.add('dragging');
}

// Allow dropping by preventing default behavior
function handleDragOver(e) {
    e.preventDefault();
}

// Handle the drop event
function handleDrop(e) {
    e.preventDefault();
    
    const itemType = e.dataTransfer.getData('text/plain');  // Get item type
    const binType = e.target.getAttribute('data-type');  // Get bin type
    
    // Check if the item type matches the bin type
    if (itemType === binType) {
        e.target.classList.add('correct');  // Add correct class to bin
        score += 10;  // Increment score for correct drop
        setTimeout(() => e.target.classList.remove('correct'), 500);  // Remove class after animation
    } else {
        e.target.classList.add('wrong');  // Add wrong class for incorrect bin
        setTimeout(() => e.target.classList.remove('wrong'), 500);  // Remove class after animation
    }

    // Update the score on the UI
    scoreElement.textContent = score;
}

// Reset game: set score to 0 and clear all classes
const resetButton = document.getElementById('reset-game');
resetButton.addEventListener('click', () => {
    score = 0;  // Reset score
    scoreElement.textContent = score;  // Update the score display

    // Remove any 'dragging', 'correct', or 'wrong' classes
    items.forEach(item => item.classList.remove('dragging'));
    bins.forEach(bin => {
        bin.classList.remove('correct', 'wrong');
    });
});