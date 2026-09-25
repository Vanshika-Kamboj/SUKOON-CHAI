import { JournalArticle } from '../types';
import { HERO_IMAGE, LIFESTYLE_PAUSE_IMAGE, MASALA_IMAGE, ADRAK_IMAGE } from './products';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    slug: 'why-chai-feels-like-home',
    title: 'Why Chai Feels Like Home',
    subtitle: 'On sensory memories, the familiar hiss of boiling milk, and returning to yourself.',
    category: 'Reflections',
    readTime: '4 min read',
    publishDate: 'September 18, 2026',
    author: 'Meera Deshmukh',
    excerpt: 'Across thousands of miles and different cities, the exact sound of crushed cardamom tumbling into hot milk remains an unspoken compass pointing directly back to safety.',
    image: LIFESTYLE_PAUSE_IMAGE,
    content: [
      'There is an intimate architecture to the Indian kitchen that awakens solely when the tea pan is set upon the blue ring of the gas stove.',
      'No matter which hemisphere you find yourself residing in, the scent of crushed green cardamom blooming in bubbling spring water activates something primeval. It is not merely taste; it is the subconscious recollection of rain tapping against balcony grills, of wool shawls draped across shoulders, and mothers insisting on one more sip before you face the world.',
      'Chai in India was never intended to be gulped from paper containers while rushing down subway steps. It asks you to halt. You cannot drink freshly strained chai hastily; the temperature commands patience. In that enforced wait of three minutes, Sukoon arrives without fanfare.'
    ]
  },
  {
    id: 'art-2',
    slug: '5-chai-moments-everyone-understands',
    title: '5 Chai Moments Everyone Understands',
    subtitle: 'The universal vignettes that tie every Indian tea lover together.',
    category: 'Chai Culture',
    readTime: '3 min read',
    publishDate: 'August 30, 2026',
    author: 'Kabir Varma',
    excerpt: 'From the rainy balcony to the shared 4 PM office tapri pause, these are the unwritten chapters of everyday Indian life.',
    image: HERO_IMAGE,
    content: [
      '1. The Monsoon Pour: The skies darken in July, raindrops hit the heated pavement with the aroma of petrichor, and before anyone speaks, someone is already in the kitchen crushing ginger in the brass mortar.',
      '2. The Breakthrough Cup: Staring at a stubborn problem for three hours until you abandon the desk, brew a steaming cutting chai, and discover the solution was waiting in the silence between sips.',
      '3. The Train Window Chai: The early dawn whistle of the Indian Railways, misty fields gliding by, and the sing-song cry of the chai-wallah echoing down the compartment aisle.',
      '4. The Unspoken Apology: Two people sitting after an argument, words falling short, until a warm cup is quietly placed on the table with no words, only warmth.',
      '5. The Late Night Balcony Conversation: When the rest of the neighborhood sleeps and thoughts flow unhurried under amber streetlamps.'
    ]
  },
  {
    id: 'art-3',
    slug: 'the-art-of-a-slow-morning',
    title: 'The Art of a Slow Morning',
    subtitle: 'Resisting the urge to open screens before honoring the morning ritual.',
    category: 'Rituals',
    readTime: '5 min read',
    publishDate: 'August 14, 2026',
    author: 'Ananya Sharma',
    excerpt: 'How fifteen uninterrupted minutes with a clay cup of Adrak chai can anchor your nervous system against modern digital turbulence.',
    image: ADRAK_IMAGE,
    content: [
      'The modern world demands our instantaneous availability from the microsecond our eyes open. Notifications flash, emails queue, and anxiety whispers of deadlines.',
      'Reclaiming your morning does not require two hours of rigid routines. It requires one sacred boundary. For the team at Sukoon Chai, that boundary is the time it takes to brew tea from scratch.',
      'Grinding the whole spices by hand. Watching the tea leaves dance as the water reaches a rolling boil. Inhaling the rising steam before taking the first sip. This is mindfulness stripped of pretension—pure, tactile, and deeply grounding.'
    ]
  },
  {
    id: 'art-4',
    slug: 'masala-chai-and-indian-memories',
    title: 'Masala Chai and Indian Memories',
    subtitle: 'From the spice gardens of Idukki to the tea estates of Upper Assam.',
    category: 'Origins',
    readTime: '6 min read',
    publishDate: 'July 28, 2026',
    author: 'Rohan Sen',
    excerpt: 'Tracing the spice trade, generational heirloom recipes, and how individual families guard their secret ratios of star anise, clove, and pepper.',
    image: MASALA_IMAGE,
    content: [
      'Every household in India maintains its own unwritten spice constitution. In Gujarat, lemongrass and mint often intertwine with ginger; in Punjab, heavy cloves and black cardamom reign; in Bengal, a whispered touch of green cardamom elevates the liquor.',
      'When crafting Sukoon’s Premium Masala blend, we journeyed across eight states to understand this emotional resonance. The outcome is not a loud overwhelming punch, but a gentle crescendo that finishes with comforting sweet cardamom.'
    ]
  },
  {
    id: 'art-5',
    slug: 'your-evening-chai-ritual',
    title: 'Your Evening Chai Ritual',
    subtitle: 'Transitioning from the frenzy of work into the softness of twilight.',
    category: 'Wellbeing',
    readTime: '4 min read',
    publishDate: 'July 10, 2026',
    author: 'Meera Deshmukh',
    excerpt: 'Why sunset is the golden hour for mindful caffeine wind-down with botanical infusions.',
    image: LIFESTYLE_PAUSE_IMAGE,
    content: [
      'As the day’s work draws to a close and shadows lengthen across wooden floors, our bodies register a subtle shift. Drinking a heavy caffeinated coffee at 6 PM disrupts natural circadian rest. Yet our habit craves a warm cup.',
      'This was the inspiration behind our Pushkar Rose and Evening Calm blends: capturing the comforting ceremony of warm tea while soothing the senses with chamomile, fennel, and pure rose petals.'
    ]
  },
  {
    id: 'art-6',
    slug: 'tea-conversations-and-connection',
    title: 'Tea, Conversations & Connection',
    subtitle: 'Why the deepest human friendships have always unfolded around a kettle.',
    category: 'Community',
    readTime: '4 min read',
    publishDate: 'June 22, 2026',
    author: 'Kabir Varma',
    excerpt: 'In a lonely digital age, offering someone a freshly boiled cup remains our most profound act of quiet hospitality.',
    image: HERO_IMAGE,
    content: [
      'In Hindi, when someone visits your doorstep, you never ask "Do you want to talk?". You ask, "Chai piyoge?" (Will you have tea?).',
      'The cup serves as a bridge. It gives restless hands something warm to hold. It gives comfortable silences room to breathe without awkwardness. In every sip of Sukoon Chai, there is an invitation to connect with yourself or with the soul sitting beside you.'
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    author: 'Priya Nambiar',
    location: 'Bengaluru',
    rating: 5,
    date: '3 days ago',
    comment: 'More than chai, it genuinely feels like a little pause in a busy day. The Premium Masala Chai has the cleanest cardamom aroma I have encountered in any store-bought brand.',
    productName: 'Premium Masala Chai',
    verified: true
  },
  {
    id: 'test-2',
    author: 'Aarav Singhania',
    location: 'New Delhi',
    rating: 5,
    date: '1 week ago',
    comment: 'Beautiful kraft packaging, comforting flavours, and such a peaceful brand experience. Their Adrak blend has that exact warmth of ginger without burning the throat. My everyday ritual now.',
    productName: 'Classic Adrak Chai',
    verified: true
  },
  {
    id: 'test-3',
    author: 'Devika Mukherjee',
    location: 'Kolkata',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The Pushkar Rose tea is pure poetry in a cup. You can actually see the real dried rose petals blooming when steeped. Perfect for quiet evening journal moments.',
    productName: 'Pushkar Rose Tea',
    verified: true
  },
  {
    id: 'test-4',
    author: 'Vikram Joshi',
    location: 'Pune',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Gifted the Box of Four to my parents for their anniversary. They were astonished by the wooden packaging and the brass measuring spoon. Authentic Indian tea done with true elegance.',
    productName: 'The Sukoon Chai Box of Four',
    verified: true
  }
];
