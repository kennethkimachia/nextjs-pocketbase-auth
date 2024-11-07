"use client";
import { useState } from 'react';
import pb from '../../lib/pocketbase';

export default function SignupForm() {
  const [formData, setFormData] = useState(
    { username: '', 
      email: '', 
      password: '', 
      passwordConfirm: '' 
    });
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

    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        username: formData.username
      })
    });

    if (!response.ok) {
      throw new Error("Failed to send verification email.");
    }
    alert("Signup successful! Please check your email for verification.");
    setError('');  // Clear any previous errors


  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4  block gap-1 justify-center text-center w-full p-1 ">
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} required className="input" />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required className="input" />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required className="input" />
      <input type="password" name="passwordConfirm" placeholder="Confirm Password" onChange={handleInputChange} required className="input" />
      <button type="submit" className="btn-primary">Sign Up</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
