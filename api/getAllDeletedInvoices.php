<?php
require_once 'header.php'; // This will handle CORS and set the content type

try {
    require_once 'connection.php'; // This file should create a $pdo variable with the database connection
    // Database Query
    // We only fetch the lightweight columns we need for the dropdown, ordered newest first
    $sql = "SELECT invoice_number, client_firstname, invoice_date, total_amount
            FROM deleted_invoices 
            ORDER BY deleted_at DESC";
            
    $stmt = $pdo->query($sql);

    // If for some reason the statement fails but doesn't throw a PDOException
    if (!$stmt) {
        throw new Exception("Failed to execute the database query.");
    }

    $invoices = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 4. Success Response
    http_response_code(200);
    echo json_encode([
        "status" => "success", 
        "data" => $invoices
    ]);

} 
// CATCH LEVEL 1: Database Errors (e.g., table doesn't exist, wrong credentials)
catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error", 
        "type" => "Database Error",
        "message" => "Could not fetch invoices: " . $e->getMessage(),
        "error_code" => "failed_to_fetch_invoices"
    ]);
} 
// CATCH LEVEL 2: General Application Errors
catch (Exception $e) {
    http_response_code(400); 
    echo json_encode([
        "status" => "error", 
        "type" => "Application Error",
        "message" => $e->getMessage(),
        "error_code" => "failed_to_fetch_invoices"
    ]);
} 
// CATCH LEVEL 3: Fatal PHP Crashes (e.g., syntax errors in required files)
catch (Throwable $t) {
    http_response_code(500);
    echo json_encode([
        "status" => "error", 
        "type" => "Critical Server Error",
        "message" => "A critical error occurred while fetching invoices.",
        "debug" => $t->getMessage(), // You can remove this debug line when you go live!
        "error_code" => "failed_to_fetch_invoices"
    ]);
}
?>