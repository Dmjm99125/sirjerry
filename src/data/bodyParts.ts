/**
 * Body Parts Data - Educational Content for Kids
 * 
 * This file contains all the body parts data used throughout the educational games.
 * Each body part includes position coordinates, descriptions, and fun facts designed
 * for kindergarten-age children (4-7 years old).
 * 
 * COORDINATE SYSTEM:
 * - x: Horizontal position (0 = far left, 100 = far right)
 * - y: Vertical position (0 = top, 100 = bottom)
 * - Coordinates are percentages relative to the character image
 * 
 * DESIGN PRINCIPLES:
 * - Left/right body parts are separated for bilateral awareness
 * - Descriptions use simple, kid-friendly language
 * - Fun facts encourage curiosity and learning
 * - Emojis make the interface visually appealing
 */

/**
 * Interface defining the structure of each body part
 * Used throughout the application for type safety
 */
export interface BodyPart {
  /** Unique identifier for the body part (used in game logic) */
  id: string;
  /** Display name shown to children */
  name: string;
  /** Horizontal position on character image (0-100%) */
  x: number;
  /** Vertical position on character image (0-100%) */
  y: number;
  /** Emoji representation for visual appeal */
  emoji: string;
  /** Kid-friendly description of the body part */
  description: string;
  /** Interesting fact to encourage learning */
  funFact: string;
}

/**
 * Complete collection of body parts for the educational games
 * 
 * ORGANIZATION:
 * - Head & facial features (top section)
 * - Upper body & arms (middle-upper section)  
 * - Lower body & legs (bottom section)
 * - Special parts (back, positioned separately)
 * 
 * POSITIONING STRATEGY:
 * - Center parts (head, nose, mouth, etc.): x = 50%
 * - Left parts: x = 15-45%
 * - Right parts: x = 55-85%
 * - Y coordinates follow anatomical top-to-bottom order
 */
