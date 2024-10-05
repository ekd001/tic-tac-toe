"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importer useRouter pour redirection

const Page = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (name.trim()) {
      // Rediriger vers la page suivante avec le nom dans l'URL
      router.push(`/info?name=${encodeURIComponent(name)}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-36 bg-gray-100">
      <label htmlFor="name" className="sr-only">Label</label>
      <p className="mb-4 text-lg font-extrabold text-gray-700">Veuillez entrer votre nom :</p>
      <div className="flex w-full max-w-lg rounded-lg shadow-sm">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Entrez votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="py-4 px-6 block w-full border-gray-200 shadow-sm rounded-s-lg text-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="py-4 px-6 inline-flex justify-center items-center gap-x-2 text-lg font-semibold rounded-e-md border border-transparent bg-[#4FC3F7] text-white hover:bg-[#FFC107] focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Page;
