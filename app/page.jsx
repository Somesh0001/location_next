"use client";  
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Adjust to your server URL

export default function MapPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Live User Locations</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name}: {user.coords.latitude}, {user.coords.longitude}
          </li>
        ))}
      </ul>
    </div>
  );
}
