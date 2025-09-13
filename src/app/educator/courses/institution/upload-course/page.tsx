"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import "./uploadcourse.css";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Module {
  id: number;
  title: string;
  description?: string;
}

const UploadCoursePage = () => {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [level, setLevel] = useState("Beginner");

  // Module states
  const [modules, setModules] = useState<Module[]>([]);

  // Loading + error
  const [publishing, setPublishing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await apiFetch("/api/modules");
        setModules(res || []);
      } catch (err) {
        console.error("Failed to fetch modules", err);
      }
    };
    fetchModules();
  }, []);

  async function submitCourse(isPublished: boolean) {
    setError(null);
    try {
      if (!title.trim()) throw new Error("Title is required");
      if (price !== "" && Number(price) < 0)
        throw new Error("Price must be positive");

      const user =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("auth_user") || "null")
          : null;
      const educatorId = user?.user_id;
      if (!educatorId) throw new Error("Missing educator id");

      const body = {
        educator_id: educatorId,
        title: title.trim(),
        description: description.trim() || null,
        price: price === "" ? 0 : Number(price),
        level,
        modules: modules.map((m) => m.id),
        is_published: isPublished,
      };

      await apiFetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(body),
      });

      router.replace("/educator/courses");
    } catch (err: any) {
      setError(err?.message || "Failed to save course");
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  }

  return (
    <div>
      {/* --- Page Header --- */}
      <section className="page-header">
        <div>
          <h2>Create a New Course</h2>
          <p>Fill in the details to create your FSL course</p>
        </div>
      </section>

      {/* --- Course Card --- */}
      <div className="card">
        {/* Course Info */}
        <div className="form-group">
          <label className="input-label">Course Title</label>
          <input
            className="input-field"
            type="text"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="input-label">Course Description</label>
          <textarea
            className="textarea-field"
            placeholder="Enter course description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>


        <div className="form-row">
          <div className="form-group">
            <label className="input-label">Price (₱)</label>
            <input
              className="input-field"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              min={0}
            />
          </div>

          <div className="form-group">
            <label className="input-label">Level</label>
            <select
              className="select-field"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        {/* --- Modules Section --- */}
        <div className="modules-section">
          <h3>Modules</h3>
          <div className="modules-list">
            {modules.length > 0 ? (
              modules.map((mod) => (
                <div key={mod.id} className="module-item">
                  Module: {mod.title}
                </div>
              ))
            ) : (
              <p className="empty-modules">No modules added yet</p>
            )}
          </div>
          <div className="add-module-box">
            <button
              className="add-module-btn"
              onClick={() => router.push("/educator/courses/institution/upload-module")}
            >
              <PlusCircle size={18} /> Add Module
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        {error && (
          <div style={{ color: "#b00020", marginBottom: "8px" }}>{error}</div>
        )}
        <div className="btn-group right">
          <button
            className="btn btn-draft"
            onClick={() => {
              setSaving(true);
              submitCourse(false);
            }}
            disabled={saving || publishing}
          >
            {saving ? "Saving..." : "Save as Draft"}
          </button>
          <button
            className="btn btn-publish"
            onClick={() => {
              setPublishing(true);
              submitCourse(true);
            }}
            disabled={saving || publishing}
          >
            {publishing ? "Publishing..." : "Publish Course"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCoursePage;
