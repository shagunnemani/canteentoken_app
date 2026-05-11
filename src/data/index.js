export const MENU_ITEMS = [
  { id:1,  name:"Masala Dosa",         price:60,  emoji:"🫓", category:"Breakfast", desc:"Crispy crepe with spicy potato filling" },
  { id:2,  name:"Idli Sambar",         price:40,  emoji:"🍚", category:"Breakfast", desc:"Steamed rice cakes with lentil soup" },
  { id:3,  name:"Veg Biryani",         price:120, emoji:"🍛", category:"Meals",     desc:"Fragrant rice with mixed vegetables & spices" },
  { id:4,  name:"Chicken Biryani",     price:160, emoji:"🍗", category:"Meals",     desc:"Aromatic basmati rice with tender chicken" },
  { id:5,  name:"Dal Rice",            price:80,  emoji:"🥘", category:"Meals",     desc:"Comfort lentil curry with steamed rice" },
  { id:6,  name:"Paneer Butter Masala",price:130, emoji:"🧀", category:"Meals",     desc:"Rich tomato gravy with soft paneer cubes" },
  { id:7,  name:"Masala Tea",          price:20,  emoji:"☕", category:"Drinks",    desc:"Spiced Indian milk tea" },
  { id:8,  name:"Filter Coffee",       price:25,  emoji:"🍵", category:"Drinks",    desc:"South Indian drip coffee with frothy milk" },
  { id:9,  name:"Fresh Lime Soda",     price:35,  emoji:"🍋", category:"Drinks",    desc:"Refreshing lime with soda & salt" },
  { id:10, name:"Banana Milkshake",    price:55,  emoji:"🍌", category:"Drinks",    desc:"Thick creamy banana shake" },
  { id:11, name:"Samosa (2 pcs)",      price:30,  emoji:"🥟", category:"Snacks",    desc:"Golden fried pastry with spiced filling" },
  { id:12, name:"Vada Pav",            price:25,  emoji:"🍔", category:"Snacks",    desc:"Mumbai street-style potato slider" },
  { id:13, name:"Bread Pakoda",        price:30,  emoji:"🥪", category:"Snacks",    desc:"Crispy battered bread with chutney" },
  { id:14, name:"Gulab Jamun (2)",     price:40,  emoji:"🍮", category:"Desserts",  desc:"Soft milk dumplings in rose syrup" },
  { id:15, name:"Kheer",              price:50,  emoji:"🥣", category:"Desserts",  desc:"Creamy rice pudding with cardamom" },
  { id:16, name:"Kheer2",              price:50,  emoji:"🥣", category:"Desserts",  desc:"Creamy rice pudding with cardamom" },
  

];

export const CATEGORIES = ["All", "Breakfast", "Meals", "Drinks", "Snacks", "Desserts"];

export const formatTime = d => new Date(d).toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" });
export const formatDate = d => new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" });

export const getTokens = () => {
  try { return JSON.parse(localStorage.getItem("ct_tokens") || "[]"); } catch { return []; }
};

export const saveTokens = tokens => localStorage.setItem("ct_tokens", JSON.stringify(tokens));
