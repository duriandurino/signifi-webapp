"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, PlusCircle } from "lucide-react";
import "./uploadcourse.css";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

const placeholderModules = [
  { title: "Module 1: Introduction" },
  { title: "Module 2: Basics" },
];

const UploadCoursePage = () => {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [level, setLevel] = useState("Beginner");
  const [category, setCategory] = useState("Category 1");

  // File states
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [introVideo, setIntroVideo] = useState<File | null>(null);
  const [materials, setMaterials] = useState<File[]>([]);

  // Loading + error
  const [publishing, setPublishing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileUpload(file: File, endpoint: string) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await apiFetch(endpoint, {
      method: "POST",
      body: formData,
    });

    return res; // backend should return { file_url }
  }

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

      // Upload files first (if present)
      let coverUrl = null;
      let videoUrl = null;
      let materialUrls: string[] = [];

      if (coverImage) {
        const uploadRes = await handleFileUpload(
          coverImage,
          "/api/courses/upload-cover"
        );
        coverUrl = uploadRes.file_url;
      }

      if (introVideo) {
        const uploadRes = await handleFileUpload(
          introVideo,
          "/api/courses/upload-intro"
        );
        videoUrl = uploadRes.file_url;
      }

      if (materials.length > 0) {
        const uploads = await Promise.all(
          materials.map((file) =>
            handleFileUpload(file, "/api/courses/upload-material")
          )
        );
        materialUrls = uploads.map((u) => u.file_url);
      }

      // Send course info
      const body = {
        educator_id: educatorId,
        title: title.trim(),
        description: description.trim() || null,
        price: price === "" ? 0 : Number(price),
        level,
        category,
        cover_image: coverUrl,
        intro_video: videoUrl,
        materials: materialUrls,
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
      {/* --- Main Header --- */}
      <header className="main-header">
        <div className="startheader">Upload Course</div>
        <div className="user-profile">
          <Image
            src="/profile.jpg"
            alt="User Avatar"
            width={32}
            height={32}
            className="user-avatar"
          />
          <span>Professor</span>
          <ChevronDown size={16} />
        </div>
      </header>

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
        <input
          className="input-field"
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea-field"
          placeholder="Course Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          className="input-field"
          type="number"
          placeholder="Price (₱)"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          min={0}
        />

        <select
          className="select-field"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <select
          className="select-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Category 1</option>
          <option>Category 2</option>
        </select>

        {/* File Uploads */}
        <label className="file-upload">
          Upload Cover Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
          />
        </label>

        <label className="file-upload">
          Upload Intro Video (optional)
          <input
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => setIntroVideo(e.target.files?.[0] || null)}
          />
        </label>

        <label className="file-upload">
          Upload Materials / PDFs
          <input
            type="file"
            accept=".pdf"
            multiple
            hidden
            onChange={(e) => setMaterials(Array.from(e.target.files || []))}
          />
        </label>

        {/* Modules */}
        <div>
          <h3>Modules</h3>
          {placeholderModules.map((mod, idx) => (
            <div
              key={idx}
              className="input-field"
              style={{ backgroundColor: "#F5F5F5", cursor: "default" }}
            >
              {mod.title}
            </div>
          ))}
          <button className="btn" style={{ marginTop: "0.5rem" }}>
            <PlusCircle size={16} /> Add Module
          </button>
        </div>

        {/* Action Buttons */}
        {error && (
          <div style={{ color: "#b00020", marginBottom: "8px" }}>{error}</div>
        )}
        <div className="btn-group">
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
