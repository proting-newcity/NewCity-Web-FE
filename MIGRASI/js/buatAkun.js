$(document).ready(function() {
    let uploadedPhoto = null;

    $('.upload-photo').on('click', function() {
        $('#uploadPhotoModal').modal('show');
    });

    $('#savePhotoButton').on('click', function() {
        const fileInput = $('#fileInput')[0];
        const file = fileInput.files[0];
        if (file) {
            uploadedPhoto = file;
            const reader = new FileReader();
            reader.onload = function(e) {
                $('.upload-photo').html(`<img src="${e.target.result}" class="rounded-circle" alt="Uploaded Photo" style="width: 250px; height: 250px;">`);
            };
            reader.readAsDataURL(file);
            $('#uploadPhotoModal').modal('hide');
        } else {
            console.log('No file selected');
        }
    });

    $('.btn-save').on('click', function(event) {
        event.preventDefault(); // Prevent form submission to validate first
        console.log('Save button clicked');
        if (validateForm()) {
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
            // Redirect to listAkun.html upon successful validation
            window.location.href = 'listAkun.html';
        } else {
            console.log('Form validation failed');
        }
    });

    $('.btn-cancel').on('click', function() {
        $('#username').val('');
        $('#password').val('');
        $('#confirmpassword').val('');
        $('#nama').val('');
        $('#nip').val('');
        $('#cakupan').val('');
        $('#status').val('');
        uploadedPhoto = null;
        $('.upload-photo').html('<i class="bi bi-camera" style="font-size: 4em;"></i><span>Unggah Foto</span>');
        $('.alert').hide(); // Hide all alerts
        console.log('Form cleared');
    });

    function validateForm() {
        let isValid = true;
        const name = $('#nama').val().trim();
        const nip = $('#nip').val().trim();
        const region = $('#cakupan').val().trim();
        const password = $('#password').val();
        const confirmPassword = $('#confirmpassword').val();

        console.log('Validating form');
        
        if (name === '') {
            displayErrorMessage('nama', 'Nama harus terisi');
            isValid = false;
        } else {
            clearErrorMessage('nama');
        }

        if (nip === '') {
            displayErrorMessage('nip', 'NIP harus terisi');
            isValid = false;
        } else {
            clearErrorMessage('nip');
        }

        if (region === '') {
            displayErrorMessage('cakupan', 'Cakupan harus terisi');
            isValid = false;
        } else {
            clearErrorMessage('cakupan');
        }

        if (password !== confirmPassword) {
            displayErrorMessage('confirmpassword', 'Konfirmasi password tidak sesuai');
            isValid = false;
        } else {
            clearErrorMessage('confirmpassword');
        }

        if (!validatePassword(password)) {
            displayErrorMessage('password', 'Password must be 8-20 characters, have at least one capital letter, and no spaces or symbols.');
            isValid = false;
        } else {
            clearErrorMessage('password');
        }

        return isValid;
    }

    function validatePassword(password) {
        const regex = /^(?=.*[A-Z])[A-Za-z]{8,20}$/;
        const isValid = regex.test(password) && !password.includes(' ');
        console.log('Password validation:', isValid);
        return isValid;
    }

    function displayErrorMessage(inputId, message) {
        console.log(`Displaying error for ${inputId}: ${message}`);
        $(`#${inputId}-alert`).text(message).show();
    }

    function clearErrorMessage(inputId) {
        console.log(`Clearing error for ${inputId}`);
        $(`#${inputId}-alert`).hide();
    }
});
