export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: 'Appetizer' | 'Main' | 'Dessert' | 'Drink' | 'Pizza';
  ingredients: string[];
  color: string;
  modelType: 'burger' | 'pizza' | 'pasta' | 'steak' | 'cake';
}

export const DISHES: Dish[] = [
  {
    id: '1',
    name: 'Royal Gold Burger',
    description: 'A premium Wagyu beef patty topped with 24k gold leaf, truffle aioli, and aged cheddar.',
    price: 45,
    rating: 4.9,
    category: 'Main',
    ingredients: ['Wagyu Beef', 'Gold Leaf', 'Truffle Aioli', 'Brioche Bun', 'Aged Cheddar'],
    color: '#D4AF37',
    modelType: 'burger'
  },
  {
    id: '2',
    name: 'Truffle Mushroom Pizza',
    description: 'Hand-stretched dough with wild mushrooms, fresh truffles, and buffalo mozzarella.',
    price: 32,
    rating: 4.8,
    category: 'Pizza',
    ingredients: ['Truffle', 'Wild Mushrooms', 'Mozzarella', 'Basil', 'Olive Oil'],
    color: '#8B4513',
    modelType: 'pizza'
  },
  {
    id: '3',
    name: 'Midnight Pasta',
    description: 'Squid ink linguine with lobster tail, cherry tomatoes, and a hint of chili.',
    price: 38,
    rating: 4.7,
    category: 'Main',
    ingredients: ['Squid Ink Pasta', 'Lobster', 'Chili', 'Garlic', 'White Wine'],
    color: '#1A1A1A',
    modelType: 'pasta'
  },
  {
    id: '4',
    name: 'Velvet Chocolate Cake',
    description: 'Rich dark chocolate layers with raspberry coulis and gold dust.',
    price: 18,
    rating: 5.0,
    category: 'Dessert',
    ingredients: ['Dark Chocolate', 'Raspberry', 'Gold Dust', 'Cream', 'Cocoa'],
    color: '#4B0082',
    modelType: 'cake'
  }
];
