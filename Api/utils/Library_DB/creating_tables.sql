CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    contact VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255),
    publication_year INT,
    isbn VARCHAR(255),
    description TEXT,
    language VARCHAR(50),
    length INT,
    image_url VARCHAR(255)
);

CREATE TABLE copies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    status ENUM('available', 'not available') DEFAULT 'available',
    FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Creating the 'loans' table
CREATE TABLE loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    copy_id INT NOT NULL,
    member_id INT NOT NULL,
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    fine FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (copy_id) REFERENCES copies(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- Creating the 'recommendations' table
CREATE TABLE recommendations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT NOT NULL,
    recommended_books TEXT,
    reasons TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);
