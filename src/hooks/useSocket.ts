'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUserAuthStore } from '@/store/authStore';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const token = useUserAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000', {
      auth: { token },
    });

    socketInstance.on('connect', () => {
      console.log('Mobile connected to websocket');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  return socket;
};
