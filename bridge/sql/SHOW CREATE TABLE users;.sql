ALTER TABLE `users`
ADD COLUMN `token` varchar(32) DEFAULT NULL AFTER `password`;
