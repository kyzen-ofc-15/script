<?php
 include('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = $_POST['content'];

    $stmt = $conn->prepare('INSERT INTO pastes (content) VALUES (?)');
    $stmt->bind_param('s', $content);
    $stmt->execute();

    $stmt->close();
    echo json_encode(['success' => true, 'id' => $conn->insert_id]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

$conn->close();
?>