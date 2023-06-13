export default function handler(req, res) {
    const token = jwt.sign({ username }, 'mysecret', { expiresIn: '1h' });

    try {
        if (req.method === 'POST') {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            });

            const { error, value } = schema.validate(req.body);

            console.log('Request body:', req.body); // Add this line
            console.log('Validation results:', error, value); // Add this line

            if (error) {
                res.status(400).json({ error: 'Invalid request body' });
                return;
            }

            const { username, password } = value;

            // Replace these with your own values
            const validUsername = 'member';
            const validPassword = 'password';

            if (username === validUsername && password === validPassword) {
                console.log('JWT secret:', process.env.JWT_SECRET); // Add this line
                const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.status(200).json({ token });
                return;
            }

            res.status(401).json({ error: 'Invalid username or password' });
        } else {
            res.status(405).json({ error: 'Invalid HTTP method' });
        }
    } catch (error) {
        console.error('Error in login handler:', error); // This line should already be in your code
        console.error('Error details:', error.message); // Add this line
        res.status(500).json({ error: 'Internal server error' });
        console.log('JWT_SECRET:', process.env.JWT_SECRET);


    }
}
