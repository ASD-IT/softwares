"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

// Components
import { StyledSubmitButton } from "@/app/ui/buttons";
import { StyledInput } from "@/app/ui/inputs";

const initialState = {
  username: "",
  password: "",
};

const LoginCredentials = () => {
  const [userDetails, setUserDetails] = useState(initialState);
  const { username, password } = userDetails;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError("Username or Password is incorrect");
        return;
      }
    } catch (err) {
      setError("Error signing in, please try again later!");
      setUserDetails(initialState);
      console.log("err", err);
    } finally {
      setLoading(false);
      setUserDetails(initialState);
    }
  };

  const enableSave = username.length > 0 && password.length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white rounded-md text-black py-8 px-4 w-full md:w-1/2 lg:w-1/4"
    >
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Email / Username */}
      <StyledInput
        label="Email / Username"
        type="text"
        name="username"
        value={username}
        handleChange={handleChange}
        border="border-green-400"
        required={true}
      />

      {/* Password */}
      <StyledInput
        label="Password"
        type="password"
        name="password"
        value={password}
        handleChange={handleChange}
        border="border-green-400"
        required={true}
      />

      {/* Button */}
      <StyledSubmitButton
        label="Login"
        onClick={handleSubmit}
        enableSave={enableSave}
        loading={loading}
      />
    </form>
  );
};

export default LoginCredentials;
