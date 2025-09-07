CREATE TABLE Creators (
    email_id VARCHAR(255) PRIMARY KEY,
    full_name VARCHAR(255),
    upi_id VARCHAR(255) DEFAULT NULL,
    username VARCHAR(255) UNIQUE,
    img_url VARCHAR(255) UNIQUE,
    created_at DATETIME,
    updated_at DATETIME,
    status VARCHAR(255)
);


CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    creator_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    comment TEXT CHARACTER SET utf8mb4 NOT NULL,
    create_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2),
    currency VARCHAR(10),
    order_id VARCHAR(50) UNIQUE,
    payment_id VARCHAR(50),
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES Creators(email_id)
);


INSERT INTO Creators (email_id, full_name, upi_id, username, img_url, created_at, updated_at, status)
VALUES
    ('john.doe@example.com', 'John Doe', 'john.upi@upi', 'john_doe', NULL,  NOW(), NOW(), 'ACTIVE'),
    ('jane.smith@example.com', 'Jane Smith', NULL, 'jane_smith', NULL,  NOW(), NOW(), 'INACTIVE');


INSERT INTO Comments (creator_id, user_id, comment, amount, currency, order_id, payment_id, status)
VALUES
('john.doe@example.com', 'John Doe', 'This is a sample comment 😊', 100.50, 'USD', '123', '234', 'PAYMENT_DONE'),
('john.doe@example.com', 'Jane Smith', 'Another comment with emoji 🚀', 200.75, 'EUR', NULL, NULL, 'PAYMENT_PENDING');

