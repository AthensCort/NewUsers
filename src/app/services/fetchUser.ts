export const fetchUser = async () => {
    const apiKey = "HKY1-5RUT-R272-WZDE";  // 🔹 API Key directamente en el código
    const url = `https://randomuser.me/api/?apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener el usuario");
        const data = await response.json();
        return data.results[0]; // 👈 asegúrate de que esto existe
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    
};
