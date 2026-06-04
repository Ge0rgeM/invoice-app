<?php
require_once 'header.php'; // This will handle CORS and set the content type

if (isset($_GET['invoice_number'])) {
    require_once 'connection.php'; 
    $invoiceNumber = $_GET['invoice_number'];

    try{

        $pdo->beginTransaction();
        $sql = "INSERT INTO `saved_invoices` (
                        `invoice_number`, 
                        `client_firstname`, 
                        `client_email`, 
                        `client_address`, 
                        `total_amount`, 
                        `invoice_date`, 
                        `full_invoice_data`, 
                        `created_at`
                    )
                    SELECT 
                        `invoice_number`, 
                        `client_firstname`, 
                        `client_email`, 
                        `client_address`, 
                        `total_amount`, 
                        `invoice_date`, 
                        `full_invoice_data`, 
                        `created_at`
                    FROM `deleted_invoices`
                    WHERE `invoice_number` = :invoice_num1";
    
        $sql = $pdo->prepare($sql);
        $sql->execute([':invoice_num1' => $invoiceNumber]);
    
        // Check if any row was actually copied. If the invoice didn't exist, stop here.
        if ($sql->rowCount() === 0) {
            throw new Exception("Invoice '$invoiceNumber' not found in deleted_invoices.");
        }
        // STEP 2: Delete the invoice from the active 'deleted_invoices' table
        $deleteSql = "DELETE FROM `deleted_invoices` WHERE `invoice_number` = :invoice_num2";
        $stmtDelete = $pdo->prepare($deleteSql);
        $stmtDelete->execute([':invoice_num2' => $invoiceNumber]);
    
        $pdo->commit();
        
        echo json_encode([
            "status" => "success",
            "message" => "Invoice safely moved to saved_invoices table."
        ]);
    }catch (\PDOException $e) {
        // If anything fails in the SQL/DB block, undo everything
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Database error: " . $e->getMessage()
        ]);
    } catch (\Exception $e) {
        // Catch custom exceptions (like invoice not found)
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        
        http_response_code(404);
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
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