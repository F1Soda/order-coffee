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
    e.preventDefault();

    const beverages = document.querySelectorAll('.beverage');
    const count = beverages.length;
    const wordForm = getDrinkWordForm(count);

    const modalText = document.querySelector('#modal p');
    modalText.textContent = `Вы заказали ${count} ${wordForm}`;

    const tbody = document.querySelector('#order-summary tbody');
    tbody.innerHTML = ''; // Очищаем перед вставкой новых строк

    beverages.forEach(bev => {
        const drink = bev.querySelector('select').selectedOptions[0].textContent;

        const milkRadio = bev.querySelector('input[type="radio"]:checked');
        const milk = milkRadio ? milkRadio.nextElementSibling.textContent : '';

        const additions = Array.from(bev.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.nextElementSibling.textContent.trim())
            .join(', ');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${drink}</td>
            <td>${milk}</td>
            <td>${additions}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
});

document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
});


updateRemoveButtons();

function getDrinkWordForm(count) {
    const rem10 = count % 10;
    const rem100 = count % 100;

    if (rem10 === 1 && rem100 !== 11) return 'напиток';
    if ([2, 3, 4].includes(rem10) && ![12, 13, 14].includes(rem100)) return 'напитка';
    return 'напитков';
}
