<?php
$customers = [
    ['id' => 1, 'name' => 'Malam Hari', 'email' => 'malamharid@gmail.com', 'phone' => '7284080686'],
    ['id' => 2, 'name' => 'Patel Tirth', 'email' => 'tp719490@gmail.com', 'phone' => '7600395406'],
    ['id' => 3, 'name' => 'Anonymous', 'email' => 'Anonymous@gmail.com', 'phone' => '456-789-0123']
];

header('Content-Type: application/json');
echo json_encode($customers);
?>
