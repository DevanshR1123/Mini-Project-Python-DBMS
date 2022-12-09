SELECT
    *
FROM
    Products;

SELECT
    City,
    COUNT(Branch)
FROM
    Stores
GROUP BY
    City;

SELECT
    *
FROM
    Customers;

SELECT
    Products.Name,
    Stores.City,
    Stores.Branch,
    Stock.Quantity
FROM
    Stock,
    Products,
    Stores
WHERE
    Stock.Prod_ID = Products.ID
    AND Stock.Store_ID = Stores.ID
ORDER BY
    Products.ID;

SELECT
    Purchases.Invoice_ID,
    Customers.First_name,
    Customers.Last_name,
    Stores.City,
    Stores.Branch,
    Purchases.Quantity,
    Total_Amount
FROM
    Purchases,
    Stores,
    Customers,
    Products
WHERE
    Purchases.Prod_ID = Products.ID
    AND Purchases.Store_ID = Stores.ID
    AND Purchases.Cust_ID = Customers.ID;