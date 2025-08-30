"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, PlusCircle, Upload } from "lucide-react";
import './uploadcourse.css';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';

const placeholderModules = [
  { title: "Module 1: Introduction" },
  { title: "Module 2: Basics" },
];

const UploadCoursePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [publishing, setPublishing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitCourse(isPublished: boolean) {
    setError(null);
    try {
      if (!title.trim()) throw new Error('Title is required');
      if (price !== '' && Number(price) < 0) throw new Error('Price must be positive');
      const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('auth_user') || 'null') : null;
      const educatorId = user?.user_id;
      if (!educatorId) throw new Error('Missing educator id');

      const body = {
        educator_id: educatorId,
        title: title.trim(),
        description: description.trim() || null,
        price: price === '' ? 0 : Number(price),
        is_published: isPublished
      };

      await apiFetch('/api/courses', {
        method: 'POST',
        body: JSON.stringify(body)
      });
      router.replace('/educator/courses');
    } catch (err: any) {
      setError(err?.message || 'Failed to save course');
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
          <Image src="/profile.jpg" alt="User Avatar" width={32} height={32} className="user-avatar"/>
          <span>Professor</span>
          <ChevronDown size={16}/>
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
          onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
          min={0}
        />
        <select className="select-field">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <select className="select-field">
          <option>Category 1</option>
          <option>Category 2</option>
        </select>

        {/* Media Upload */}
        <div className="file-upload">Upload Cover Image</div>
        <div className="file-upload">Upload Intro Video (optional)</div>
        <div className="file-upload">Upload Materials / PDFs</div>

        {/* Modules */}
        <div>
          <h3>Modules</h3>
          {placeholderModules.map((mod, idx) => (
            <div key={idx} className="input-field" style={{ backgroundColor: '#F5F5F5', cursor: 'default' }}>
              {mod.title}
            </div>
          ))}
          <button className="btn" style={{ marginTop: '0.5rem' }}>
            <PlusCircle size={16} /> Add Module
          </button>
        </div>

        {/* Action Buttons */}
        {error && <div style={{ color: '#b00020', marginBottom: '8px' }}>{error}</div>}
        <div className="btn-group">
          <button
            className="btn btn-draft"
            onClick={() => {
              setSaving(true);
              submitCourse(false);
            }}
            disabled={saving || publishing}
          >
            {saving ? 'Saving...' : 'Save as Draft'}
          </button>
          <button
            className="btn btn-publish"
            onClick={() => {
              setPublishing(true);
              submitCourse(true);
            }}
            disabled={saving || publishing}
          >
            {publishing ? 'Publishing...' : 'Publish Course'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCoursePage;
