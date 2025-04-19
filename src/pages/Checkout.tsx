
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Item } from '../types/ecommerce';
import { motion } from 'framer-motion';

interface CheckoutLocationState {
  cartItems: Item[];
  total: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderCode, setOrderCode] = useState('');
  const { cartItems = [], total = 0 } = (location.state as CheckoutLocationState) || {};

  useEffect(() => {
    // If no cart items, redirect back to store
    if (!cartItems.length) {
      navigate('/ecommerce');
      return;
    }

    // Generate random order code
    const generateOrderCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    setOrderCode(generateOrderCode());
  }, [cartItems, navigate]);

  const handleBackToStore = () => {
    navigate('/ecommerce');
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-[#1C1C1C] rounded-xl p-8 text-center"
        >
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Compra Finalizada!</h1>
            <p className="text-gray-400">Seu pedido foi registrado com sucesso.</p>
          </div>

          <div className="bg-[#2A2A2A] p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Código do Pedido</h2>
            <div className="bg-[#1C1C1C] py-4 px-6 rounded-lg font-mono text-2xl tracking-wider">
              {orderCode}
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Guarde este código para acompanhar o status do seu pedido.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Resumo da Compra</h2>
            <div className="bg-[#2A2A2A] rounded-lg divide-y divide-[#1C1C1C]">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-3 px-4">
                  <div className="flex items-center">
                    <span>{item.title}</span>
                    <span className="text-gray-400 ml-2">x{item.quantity}</span>
                  </div>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between py-3 px-4 font-bold">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleBackToStore}
            className="bg-purple-500 hover:bg-purple-600 transition-colors px-6 py-3 rounded-lg"
          >
            Voltar à Loja
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
