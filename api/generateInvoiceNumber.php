<?php
require_once 'header.php';

try {
    require_once 'connection.php'; 

    $currentYear = date("Y");
    $prefix = "ROS-" . $currentYear . "-";
    
    $sql = "SELECT invoice_number FROM (
                SELECT invoice_number FROM saved_invoices WHERE invoice_number LIKE '$prefix%'
                UNION ALL
                SELECT invoice_number FROM deleted_invoices WHERE invoice_number LIKE '$prefix%'
            ) AS combined_invoices
            ORDER BY invoice_number DESC 
            LIMIT 1";
            
    $result = $pdo->query($sql);
    if ($result && $result->rowCount() > 0) {
        $row = $result->fetch(PDO::FETCH_ASSOC);
        $lastInvoice = $row['invoice_number']; 
        
        $lastNumber = (int) substr($lastInvoice, -3);
        $nextNumber = $lastNumber + 1;
    } else {
        $nextNumber = 1;
    }

    $formattedNumber = str_pad($nextNumber, 3, "0", STR_PAD_LEFT);
    $newInvoiceNumber = $prefix . $formattedNumber;

    echo json_encode([
        "status" => "success",
        "invoice_number" => $newInvoiceNumber
    ]);

} catch(PDOException $e) {
    // If anything fails, return a clean JSON error
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database error occurred, failed to generate invoice number.",
        "error_code" => "failed_to_generate_invoice_number",
        "debug_error" => $e->getMessage()
    ]);
}