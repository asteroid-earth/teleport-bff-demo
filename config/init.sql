CREATE TABLE IF NOT EXISTS demo_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO demo_table (name) VALUES ('Example Data 1'), ('Example Data 2');