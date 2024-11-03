$(document).ready(function () {

    const urlParams = new URLSearchParams(window.location.search);
    const beritaId = urlParams.get('id');

    //Memuat data dari json untuk ditampilkan
    loadJsonData(beritaId);
    updateDetailsTitle();

    $('#editor h2').on('input', updateDetailsTitle);

    $('.detail-description.editor').text('');
    $('.detail-description.status').text('');
    function formatText(command, value = null) {
        document.execCommand(command, false, value);
    }

    $('#editor').on('focus', 'h2, p', function () {
        const placeholderText = $(this).is('h2') ? 'Tambah judul...' : 'Mulai tulis isi berita di sini...';
        if ($(this).text() === placeholderText) {
            $(this).text('');
        }
    }).on('blur', 'h2, p', function () {
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

    $('.btn-editor').click(function () {
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

    //Nampilin waktu publikasi secara real-time
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

    //Nampilin data json ke field yang sesuai
    function collectData() {
        const title = $('#editor h2').text();
        const content = $('#editor p').text();
        const author = 'admin';
        const modifiedDate = $('.detail-description.modified-date').text();
        const categories = [];
        $('input[type="checkbox"]:checked').each(function () {
            categories.push($(this).next('label').text());
        });

        return {
            judul: title,
            konten: content,
            editor: author,
            tanggal: modifiedDate,
            kategori: categories
        };
    }

    $('.publish-button').click(function () {
        updateDetailsTitle();
        updateModifiedDate();

        $('.detail-description.status').text('Diterbitkan');

        const jsonData = collectData();
        console.log(JSON.stringify(jsonData, null, 2));
    });

    //Nampilin data ketika tombol edit dipencet di halaman listBerita, sesuai list
    function loadJsonData(id) {
        fetch('../js/berita.json')
            .then(response => response.json())
            .then(data => {
                const beritaList = data.berita[id];
                populateEditor(beritaList);
            })
            .catch(error => console.error('Error fetching berita:', error));
    }

    //Nampilin judul di H2 editor
    function updateDetailsTitle() {
        const editorTitle = $('#editor h2').text();
        $('#details-title').text(editorTitle || 'Tambah judul...');
    }
    
    //Nampilin data ke field di sidebar
    function populateEditor(data) {
        $('#editor h2').text(data.judul || 'Tambah judul...');
        $('#editor p').text(data.konten || 'Mulai tulis isi berita di sini...');
        $('.detail-description.editor').text(data.editor || 'admin');
        $('.detail-description.modified-date').text(data.tanggal || '');
        $('.detail-description.status').text(data.status || 'Draft');
        $('#details-title').text(data.judul || 'Tambah judul...');

        //Handle kategori berita
        $('input[type="checkbox"]').each(function () {
            if (data.kategori.includes($(this).next('label').text())) {
                $(this).prop('checked', true);
            }
        });
    }
});
