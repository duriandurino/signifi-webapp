"use client";

import React, { useState } from "react";
import "./uploadmodule.css";
import { PlusCircle, Trash2 } from "lucide-react";
import router from "next/router";

interface Lesson {
  title: string;
  description: string;
  file: File | null;
  quiz: string | null; // quiz link/id (quiz builder can go here later)
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

  // Handle module field changes
  const handleModuleChange = (field: keyof Module, value: any) => {
    setModule((prev) => ({ ...prev, [field]: value }));
  };

  // Add new lesson
  const addLesson = () => {
    setModule((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        { title: "", description: "", file: null, quiz: null, practiceDrill: null },
      ],
    }));
  };

  // Update lesson field
  const handleLessonChange = (
    index: number,
    field: keyof Lesson,
    value: any
  ) => {
    const updated = [...module.lessons];
    updated[index] = { ...updated[index], [field]: value };
    setModule((prev) => ({ ...prev, lessons: updated }));
  };

  // Remove a lesson
  const removeLesson = (index: number) => {
    const updated = module.lessons.filter((_, i) => i !== index);
    setModule((prev) => ({ ...prev, lessons: updated }));
  };

  // Save module (draft/publish)
  const saveModule = (isPublished: boolean) => {
    console.log("Saving module:", { ...module, isPublished });
    alert(
      isPublished ? "Module published successfully!" : "Module saved as draft!"
    );
  };

  return (
    <div>
      <header className="main-header">
        <div className="startheader">Upload Module</div>
      </header>

      <section className="page-header">
        <div>
          <h2>Create a New Module</h2>
          <p>Add lessons, quizzes, and practice drills for your learners</p>
        </div>
      </section>

      <div className="card">
        {/* Module Info */}
        <input
          className="input-field"
          type="text"
          placeholder="Module Title"
          value={module.title}
          onChange={(e) => handleModuleChange("title", e.target.value)}
        />
        <textarea
          className="textarea-field"
          placeholder="Module Description"
          rows={3}
          value={module.description}
          onChange={(e) => handleModuleChange("description", e.target.value)}
        ></textarea>

        {/* Lessons Section */}
        <div>
          <h3>Lessons</h3>
          {module.lessons.map((lesson, index) => (
            <div key={index} className="lesson-card">
              <div className="lesson-header">
                <h4>Lesson {index + 1}</h4>
                <button
                  className="btn-icon"
                  onClick={() => removeLesson(index)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <input
                className="input-field"
                type="text"
                placeholder="Lesson Title"
                value={lesson.title}
                onChange={(e) =>
                  handleLessonChange(index, "title", e.target.value)
                }
              />
              <textarea
                className="textarea-field"
                placeholder="Lesson Mini Description"
                rows={2}
                value={lesson.description}
                onChange={(e) =>
                  handleLessonChange(index, "description", e.target.value)
                }
              ></textarea>

              {/* File Upload */}
              <div className="file-upload">
                <label>Upload Lesson (PDF/Video)</label>
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

              {/* Quiz Upload (button instead of text input) */}
                <div className="file-upload">
                <label>Attach Quiz</label>
                {lesson.quiz ? (
                    <button
                    className="btn btn-draft"
                    onClick={() => router.push(`/educator/quiz-upload?lessonId=${index}`)}
                    >
                    Edit Quiz
                    </button>
                ) : (
                    <button
                    className="btn add-btn"
                    onClick={() => router.push(`/educator/quiz-upload?lessonId=${index}`)}
                    >
                    + Add Quiz
                    </button>
                )}
                </div>


              {/* Practice Drill Upload */}
              <div className="file-upload">
                <label>Upload Practice Drill (PDF/Video)</label>
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
          ))}

          <button className="btn add-btn" onClick={addLesson}>
            <PlusCircle size={18} /> Add Lesson
          </button>
        </div>

        {/* Action Buttons */}
        <div className="btn-group">
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
