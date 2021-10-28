module.exports = {
    "up": "CREATE TABLE users(id INT, nama TEXT, email TEXT, password TEXT, first_name TEXT, last_name TEXT, institusi TEXT, company TEXT, job_title TEXT, phone_number TEXT, alamat LONGTEXT, token LONGTEXT, created_at TIMESTAMP, updated_at TIMESTAMP)",
    "down": "DROP TABLE users"
}