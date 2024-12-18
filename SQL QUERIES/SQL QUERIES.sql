-- Create the database
CREATE DATABASE incubation_center;

-- Switch to the newly created database
USE incubation_center;

-- Create Manager tablelogin
CREATE TABLE Managers (
    manager_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create Faculty table
CREATE TABLE Faculty (
    faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create Applications table
CREATE TABLE Applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    manager_id INT NOT NULL,
    faculty_id INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- Additional application information fields
    title VARCHAR(255),
    description TEXT,
    attachment VARCHAR(255), -- File path to attached documents, if any
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES Managers(manager_id),
    CONSTRAINT fk_faculty FOREIGN KEY (faculty_id) REFERENCES Faculty(faculty_id)
);

INSERT INTO Managers (username, password, email)VALUES ('manager1', 'password1', 'manager1@example.com');
select * from Managers;

INSERT INTO Faculty(username,password,email)VALUES('faculty1','password1','faculty1@example.com');
select * from Faculty;



DELETE FROM Applications;
select * from Applications;