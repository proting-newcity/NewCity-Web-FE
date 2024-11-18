<?php

header('Content-Type: application/json');


$jsonFile = __DIR__ . '/data.json';


$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    
    if (file_exists($jsonFile)) {
     
        $existingData = json_decode(file_get_contents($jsonFile), true);
        if (!is_array($existingData)) {
            $existingData = [];
        }
    } else {
        $existingData = [];
    }

    $existingData[] = $data;


    if (file_put_contents($jsonFile, json_encode($existingData, JSON_PRETTY_PRINT))) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Data berhasil disimpan.'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Gagal menyimpan data ke file JSON.'
        ]);
    }
} else {
 
    echo json_encode([
        'status' => 'error',
        'message' => 'Data tidak valid atau kosong.'
    ]);
}
?>
