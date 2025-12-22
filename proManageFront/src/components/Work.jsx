import React from 'react'

export const Work = () => {
  return (
    <div>
        <section id="features" className="py-24 bg-slate-50 h-screen">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-slate-900 mb-12">How ProManage Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-2">Role-Based Access</h3>
        <p className="text-slate-600 text-sm">
          Assign Owner, Manager, or Member roles with controlled access.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-2">Secure Authentication</h3>
        <p className="text-slate-600 text-sm">
          JWT and refresh tokens keep your workspace secure.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-2">Task & Project Tracking</h3>
        <p className="text-slate-600 text-sm">
          Track all tasks and projects in one dashboard.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-2">Optimized Backend</h3>
        <p className="text-slate-600 text-sm">
          APIs with caching, rate limits, and performance optimization.
        </p>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
