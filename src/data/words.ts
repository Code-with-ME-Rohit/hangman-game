export const WORDS = [
  "apple", "beach", "brain", "brick", "bridge", "brush", "cabin", "candy",
  "chair", "chest", "cliff", "clock", "cloud", "coast", "coral", "crane",
  "cream", "crown", "dance", "dream", "earth", "feast", "fence", "flame",
  "flash", "float", "floor", "flour", "frost", "ghost", "glass", "globe",
  "grace", "grain", "grape", "grass", "heart", "honey", "horse", "house",
  "juice", "knife", "lemon", "light", "maple", "medal", "melon", "metal",
  "mirth", "moose", "mouse", "music", "night", "ocean", "olive", "opera",
  "otter", "paint", "pearl", "piano", "pilot", "pizza", "plant", "plume",
  "pride", "prize", "queen", "quiet", "raven", "ridge", "river", "robin",
  "robot", "royal", "salad", "scale", "shade", "shape", "sheep", "shell",
  "shine", "shore", "skate", "smile", "smoke", "snake", "space", "spice",
  "spine", "stamp", "steam", "stone", "storm", "sugar", "table", "tiger",
  "tower", "train", "whale", "world",
];

export const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];
