import { useEffect, useState } from "react";
import { API } from "../services/api";
import MainLayout from "../layout/MainLayout";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects").then(res => setProjects(res.data));
  }, []);

  return (
    <MainLayout>
      <h1 className="text-xl mb-4">All Projects</h1>

      {projects.map(p => (
        <div key={p._id} className="bg-white p-3 mb-2 shadow">
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </MainLayout>
  );
}