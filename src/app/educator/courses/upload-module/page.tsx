"use client";

import React, { useState } from "react";
import "./uploadmodule.css";
import { PlusCircle, Trash2, Upload, Book } from "lucide-react";
import router from "next/router";

interface Lesson {
  title: string;
  description: string;
  file: File | null;
  quiz: string | null;
  practiceDrill: File | null;
}

interface Module {
  title: string;
  description: string;
  lessons: Lesson[];
}

const UploadModulePage = () => {
  const [module, setModule] = useState<Module>({
    title: "",
    description: "",
    lessons: [],
  });

  const handleModuleChange = (field: keyof Module, value: any) => {
    setModule((prev) => ({ ...prev, [field]: value }));
  };

  const addLesson = () => {
    setModule((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        { title: "", description: "", file: null, quiz: null, practiceDrill: null },
      ],
    }));
  };

  const handleLessonChange = (index: number, field: keyof Lesson, value: any) => {
    const updated = [...module.lessons];
    updated[index] = { ...updated[index], [field]: value };
    setModule((prev) => ({ ...prev, lessons: updated }));
  };

  const removeLesson = (index: number) => {
    const updated = module.lessons.filter((_, i) => i !== index);
    setModule((prev) => ({ ...prev, lessons: updated }));
  };

  const saveModule = (isPublished: boolean) => {
    console.log("Saving module:", { ...module, isPublished });
    alert(isPublished ? "Module published successfully!" : "Module saved as draft!");
  };

  return (
    <div>
      <section className="page-header">
        <div>
          <h2>Create a New Module</h2>
          <p>Add lessons, quizzes, and practice drills for your learners</p>
        </div>
      </section>

      <div className="card">
        {/* Module Info */}
        <div className="form-group">
          <label className="input-label">Module Title</label>
          <input
            className="input-field"
            type="text"
            placeholder="Enter module title"
            value={module.title}
            onChange={(e) => handleModuleChange("title", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="input-label">Module Description</label>
          <textarea
            className="textarea-field"
            placeholder="Enter module description"
            rows={3}
            value={module.description}
            onChange={(e) => handleModuleChange("description", e.target.value)}
          ></textarea>
        </div>

        {/* Lessons Section */}
        <div className="lessons-section">
          <h3> Module Lessons</h3>
          {module.lessons.map((lesson, index) => (
            <div key={index} className="lesson-card">
              <div className="lesson-header">
                <div className="lesson-title-with-icon">
                  <Book size={18} className="lesson-book-icon" />
                  <h4>Lesson {index + 1}</h4>
                </div>
                <button
                  className="btn btn-danger btn-trash"
                  onClick={() => removeLesson(index)}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>

              <div className="form-group">
                <label className="input-label">Lesson Title</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter lesson title"
                  value={lesson.title}
                  onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="input-label">Lesson Mini Description</label>
                <textarea
                  className="textarea-field"
                  placeholder="Enter mini description"
                  rows={2}
                  value={lesson.description}
                  onChange={(e) =>
                    handleLessonChange(index, "description", e.target.value)
                  }
                ></textarea>
              </div>

              {/* Upload Lesson */}
              <div className="form-group">
                <label className="input-label">Upload Lesson (PDF/Video)</label>
                <div className="upload-box">
                  <Upload size={32} />
                  <p>Choose/Upload Lesson Files here</p>
                  <input
                    type="file"
                    accept=".pdf,video/*"
                    onChange={(e) =>
                      handleLessonChange(
                        index,
                        "file",
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                </div>
              </div>

              {/* Quiz & Practice Drill side by side */}
              <div className="side-by-side">
                {/* Attach Quiz */}
                <div className="flex-item">
                  <label className="input-label">Attach Quiz</label>
                  <div className="upload-box">
                    <PlusCircle size={28} />
                    <p>Choose/Upload Quiz Files here</p>
                    <input
                      type="file"
                      accept=".pdf,video/*"
                      onChange={(e) =>
                        handleLessonChange(
                          index,
                          "quiz",
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </div>
                </div>

                {/* Attach Practice Drill */}
                <div className="flex-item">
                  <label className="input-label">Attach Practice Drill</label>
                  <div className="upload-box">
                    <PlusCircle size={28} />
                    <p>Choose/Upload Lesson Files here</p>
                    <input
                      type="file"
                      accept=".pdf,video/*"
                      onChange={(e) =>
                        handleLessonChange(
                          index,
                          "practiceDrill",
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button className="btn add-btn" onClick={addLesson}>
            <PlusCircle size={18} /> Add Lesson
          </button>
        </div>

        {/* Action Buttons */}
        <div className="btn-group right">
          <button className="btn btn-draft" onClick={() => saveModule(false)}>
            Save as Draft
          </button>
          <button className="btn btn-publish" onClick={() => saveModule(true)}>
            Publish Module
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModulePage;
