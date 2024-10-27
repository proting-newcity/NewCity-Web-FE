$(document).ready(function() {
    function formatText(command, value = null) {
        document.execCommand(command, false, value);
    }

    $('#editor').on('focus', 'h2, p', function() {
        const placeholderText = $(this).is('h2') ? 'Tambah judul...' : 'Mulai tulis isi berita di sini...';
        if ($(this).text() === placeholderText) {
            $(this).text('');
        }
    }).on('blur', 'h2, p', function() {
        if (!$(this).text().trim().length) {
            $(this).text($(this).is('h2') ? 'Tambah judul...' : 'Mulai tulis isi berita di sini...');
        }
    });

    function addLink() {
        const url = prompt("Enter the URL");
        formatText("createLink", url);
    }
    $('.toolbar .btn').eq(3).click(addLink);

    const detailsTitle = $('#details-title');

    function updateDetailsTitle() {
        const editorTitle = $('#editor h2').text();
        detailsTitle.text(editorTitle || 'Tambah judul...');
    }

    $('#editor h2').on('input', updateDetailsTitle);

    $('.btn-editor').click(function() {
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
            applyStyle($(this));
        } else {
            removeStyle($(this));
        }
    });

    function applyStyle(button) {
        if (button.hasClass('bold-btn')) {
            document.execCommand('bold');
        }
        if (button.hasClass('italic-btn')) {
            document.execCommand('italic');
        }
    }

    function removeStyle(button) {
        if (button.hasClass('bold-btn')) {
        }
        if (button.hasClass('italic-btn')) {
            document.execCommand('italic');
        }
    }

    function updateModifiedDate() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        $('.detail-description.modified-date').text(formattedDate);
    }

    function collectData() {
        const title = $('#editor h2').text();
        const content = $('#editor p').text();
        const author = 'Sipaa';
        const modifiedDate = $('.detail-description.modified-date').text();
        const categories = [];
        $('input[type="checkbox"]:checked').each(function() {
            categories.push($(this).next('label').text());
        });

        return {
            title: title,
            content: content,
            author: author,
            modifiedDate: modifiedDate,
            categories: categories
        };
    }

    $('.publish-button').click(function() {
        updateDetailsTitle();
        updateModifiedDate();

        const jsonData = collectData();
        console.log(JSON.stringify(jsonData, null, 2));

        $.ajax({
            url: 'http://localhost:3000/save-json',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.error('Error saving data:', error);
            }
        });
    });
});
