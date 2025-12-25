export default function CreateProject() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl border shadow-sm p-6">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Create Project</h2>
          <p className="text-sm text-slate-500 mt-1">
            Create a new project under this workspace
          </p>
        </div>

        <form className="space-y-4">

          {/* Project Name */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Project Name
            </label>
            <input
              type="text"
              placeholder="e.g. API Optimization"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Describe project goal"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Deadline
            </label>
            <input
              type="date"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 text-sm rounded-md border text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Create Project
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
