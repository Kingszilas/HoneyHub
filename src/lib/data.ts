import type { Product, BlogPost } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: {
      en: 'Wildflower Honey',
      hu: 'Vegyes virágméz'
    },
    description: {
        en: 'A delightful multi-floral honey with a rich, sweet flavor from a variety of wildflowers.',
        hu: 'Kellemes, többvirágú méz, gazdag, édes ízzel, különféle vadvirágokból.'
    },
    price: {
        en: 12.99,
        hu: 2500
    },
    image: 'https://picsum.photos/600/400?random=1',
    rating: 5,
    reviewCount: 124,
  },
  {
    id: 2,
    name: {
      en: 'Acacia Honey',
      hu: 'Akácméz'
    },
    description: {
        en: 'A very light and clear honey with a delicate, floral taste that is slow to crystallize.',
        hu: 'Nagyon világos és tiszta méz, finom, virágos ízzel, amely lassan kristályosodik.'
    },
    price: {
        en: 15.99,
        hu: 3000
    },
    image: 'https://picsum.photos/600/400?random=4',
    rating: 4,
    reviewCount: 76,
  },
  {
    id: 3,
    name: {
      en: 'Canola Honey',
      hu: 'Repceméz'
    },
    description: {
        en: 'A classic, mild, and light-colored honey. Perfect for sweetening tea or spreading on toast.',
        hu: 'Klasszikus, enyhe és világos színű méz. Tökéletes tea édesítésére vagy pirítósra kenve.'
    },
    price: {
        en: 9.99,
        hu: 2000
    },
    image: 'https://picsum.photos/600/400?random=2',
    rating: 4,
    reviewCount: 98,
  },
  {
    id: 4,
    name: 'Manuka Honey',
    description: 'A premium honey from New Zealand known for its unique, strong flavor and beneficial properties.',
    price: 39.99,
    image: 'https://picsum.photos/600/400?random=3',
    rating: 5,
    reviewCount: 210,
  },
  {
    id: 5,
    name: 'Buckwheat Honey',
    description: 'A dark, robust honey with a malty, molasses-like flavor. Rich in antioxidants.',
    price: 14.99,
    image: 'https://picsum.photos/600/400?random=5',
    rating: 5,
    reviewCount: 88,
  },
  {
    id: 6,
    name: 'Orange Blossom Honey',
    description: 'A fragrant honey with a subtle citrusy aroma and a sweet, fruity flavor.',
    price: 13.99,
    image: 'https://picsum.photos/600/400?random=6',
    rating: 4,
    reviewCount: 102,
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
    title: 'A Beekeeper\'s Year: The Seasonal Cycle of Honey Production',
    excerpt: 'Ever wondered how honey gets from the flower to your jar? Follow a beekeeper through the seasons to see how it\'s done.',
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
