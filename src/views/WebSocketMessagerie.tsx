import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

import io, { type Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "../models/Socket";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3000", {
    transports: ["websocket"],
});

export const WebSocketMessagerie = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
            connectToSomeone();
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("roomJoined", (data) => {
            console.log(data);
            setRoomId(data.roomId);
        });

        socket.on("messageReceived", (data) => {
            console.log(data);
            setMessage(data.message);
        });
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });
        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("messageReceived");
        };
    }, []);

    const connectToSomeone = () => {
        const params = (new URL(document.location)).searchParams;
        const name = params.get('name');
        const receiver = params.get('receiver');
        if(!name || !receiver) return;
        
        socket.emit("connectToSomeone", {
            receiverId: name,
            senderId: receiver,
        });
    };

    const sendMessage = () => {
        socket.emit("messageSended", {
            roomId: roomId,
            message: "Hey mon boeuf"
        });
    };

    return (
        <div>
            <Typography variant="h1">Messagerie</Typography>
            <p>Connected: {isConnected ? "Yes": "No"}</p>
            <p>Last message received: {message || "-"}</p>
            <button onClick={sendMessage}>Send message</button>
        </div>
    );
};