import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WorkspacesList() {
    const [workspace , setWorkspaces] = useState([]);

    const getWorkspaces = async () =>{
        const res = await axios.get("/workspace/allworkspaces")
        setWorkspaces(res.data.data);
    }

useEffect(()=>{
    getWorkspaces()
},[])

  return (
    <div className="p-6 bg-slate-50 min-h-[calc(100vh-56px)]">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Workspaces</h2>
          <p className="text-sm text-slate-500">
            All workspaces you have access to
          </p>
        </div>

        <Link to={'/navo/create-work'} className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
          + Create Workspace
        </Link>
      </div>

      {/* Workspace Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {workspace.map((workspace, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold mb-1">
              {workspace.workspaceName}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-500 mb-4">
             {workspace.workspaceDesc}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{workspace.members}</span>
              <span>3 Projects</span>
            </div>

            {/* Action */}
            <div className="mt-4 flex justify-end">
              <Link  to={`/navo/add-user-work/${workspace._id}`} className="text-sm text-indigo-600 hover:underline">
                Open Workspace →
              </Link>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}
