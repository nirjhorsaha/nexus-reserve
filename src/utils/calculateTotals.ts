interface Item {
    price: number;
    cartQuantity: number;
  }
  
  export const calculateTotals = (cartItems: Item[]) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
    const shipping = cartItems.length > 0 ? 40 : 0; // Static shipping cost
    const taxes = shipping * 0.3; // 30% tax
    return {
      subtotal,
      shipping,
      taxes,
      total: subtotal + shipping + taxes,
    };
  };
  