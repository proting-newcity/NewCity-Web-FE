$(document).ready(function () {

    async function loadData() {
        try {
            index = 0;
            const response = await fetch('../js/report.json');
            const data = await response.json();

            // Ambil template card dari HTML
            const cardTemplate = document.querySelector('.card-template');
            const cardContainer = document.getElementById('card-container');


            data.report.forEach(item => {
                const cardClone = cardTemplate.cloneNode(true);
                cardClone.style.display = "block";
                cardClone.classList.remove('card-template');
                cardClone.querySelector('.card-title').textContent = item.title;
                cardClone.querySelector('.card-description').textContent = item.description;
                cardClone.querySelector('.card-date').textContent = item.date;
                cardClone.querySelector('#confirmation').src = item.confirmation;
                cardClone.setAttribute('data-index', index);
                index++;
                cardClone.addEventListener('click', (event) => {
                    const index = event.currentTarget.getAttribute('data-index');
                    loadColumn2Manually(index);
                });//YEAH 2 JAM CUMAN BUAT EVENT LISTENER INI DOANG PLS GOKIL
                cardContainer.appendChild(cardClone);
            });
        } catch (error) {
            console.error("Error loading JSON data:", error);
        }
    }
    loadData();
    function loadColumn2Manually(index) {
        $.getJSON('../js/report.json', function (data) {
            const selectedItem = data.report[index];
            $('#col2-title').text(selectedItem.title);
            $('#col2-description').text(selectedItem.description);
            $('#col2-category').text(selectedItem.category);
            $('#col2-location').text(selectedItem.location);
            $('#col2-date').text(selectedItem.date);
            $('.card-img-top').attr('src', selectedItem.image);
        });
    }
});