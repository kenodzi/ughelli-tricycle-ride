
import React from 'react';
import { Card } from '@/components/ui/card';

type RideOptionProps = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  eta: number;
  selected: boolean;
  onSelect: (id: string) => void;
};

const RideOptionCard: React.FC<RideOptionProps> = ({
  id,
  name,
  imageUrl,
  description,
  price,
  eta,
  selected,
  onSelect,
}) => {
  return (
    <Card 
      className={`ride-option ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(id)}
    >
      <div className="flex items-center w-full">
        <div className="h-14 w-14 bg-gray-200 rounded-md mr-3 flex items-center justify-center">
          {/* In a real app, we would use actual tricycle images */}
          <span className="text-2xl">🛺</span>
        </div>
        
        <div className="flex-grow">
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">{description}</p>
          <p className="text-xs text-gray-400">Arrives in {eta} mins</p>
        </div>
        
        <div className="text-right">
          <p className="font-bold">₦{price.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
};

export default RideOptionCard;
