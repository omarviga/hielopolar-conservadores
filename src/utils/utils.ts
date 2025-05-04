
// Utility functions for client and asset management

// Generate random coordinates for map placement
export const generateRandomCoordinates = (): [number, number] => {
  // Random coordinates around Chile (approximately)
  const lon = Math.random() * ((-70) - (-74)) + (-74); // Between -74 and -70
  const lat = Math.random() * ((-30) - (-40)) + (-40); // Between -40 and -30
  return [lon, lat];
};

// A randomly selected user image for clients who don't have one
export const randomUserImage = "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70);
