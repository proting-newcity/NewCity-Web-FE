function formatText(command, value = null) {
    document.execCommand(command, false, value);
}

document.getElementById('editor').addEventListener('focus', function () {
    if (this.textContent === 'Tambah judul...Mulai tulis isi berita di sini...') {
        this.innerHTML = '';
    }
});

function addLink() {
    const url = prompt("Enter the URL");
    formatText("createLink", url);
}

document.querySelectorAll('.toolbar .btn')[3].onclick = addLink;

const editorTitle = document.querySelector('#editor h2');
const detailsTitle = document.querySelector('#details-title');

function updateDetailsTitle() {
    detailsTitle.textContent = editorTitle.textContent || 'Tambah judul...';
}

editorTitle.addEventListener('input', updateDetailsTitle);

const editorButtons = document.querySelectorAll('.btn-editor');

editorButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            applyStyle(button);
        } else {
            removeStyle(button);
        }
    });
});

function applyStyle(button) {
    if (button.classList.contains('bold-btn')) {
        document.execCommand('bold');
    }
    if (button.classList.contains('italic-btn')) {
        document.execCommand('italic');
    }
}

function removeStyle(button) {
    if (button.classList.contains('bold-btn')) {
    }
    if (button.classList.contains('italic-btn')) {
        document.execCommand('italic');
    }
}


// Add an event listener to the publish button
document.querySelector('.publish-button').addEventListener('click', function () {
    updateDetailsTitle();
});
