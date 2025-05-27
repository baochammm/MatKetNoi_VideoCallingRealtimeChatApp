1. In your mysql workbench or mysql CLI run the following script
-- CREATE DATABASE streamify
-- USE streamify
-- CREATE TABLE Users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   fullName VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   bio VARCHAR(255) DEFAULT '',
--   profilePic VARCHAR(255) DEFAULT '',
--   nativeLanguage VARCHAR(255) DEFAULT '',
--   learningLanguage VARCHAR(255) DEFAULT '',
--   location VARCHAR(255) DEFAULT '',
--   isOnboarded BOOLEAN DEFAULT FALSE,
--   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
--   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- CREATE TABLE FriendRequests (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   senderId INT NOT NULL,
--   recipientId INT NOT NULL,
--   status ENUM('pending', 'accepted') DEFAULT 'pending',
--   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
--   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   FOREIGN KEY (senderId) REFERENCES Users(id) ON DELETE CASCADE,
--   FOREIGN KEY (recipientId) REFERENCES Users(id) ON DELETE CASCADE
-- );

-- CREATE TABLE UserFriends (
--   userId INT NOT NULL,
--   friendId INT NOT NULL,
--   PRIMARY KEY (userId, friendId),
--   FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
--   FOREIGN KEY (friendId) REFERENCES Users(id) ON DELETE CASCADE
);

2. In your backend .env file, add the following constants:

DB_HOST=localhost
DB_USER=<your_username>
DB_PASSWORD= <your_password>
DB_NAME= streamify
DB_PORT=3306 <or your host port>