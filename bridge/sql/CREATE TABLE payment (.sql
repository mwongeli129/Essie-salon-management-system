CREATE TABLE payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mpesaNumber VARCHAR(15) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    bookingId INT NOT NULL,
    paymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bookingId) REFERENCES booking(id)
);
