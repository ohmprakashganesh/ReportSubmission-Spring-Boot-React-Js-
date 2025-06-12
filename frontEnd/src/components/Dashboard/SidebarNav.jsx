import React from 'react'

const SidebarNav = () => {
  return (
  <aside className="w-64 bg-[#1A4B6B] text-[#C6D8E8] flex-shrink-0 py-6 px-4 hidden md:block overflow-y-auto sidebar">
                <nav>
                    <ul>
                        <li className="mb-2">
                            <a href="#" className="flex items-center p-3 rounded-lg bg-[#256D9C] text-white font-semibold">
                                <i className="fas fa-gauge-high mr-3"></i> Dashboard
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-[#2B7FB0] hover:text-white transition-colors">
                                <i className="fas fa-globe mr-3"></i> My Websites
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-[#2B7FB0] hover:text-white transition-colors">
                                <i className="fas fa-chart-bar mr-3"></i> Scan History
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-[#2B7FB0] hover:text-white transition-colors">
                                <i className="fas fa-puzzle-piece mr-3"></i> Integrations
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-[#2B7FB0] hover:text-white transition-colors">
                                <i className="fas fa-gear mr-3"></i> Settings
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-[#2B7FB0] hover:text-white transition-colors">
                                <i className="fas fa-circle-question mr-3"></i> Help & Support
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
  )
}

export default SidebarNav
