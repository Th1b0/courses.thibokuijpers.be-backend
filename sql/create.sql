CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `email` varchar(64) NOT NULL,
  `hash` varchar(256) NOT NULL,
  `auth_method` varchar(24) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
);
CREATE TABLE `sessions` (
  `session_id` char(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `ip_adress` varchar(32) NOT NULL,
  `device_id` varchar(255) NOT NULL,
  `valid` tinyint(1) NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);
INSERT INTO `thibokuijpers`.`users`
(
`username`,
`email`,
`hash`,
`auth_method`)
VALUES
(
'test',
'test@test.test',
'$2b$12$Fy4MlpcbG.bGPPSf46FuP.3DSYbULwIZkucaBlIkRoitqorwbxN1m',
'email'
);

