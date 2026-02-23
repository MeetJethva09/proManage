import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Teams = () => {
    const [teams , setTeams] = useState([])

    const fetchTeams = async ()=>{
        const res = await axios.get("/team/teambymid/"+localStorage.getItem("id"));
        setTeams(res.data.data);
    }

useEffect(()=>{
    fetchTeams()
},[])

  return (
    <div>
        
    <div className="bg-white rounded-lg border p-6">
      <div className='flex justify-between mb-3'>
  <h2 className="text-lg font-semibold text-slate-900 mb-1">
    Teams
  </h2>
  <Link to={'/navm/manager-create-team'} className='bg-blue-500 text-white rounded p-1 h-8'>+ Create Team</Link>
  </div>

  {teams.length === 0 ? (
    <p className="text-sm text-slate-500">No teams created yet</p>
  ) : (
    <div className="space-y-4">
      {teams.map((team) => (
        <div
          key={team._id}
          className="rounded-md border p-4 flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-slate-800">
              {team.teamName}
            </h3>

            <span className="text-xs border px-2 py-0.5 rounded">
              {team.members.length} Members
            </span>
          </div>

          <p className="text-sm text-slate-600">
            Project:{" "}
            <span className="font-medium">
              {team.project?.projectName}
            </span>
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {team.members.map((member) => (
              <span
                key={member._id}
                className="text-xs bg-slate-100 px-2 py-1 rounded"
              >
                {member.username}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
</div>


    </div>
  )
}
