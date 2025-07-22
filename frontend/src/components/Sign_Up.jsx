import React, { useState } from 'react';

// It's a best practice to name components using PascalCase (e.g., SignUp)
export default function SignUp() {
    // State to hold all the form data in a single object
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: 'Student', // Default value for the role
    });

    // A single handler function to update the state for any form field
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler for the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            // In a real app, show a user-friendly error message instead of an alert
            alert("Passwords do not match!");
            return;
        }
        // In a real application, you would send this data to your backend API
        console.log('Form submitted:', formData);
        alert('Account created successfully! (See console for data)');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Join our platform to start your learning journey!
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Account Type Radio Buttons */}
                    <div className="flex justify-center space-x-4">
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="accountType" value="Student" checked={formData.accountType === 'Student'} onChange={handleInputChange} className="form-radio text-indigo-600" />
                            <span className="text-gray-700">Student</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="accountType" value="Instructor" checked={formData.accountType === 'Instructor'} onChange={handleInputChange} className="form-radio text-indigo-600" />
                            <span className="text-gray-700">Instructor</span>
                        </label>
                    </div>

                    {/* Name Fields */}
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="firstName" className="sr-only">First Name</label>
                            <input id="firstName" name="firstName" type="text" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="lastName" className="sr-only">Last Name</label>
                            <input id="lastName" name="lastName" type="text" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email address" value={formData.email} onChange={handleInputChange} />
                    </div>

                    {/* Password Fields */}
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
