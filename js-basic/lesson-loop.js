let carts = [
  {id:1, name: "Coke", price: 100},
  {id:2, name: "Pepsi", price: 200},
  {id:3, name: "Root beer", price: 190},
];

/**
 * for
 */

for (const idx in carts) {
  console.log(carts[idx].name);
}

for (const item of carts) {
  console.log(item.name);
}

/**
 * For Each
 * - NOTE: .forEach returns undefined
 */
carts.forEach(f => console.log(f.price));


/**
 * Map
 */
let prices = carts.map(item => item.price * 0.07);
console.log(prices);
