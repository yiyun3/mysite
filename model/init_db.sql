DROP TABLE IF EXISTS `projects`; 



CREATE TABLE `projects`(
`id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
`title` VARCHAR(255) NOT NULL,
`about` LONGTEXT NULL
);

INSERT INTO projects (title, about) VALUES ("Interactive Map", "Full stack app with interactive map and social media features.
Conceptualised UX and technical deign by creating database schema, location marker implementation and user creative/interactive functions.
Built with React.js, Node.js, Express.js MySQL, Bootstrap and Leaflet library.");
INSERT INTO projects (title, about) VALUES ("Feature Extension", "Inherited existing code to produce further function of a full stack tourist app.
A promotional activity function was developed on top of the existing infrastructure to facilitate user queries and reservations for local events.
Built with React.js, Node.js, HTML, CSS.");
INSERT INTO projects (title, about) VALUES ("NFT Fashion E-Commerce Platform", "Fully functional full stack e-commerce website selling NFT fashion, offering features including browsing, registration, login, purchasing, and order tracking.
A comprehensive full-stack framework was developed from scratch, incorporating powerful user experience features.
Built with React.js, Node.js, MySQL, Github, Git, CSS, HTML, Tailwind and pulled data from Stripe & Sengrid API.");

