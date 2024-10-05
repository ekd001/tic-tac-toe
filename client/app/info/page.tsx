"use client"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useContext } from 'react';
import { UserContext } from '@/context/UserContext';

const Page = () => {
  const { socketRef } = useContext(UserContext);

  const searchParams = useSearchParams();
  const name = searchParams.get('name');



  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-7xl mt-32 w-full grid grid-cols-1 md:grid-cols-2 gap-14 p-8 items-start">

        {/* Section de bienvenue */}
        <div className="flex flex-col justify-center">
          <div>
            <h1 className="animate__animated  animate__rubberBand text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
              Online Tictactoe
            </h1>

            {/* Ajout du texte ONLINE TIC TAC TOE */}
            <h2 className="text-3xl font-semibold text-gray-700 mt-4">Wassup {name} !</h2>

            <p className="text-lg mt-4  max-w-xl">
              This project is design and developped using ReactJS, NextJS, Socket.IO, and Tailwind by Kaizen Devs
            </p>

            {/* Ajout du bouton Find Match */}
            {/* <Link href="/play"> */}
            <button className="mt-6 py-2 px-11 bg-[#4FC3F7] text-white text-lg font-medium rounded-full hover:bg-blue-700" onClick={() => { socketRef.current?.emit('findMatch', 'test') }}>
              Find Match
            </button>
            {/* </Link> */}
          </div>
        </div>

        {/* Section des statistiques */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-700">Total Match</h2>
            <p className="text-4xl font-bold text-blue-600">120</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-700">Win Rate</h2>
            <p className="text-4xl font-bold text-green-600">75%</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-700">Draw</h2>
            <p className="text-4xl font-bold text-yellow-600">10</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-700">Lose</h2>
            <p className="text-4xl font-bold text-red-600">30</p>
          </div>



        </div>

      </div>
    </div>
  );
}

export default Page;
