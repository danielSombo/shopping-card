document.addEventListener('DOMContentLoaded', () => {
    const updateTotalPrice = () => {
        let total = 0;
        document.querySelectorAll('.card').forEach(card => {
            const quantity = parseInt(card.querySelector('.quantity').innerText);
            const unitPrice = parseFloat(card.querySelector('.unit-price').innerText.replace('$', ''));
            total += quantity * unitPrice;
        });
        document.querySelector('.total').innerText = `${total} $`;
    };

    document.querySelectorAll('.fa-plus-circle').forEach(button => {
        button.addEventListener('click', (event) => {
            const quantityElement = event.target.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.innerText);
            quantityElement.innerText = ++quantity;
            updateTotalPrice();
        });
    });

    document.querySelectorAll('.fa-minus-circle').forEach(button => {
        button.addEventListener('click', (event) => {
            const quantityElement = event.target.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.innerText);
            if (quantity > 0) {
                quantityElement.innerText = --quantity;
                updateTotalPrice();
            }
        });
    });

    document.querySelectorAll('.fa-trash-alt').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.card-body');
            card.remove();
            updateTotalPrice();
        });
    });

    document.querySelectorAll('.fa-heart').forEach(button => {
        button.addEventListener('click', (event) => {
            event.target.classList.toggle('liked');
        });
    });

    updateTotalPrice();
});
