"use client";

import React, { useEffect, useState } from 'react';
import { MdManageAccounts } from "react-icons/md";
import Image from 'next/image';
import {
  ChevronDown, PlusCircle, Search, GraduationCap, Users, BookCopy, Star, Eye, Pencil, Bell
} from 'lucide-react';
import './institution.css';
import { useRouter } from 'next/navigation';

const StarRating = ({ rating, count }: { rating: number, count: number }) => {
  const totalStars = 5;
  return (
    <div className="course-star-rating">
      <div className="stars">
        {[...Array(totalStars)].map((_, index) => (
          <Star key={index} size={16} className={index < rating ? 'filled' : 'empty'} />
        ))}
      </div>
      <span>({count} reviews)</span>
    </div>
  );
};

type Course = {
  course_id: number;
  title: string;
  description: string | null;
  price: number;
  status: "published" | "draft" | "review"; // new field
  created_at: string;
  educator_name?: string | null;
  institution_name?: string | null;
};

const CoursesPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Mock Data ---
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        course_id: 1,
        title: "Introduction to FSL",
        description: "Learn the basics of Filipino Sign Language.",
        price: 0,
        status: "published",
        created_at: "2025-09-06",
        educator_name: "Prof. SigniFi",
        institution_name: "SigniFi Academy",
      },
      {
        course_id: 2,
        title: "Advanced FSL Grammar",
        description: "Master complex sentence structures in FSL.",
        price: 500,
        status: "draft",
        created_at: "2025-08-28",
        educator_name: "Prof. SigniFi",
        institution_name: "SigniFi Academy",
      },
      {
        course_id: 3,
        title: "FSL for Beginners: Hands-On",
        description: "Practical exercises and interactive lessons.",
        price: 300,
        status: "review",
        created_at: "2025-07-15",
        educator_name: "Prof. SigniFi",
        institution_name: "SigniFi Academy",
      },
    ];
    setCourses(mockCourses);
    setLoading(false);
  }, []);

  const handleUploadCourse = () => {
    router.push('/educator/courses/institution/upload-course');
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* --- Top Header --- */}
      
      {/* --- White Content Container --- */}
      <div className="content-container">

        {/* --- Top Right Buttons --- */}
        <div className="top-right-buttons">
          <button
            className="btn managecourse-btn"
            onClick={() => router.push("/educator/courses/manage-courses")}
          >
            <MdManageAccounts size={18} />
            Manage Courses
          </button>

          <button className="btn createcourse-btn" onClick={handleUploadCourse}>
            <PlusCircle size={18} />
            Create a Course
          </button>
        </div>

        {/* --- Filter & Search Bar --- */}
        <section className="filter-bar">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Search courses" />
          </div>
          <div className="spacer"></div>
          <select className="filter-dropdown">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>In Review</option>
          </select>
          <select className="filter-dropdown">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>By Title</option>
          </select>
        </section>

        {/* --- Course Cards Grid --- */}
        <section className="courses-grid">
          {loading && <div>Loading courses...</div>}
          {!loading && courses.map((course) => (
          <div key={course.course_id} className="course-card">
            <div className="card-content">
              <h3>{course.title}</h3>
              <p>{course.description || 'No description'}</p>

              {/* Status Text */}
              <p className={`course-status ${course.status}`}>
                {course.status === "published" && "Published"}
                {course.status === "draft" && "Draft"}
                {course.status === "review" && "In Review"}
              </p>

              <div className="course-meta">
                <span><Users size={14} /> 20 students</span>
                <span><BookCopy size={14} /> 5 modules</span>
                <span>₱{Number(course.price || 0).toLocaleString()}</span>
              </div>

              <div className="course-review-earnings">
                <StarRating rating={4} count={12} />
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-edit"><Pencil size={14} /> Edit</button>
              <button className="btn btn-preview"><Eye size={14} /> Preview</button>
            </div>
          </div>
          ))}
        </section>

        {/* --- Pagination --- */}
        <section className="pagination">
          <a
            href="#"
            className={`page-link prev-next ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
          >
            Previous
          </a>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <a
                key={page}
                href="#"
                className={`page-link ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </a>
            );
          })}

          <a
            href="#"
            className={`page-link prev-next ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}
          >
            Next
          </a>
        </section>

      </div>
    </>
  );
};

export default CoursesPage;
