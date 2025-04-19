
import React from 'react';
import { Item } from '../../types/ecommerce';
import { Minus, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  cartItems: Item[];
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  total: number;
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart, updateQuantity, total }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout', { state: { cartItems, total } });
    }
  };

  return (
    <div className="bg-[#1C1C1C] rounded-xl p-6">
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">Seu carrinho está vazio</p>
          <p className="text-sm text-gray-500">Adicione itens para continuar</p>
        </div>
      ) : (
        <>
          <div className="max-h-[400px] overflow-y-auto mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 border-b border-[#2A2A2A]">
                <div className="w-16 h-16 bg-[#2A2A2A] rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-purple-500">R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-1 rounded-full bg-[#2A2A2A] hover:bg-[#333333]"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    className="p-1 rounded-full bg-[#2A2A2A] hover:bg-[#333333]"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  className="p-1 rounded-full bg-[#2A2A2A] hover:bg-red-500 transition-colors"
                  onClick={() => removeFromCart(item.id)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-[#2A2A2A] pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal:</span>
              <span className="font-bold">R$ {total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-colors"
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
