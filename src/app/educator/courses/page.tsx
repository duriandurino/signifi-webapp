"use client";

import React from 'react';
import Image from 'next/image';
import { 
  Home, ChevronDown, PlusCircle, Search, GraduationCap, Briefcase, MessageSquare, 
  Users, BookCopy, Star, Pencil, BarChart2, MoreHorizontal, PlayCircle, CheckCircle, BookOpen
} from 'lucide-react';
import './courses.css'; 
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


// Placeholder courses data
const placeholderCourses = [
  { title: "Course File/Module", description: "Course description will appear here.", students: 0, modules: 0, price: "₱0", rating: 0, reviews: 0, status: "Draft" },
  { title: "Course File/Module", description: "Course description will appear here.", students: 0, modules: 0, price: "₱0", rating: 0, reviews: 0, status: "Draft" },
  { title: "Course File/Module", description: "Course description will appear here.", students: 0, modules: 0, price: "₱0", rating: 0, reviews: 0, status: "Draft" },
];

const CoursesPage = () => {

  const router = useRouter();

  const handleUploadCourse = () => {
    router.push('/educator/courses/upload-course');
  };

  return (
    <>
      {/* --- Main Header --- */}
            <header className="main-header">
              <div className="startheader">
                <span>Courses</span>
              </div>
              <div className="user-profile">
                <Image src="/profile.jpg" alt="User Avatar" width={32} height={32} className="user-avatar" />
                <span>Professor</span>
                <ChevronDown size={16} />
              </div>
            </header>

      {/* --- Page Header --- */}
      <section className="page-header">
        <div className="header-text">
          <h2>Course Management</h2>
          <p>Create, edit, and manage your FSL courses</p>
        </div>
        <button className="btn createcourse-btn" onClick={handleUploadCourse}>
          <PlusCircle size={18} />
          Create a Course
        </button>

      </section>

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
        {placeholderCourses.map((course, index) => (
          <div key={index} className="course-card">
            <div className="card-image-header gradient-blue">
              <GraduationCap size={48} />
            </div>
            <div className="card-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span><Users size={14} /> {course.students} students</span>
                <span><BookCopy size={14} /> {course.modules} modules</span>
                <span>{course.price}</span>
              </div>
              <div className="course-review-earnings">
                <StarRating rating={course.rating} count={course.reviews} />
              </div>
            </div>
            <div className="card-actions">
              <button className="btn btn-edit"><Pencil size={14} /> Edit</button>
              <button className="btn btn-analytics"><BarChart2 size={14} /> Analytics</button>
              <button className="btn btn-more"><MoreHorizontal size={14} /></button>
            </div>
          </div>
        ))}
      </section>

      {/* --- Pagination --- */}
      <section className="pagination">
        <a href="#" className="page-link disabled">Previous</a>
        <a href="#" className="page-link active">1</a>
        <a href="#" className="page-link">2</a>
        <a href="#" className="page-link">3</a>
        <a href="#" className="page-link">Next</a>
      </section>
    </>
  );
};

export default CoursesPage;
