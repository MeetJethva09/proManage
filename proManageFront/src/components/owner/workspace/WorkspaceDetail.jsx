import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function WorkspaceDetail() {
  const wid = useParams().wid;
  const [workspace, setWorkspace] = useState(null);

  const getWorkspaceDetail = async () => {
    try {
      const res = await axios.get(`/workspace/workspacebywid/${wid}`);
      setWorkspace(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWorkspaceDetail();
  }, []);

  if (!workspace) {
    return <div className="p-6">Loading workspace...</div>;
  }

  return (
    <div className="p-6 bg-slate-50 min-h-[calc(100vh-56px)]">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          {workspace.workspaceName}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {workspace.workspaceDesc}
        </p>
      </div>

      {/* Members */}
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Members</h3>

          <Link
            to={`/navo/add-user-work/${workspace._id}`}
            className="text-sm text-indigo-600 hover:underline"
          >
            + Add Members
          </Link>
        </div>

        {workspace.users?.length === 0 ? (
          <p className="text-sm text-slate-400">No members added yet</p>
        ) : (
          <ul className="space-y-3">
            {workspace.users.map((user) => (
              <li
                key={user._id}
                className="flex items-center justify-between border rounded-md px-3 py-2 text-sm"
              >
                <div>
                  <p className="font-medium text-slate-700">
                    {user.username}
                  </p>
                  <p className="text-xs text-slate-500">
                    {user.email}
                  </p>
                </div>

                <span className="text-xs px-2 py-1 rounded bg-slate-100">
                  {user.role}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <Link
          to="/navo/work-list"
          className="px-4 py-2 text-sm rounded-md border text-slate-600 hover:bg-slate-100"
        >
          Back
        </Link>

        <Link
          to={`/navo/create-project/${workspace._id}`}
          className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Create Project
        </Link>
      </div>
    </div>
  );
}
