<?php
// api/get_invoice.php
require_once 'header.php'; // This will handle CORS and set the content type
// Check if an invoice number was provided in the URL
if (isset($_GET['invoice_number'])) {
    require_once 'connection.php';
    $invoiceNumber = $_GET['invoice_number'];

    try {
        // Search the database for this specific invoice
        $stmt = $pdo->prepare("SELECT * FROM saved_invoices WHERE invoice_number = :invoice_number LIMIT 1");
        $stmt->execute([':invoice_number' => $invoiceNumber]);
        
        $invoice = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($invoice) {
            http_response_code(200);
            echo json_encode(["status" => "success", "data" => $invoice]);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "message" => "Invoice not found.",
                "error_code" => "invoice_not_found"
            ]);
        }
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