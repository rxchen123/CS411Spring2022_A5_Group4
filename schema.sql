-- Copy this section into the 'SQL' box: 
CREATE DATABASE IF NOT EXISTS travelhelper;
USE travelhelper;

CREATE TABLE Users (
    email VARCHAR(255) NOT NULL,
 	  password VARCHAR(255) NOT NULL,
    PRIMARY KEY (email)
);

-- A trip is a 'weak entity', i.e. it's existence and identification depends on a parent entity (User). 
-- If a user is deleted, all of the trips referencing the user will be deleted as well. 
CREATE TABLE Trips (
  uemail VARCHAR(255),
	budget INT,
	source VARCHAR(255) NOT NULL,
	destination VARCHAR(255) NOT NULL,
  PRIMARY KEY (uemail, source, destination),
	FOREIGN KEY (uemail) REFERENCES Users(email) ON DELETE CASCADE
);

-- Run these commands if you want to add some users:
USE travelhelper;
INSERT INTO Users (email, password) VALUES ('annie@bu.edu', 'password');
INSERT INTO Users (email, password) VALUES ('brad@bu.edu', 'password');

-- Run these commands if you want to add some trips:
USE travelhelper;
INSERT INTO Trips (uemail, budget, source, destination) VALUES ('annie@bu.edu', 5000, 'Boston', 'London');
INSERT INTO Trips (uemail, budget, source, destination) VALUES ('annie@bu.edu', 3000, 'San Francisco', 'New York');
INSERT INTO Trips (uemail, budget, source, destination) VALUES ('brad@bu.edu', 1500, 'Chicago', 'Indianapolis');

-- Run these commands if you want to delete a table:
USE travelhelper;
DROP TABLE IF EXISTS Trips CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
