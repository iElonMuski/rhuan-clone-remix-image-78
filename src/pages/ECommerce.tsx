
import React, { useState } from 'react';
import ItemList from '../components/ecommerce/ItemList';
import Cart from '../components/ecommerce/Cart';
import { Item } from '../types/ecommerce';

const ECommerce = () => {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  
  const addToCart = (item: Item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };
  
  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-[#151515] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <a href="/" className="text-2xl font-bold hover:text-purple-500 transition-colors">
            Loja de Itens
          </a>
          <div className="flex gap-4">
            <a href="/" className="hover:text-purple-500 transition-colors">Voltar ao Portfólio</a>
          </div>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items List - Takes 2/3 of screen on large devices */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8">Produtos Disponíveis</h2>
            <ItemList addToCart={addToCart} />
          </div>
          
          {/* Cart - Takes 1/3 of screen on large devices */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Carrinho</h2>
            <Cart 
              cartItems={cartItems} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity}
              total={calculateTotal()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECommerce;
