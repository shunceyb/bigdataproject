import Image from 'next/image';

type Product = {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  imageUrl: string;
};

const CardProduct = ({ product }: { product: Product }) => {
  return (
    <div className="bg-gray-900 border border-green-500 rounded-lg p-4 shadow-lg hover:shadow-green-500 transition duration-300">
      <Image 
        src={product.imageUrl} 
        alt={product.name} 
        width={300} 
        height={200} 
        className="rounded-md mx-auto"
      />
      <h2 className="text-xl font-bold mt-2 text-green-400">{product.name}</h2>
      <p className="text-gray-400">{product.category}</p>
      <p className="text-white font-semibold">Quantity: {product.quantity}</p>
    </div>
  );
};

export default CardProduct;

