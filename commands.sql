CREATE TABLE Products(
    ID INT,
    Name TEXT,
    Category TEXT,
    UnitPrice INT,
    PRIMARY KEY (ID)
);

CREATE TABLE Stores(
    ID INT,
    City TEXT,
    Branch TEXT,
    Employee_count INT,
    PRIMARY KEY (ID)
);

CREATE TABLE Customers(
    ID INT,
    First_Name TEXT,
    Last_Name TEXT,
    Gender TEXT,
    PRIMARY KEY (ID)
);