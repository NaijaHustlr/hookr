
import { ModelType } from "@/types/model";

// Generate availability for the model
const generateAvailability = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return days.map((day) => ({
    day,
    available: Math.random() > 0.3, // 70% chance of being available
  }));
};

// Mock tags for models
const modelTags = [
  'GFE', 'Tantric', 'Massage', 'Roleplay', 'Fetish', 'BDSM', 
  'Dinner Date', 'Weekend', 'Travel', 'Party', 'Overnight', 
  'Cosplay', 'Lingerie', 'Duo', 'Couple', 'Bi', 'Straight', 
  'Luxury', 'Exclusive'
];

// Function to get random tags
const getRandomTags = (count: number) => {
  const shuffled = [...modelTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate random price between 100 and 500
const getRandomPrice = () => Math.floor(Math.random() * 400) + 100;

// Generate random distance
const getRandomDistance = () => {
  const distance = Math.floor(Math.random() * 15) + 1;
  return `${distance} mi`;
};

// Model names pool
const modelNames = [
  'Sophia', 'Victoria', 'Isabella', 'Olivia', 'Ava', 
  'Emma', 'Mia', 'Luna', 'Aria', 'Zoe', 'Charlotte',
  'Amelia', 'Harper', 'Evelyn', 'Abigail'
];

// Generate mock models
export const generateMockModels = (count: number): ModelType[] => {
  console.log(`Generating ${count} mock models`);
  const models = Array.from({ length: count }).map((_, index) => {
    // Use all 10 available images, cycling through them if count > 10
    const imgId = (index % 10) + 1;
    const imgUrl = `/images/model-${imgId}.jpg`;
    
    return {
      id: `model-${index + 1}`,
      name: modelNames[index % modelNames.length],
      profileImage: imgUrl,
      rating: (Math.random() * 1) + 4, // Rating between 4 and 5
      reviewCount: Math.floor(Math.random() * 100) + 5,
      distance: getRandomDistance(),
      price: getRandomPrice(),
      tags: getRandomTags(Math.floor(Math.random() * 4) + 2),
      availability: generateAvailability(),
      age: Math.floor(Math.random() * 10) + 21, // Age between 21 and 30
      verified: Math.random() > 0.3,
      featured: Math.random() > 0.7,
    };
  });
  console.log("Generated models:", models);
  return models;
};

// Generate different categories of models
export const getFeaturedModels = (count: number) => {
  return generateMockModels(count).map(model => ({ ...model, featured: true }));
};

export const getNewModels = (count: number) => {
  return generateMockModels(count);
};

export const getTopRatedModels = (count: number) => {
  return generateMockModels(count).map(model => ({ ...model, rating: (Math.random() * 0.5) + 4.5 }));
};

// Filter configurations
export const filterOptions = {
  "Distance": [
    { label: "Under 5 miles", value: "under5" },
    { label: "5-15 miles", value: "5to15" },
    { label: "Over 15 miles", value: "over15" }
  ],
  "Price Range": [
    { label: "$100 - $200", value: "100to200" },
    { label: "$200 - $300", value: "200to300" },
    { label: "$300+", value: "300plus" }
  ],
  "Body Type": [
    { label: "Petite", value: "petite" },
    { label: "Slim", value: "slim" },
    { label: "Athletic", value: "athletic" },
    { label: "Curvy", value: "curvy" }
  ],
  "Age": [
    { label: "21-25", value: "21to25" },
    { label: "26-30", value: "26to30" },
    { label: "30+", value: "30plus" }
  ]
};
