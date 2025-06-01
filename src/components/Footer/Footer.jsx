import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white border-y">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src="https://brand.foodhub.com/images/png/logo_vertical_new.png"
                                className="mr-3 h-16"
                                alt="Logo"
                            />
                        </Link>
                    </div>
                   
                </div>
            </div>
        </footer>
    );
}