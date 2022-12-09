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
    PRIMARY KEY (ID)
);

CREATE TABLE Customers(
    ID INT,
    First_Name TEXT,
    Last_Name TEXT,
    Gender TEXT,
    PRIMARY KEY (ID)
);

CREATE TABLE Stock(
    Prod_ID INT,
    Store_ID INT,
    Qunatity INT,
    FOREIGN KEY(Prod_ID) REFERENCES Products(ID),
    FOREIGN KEY (Store_ID) REFERENCES Stores(ID)
);

CREATE TABLE Purchases(
    Invoice_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Prod_ID INT,
    Store_ID INT,
    Cust_ID INT,
    Quantity INT,
    Total_Amount REAL,
    FOREIGN KEY(Prod_ID) REFERENCES Products(ID),
    FOREIGN KEY(Store_ID) REFERENCES Stores(ID),
    FOREIGN KEY(Cust_ID) REFERENCES Customers(ID)
);