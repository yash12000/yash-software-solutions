import { useEffect, useState } from "react";
import { API } from "../services/api";
import MainLayout from "../layout/MainLayout";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    await API.post("/projects", {
      name: "New Project",
      description: "Created by Admin"
    });
    fetchProjects();
  };

  const assignEmployee = async (projectId) => {
  const employeeId = prompt("Enter Employee ID");

  if (!employeeId) return;

  try {
    await API.put("/projects/assign", {
      projectId,
      employeeId
    });

    alert("Employee Assigned Successfully");

    fetchProjects();
  } catch (err) {
    console.log(err);
  }
};

  const requestService = async () => {
    await API.post("/projects/request", {
      name: "Client Request",
      description: "Requested by client"
    });

    fetchProjects();
  };

  const approveProject = async (id) => {
    await API.put(`/projects/${id}`, { status: "Approved" });
    fetchProjects();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/projects/${id}`, { status });
    fetchProjects();
  };

  const filteredProjects = projects.filter((p) => {
    if (user.role === "admin") return true;

    if (user.role === "employee") {
      return p.employees?.some((e) => e._id === user._id);
    }

    if (user.role === "client") {
      return p.client?._id === user._id;
    }

    return false;
  });

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">
        {user.role.toUpperCase()} DASHBOARD
      </h1>

      {user.role === "admin" && (
        <button
          onClick={createProject}
          className="bg-blue-600 text-white px-4 py-2 mb-4"
        >
          Create Project
        </button>
      )}

      {user.role === "client" && (
        <button
          onClick={requestService}
          className="bg-purple-600 text-white px-4 py-2 mb-4"
        >
          Request Service
        </button>
      )}

      {filteredProjects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        filteredProjects.map((p) => (
          <div key={p._id} className="bg-white p-4 mb-3 shadow rounded">
            <h2 className="font-bold">{p.name}</h2>
            <p>{p.description}</p>
            <p>Status: {p.status}</p>

            {user.role === "admin" && (
              <>
                <button
                  onClick={() => assignEmployee(p._id)}
                  className="bg-green-500 text-white px-2 py-1 mt-2 mr-2"
                >
                  Assign Employee
                </button>

                {p.status === "Pending Approval" && (
                  <button
                    onClick={() => approveProject(p._id)}
                    className="bg-blue-500 text-white px-2 py-1 mt-2"
                  >
                    Approve
                  </button>
                )}
              </>
            )}

            {user.role === "employee" && (
              <select
                className="border mt-2"
                onChange={(e) =>
                  updateStatus(p._id, e.target.value)
                }
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            )}
          </div>
        ))
      )}
    </MainLayout>
  );
}