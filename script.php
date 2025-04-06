<?php
// --- CONFIGURATION ---
$recipient_email = "andykasalom@gmail.com"; // IMPORTANT: Change this to YOUR email address
$email_subject_prefix = "Portfolio Contact Form";
// ---------------------

// --- SCRIPT LOGIC ---

// Only process POST requests.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data and trim whitespace
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // --- Basic Validation ---
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        // Required field is missing
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Invalid email format
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        exit;
    }

    // --- Security: Prevent Email Header Injection ---
    // Remove potentially malicious characters from inputs used in headers
    $sanitized_name = filter_var($name, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    $sanitized_email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $sanitized_subject = filter_var($subject, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
    // Clean newline characters specifically from subject/name/email to prevent header injection
    $sanitized_name = str_replace(array("\r", "\n"), '', $sanitized_name);
    $sanitized_email = str_replace(array("\r", "\n"), '', $sanitized_email);
    $sanitized_subject = str_replace(array("\r", "\n"), '', $sanitized_subject);

    // --- Prepare Email ---
    $to = $recipient_email;
    $email_subject = "$email_subject_prefix: $sanitized_subject";

    // Construct email body
    $email_body = "You have received a new message from your portfolio contact form.\n\n";
    $email_body .= "Name: $sanitized_name\n";
    $email_body .= "Email: $sanitized_email\n\n";
    $email_body .= "Subject: $sanitized_subject\n\n";
    $email_body .= "Message:\n$message\n"; // Use the original message content here

    // Construct email headers
    // Using the sender's email in "From" can increase spam likelihood.
    // It's often better to send *from* your own address and use Reply-To.
    $headers = "From: " . $sanitized_name . " <" . $recipient_email . ">\r\n"; // Send FROM your address
    $headers .= "Reply-To: " . $sanitized_email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // --- Send Email ---
    // The mail() function returns true if the mail was successfully accepted for delivery, false otherwise.
    // It does NOT guarantee the email will actually reach the recipient.
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Success
        http_response_code(200); // OK
        echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
    } else {
        // Failure (check server logs and mail configuration)
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later or contact me directly. Check server mail configuration.']);
    }

} else {
    // Not a POST request
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
}

exit; // Ensure script termination
?>