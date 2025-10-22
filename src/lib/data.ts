import type { Product, BlogPost } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: { hu: 'Vegyes virágméz', en: 'Wildflower Honey' },
    description: { hu: 'Kellemes, többvirágú méz, gazdag, édes ízzel, különféle vadvirágokból.', en: 'A delightful multi-floral honey with a rich, sweet flavor from a variety of wildflowers.' },
    price: { hu: 2500, en: 12.99 },
    image: '/images/vegyesméz1.jpg',
  },
  {
    id: 2,
    name: { hu: 'Akácméz', en: 'Acacia Honey' },
    description: { hu: 'Nagyon világos és tiszta méz, finom, virágos ízzel, amely lassan kristályosodik.', en: 'A very light and clear honey with a delicate, floral taste that is slow to crystallize.' },
    price: { hu: 3000, en: 15.99 },
    image: '/images/akacmez.jpg',
  },
  {
    id: 3,
    name: { hu: 'Repceméz', en: 'Canola Honey' },
    description: { hu: 'Klasszikus, enyhe és világos színű méz. Tökéletes tea édesítésére vagy pirítósra kenve.', en: 'A classic, mild, and light-colored honey. Perfect for sweetening tea or spreading on toast.' },
    price: { hu: 2000, en: 9.99 },
    image: '/images/repcemez.jpg',
  },
  {
    id: 4,
    name: { hu: 'Levendulásméz', en: 'Lavender Honey' },
    description: { hu: 'Illatos, virágos méz finom levendula aromával. Tökéletes desszertekhez vagy joghurt tetejére.', en: 'A fragrant and floral honey with delicate lavender notes. Perfect for desserts or drizzling over yogurt.' },
    price: { hu: 2500, en: 11.99 },
    image: '/images/levendulasmez.jpg',
  },
  {
    id: 5,
    name: { hu: 'Hársméz', en: 'Linden Honey' },
    description: { hu: 'Aranyszínű, aromás méz enyhe, édes ízzel. Ideális teához vagy sütéshez.', en: 'Golden and aromatic honey with a mild, sweet taste. Ideal for tea or baking.' },
    price: { hu: 2300, en: 10.99 },
    image: '/images/Hársméz1.jpg',
  },
  {
    id: 6,
    name: { hu: 'Virágpor', en: 'Bee Pollen' },
    description: { hu: 'Tápanyagokban gazdag virágpor. Smoothiekhoz, gabonapelyhekhez adható vagy önmagában fogyasztható.', en: 'Rich in nutrients, bee pollen can be added to smoothies, cereals, or eaten on its own.' },
    price: { hu: 2800, en: 12.99 },
    image: '/images/virágpor.jpg',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Amazing Health Benefits of Raw Honey',
    excerpt: 'Discover the powerful antibacterial, antioxidant, and soothing properties of raw honey and how it can boost your well-being.',
    image: 'https://picsum.photos/800/500?random=11',
    author: 'Dr. Bee Well',
    date: '2023-10-26',
  },
  {
    id: 2,
    title: "A Beekeeper's Year: The Seasonal Cycle of Honey Production",
    excerpt: "Ever wondered how honey gets from the flower to your jar? Follow a beekeeper through the seasons to see how it's done.",
    image: 'https://picsum.photos/800/500?random=12',
    author: 'Apiarist Jane',
    date: '2023-10-15',
  },
  {
    id: 3,
    title: 'Cooking with Honey: Tips for Sweet Success',
    excerpt: 'Learn how to substitute sugar with honey in your favorite recipes, and get tips for baking, grilling, and creating delicious dressings.',
    image: 'https://picsum.photos/800/500?random=13',
    author: 'Chef Buzz',
    date: '2023-09-30',
  },
  {
    id: 4,
    title: 'Why Protecting Our Bees is More Important Than Ever',
    excerpt: 'Bees are vital to our ecosystem and food supply. Learn about the challenges they face and what you can do to help.',
    image: 'https://picsum.photos/800/500?random=14',
    author: 'Eco Warrior',
    date: '2023-09-12',
  },
];
