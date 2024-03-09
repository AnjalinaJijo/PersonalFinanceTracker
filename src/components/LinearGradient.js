
   // Function to create a linear gradient with multiple colors
   export function createLinearGradient(colors) {
    const ctx = document.createElement('canvas').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    
    // Calculate the stop value for each color
    const stopInterval = 1 / (colors.length - 1);
    colors.forEach((color, index) => {
      gradient.addColorStop(index * stopInterval, color);
    });
  
    return gradient;
  }
  