<?php
require_once 'header.php';
require_once 'config.php';

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
    // 1. Tell React this is a server error
    http_response_code(500);
    
    // 2. Send the error as proper JSON
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed.",
        "error_code" => "failed_to_connect_db"
    ]);
    
    // 3. Stop the script from continuing to generateInvoiceNumber.php
    exit(); 
}