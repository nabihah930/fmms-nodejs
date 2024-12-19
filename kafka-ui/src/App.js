import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [sensorData, setSensorData] = useState([]);

    const handleSendMessage = async () => {
        try {
            const response = await axios.post("http://localhost:3000/register", {
                username,
                email,
                timestamp: Date.now(),
            });
            console.log(response.data);
            alert("User registration event sent!");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message.");
        }
    };

    const fetchSensorData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/sensors");
            setSensorData(response.data);
        } catch (error) {
            console.error("Error fetching sensor data:", error);
        }
    };

    useEffect(() => {
        fetchSensorData();
    }, []);

    return (
        <div>
            <h1>Kafka Event Simulator</h1>
            <h2>Send User Registration Event</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send Event</button>

            <h2>Sensor Data</h2>
            <button onClick={fetchSensorData}>Refresh Data</button>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {sensorData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.type}</td>
                            <td>{data.value}</td>
                            <td>{new Date(data.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
