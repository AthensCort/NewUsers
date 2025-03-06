import UserCard from "./components/user_card";

export default function Home() {
    return (
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <UserCard />
        </main>
    );
}
