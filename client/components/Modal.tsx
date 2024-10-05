import React from "react";
import Image from "next/image";



interface ModalProps {
    show: boolean;
    winner?: "x" | "o" | null;
    onRetry: () => void;
    onQuit: () => void;
}

const Modal = ({ show, winner, onRetry, onQuit }: ModalProps) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-md bg-[#0000003e] bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#6E6E6E] p-8  w-full text-center">
                <h2 className="text-2xl font-medium mb-4 text-white">
                    {winner ? (
                        <>
                            {winner === "x" ? (
                                <p className="mt-2">OH NO, YOU LOST...</p>
                            ) : (
                                <p className="mt-2">YOU WON...</p>
                            )}
                        </>
                    ) : (
                        "NOBODY WINS"
                    )}
                </h2>
                <h1 className="text-6xl flex items-center justify-center font-black ">
                    {winner ? (
                        <>
                            {winner === "x" ? (
                                <Image className="inline-block w-28 mt-5" src={'/assets/icons/x.svg'} alt="X wins"  width={28} height={28}/>
                            ) : (
                                <Image className="inline-block w-28 mt-5" src={'/assets/icons/o.svg'} alt="O wins" width={28} height={28}/>
                            )
                            }
                            {winner === "x" ? (
                                <p className="text-[#4FC3F7]">WON THIS ROUND</p>
                            ) : (
                                <p className="text-[#FFC107] ">WON THIS ROUND</p>

                            )

                            }

                        </>
                    ) : (
                        <p className="text-white" >THIS GAME IS A TIE</p>
                    )}
                </h1>
                <div className="flex justify-center gap-4 ">
                    <button
                        onClick={onRetry}
                        className=" mt-10 p-3   rounded-full bg-[#C5C5C5] text-black font-semibold w-56"
                    >
                        Retry
                    </button>
                    <button
                        onClick={onQuit}
                        className="mt-10 p-3   rounded-full bg-[#4FC3F7] text-black font-semibold w-56"
                    >
                        Quit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
