"use client";

import React from 'react';
import Image from 'next/image';
import { 
  Home, ChevronDown, PlusCircle, Search, GraduationCap, Briefcase, MessageSquare, 
  Users, BookCopy, Star, Pencil, BarChart2, MoreHorizontal, PlayCircle, CheckCircle, BookOpen
} from 'lucide-react';
import './courses.css'; 
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useMemo } from 'react';


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
  is_published: boolean;
  created_at: string;
  educator_id?: number;
  institution_id?: number | null;
  educator_name?: string | null;
  institution_name?: string | null;
};

const CoursesPage = () => {

  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        let path = '/api/courses';
        const userRaw = typeof window !== 'undefined' ? localStorage.getItem('auth_user') : null;
        if (userRaw) {
          try {
            const user = JSON.parse(userRaw);
            if (user?.user_id) {
              const qp = new URLSearchParams({ educator_id: String(user.user_id) });
              path = `/api/courses?${qp.toString()}`;
            }
          } catch {}
        }
        const resp = await apiFetch<{ message: string; courses: Course[] }>(path);
        setCourses(resp.courses || []);
      } catch (err: any) {
        setError(err?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
        {loading && <div>Loading courses...</div>}
        {error && !loading && <div style={{ color: '#b00020' }}>{error}</div>}
        {!loading && !error && courses.length === 0 && (
          <div>No courses yet.</div>
        )}
        {!loading && !error && courses.map((course) => (
          <div key={course.course_id} className="course-card">
            <div className="card-image-header gradient-blue">
              <GraduationCap size={48} />
            </div>
            <div className="card-content">
              <h3>{course.title}</h3>
              <p>{course.description || 'No description'}</p>
              <div className="course-meta">
                <span><Users size={14} /> - students</span>
                <span><BookCopy size={14} /> - modules</span>
                <span>₱{Number(course.price || 0).toLocaleString()}</span>
              </div>
              <div className="course-review-earnings">
                <StarRating rating={0} count={0} />
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
