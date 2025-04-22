const addButton = document.querySelector('.add-button');
const beverageList = document.getElementById('beverage-list');

addButton.addEventListener('click', () => {
    const beverages = document.querySelectorAll('.beverage');
    const beverageCount = beverages.length + 1;

    const lastBeverage = beverages[beverages.length - 1];
    const newBeverage = lastBeverage.cloneNode(true);

    newBeverage.querySelector('.beverage-count').textContent = `Напиток №${beverageCount}`;

    const inputs = newBeverage.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'radio') {
            input.checked = input.defaultChecked;
        } else if (input.type === 'checkbox') {
            input.checked = false;
        }
    });

    const select = newBeverage.querySelector('select');
    select.selectedIndex = 1;

    const milkRadios = newBeverage.querySelectorAll('input[type="radio"]');
    milkRadios.forEach(radio => {
        radio.name = `milk${beverageCount}`;
    });

    beverageList.appendChild(newBeverage);
});