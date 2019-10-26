CREATE TABLE USER ( 
    userId INT(11) PRIMARY KEY AUTO_INCREMENT, 
    userName VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    nickName VARCHAR(20) NOT NULL,
    isAdmin CHAR DEFAULT 0
);

DESCRIBE user;
SHOW CREATE TABLE user;
DESC user;

ALTER TABLE user MODIFY userId INT(11) PRIMARY KEY AUTO_INCREMENT;
DROP TABLE user;

INSERT INTO user (userName, password, nickName, isAdmin) VALUES ('root', 'root123456', 'admin', '1');

SELECT * FROM user;
