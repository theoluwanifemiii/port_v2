import { IMG } from "./theme";

/** [name, description, price in naira, optional tag] */
export type MenuRow = [string, string, number, string?];

export interface MenuGroup {
  /** Sub-heading inside a page ("Single Malt"); empty for a plain list. */
  title: string;
  items: MenuRow[];
}

export interface MenuCategory {
  chip: string;
  title: string;
  img: string;
  pos: string;
  sub?: string;
  groups: MenuGroup[];
}

const one = (items: MenuRow[]): MenuGroup[] => [{ title: "", items }];

export const FOOD: MenuCategory[] = [
  { chip: "BREAKFAST", title: "Choice of Breakfast", img: IMG.breakfast, pos: "center 45%", groups: one([
    ["English Breakfast", "Your choice of eggs, savory sausage, crispy bacon, baked beans, sautéed mushrooms, grilled tomato and toasted bread.", 18000],
    ["American Breakfast", "Fluffy scrambled eggs, two sausages, and a drizzle of maple syrup or honey and blueberry jam.", 18000],
    ["Nigerian Breakfast", "Boiled yam and egg sauce, a traditional breakfast dish.", 15000],
    ["Potato with Egg or Fish Sauce", "Tender sweet potatoes, boiled or lightly fried, with a rich egg sauce or flavorful fish sauce, gently spiced.", 15000],
  ])},
  { chip: "STARTERS", title: "Starters", img: IMG.starters, pos: "center 55%", groups: one([
    ["Lucrezia Tower", "A crazy mix of fried and grilled exotic fresh seafood, served with fried yam and hand cut chips.", 176000, "TO SHARE"],
    ["Leonardo Tower", "Beef and chicken suya, Euphoria rolls, peppered snails, sliders and tacos, served with fried yam and hand cut chips.", 98000, "TO SHARE"],
    ["Taste of Euphoria", "Our signature starters on one platter: slider burger, Euphoria roll, tempura prawns, tacos, spicy wings, spicy snail, smoky jollof and fried rice, with a glass of white or red wine.", 35000],
    ["Tempura Prawns", "Deep fried coated prawns, prepared the Euphoria way, with our special sweet chili sauce.", 25000],
    ["Grilled Spicy Calamari", "Charcoal grilled marinated calamari.", 25000],
    ["Peppered Snails", "Nigerian snails cooked with a fusion of spices.", 22000],
    ["Tempura Chicken Lollipop", "Eight tempura chicken lollipops with sweet chili sauce or tangy tartare sauce.", 20000],
    ["Afro Leb Hummus", "Traditional hummus topped with spicy asun and suya spice.", 15000],
    ["Traditional Tacos", "Your choice of medium shell with beef, chicken or shrimp.", 15000],
    ["Spicy Chicken Wings Lollipop", "Grilled marinated chicken wings with homemade chili sauce.", 15000],
    ["Dynamite Shrimp", "Crispy battered shrimp in a creamy, spiced dynamite sauce over fresh greens, presented in a martini glass.", 15000],
    ["Euphoria Rolls", "Crispy rolls of mixed seafood with a sweet and tangy BBQ sauce.", 12000],
  ])},
  { chip: "SALADS", title: "Salads", img: IMG.salads, pos: "center 40%", groups: one([
    ["Cobb Salad", "Lettuce and chopped greens, chicken breast, bacon, avocado, cherry tomatoes, boiled eggs and cheese with honey mustard dressing.", 30000],
    ["Euphoria Classic Salad", "Crisp lettuce, tender chicken, tuna, eggs, sweet corn, cherry tomatoes and baby cucumbers, topped with Parmesan and our house dressing.", 28000],
    ["Chicken Caesar Salad", "Fresh romaine with crispy croutons and grilled chicken.", 20000],
  ])},
  { chip: "PASTA", title: "Pasta", img: IMG.pasta, pos: "center 50%", groups: one([
    ["Oxtail Pasta", "Fall-off-the-bone oxtail, slow braised for hours and folded into a rich reduced sauce. Finished Rasta style in creamy jerk spice, or as a robust red wine ragù.", 35000],
    ["Seafood Ofada Linguini", "Linguini in an authentic prawn Ofada sauce, with garlic toasted bread.", 32000],
    ["Spaghetti Mare", "Shrimp, calamari, fish fillet and prawns in your choice of red or creamy sauce, with garlic toasted bread.", 32000],
    ["Pesto Pasta, Chicken or Prawns", "Penne in basil sauce, topped with grilled chicken breast or prawns, with garlic toasted bread.", 28000],
    ["Penne Arrabbiata, Chicken or Prawns", "Penne in tomato sauce, topped with grilled chicken breast or prawns.", 26000],
    ["Chicken Alfredo", "Fettuccine in creamy mushroom sauce with grilled chicken breast and Parmesan, with garlic toasted bread.", 25000],
  ])},
  { chip: "BURGERS", title: "Burgers", img: IMG.burgers, pos: "center 60%", groups: one([
    ["Smashed Burger Sliders", "Three smashed beef patties with caramelized onions and cheese in mini buns.", 25000],
    ["Euphoria Beef Burger", "A flame grilled beef patty with melted cheddar, crisp lettuce and caramelized onions in a golden toasted bun. Add a sunny side egg if you wish.", 21000],
  ])},
  { chip: "PIZZA", title: "Pizza", img: IMG.pizza, pos: "center 40%", sub: "Every pizza begins with our homemade dough.", groups: one([
    ["Frutti di Mare", "Tomato sauce, exotic seafood, cheese, basil and handmade chili oil.", 24000],
    ["Sardinia", "Tomato sauce, sardines and mixed cheese, with chili oil.", 22000],
    ["Pepperoni", "Tomato sauce, pepperoni and mixed cheese.", 19500],
    ["Suya", "Tomato sauce, mixed cheese and a blend of beef and chicken suya.", 18000],
    ["Vegetarian", "Tomato sauce, mushrooms, onion, green pepper, zucchini, sweet corn and black olives with mixed cheese.", 17500],
    ["Margherita", "Tomato sauce and mixed cheese.", 17000],
  ])},
  { chip: "MAINS", title: "Main Course", img: IMG.mains, pos: "center 35%", sub: "Steaks, seafood and chicken.", groups: one([
    ["Euphoria Surf and Turf", "Premium steak with shrimp, mussels and prawns from the teppanyaki, with Asian fried rice, sautéed vegetables and our yum yum sauce.", 70000],
    ["Imported Rump Steak", "South African rump with a tangy chimichurri, sweet mashed potatoes and grilled vegetables.", 65000],
    ["Flame Grilled Ribeye", "Imported ribeye with spicy sautéed potatoes and baby carrots.", 58000],
    ["Braised Lamb Shank", "Imported lamb shank slow braised in a homemade spicy stew, with garlic confit mash.", 56000],
    ["South African Short Ribs", "Half a kilo of premium beef ribs in a red wine reduction, with seasonal vegetables and fried or jollof rice.", 55000],
    ["Oxtail", "Slow cooked oxtail in our house sauce, with your choice of rice.", 49000],
    ["Grilled Lamb Chops", "Flame grilled imported lamb chops with French fries and sautéed vegetables.", 48000],
    ["Grilled Tiger Prawns", "With carrot purée, lemon butter sauce and a side of your choice.", 45000],
    ["Imported Sirloin Steak", "Marinated in a blend of spices and herbs, with crispy croquette potatoes.", 45000],
    ["Lagos Silk Road Seafood Noodles", "Singapore style vermicelli with prawns, tiger prawns, shrimp and mussels in a ginger garlic, oyster and soy glaze. Mild, or with our hot habanero.", 32000],
    ["Ram Curry Sauce", "With steamed rice and diced plantain.", 30000],
    ["Creamy Lemon Butter Mussels", "Fourteen plump mussels in a silky lemon butter cream with garlic, ginger and white wine, served with crusty bread.", 29000],
    ["Spicy Roasted Chicken", "Roasted half chicken with your choice of sides.", 28000],
    ["Lagos Silk Road Beef Noodles", "Singapore style vermicelli with tender sliced beef in a ginger garlic, oyster and soy glaze. Mild, or with our hot habanero.", 27000],
  ])},
  { chip: "FISH", title: "Fishes", img: IMG.fish, pos: "center 45%", groups: one([
    ["Pan Seared Salmon", "Butter basted with herbs, garlic and a touch of scotch bonnet, with green pea purée and a lemon pineapple butter emulsion.", 65000],
    ["Grilled Sea Bass", "Topped with a curry turmeric sauce, with crispy fried plantain.", 65000],
    ["Herb Marinated Kingklip", "With sautéed vegetables, creamy potatoes and a zesty chili butter lemon sauce.", 65000],
    ["Baby Kingklip", "South African baby kingklip with prawns and crispy calamari, with your choice of rice.", 60000],
    ["Grilled Red Snapper", "Freshly caught, with aromatic fried rice or spicy jollof rice.", 45000],
    ["Lemon and Spice Roasted Croaker", "Whole croaker in lemon, garlic, ginger, paprika and cumin, baked golden with a smoky spice crust.", 35000],
  ])},
  { chip: "SIGNATURE", title: "Signature Dishes", img: IMG.signature, pos: "center 45%", sub: "The plates Euphoria is known for.", groups: one([
    ["Grilled Tomahawk", "Prime tomahawk steak grilled to your preference, with smashed plantains.", 120000, "FEEDS TWO"],
    ["Salt Bay", "Fish of the day rolled in salt and rosemary, baked in the oven.", 90000],
  ])},
  { chip: "TASTE OF AFRICA", title: "Taste of Africa", img: IMG.africa, pos: "center 50%", sub: "Each soup with your preferred swallow and a choice of fourteen proteins.", groups: one([
    ["Seafood Okro", "Fresh prawns, crab, calamari, smoked fish, stockfish and crayfish.", 26000],
    ["Abula", "Gbegiri and ewedu with brokoto, saki, roundabout, abodi, snails and beef.", 18500],
    ["Efo Riro", "With catfish, stockfish and crayfish, brokoto, saki, roundabout, abodi, snails and beef.", 18500],
    ["Afang Soup", "Fresh afang and waterleaf in a perfectly seasoned broth.", 18500],
  ])},
  { chip: "SIDES", title: "Sides", img: IMG.sides, pos: "center 50%", groups: one([
    ["Euphoria Special Fried Rice", "", 12000], ["French Fries", "", 6000], ["Euphoria Chips", "", 6000], ["Sautéed Vegetables", "", 6000], ["Fried Yam", "", 6000],
    ["Fried Sweet Potato", "", 6000], ["Jollof Rice", "", 6000], ["Steamed Rice", "", 6000], ["Fried Plantain", "", 6000], ["Mashed Potatoes", "", 6000],
  ])},
  { chip: "DESSERTS", title: "Dessert", img: IMG.desserts, pos: "center 50%", groups: one([
    ["Apple Crumble Cheesecake", "", 15000], ["Tiramisu", "", 15000], ["Lotus Biscuit Cheesecake", "", 15000], ["Vanilla Cheesecake", "", 15000], ["Duo Chocolate Cake", "", 15000],
  ])},
];

