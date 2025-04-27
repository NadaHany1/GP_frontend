// // Use ES module import syntax
// import axios from 'axios';

// // The URL of the API
// const API_URL = 'https://api.escuelajs.co/api/v1/products';

// // Create a function to get product data
// export const getProducts = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;  // Return the list of products from the API
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;  // Rethrow the error to be handled by the caller
//   }
// };



import axios from 'axios';

// The URL of the API
const API_URL = 'https://api.escuelajs.co/api/v1/products';

// Function to fetch products and modify their values
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    // Modify the product data here
    const modifiedProducts = response.data.map(product => {
      // Example: Adding a discounted price to each product
      product.active = true; // 10% discount
      // You can modify other fields here if needed
      return product;
    });
    return modifiedProducts;  // Return modified product data
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;  // Rethrow the error to be handled by the caller
  }
};
