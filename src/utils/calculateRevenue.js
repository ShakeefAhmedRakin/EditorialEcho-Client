const calculateRevenue = (price, cost, orders) => {
  let totalSold = 0;
  price = parseFloat(price);
  cost = parseFloat(cost);
  orders.forEach((order) => {
    totalSold += order?.quantity;
  });

  console.log(totalSold);
  return ((price - cost) * totalSold).toFixed(1);
};

export { calculateRevenue };
