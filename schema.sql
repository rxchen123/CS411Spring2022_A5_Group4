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
	hotel VARCHAR(255) NOT NULL,
	restaurant VARCHAR(255) NOT NULL,
  PRIMARY KEY (uemail, hotel, restaurant),
	FOREIGN KEY (uemail) REFERENCES Users(email) ON DELETE CASCADE
);