export const DRINKS: MenuCategory[] = [
  { chip: "SIGNATURE", title: "Signature Cocktails", img: IMG.cocktail, pos: "center 40%", groups: [
    { title: "", items: [
      ["Blue Hawaii", "Coconut cream, lemon juice, white rum, pineapple juice, blue curaçao and simple syrup.", 13000],
      ["Morphism Law", "Fresh ginger, simple syrup and dry gin, muddled and topped with Angostura bitters.", 13000],
      ["Sidecar", "Cognac, lemon juice and simple syrup.", 13000],
    ]},
    { title: "Euphoria Special", items: [
      ["PMS", "Strawberry infused vodka, simple syrup and rosemary syrup.", 13000],
    ]},
  ]},
  { chip: "CLASSICS", title: "Classic Cocktails", img: IMG.cocktail, pos: "center 75%", groups: one([
    ["Long Island", "", 15000], ["Mai Tai", "", 12000], ["Aperol Spritz", "", 12000], ["Margarita", "", 12000], ["Daiquiri", "", 12000], ["Mojito", "", 12000], ["Pornstar Martini", "", 15000],
    ["Negroni", "", 15000], ["Gin Basil", "", 12000], ["Old Fashioned", "", 13000], ["Whiskey Sour", "", 15000], ["Caipiroska", "", 12000], ["Espresso Martini", "", 15000],
  ])},
  { chip: "MOCKTAILS", title: "Mocktails", img: IMG.mocktail, pos: "center 50%", sub: "All the ceremony, none of the spirit.", groups: one([
    ["Frozen Cherry and Coke", "", 10000], ["Ginger Kiwi Zing", "", 13000], ["Virgin Mojito", "Flavoured with strawberry, mango or passion fruit.", 12000], ["Virgin Daiquiri", "", 12000],
  ])},
  { chip: "SMOOTHIES & SHAKES", title: "Smoothies and Milkshakes", img: IMG.mocktail, pos: "center 30%", groups: [
    { title: "Smoothies", items: [["Banana Smoothie", "", 10000], ["Mint Ginger Pineapple Smoothie", "", 10000], ["Watermelon, Ginger and Pineapple Smoothie", "", 10000]] },
    { title: "Milkshakes", items: [["Vanilla", "", 12000], ["Mango", "", 15000], ["Hazelnut", "", 15000], ["Chocolate", "", 12000], ["Strawberry", "", 12000], ["Banana", "", 12000], ["Oreo", "", 12000], ["Cookies Jar", "", 12000]] },
  ]},
  { chip: "JUICES & SOFT", title: "Juices, Soft Drinks and Coffee", img: IMG.mocktail, pos: "center 70%", groups: [
    { title: "Fresh Juices", items: [["Fresh Orange Juice", "", 10000], ["Fresh Apple Juice", "", 10000], ["Fresh Pineapple Juice", "", 10000], ["Fresh Beetroot Juice", "", 10000], ["Fresh Carrot Juice", "", 10000]] },
    { title: "Soft Drinks", items: [["Water, Small", "", 2500], ["Sparkling Water", "", 6000], ["Coke", "", 3000], ["Sprite", "", 3000], ["Fanta", "", 3000], ["Soda Water", "", 3000], ["Tonic Water", "", 3000], ["Bitter Lemon", "", 3000], ["Energy Drink", "", 6000], ["Juice Pitcher", "", 7000], ["Cranberry", "", 10000]] },
    { title: "Hot Beverages", items: [["Espresso", "", 4000], ["Double Espresso", "", 4000], ["Americano", "", 4000]] },
  ]},
  { chip: "WINE", title: "Wine", img: IMG.wine, pos: "center 55%", groups: [
    { title: "Rosé Wine", items: [["Marques de Berol Semi Sweet 2018, Spain", "", 50000], ["Angelus Rosé", "", 80000]] },
    { title: "White Wine", items: [["White Wine, by the Glass", "", 12000], ["Marques de Berol Macabeo 2020, Spain", "", 50000], ["Marques de Berol Semi Sweet, Spain", "", 50000], ["Phillipe Daynac Chardonnay 2018, France", "", 75000], ["Carlo Rossi", "", 50000], ["Sweet Kiss", "", 50000], ["DC White", "", 55000]] },
    { title: "Red Wine", items: [["Red Wine, by the Glass", "", 12000], ["Marques de Berol Gran Selección Vintage 2008, Spain", "", 250000], ["Larums Ribera del Queiles Gold Bottle", "", 250000], ["Châteauneuf-du-Pape", "", 100000], ["Winter Harvest 50cl", "", 100000], ["KOP Shiraz", "", 60000], ["Whispering Angel", "", 60000], ["Syrah", "", 60000], ["Thomas Barton", "", 55000], ["DC Red", "", 55000], ["Escudo Rojo", "", 55000], ["Carlo Rossi", "", 50000], ["Sweet Kiss", "", 50000], ["Marques de Berol Merlot 2018, Spain", "", 50000], ["Marques de Berol Cabernet Sauvignon 2018, Spain", "", 50000], ["Cabernet Sauvignon", "", 50000]] },
  ]},
  { chip: "CHAMPAGNE", title: "Champagne", img: IMG.wine, pos: "center 30%", groups: [
    { title: "Vintage Blanc", items: [["Ace of Spades Brut", "", 1400000], ["Cristal Brut", "", 1000000], ["Dom Pérignon Brut", "", 920000], ["Dom Pérignon Luminous", "", 920000], ["Laurent Perrier Grand Siècle", "", 895000]] },
    { title: "Non Vintage Blanc", items: [["Veuve Rich", "", 420000], ["GH Mumm Cordon Rouge Demi Sec", "", 295000], ["Moët Ice", "", 290000], ["Laurent Perrier Demi Sec", "", 290000]] },
    { title: "Rosé", items: [["Laurent Perrier Rosé", "", 420000], ["Veuve Clicquot Rosé", "", 290000], ["Moët and Chandon Impérial Rosé", "", 290000]] },
    { title: "Rosé Vintage", items: [["Dom Pérignon Rosé", "", 1250000], ["Ace of Spades Rosé", "", 900000], ["Cristal Rosé", "", 590000]] },
  ]},
  { chip: "COGNAC", title: "Cognac", img: IMG.cigar, pos: "center 50%", sub: "Confidence in a glass.", groups: one([
    ["Martell XXO", "", 1600000], ["Hennessy XO", "", 900000], ["Martell XO", "", 900000], ["Hennessy VSOP", "", 300000], ["Hennessy, Shot", "", 12000],
  ])},
  { chip: "WHISKY", title: "Whisky", img: IMG.cigar, pos: "70% 50%", groups: [
    { title: "Single Malt", items: [["Glenfiddich 30 Years", "", 3800000], ["Glenfiddich 26 Years", "", 2900000], ["Glenfiddich 23 Years", "", 1400000], ["Macallan Rare Cask", "", 920000], ["Glenfiddich 21 Years", "", 720000], ["Macallan 15 Years", "", 720000], ["Lagavulin 16 Years", "", 490000], ["Laphroaig 10 Years", "", 490000], ["Glenfiddich 18 Years", "", 460000], ["Glenfiddich 16 Years", "", 390000], ["Glenfiddich 15 Years", "", 290000]] },
    { title: "Blended", items: [["Johnnie Walker Blue Label", "", 620000], ["Chivas 25 Years", "", 480000], ["Royal Salute 21 Years", "", 220000], ["Chivas 18 Years", "", 220000], ["Chivas 15 Years", "", 200000], ["Gold Bar Whiskey", "", 200000], ["Jameson Black Barrel", "", 150000], ["Chivas 15 Years, by the Glass", "", 15000], ["Jameson, Shot", "", 6000]] },
  ]},
  { chip: "TEQUILA", title: "Tequila", img: IMG.cocktail, pos: "center 85%", groups: one([
    ["Don Julio 1942", "", 950000], ["Clase Azul Reposado", "", 900000], ["Aman Añejo Cristalino", "", 600000], ["Aman Añejo", "", 550000], ["Casa Maestri Reposado", "", 400000], ["Casamigos 75cl", "", 350000], ["Aman Reposado", "", 250000], ["Aman Blanco", "", 230000],
  ])},
  { chip: "VODKA & GIN", title: "Vodka, Gin and Cream", img: IMG.cocktail, pos: "center 20%", groups: [
    { title: "Vodka", items: [["Belvedere Forest", "", 380000], ["Beluga Gold Line", "", 190000], ["Tito's", "", 92000], ["Tito's, by the Glass", "", 8000]] },
    { title: "Gin", items: [["Hendrick's", "", 190000], ["Tanqueray No. Ten", "", 140000], ["Drumshanbo", "", 100000]] },
    { title: "Irish Cream", items: [["Baileys, Bottle", "", 86000]] },
  ]},
  { chip: "SHOTS", title: "Shots", img: IMG.cocktail, pos: "center 60%", groups: one([
    ["Jameson Black Barrel", "", 12000], ["Tequila Gold", "", 8000], ["Gin", "", 8000], ["Whiskey", "", 8000], ["Jameson Regular", "", 8000], ["Ginger Tea", "", 8000], ["Vodka", "", 8000],
    ["Cream Job", "Kahlúa, Irish cream and whipped cream.", 8000], ["B52", "Kahlúa, Irish cream and Cointreau.", 8000], ["Brain Damage", "Peach schnapps, Irish cream, cream and a dash.", 8000], ["Tequila Slammers", "Tequila shots.", 8000],
    ["Tequila", "", 6000], ["Sambuca", "", 5000],
  ])},
  { chip: "CIGARS", title: "Cigars", img: IMG.cigar, pos: "30% 60%", sub: "A cigar is not just smoked, it is savoured.", groups: one([
    ["Handel Gold Cigarillo", "A light, smooth mini cigar with mild body and subtle sweetness. Perfect for a short smoke with whisky.", 6000],
    ["Don Thomas", "Handmade in Honduras, medium bodied with earthy notes and a hint of spice. Balanced and approachable.", 18000],
    ["Don Thomas Allegro", "A longer, medium bodied cigar with woody and nutty flavours. A slow, elegant burn for complex cocktails.", 30000],
    ["Don Thomas Toros", "Bold yet smooth, medium to full body with hints of cedar and spice.", 15000],
    ["Don Thomas XO", "Full body with deep flavours of leather, dark chocolate and spice. Rich and lingering.", 30000],
    ["Macanudo", "An iconic Dominican cigar, mild bodied with creamy notes of cedar and nuts.", 30000],
    ["Macanudo Classic", "Smooth and mellow, with toasted almonds and a gentle draw.", 30000],
    ["Reposado Robusto", "Cocoa, coffee and spice. A short, flavourful smoke, perfect with a strong Old Fashioned.", 13000],
    ["Reposado Toro", "Longer and richer, with earthy and woody tones. Pairs beautifully with bold cocktails.", 18000],
    ["Reposado Churchill", "Full bodied, with wood, pepper and espresso. A long smoke for the connoisseur.", 18000],
  ])},
];
