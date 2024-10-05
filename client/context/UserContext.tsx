"use client"
import { createContext, MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client'
interface UserContextType {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    socketRef: MutableRefObject<Socket | null>
}

export const UserContext = createContext<UserContextType>({
    name: '',
    setName: () => { },
    socketRef: { current: null } as MutableRefObject<Socket | null>
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [name, setName] = useState('');

    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!socketRef.current) {
            const socket = io('http://localhost:3333/')
            socketRef.current = socket;
            socket.on('connect', () => {
                console.log('Connected to server');
            });

            return () => {
                socketRef.current = null;
                socket.disconnect();
            }
        }

    }, [])
    return (
        <UserContext.Provider value={{ name, setName, socketRef }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
