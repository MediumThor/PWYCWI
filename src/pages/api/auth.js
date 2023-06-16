// /api/auth.js
import { users } from "../../context/users";

export default function handler(req, res) {
    const { username, password } = req.body;

    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (user) {
        // If the username and password matches a user in our 'database', return status 200
        res.status(200).json({ status: "Logged in" });
    } else {
        // If the username and password does not match any users in our 'database', return status 403
        res.status(403).json({ status: "Invalid username or password" });
    }
}
