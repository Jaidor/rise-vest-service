export const addUser = () => "INSERT INTO users (username, firstname, lastname, email, password, created_at) VALUES($1, $2, $3, $4, $5, $6)";
export const checkEmailExists = () => "SELECT s FROM users s WHERE s.email = $1";
export const getUserByUsername = () => "SELECT * FROM users WHERE username = $1";
export const fetchAllUsers = () => "SELECT id, username, firstname, lastname, email, created_at, updated_at FROM users";
export const fetchUserByID = () => "SELECT id, username, firstname, lastname, email, created_at, updated_at FROM users WHERE id = $1";
export const addPosts = () => "INSERT INTO posts (user_id, title, created_at) VALUES($1, $2, $3)";
export const fetchAllPosts = () => "SELECT id, title, created_at, updated_at FROM posts";
export const addComments = () => "INSERT INTO comments (posts_id, content, created_at) VALUES($1, $2, $3)";
export const fetchUsersWithMostPostsAndComments = () => "SELECT users.id, users.username, posts.title, comments.content FROM users LEFT JOIN posts ON users.id = posts.user_id LEFT JOIN comments ON posts.id = comments.posts_id ORDER BY (SELECT COUNT(posts.id) FROM posts WHERE posts.user_id = users.id) desc LIMIT 3";
