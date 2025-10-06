"use client";

import { ImagePlus  } from 'lucide-react';
import { Plus } from 'lucide-react';

export default function CreatePage() {


  return (
   <form className="flex flex-col gap-6 p-6 bg-gray-100 rounded-md shadow-md w-full max-w-md mx-auto">
  <div className="flex flex-col gap-2">
    <label htmlFor="duration" className="font-semibold text-gray-700">
      Duração
    </label>
    <input
      type="text"
      name="duration"
      className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Ex: 8000"
    />
  </div>

  <div className=''>
    <p className='mb-2'>Componentes</p>


    <div className='flex flex-col gap-2'>
      <label htmlFor='image' className='flex items-center gap-2'>
        <div className='flex items-center gap-2'>
          <ImagePlus /> Imagem
        </div>
      </label>
      
      <input type="text" name='image' className='border rounded-md p-2' />
    </div>

    <Plus />
  </div>

</form>

  );
}
