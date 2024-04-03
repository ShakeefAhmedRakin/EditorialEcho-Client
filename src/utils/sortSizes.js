function sortSizes(sizes) {
  // Define a custom sorting order based on the size
  const sizeOrder = {
    XS: 0,
    S: 1,
    M: 2,
    L: 3,
    XL: 4,
    XXL: 5,
  };

  // Sort the sizes array based on the custom order
  sizes.sort((a, b) => sizeOrder[a] - sizeOrder[b]);

  return sizes;
}

export { sortSizes };
