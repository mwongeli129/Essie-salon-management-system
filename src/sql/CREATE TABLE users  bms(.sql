CREATE TABLE users ( 
    id int(20) NOT NULL AUTO_INCREMENT, 
    name varchar(50) NOT NULL, 
    email varchar(20) NOT NULL, 
    username varchar(20) NOT NULL, 
    role enum('client','admin') NOT NULL, 
    phonenumber varchar(15) DEFAULT NULL, 
    password varchar(100) NOT NULL, is_admin tinyint(1) GENERATED ALWAYS AS (if(role = 'Admin',1,NULL)) STORED, signin_date 
    timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), 
    PRIMARY KEY (id), UNIQUE KEY unique_admin (is_admin) ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci