-- Insert sample users
INSERT INTO users (name, email, password_hash, role)
VALUES
    ('Alice Green', 'alice.green@example.com', 'hashed_password_4', 'creator'),
    ('Bob Brown', 'bob.brown@example.com', 'hashed_password_5', 'learner'),
    ('Super Admin', 'superadmin@example.com', 'hashed_password_6', 'admin');

-- Insert sample learning paths
INSERT INTO learning_paths (title, description, creator_id, is_public)
VALUES
    ('Introduction to Python', 'Learn the basics of Python programming', 1, TRUE),
    ('Mastering JavaScript', 'Become an expert in JavaScript for web development', 1, FALSE);

-- Insert sample resources for "Introduction to Python" path
INSERT INTO resources (path_id, type, url, resource_order, title, description, estimated_time)
VALUES
    (1, 'video', 'https://example.com/python-video', 1, 'Python Basics', 'Learn about variables, data types, and functions in Python', 40),
    (1, 'article', 'https://example.com/python-article', 2, 'Control Structures in Python', 'Learn how to use loops and conditionals in Python', 50);

-- Insert sample enrollments
INSERT INTO enrollments (path_id, user_id)
VALUES
    (1, 2),  -- Bob Brown enrolls in Introduction to Python
    (2, 2);  -- Bob Brown enrolls in Mastering JavaScript

-- Insert sample progress for Bob Brown
INSERT INTO progress (user_id, resource_id, is_completed)
VALUES
    (2, 1, TRUE),  -- Bob Brown completed "Python Basics"
    (2, 2, FALSE); -- Bob Brown has not completed "Control Structures in Python"
