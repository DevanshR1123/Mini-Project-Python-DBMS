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