INSERT INTO
    Products (ID, Name, Category, UnitPrice)
VALUES
    (1, 'Paper', 'Stationary', 10),
    (2, 'Cornflakes', 'Food', 150),
    (3, 'Apple', 'Fruit', 300),
    (4, 'Mango', 'Fruit', 250),
    (5, 'Pencil', 'Stationary', 15),
    (6, 'Chips', 'Food', 30),
    (7, 'Jeans', 'Clothing', 500),
    (8, 'Bread', 'Food', 40),
    (9, 'Oil', 'Food', 120);

INSERT INTO
    Stores (ID, City, Branch)
VALUES
    (1, 'Mumbai', 'A'),
    (2, 'Mumbai', 'B'),
    (3, 'Mumbai', 'C'),
    (4, 'Delhi', 'A'),
    (5, 'Delhi', 'B'),
    (6, 'Banglore', 'A');
    
INSERT INTO
    Customers (ID, First_name, Last_Name, Gender)
VALUES
    (1, 'Abhay', 'Mathur', 'Male'),
    (2, 'Devansh', 'Rathor', 'Male'),
    (3, 'Jahaan', 'Desai', 'Male'),
    (4, 'Rachit', 'Patni', 'Male'),
    (5, 'Naman', 'Lakhani', 'Male'),
    (6, 'Aashish', 'Charaya', 'Male'),
    (7, 'Krish', 'Gopani', 'Male'),
    (8, 'Vividha', 'Jagtap', 'Female'),
    (9, 'Varun', 'Pillai', 'Male'),
    (10, 'Mahir', 'Madhani', 'Male'),
    (11, 'Raj', 'Panchal', 'Male'),
    (12, 'Keya', 'Suvarna', 'Female'),
    (13, 'Nidhi', 'Tiwari', 'Female'),
    (14, 'Vallavi', 'Sheth', 'Female');
    
INSERT INTO
    Stock (Prod_ID, Store_ID, Qunatity)
VALUES
    (1, 1, 50),
    (1, 2, 100),
    (4, 1, 620),
    (1, 5, 530),
    (7, 1, 420),
    (5, 6, 69),
    (2, 3, 34),
    (1, 4, 23),
    (3, 4, 72),
    (9, 6, 64),
    (8, 5, 109),
    (6, 1, 8),
    (2, 6, 780);

INSERT INTO
    Purchases (Invoice_ID, Prod_ID, Store_ID, Quantity, Total_Amount)
VALUES
    (100, 1, 1, 20, 200),
    (101, 2, 2, 30, 4500),
    (102, 3, 2, 45, 13500),
    (103, 4, 3, 65, 16250),
    (104, 5, 4, 79, 1185),
    (105, 6, 5, 72, 2160),
    (106, 7, 5, 23, 11500),
    (107, 7, 5, 98, 49000),
    (108, 8, 5, 67, 2680),
    (109, 9, 6, 25, 3000),
    (110, 1, 2, 100, 1000),
    (111, 4, 1, 36, 9000);
