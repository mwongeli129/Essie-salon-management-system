-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    session_id INT NOT NULL,
    attendance_date DATETIME NOT NULL,
    student_name VARCHAR(50) NOT NULL,  -- Assuming the name is retrieved from users table
    subject VARCHAR(100) NOT NULL,      -- Assuming the subject is retrieved from timetable table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_attendance (student_id, session_id),
    FOREIGN KEY (session_id) REFERENCES timetable(id),
    FOREIGN KEY (student_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
