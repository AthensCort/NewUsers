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
}

const UserCard: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [info, setInfo] = useState<string>("Hola, Mi nombre es");

    useEffect(() => {
        const getUser = async () => {
            const newUser = await fetchUser();
            setUser(newUser);
        };
        getUser();
    }, []);

    if (!user) return <p>Cargando usuario...</p>;

    const handleMouseOver = (info: string) => {
        setInfo(info);
    };

    return (
        <div className={styles.card}>
            <div className={styles["avatar-container"]}>
                <img src={user.picture.large} alt="User" className={styles.avatar} />
                <div className={styles.nameContainer}>
                <h2>HOLA!</h2>
                <h2>Mi nombre es {user.name.first} {user.name.last}</h2>
        </div>
            </div>
            <p>{info}</p>
            <div className={styles.icons}>
                <User onMouseOver={() => handleMouseOver(`Hola, Mi nombre es`)} />
                <Mail onMouseOver={() => handleMouseOver(user.email)} />
                <Calendar onMouseOver={() => handleMouseOver(`Tengo ${user.dob.age} años`)} />
                <MapPin onMouseOver={() => handleMouseOver(`${user.location.city}, ${user.location.country}`)} />
                <Phone onMouseOver={() => handleMouseOver(user.phone)} />
                <Lock onMouseOver={() => handleMouseOver("Información Privada")} />
            </div>
        </div>
    );
};

export default UserCard;
