<?php

include('config.php');

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $stmt = $conn->prepare('SELECT content FROM pastes WHERE id = ?');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->bind_result($content);

    // Fetch paste content
    if ($stmt->fetch()) {
        // Close PHP tag to enter HTML
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pastebin</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f6f6f6;
                }
                header {
                    text-align: center;
                    margin: 0px;
                    z-index: 1000;
                    font-size: 30px;
                    border-radius: 8px;
                    font-weight: bold;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                footer {
                    background-color: #333;
                    color: #fff;
                    text-align: center;
                    padding: 10px 0;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                }
                .container {
                    margin-top: 70px; /* To prevent content from being hidden under fixed header */
                    padding: 20px;
                    text-align: center;
                }
                #pasteContent {
                    width: calc(100% - 40px);
                    max-width: 600px;
                    height: 200px;
                    padding: 15px;
                    margin-bottom: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    resize: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                button {
                    padding: 12px 24px;
                    background-color: #4CAF50;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
        <header>
            PasteBiN
        </header>
        <div class="container">
            <textarea id="pasteContent"><?php echo nl2br($content); ?></textarea>
        </div>
        <footer>
            &copy; 2024 Pastebin
        </footer>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="script.js"></script>
        </body>
        </html>
        <?php
    } else {
        echo 'Paste not found';
    }

    $stmt->close();
} else {
    echo 'Invalid request';
}

$conn->close();
?>