export const bodyParts: BodyPart[] = [
  {
    id: "head",
    name: "Head",
    x: 50,
    y: 20,
    emoji: "🧠",
    description: "Your head is at the top of your body. It holds your amazing brain!",
    funFact: "Your brain controls everything you do!"
  },
  {
    id: "hair",
    name: "Hair",
    x: 50,
    y: 10,
    emoji: "💇",
    description: "Hair grows on top of your head and keeps it warm.",
    funFact: "Everyone's hair is different and special!"
  },
  {
    id: "eyes",
    name: "Left Eye",
    x: 42,
    y: 28,
    emoji: "👁️",
    description: "Your left eye helps you see the world around you!",
    funFact: "Your eyes blink about 20 times every minute!"
  },
  {
    id: "right-eye",
    name: "Right Eye",
    x: 58,
    y: 28,
    emoji: "�",
    description: "Your right eye helps you see the world around you!",
    funFact: "Both eyes work together to help you see depth and distance!"
  },
  {
    id: "nose",
    name: "Nose",
    x: 50,
    y: 29.5,
    emoji: "👃",
    description: "Your nose helps you smell yummy food and flowers. You breathe through it too!",
    funFact: "Your nose can remember 50,000 different smells!"
  },
  {
    id: "mouth",
    name: "Mouth",
    x: 50,
    y: 36,
    emoji: "👄",
    description: "You use your mouth to eat, drink, talk, and smile!",
    funFact: "Your mouth has a tongue and teeth inside!"
  },
  {
    id: "ears",
    name: "Left Ear",
    x: 29,
    y: 31,
    emoji: "👂",
    description: "Your left ear helps you hear sounds from the left side!",
    funFact: "Your ears also help you balance when you walk!"
  },
  {
    id: "right-ear",
    name: "Right Ear",
    x: 70,
    y: 31,
    emoji: "🦻",
    description: "Your right ear helps you hear sounds from the right side!",
    funFact: "Both ears work together to help you locate where sounds come from!"
  },
  {
    id: "neck",
    name: "Neck",
    x: 50,
    y: 42,
    emoji: "🦒",
    description: "Your neck connects your head to your body and helps you turn your head.",
    funFact: "Your neck has special bones called vertebrae!"
  },
  {
    id: "shoulders",
    name: "Left Shoulder",
    x: 40,
    y: 45,
    emoji: "💪",
    description: "Your left shoulder helps your left arm move in all directions!",
    funFact: "Your shoulders can move in many directions!"
  },
  {
    id: "right-shoulder",
    name: "Right Shoulder",
    x: 60,
    y: 45,
    emoji: "🦾",
    description: "Your right shoulder helps your right arm move in all directions!",
    funFact: "Both shoulders work together to help you lift and carry things!"
  },
  {
    id: "chest",
    name: "Chest",
    x: 50,
    y: 52,
    emoji: "💓",
    description: "Your chest is in the middle of your body. Your heart and lungs are inside!",
    funFact: "Your heart beats about 100 times every minute!"
  },
  {
    id: "arms",
    name: "Left Arm",
    x: 38,
    y: 53,
    emoji: "🦾",
    description: "Your left arm helps you reach, hug, and carry things!",
    funFact: "Your arms have strong muscles and bones!"
  },
  {
    id: "right-arm",
    name: "Right Arm",
    x: 62,
    y: 53,
    emoji: "💪",
    description: "Your right arm helps you reach, hug, and carry things!",
    funFact: "Both arms work together to help you do amazing things!"
  },
  {
    id: "elbows",
    name: "Left Elbow",
    x: 34,
    y: 60,
    emoji: "🤸",
    description: "Your left elbow is in the middle of your left arm and helps it bend!",
    funFact: "Try touching your elbow with your tongue - you can't!"
  },
  {
    id: "right-elbow",
    name: "Right Elbow",
    x: 65,
    y: 60,
    emoji: "�",
    description: "Your right elbow is in the middle of your right arm and helps it bend!",
    funFact: "Your elbows are like hinges that let your arms fold!"
  },
  {
    id: "hands",
    name: "Left Hand",
    x: 35,
    y: 68,
    emoji: "✋",
    description: "Your left hand helps you hold things, write, and wave hello! It has 5 fingers.",
    funFact: "Your fingerprints are unique - no one else has the same!"
  },
  {
    id: "right-hand",
    name: "Right Hand",
    x: 65,
    y: 68,
    emoji: "🖐️",
    description: "Your right hand helps you hold things, write, and wave hello! It has 5 fingers.",
    funFact: "Most people are right-handed, but some are left-handed!"
  },
  {
    id: "belly",
    name: "Belly",
    x: 50,
    y: 62,
    emoji: "🫃",
    description: "Your belly is where your tummy is. Food goes here after you eat!",
    funFact: "Your belly button is where you were connected to your mom before you were born!"
  },
  {
    id: "back",
    name: "Back",
    x: 85,
    y: 55,
    emoji: "↩️",
    description: "Your back is behind you. It has your spine that keeps you standing tall!",
    funFact: "Your spine is made of 33 small bones!"
  },
  {
    id: "legs",
    name: "Left Leg",
    x: 42,
    y: 84,
    emoji: "🦵",
    description: "Your left leg helps you walk, run, jump, and dance!",
    funFact: "Your leg bones are the strongest bones in your body!"
  },
  {
    id: "right-leg",
    name: "Right Leg",
    x: 58,
    y: 84,
    emoji: "🚶",
    description: "Your right leg helps you walk, run, jump, and dance!",
    funFact: "Both legs work together to keep you balanced and moving!"
  },
  {
    id: "thighs",
    name: "Left Thigh",
    x: 42,
    y: 70,
    emoji: "🍗",
    description: "Your left thigh is the upper part of your left leg with strong muscles!",
    funFact: "Your thigh has the longest bone in your body called the femur!"
  },
  {
    id: "right-thigh",
    name: "Right Thigh",
    x: 58,
    y: 70,
    emoji: "�",
    description: "Your right thigh is the upper part of your right leg with strong muscles!",
    funFact: "Both thighs work together to help you run, jump, and climb!"
  },
  {
    id: "knees",
    name: "Left Knee",
    x: 42,
    y: 77,
    emoji: "🦿",
    description: "Your left knee is in the middle of your left leg and helps it bend!",
    funFact: "Your knees are protected by a special bone called a kneecap!"
  },
  {
    id: "right-knee",
    name: "Right Knee",
    x: 58,
    y: 77,
    emoji: "🏃",
    description: "Your right knee is in the middle of your right leg and helps it bend!",
    funFact: "Both knees work like hinges to help you walk and run!"
  },
  {
    id: "feet",
    name: "Left Foot",
    x: 42,
    y: 90,
    emoji: "🦶",
    description: "Your left foot helps you stand and walk. It has 5 toes!",
    funFact: "You have 26 bones in each foot!"
  },
  {
    id: "right-foot",
    name: "Right Foot",
    x: 58,
    y: 90,
    emoji: "👟",
    description: "Your right foot helps you stand and walk. It has 5 toes!",
    funFact: "Both feet work together to help you balance and move!"
  },
  {
    id: "toes",
    name: "Toes",
    x: 50,
    y: 100,
    emoji: "👣",
    description: "Your toes are at the end of your feet. They help you balance!",
    funFact: "Your big toe is the strongest toe!"
  },
];
