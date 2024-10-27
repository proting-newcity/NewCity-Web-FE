$(document).ready(function() {

    let uploadedPhoto = null;

    $('.upload-photo').on('click', function() {
        const fileInput = $('<input type="file" accept="image/*">'); 
        fileInput.on('change', function(event) { 
            const file = event.target.files[0];
            if (file) {
                uploadedPhoto = file;
                console.log('Photo uploaded:', file.name);
                $('.upload-photo').html(`<span>${file.name}</span>`); 
            }
        });
        fileInput.click(); 
    });

    $('.btn-save').on('click', function() {
        const formData = {
            username: $('#username').val(),
            password: $('#password').val(),
            nama: $('#nama').val(),
            nip: $('#nip').val(),
            cakupan: $('#cakupan').val(),
            status: $('#status').val(),
            photo: uploadedPhoto 
        };

        console.log('Form Data:', formData);

    });

    $('.btn-cancel').on('click', function() {
        $('#username').val('');
        $('#password').val('');
        $('#nama').val('');
        $('#nip').val('');
        $('#cakupan').val('');
        $('#status').val('');
        uploadedPhoto = null; 
        $('.upload-photo').html('<i class="bi bi-camera" style="font-size: 4em;"></i><span>Unggah Foto</span>'); 
        console.log('Form cleared');
    });
});
