CREATE TABLE booking (
    id INT NOT NULL AUTO_INCREMENT,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    appointmentDate DATE NOT NULL,
    service VARCHAR(255) NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL,
    appointmentTime TIME NOT NULL,
    bookingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
