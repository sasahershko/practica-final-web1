'use client';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { verify } from '@/app/lib/user';
import { useRouter } from 'next/navigation';
import NavBar from '@/app/components/NavBar';
import ErrorPage from '@/app/components/ErrorPage';

export default function VerifyAccount() {
    const router = useRouter();
    const [code, setCode] = useState(new Array(6).fill(''));
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e, index) => {
        const newCode = [...code];
        newCode[index] = e;
        setCode(newCode);

        if (e && index < code.length - 1) {
            document.getElementById(`code-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);

            if (index > 0) {
                document.getElementById(`code-${index - 1}`).focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const codeValue = code.join('');

        if (!codeValue || codeValue.length !== 6) {
            setErrorMessage('Please enter the complete code (6 digits).');
            setShowError(true);
            return;
        }

        try {
            const result = await verify(codeValue);

            if (result.success) {
                router.push('/pages/profileSetUp');
            } else {
                setErrorMessage(result.message || 'An error occurred while verifying your account.');
                setShowError(true);
            }
        } catch (error) {
            setErrorMessage(error.message || 'An internal error occurred.');
            setShowError(true);
        }
    };

    const handleError = () => {
        setShowError(false);
        setCode(new Array(6).fill(''));
    };

    if (showError) {
        return (
            <>
                <NavBar />
                <ErrorPage handleError={handleError} />
            </>);
    }

    return (
        <div className="animate-fade-in-up">
            <NavBar />
            <h1 className="text-center text-[50px] mt-36 max-h-screen text-black mb-10 font-bold">Verify Account</h1>
            <p className="text-center text-black mb-4">Enter the code we sent you to your e-mail</p>

            <form onSubmit={handleSubmit} className="flex flex-col max-w-[300px] mx-auto items-center">
                <div className="flex gap-2 mb-4">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="text-black w-[80px] h-[100px] border border-blue-200 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    ))}
                </div>

                <Button type="submit" className="mt-5 rounded-md bg-blue-500 hover:bg-blue-300 transition duration-300 ease-in-out">
                    Send verification
                </Button>
            </form>
        </div>
    );
}
