	CREATE TABLE `messages` ( 
        `id` int(11) NOT NULL AUTO_INCREMENT, 
        `user_name` varchar(100) NOT NULL, 
        `user_email` varchar(100) NOT NULL, 
        `user_tel` varchar(20) NOT NULL, 
        `message` text NOT NULL, 
        `created_at` timestamp NOT NULL DEFAULT current_timestamp(), 
        PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci