$(document).ready(function () {

    async function loadData() {
        try {
            let index = 0;
            const response = await fetch('../js/report.json');
            const data = await response.json();

            const cardTemplate = document.querySelector('.card-template');
            const cardContainer = document.getElementById('card-container');

            data.report.forEach(item => {
                const cardClone = cardTemplate.cloneNode(true);
                cardClone.style.display = "block";
                cardClone.querySelector('.card-title').textContent = item.title;
                cardClone.querySelector('.card-description').textContent = item.description;
                cardClone.querySelector('.card-date').textContent = item.date;
                cardClone.querySelector('#confirmation').src = item.confirmation;
                cardClone.setAttribute('data-index', index);
                index++;

                // Add click event listener to handle active class and loading column-2
                cardClone.addEventListener('click', (event) => {
                    // Remove 'active' class from all other card-list items
                    document.querySelectorAll('#card-container .card-template').forEach(card => {
                        card.classList.remove('active');
                    });

                    // Add 'active' class to the clicked card
                    cardClone.classList.add('active');

                    // Load data into column-2
                    const index = event.currentTarget.getAttribute('data-index');
                    loadColumn2Manually(index);
                });

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
            $('.card-container').attr('style', 'block');
        });
    }

    // Scroll to top on button click
    $('#back-to-top').on('click', function () {
        $('#column-1').animate({ scrollTop: 0 });
    });
});
