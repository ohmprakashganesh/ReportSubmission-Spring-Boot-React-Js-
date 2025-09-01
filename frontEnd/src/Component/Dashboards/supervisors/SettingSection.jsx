export const SettingsSection = () => {
    return (
        <section id="settings-section" className="content-section">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h3>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-700">This section would contain various settings for the professor's account and preferences.</p>
                <div className="mt-4 space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notificationSettings">Notification Preferences</label>
                        <select id="notificationSettings" className="shadow-sm border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Email Notifications</option>
                            <option>In-App Notifications</option>
                            <option>Both</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileUpdate">Update Profile</label>
                        <button id="profileUpdate" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">Edit Profile</button>
                    </div>
                </div>
            </div>
        </section>
    );
};