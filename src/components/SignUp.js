import { useState } from 'react';
import { useMutation } from 'react-query';
import { signUp } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [email, setEmail] = useState('');
    const [memberId, setMemberId] = useState('');

    const { mutate } = useMutation(() =>
        signUp('credentials', {
            username,
            password,
            email,
            member_id: memberId // Modify as needed based on your backend data structure
        })
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== verifyPassword) {
            alert('Passwords do not match');
            return;
        }
        mutate();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                placeholder="Verify Password"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="Member ID"
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default function SignUpWrapper() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SignUp />
        </QueryClientProvider>
    );
}
