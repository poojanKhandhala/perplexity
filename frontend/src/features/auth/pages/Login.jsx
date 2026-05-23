import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [touched, setTouched] = useState({});
    const { handleLogin } = useAuth()

    const validate = () => {
        const errors = {}
        if (!email) errors.email = 'Email is required'
        if (!password) errors.password = 'Password is required'
        return errors
    }

    const errors = validate()

   const handleSubmit = async (e) => {
    e.preventDefault()

    setTouched({ email: true, password: true })

    
    if (Object.keys(errors).length > 0) return

    try {

        await handleLogin({
            email,
            password
        })

        navigate('/')

    } catch (error) {

        console.log(error)

    }
}

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 p-8">
                <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 text-center">Welcome back</h1>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 text-center">Log in to continue</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-200">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                            className={`mt-1 block w-full rounded-lg border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 p-3 ${touched.email && errors.email ? 'ring-1 ring-red-400' : ''
                                }`}
                            placeholder="you@example.com"
                        />
                        {touched.email && errors.email && (
                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-200">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                            className={`mt-1 block w-full rounded-lg border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 p-3 ${touched.password && errors.password ? 'ring-1 ring-red-400' : ''
                                }`}
                            placeholder="Your password"
                        />
                        {touched.password && errors.password && (
                            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 py-3 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                    >
                        Log in
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-neutral-900 dark:text-neutral-100 font-medium underline-offset-2 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
