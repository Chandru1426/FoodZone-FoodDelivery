export const myOrdersData = [
  {
    id: "ORD-9283",
    date: "Aug 12, 2024, 08:30 PM",
    restaurant: "Pizza Hut",
    items: [
      { name: "Pepperoni Pizza", quantity: 1, price: 15.00 },
      { name: "Garlic Bread", quantity: 2, price: 5.00 },
      { name: "Coke (L)", quantity: 1, price: 3.00 }
    ],
    amount: 28.00,
    status: "In Progress",
    trackingStep: 2, // 0:Placed, 1:Cooking, 2:Out, 3:Delivered
    address: {
      street: "123 Main St",
      city: "New York, NY",
      zip: "10001"
    },
    paymentMethod: "Credit Card ending 4242",
    deliveryFee: 5.00,
    tax: 2.50
  },
  {
    id: "ORD-8721",
    date: "Aug 10, 2024, 01:15 PM",
    restaurant: "Burger King",
    items: [
      { name: "Whopper Meal", quantity: 2, price: 12.00 },
      { name: "Onion Rings", quantity: 1, price: 4.00 }
    ],
    amount: 28.00,
    status: "Delivered",
    trackingStep: 3,
    address: {
      street: "123 Main St",
      city: "New York, NY",
      zip: "10001"
    },
    paymentMethod: "PayPal",
    deliveryFee: 3.00,
    tax: 2.10
  },
  {
    id: "ORD-7632",
    date: "Aug 05, 2024, 07:45 PM",
    restaurant: "Sushi Master",
    items: [
      { name: "Salmon Roll", quantity: 2, price: 8.00 },
      { name: "Tuna Sashimi", quantity: 1, price: 12.00 },
      { name: "Miso Soup", quantity: 2, price: 3.00 }
    ],
    amount: 34.00,
    status: "Cancelled",
    trackingStep: 0,
    address: {
      street: "456 Park Ave",
      city: "New York, NY",
      zip: "10022"
    },
    paymentMethod: "Apple Pay",
    deliveryFee: 0.00,
    tax: 3.00
  }
];
