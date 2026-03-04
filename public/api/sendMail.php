<?php

header("Content-Type: application/json");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'OPTIONS':
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: Content-Type");
        http_response_code(204);
        exit;

    case 'POST':
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        if (!$params || empty($params->email) || empty($params->name) || empty($params->message)) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }

        $email = filter_var($params->email, FILTER_SANITIZE_EMAIL);
        $name = htmlspecialchars($params->name, ENT_QUOTES, 'UTF-8');
        $message = htmlspecialchars($params->message, ENT_QUOTES, 'UTF-8');

        $recipient = 'info@quocnamtran.com';
        $subject = "Portfolio Contact from $name <$email>";
        $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/plain; charset=utf-8',
            "From: noreply@quocnamtran.com",
            "Reply-To: $email",
        ];

        $sent = mail($recipient, $subject, $body, implode("\r\n", $headers));

        if ($sent) {
            http_response_code(200);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to send email']);
        }
        break;

    default:
        header("Allow: POST", true, 405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
}
