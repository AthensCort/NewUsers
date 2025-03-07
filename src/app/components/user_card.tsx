"use client";
import React, { useEffect, useState } from "react";
import { fetchUser } from "../services/fetchUser";
import styles from "../styles/UserCard.module.css";
import { User, Mail, Calendar, MapPin, Phone, Lock } from "lucide-react";

interface UserData {
  name: { first: string; last: string };
  email: string;
  phone: string;
  location: { city: string; country: string };
  dob: { age: number };
  picture: { large: string };
  login: { password: string };
}

const UserCard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [history, setHistory] = useState<UserData[]>([]);
  const [info, setInfo] = useState<string>("Hola, Mi nombre es");

  const getUser = async () => {
    const newUser = await fetchUser();
    if (newUser) {
      setUser(newUser);
      setInfo("Hola, Mi nombre es");
      setHistory((prev) => [...prev, newUser]);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return <p>Cargando usuario...</p>;

  const handleMouseOver = (info: string) => setInfo(info);

  return (
    <div style={{ display: "flex" }}>
      {/* SIDEBAR */}
      <aside style={{ width: "250px", background: "#f0f0f0", padding: "1rem" , color: "black"}}>
        <h3>Usuarios anteriores:</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((u, i) => (
            <li
              key={i}
              style={{
                cursor: "pointer",
                padding: "0.5rem",
                borderBottom: "1px solid #ccc",
              }}
              onClick={() => {
                setUser(u);
                setInfo("Hola, Mi nombre es");
              }}
            >
              {u.name.first} {u.name.last}
            </li>
          ))}
        </ul>
      </aside>

      {/* USER CARD */}
      <div className={styles.card}>
        <div className={styles["avatar-container"]}>
          <img src={user.picture.large} alt="User" className={styles.avatar} />
          <div className={styles.nameContainer}>
            <h2>HOLA!</h2>
            <h2>
              Mi nombre es {user.name.first} {user.name.last}
            </h2>
          </div>
        </div>

        <p>{info}</p>

        <div className={styles.icons}>
          <User onMouseOver={() => handleMouseOver(`Nombre completo: ${user.name.first} ${user.name.last}`)} />
          <Mail onMouseOver={() => handleMouseOver(`Correo: ${user.email}`)} />
          <Calendar onMouseOver={() => handleMouseOver(`Tengo ${user.dob.age} años`)} />
          <MapPin onMouseOver={() => handleMouseOver(`Ubicación: ${user.location.city}, ${user.location.country}`)} />
          <Phone onMouseOver={() => handleMouseOver(`Contacto: ${user.phone}`)} />
          <Lock onMouseOver={() => handleMouseOver(`Password: ${user.login.password}`)} />
        </div>

        <button onClick={getUser} className={styles.refreshButton}>
          Obtener nuevo usuario
        </button>
      </div>
    </div>
  );
};

export default UserCard;
