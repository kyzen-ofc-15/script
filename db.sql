-- Drop the pastes table if it exists
DROP TABLE IF EXISTS pastes;

-- Create the pastes table
CREATE TABLE pastes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
