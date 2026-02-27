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
      description: "Created by Admin",
    });
    fetchProjects();
  };

  const assignEmployee = async (projectId) => {
    const employeeId = prompt("Enter Employee ID");
    if (!employeeId) return;

    try {
      await API.put("/projects/assign", {
        projectId,
        employeeId,
      });

      alert("Employee Assigned Successfully ✅");
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const requestService = async () => {
    await API.post("/projects/request", {
      name: "Client Request",
      description: "Requested by client",
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
      <h1 className="text-3xl font-bold mb-6">
        {user.role.toUpperCase()} DASHBOARD
      </h1>

      <div className="mb-6 flex gap-3">
        {user.role === "admin" && (
          <button
            onClick={createProject}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
          >
            + Create Project
          </button>
        )}

        {user.role === "client" && (
          <button
            onClick={requestService}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow"
          >
            Request Service
          </button>
        )}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-gray-500">No projects found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{p.name}</h2>

              <p className="text-gray-500 mt-1">{p.description}</p>

              <p className="mt-2 text-sm">
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-yellow-600">{p.status}</span>
              </p>

              <div className="mt-3">
                <p className="font-semibold text-sm">Employees:</p>
                {p.employees?.length > 0 ? (
                  p.employees.map((emp) => (
                    <p key={emp._id} className="text-gray-600 text-sm">
                      • {emp.name}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    No employees assigned
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {user.role === "admin" && (
                  <>
                    <button
                      onClick={() => assignEmployee(p._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Assign Employee
                    </button>

                    {p.status === "Pending Approval" && (
                      <button
                        onClick={() => approveProject(p._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}
                  </>
                )}

                {user.role === "employee" && (
                  <select
                    className="border rounded px-2 py-1"
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
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}