"use client";
import { useState } from 'react';
import pb from '../../lib/pocketbase';
export default function SignupForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection('users').create(formData);
      alert("Signup successful! Please check your email for verification.");
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} required className="input" />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required className="input" />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required className="input" />
      <button type="submit" className="btn-primary">Sign Up</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
