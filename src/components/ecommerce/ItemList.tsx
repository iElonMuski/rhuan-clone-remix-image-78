
import React from 'react';
import { Item } from '../../types/ecommerce';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const items: Omit<Item, 'quantity'>[] = [
  {
    id: 1,
    title: "Smartphone Premium",
    description: "Smartphone de última geração com câmera de alta resolução e bateria de longa duração.",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Notebook Ultrafino",
    description: "Notebook leve e potente para trabalho e entretenimento.",
    price: 3599.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Fones de Ouvido Sem Fio",
    description: "Fones com cancelamento de ruído e qualidade de áudio excepcional.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Relógio Inteligente",
    description: "Monitore sua saúde e receba notificações diretamente no seu pulso.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Caixa de Som Portátil",
    description: "Som potente e resistente à água para suas aventuras.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Câmera Digital Profissional",
    description: "Captura momentos especiais com altíssima qualidade.",
    price: 2799.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop"
  }
];

interface ItemListProps {
  addToCart: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ addToCart }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1C1C1C] rounded-xl overflow-hidden"
        >
          <div className="h-48 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <span className="text-purple-500 font-bold">
                R$ {item.price.toFixed(2)}
              </span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">{item.description}</p>
            <button
              onClick={() => addToCart({ ...item, quantity: 1 })}
              className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Adicionar ao Carrinho
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ItemList;
