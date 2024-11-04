"use client";
import { useState } from 'react';
import pb from '../../lib/pocketbase';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection('users').authWithPassword(formData.email, formData.password);
      alert("Login successful!");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required className="input" />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required className="input" />
      <button type="submit" className="btn-primary">Log In</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
