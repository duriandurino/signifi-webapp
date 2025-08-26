"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown, PlusCircle, Upload } from "lucide-react";
import './uploadcourse.css';

const placeholderModules = [
  { title: "Module 1: Introduction" },
  { title: "Module 2: Basics" },
];

const UploadCoursePage = () => {
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
        <input className="input-field" type="text" placeholder="Course Title" />
        <textarea className="textarea-field" placeholder="Course Description" rows={4}></textarea>
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
        <div className="btn-group">
          <button className="btn btn-draft">Save as Draft</button>
          <button className="btn btn-publish">Publish Course</button>
        </div>
      </div>
    </div>
  );
};

export default UploadCoursePage;
