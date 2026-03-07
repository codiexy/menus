"use client";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function AdminLogin() {
  const { user } = useAuth();

  redirect(`/admin/${user ? "dashboard" : ""}`);
  
}
