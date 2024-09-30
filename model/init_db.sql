DROP TABLE IF EXISTS `projects`; 



CREATE TABLE `projects`(
`id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
`title` VARCHAR(255) NOT NULL,
`about` VARCHAR(255) NOT NULL
);

INSERT INTO projects (title, about) VALUES ("Interactive Map", "interactive map + social media function");
INSERT INTO projects (title, about) VALUES ("Feature Extension", "further function of a tourist app");
INSERT INTO projects (title, about) VALUES ("NFT Fashion E-Commerce Platform", "e-commerce website selling NFT fashion");

