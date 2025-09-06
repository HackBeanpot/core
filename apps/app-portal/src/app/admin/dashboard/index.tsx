import { signOut } from "next-auth/react"
import Link from "next/link"
import React from 'react';

export default function DashboardPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <section className="text-center">
                <h1 className="text-5xl mb-4">Welcome to the Dashboard</h1>
                <h2 className="text-2xl">You have reached a secure area!</h2>
                <div className="mt-8">
                    <Link
                        className="inline-block py-2.5 px-5 bg-cyan-600 text-white rounded-sm"
                        href="/admin/invite"
                    >Invite Users</Link>
                </div>
                <div className="mt-8">
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="text-cyan-600 rounded-md"
                    >Sign Out</button>
                </div>
            </section>
        </main>
    )
}