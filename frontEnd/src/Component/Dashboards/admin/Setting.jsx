import React from 'react';

const Settings = () => {
    return (
        <section id="settings" className="section-content">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Settings</h1>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">System Configuration</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="maxGroups" className="block text-sm font-medium text-gray-700 mb-1">Max Groups per Professor</label>
                        <input type="number" id="maxGroups" name="maxGroups" defaultValue="5" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="proposalDeadline" className="block text-sm font-medium text-gray-700 mb-1">Proposal Submission Deadline</label>
                        <input type="date" id="proposalDeadline" name="proposalDeadline" defaultValue="2025-12-31" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200" >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Settings;
