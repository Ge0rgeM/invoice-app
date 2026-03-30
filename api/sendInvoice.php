<?php

require_once 'header.php';
require_once 'connection.php';

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// echo json_encode(["receivedData" => $data]);
error_log('Data: ' . print_r($data, true));     
// Check if the required data actually exists
if (!empty($data['invoice_number'])) {
    try {
        // The PDO Prepared Statement to safely insert the invoice data into the database
        $stmt = $pdo->prepare("
            INSERT INTO saved_invoices (invoice_number, client_firstname, client_email, client_address, total_amount, invoice_date, full_invoice_data) 
            VALUES (:invoice_number, :client_firstname, :client_email, :client_address, :total_amount, :invoice_date, :full_invoice_data)
        ");

        // Execute the query, slotting the variables safely into the database
        $stmt->execute([
            ':invoice_number' => $data['invoice_number'],
            ':client_firstname' => $data['client_firstname'] ?? 'Unknown First Name',
            ':client_email' => $data['client_email'] ?? 'Unknown Email',
            ':client_address' => $data['client_address'] ?? 'Unknown Address',
            ':total_amount' => $data['total_amount'] ?? 0.00,
            ':invoice_date' => $data['invoice_date'] ?? date('Y-m-d'),
            ':full_invoice_data' => json_encode($data['invoice_data'] ?? []),
        ]);

        // Tell React it was successful
        http_response_code(201); // 201 means "Created"
        echo json_encode(["status" => "success", "message" => "Invoice safely stored!"]);

    } catch(PDOException $e) {
        // If the database fails, tell React exactly why
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    // If React sent empty data
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invoice number is missing."]);
}
