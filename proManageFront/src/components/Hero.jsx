import { Link } from "react-router-dom";


export default function Hero() {

   

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">

        {/* Top label */}
        <div className="mb-6">
          <span className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            ProManage • Team Workspace
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight">
              Build clarity <br />
              into your team’s work
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              Organize projects, assign tasks, and control access with a secure,
              backend-driven system designed for growing teams.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to = '/signup' className="rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition">
                Create Workspace
              </Link>

              <Link to = {'/work'}className="rounded-md border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
                See How It Works
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 max-w-md text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900">RBAC</p>
                Owner / Manager / Member
              </div>
              <div>
                <p className="font-semibold text-slate-900">Security</p>
                JWT & Refresh Tokens
              </div>
              <div>
                <p className="font-semibold text-slate-900">Performance</p>
                Caching & Rate Limits
              </div>
              <div>
                <p className="font-semibold text-slate-900">Scale</p>
                Optimized APIs
              </div>
            </div>
          </div>

          {/* Right – Product Preview Card */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">
                Workspace Overview
              </h3>
              <span className="text-xs text-green-600">Active</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between rounded-md bg-white p-3 border">
                <span>Backend APIs</span>
                <span className="text-slate-500">In Progress</span>
              </div>
              <div className="flex justify-between rounded-md bg-white p-3 border">
                <span>Auth & Roles</span>
                <span className="text-slate-500">Completed</span>
              </div>
              <div className="flex justify-between rounded-md bg-white p-3 border">
                <span>Task Management</span>
                <span className="text-slate-500">Pending</span>
              </div>
            </div>

            <button className="mt-6 w-full rounded-md bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 transition">
              View Dashboard
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
