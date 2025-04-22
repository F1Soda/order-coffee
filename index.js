const addButton = document.querySelector('.add-button');
const beverageList = document.getElementById('beverage-list');
const submitButton = document.querySelector('.submit-button');

function updateRemoveButtons() {
    const beverages = document.querySelectorAll('.beverage');
    beverages.forEach((bev, index) => {
        let btn = bev.querySelector('.remove-button');
        if (!btn) {
            btn = document.createElement('button');
            btn.classList.add('remove-button');
            btn.type = 'button';
            btn.textContent = '✖';
            bev.appendChild(btn);
        }

        btn.onclick = () => {
            if (document.querySelectorAll('.beverage').length > 1) {
                bev.remove();
                updateBeverageNumbers();
            }
        };
    });
}

function updateBeverageNumbers() {
    const beverages = document.querySelectorAll('.beverage');
    beverages.forEach((bev, index) => {
        bev.querySelector('.beverage-count').textContent = `Напиток №${index + 1}`;
    });
}

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
    milkRadios.forEach((radio, idx) => {
        radio.name = `milk${beverageCount}`;
    });

    beverageList.appendChild(newBeverage);
    updateRemoveButtons();
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault(); // чтобы форма не отправлялась
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
});

document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
});

// Инициализировать удаление на старом fieldset
updateRemoveButtons();
