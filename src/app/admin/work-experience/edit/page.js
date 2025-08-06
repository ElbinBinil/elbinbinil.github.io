'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { db } from '../../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function EditWorkExperienceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [workExp, setWorkExp] = useState({
    company: '',
    position: '',
    duration: '',
    location: '',
    description: [],
    technologies: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchWorkExperience();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchWorkExperience = async () => {
    try {
      const docRef = doc(db, 'workExperience', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setWorkExp(docSnap.data());
      } else {
        console.log('No such document!');
        router.push('/admin/work-experience');
      }
    } catch (error) {
      console.error('Error fetching work experience:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkExp(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value.split('\n').filter(line => line.trim());
    setWorkExp(prev => ({
      ...prev,
      description
    }));
  };

  const handleTechnologiesChange = (e) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim());
    setWorkExp(prev => ({
      ...prev,
      technologies
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);
    try {
      const docRef = doc(db, 'workExperience', id);
      await updateDoc(docRef, workExp);
      router.push('/admin/work-experience');
    } catch (error) {
      console.error('Error updating work experience:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!id) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Error</h1>
          <p>No work experience ID provided.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Work Experience</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={workExp.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-2">
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={workExp.position}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={workExp.duration}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={workExp.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description (one point per line)
            </label>
            <textarea
              id="description"
              name="description"
              value={workExp.description.join('\n')}
              onChange={handleDescriptionChange}
              rows={6}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter each responsibility or achievement on a new line"
            />
          </div>

          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-300 mb-2">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={workExp.technologies.join(', ')}
              onChange={handleTechnologiesChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="React, Node.js, Python"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Update Work Experience'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/admin/work-experience')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditWorkExperience() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading...</h1>
        </div>
      </div>
    }>
      <EditWorkExperienceContent />
    </Suspense>
  );
}
