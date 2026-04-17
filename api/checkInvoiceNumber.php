<?php
require_once 'header.php';
require_once 'connection.php';

// Check if the invoice number was sent in the URL
if (isset($_GET['invoice_number'])) {
    $invoiceNumber = $_GET['invoice_number'];
    try {
        if (!preg_match('/^ROS-2026-[0-9]{3}$/', $invoiceNumber)) {
            http_response_code(400); // Bad Request
            echo json_encode([
                "status" => "error", 
                "message" => "Invalid invoice format. It must be exactly ROS-2026-XXX (e.g., ROS-2026-001)."
            ]);
            exit(); // CRITICAL: Stop the script dead in its tracks right here
        }
        // We use COUNT(1) because it is the fastest way to check if a row exists
        $stmt = $pdo->prepare("SELECT COUNT(1) FROM saved_invoices WHERE invoice_number = :invoice_number");
        $stmt->execute([':invoice_number' => $invoiceNumber]);
        
        // Fetch the count (will be 0 if it doesn't exist, 1 if it does)
        $count = $stmt->fetchColumn();

        http_response_code(200);
        // If count is greater than 0, exists is true. Otherwise, false.
        echo json_encode([
            "status" => "success", 
            "exists" => $count > 0 
        ]);

    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error", 
            "message" => "Database error: " . $e->getMessage(),
            "error_code" => "db_error"
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "status" => "error", 
        "message" => "Please provide an invoice number.",
        "error_code" => "missing_invoice_number"
    ]);
}