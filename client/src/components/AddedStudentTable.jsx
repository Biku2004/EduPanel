import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faTrashAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const AddedStudentTable = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [selectedBatchYear, setSelectedBatchYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock batch years
  const batchYears = ['2022', '2023', '2024', '2025'];

  const fetchJobPostings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/jobs${selectedBatchYear ? `?batchYear=${selectedBatchYear}` : ""}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      setJobPostings(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchJobPostings();
  }, [selectedBatchYear]);


  const handleViewApplicants = (job) => {
    alert(`Viewing applicants for ${job.companyName}`);
    // Replace with actual logic
  };


  const handleDeleteSelected = async () => {
    const selectedIds = jobPostings.filter((job) => job.selected).map((job) => job.id);
    if (selectedIds.length === 0) {
      alert("No jobs selected");
      return;
    }
    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`http://localhost:5000/api/jobs/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }).then((res) => {
            if (!res.ok) throw new Error("Failed to delete job");
          })
        )
      );
      setJobPostings(jobPostings.filter((job) => !selectedIds.includes(job.id)));
      alert("Selected jobs deleted");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete jobs");
    }
  };

  const handleSendToStaff = () => {
    const selectedIds = jobPostings.filter((job) => job.selected).map((job) => job.id);
    if (selectedIds.length === 0) {
      alert('No jobs selected');
      return;
    }
    alert('Selected jobs sent to staff');
    // Replace with actual logic
  };

  const filteredJobs = selectedBatchYear
    ? jobPostings.filter((job) => job.batchYear === selectedBatchYear)
    : jobPostings;

  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Job Postings</h2>
        <div>
          <button
            onClick={fetchJobPostings}
            className="text-blue-500 mr-2"
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faSyncAlt} className="mr-1" />
            Reload
          </button>
          <button
            onClick={handleDeleteSelected}
            className="text-red-500 mr-2"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />
            Delete Selected
          </button>
          <button
            onClick={handleSendToStaff}
            className="text-green-500"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
            Send to Staff
          </button>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <select
          value={selectedBatchYear}
          onChange={(e) => setSelectedBatchYear(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Years</option>
          {batchYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setJobPostings(
                      jobPostings.map((job) => ({ ...job, selected: checked }))
                    );
                  }}
                />
              </th>
              <th className="py-2 px-4 border-b">Logo</th>
              <th className="py-2 px-4 border-b">Company Name</th>
              <th className="py-2 px-4 border-b">Website</th>
              <th className="py-2 px-4 border-b">Company Profile</th>
              <th className="py-2 px-4 border-b">Eligible Courses/Streams</th>
              <th className="py-2 px-4 border-b">Batch Year</th>
              <th className="py-2 px-4 border-b">Job Role</th>
              <th className="py-2 px-4 border-b">Job Location</th>
              <th className="py-2 px-4 border-b">Annual CTC</th>
              <th className="py-2 px-4 border-b">Roles & Responsibilities</th>
              <th className="py-2 px-4 border-b">Skills and Qualifications</th>
              <th className="py-2 px-4 border-b">Selection Process</th>
              <th className="py-2 px-4 border-b">Registration Process and Link</th>
              <th className="py-2 px-4 border-b">Last Date to Register</th>
              <th className="py-2 px-4 border-b">Benefits and Incentives</th>
              <th className="py-2 px-4 border-b">Role Details</th>
              <th className="py-2 px-4 border-b">Expected Skills and Tools</th>
              <th className="py-2 px-4 border-b">Additional Sections</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="21" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredJobs.length === 0 ? (
              <tr>
                <td colSpan="21" className="text-center py-4">
                  No job postings found
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={job.selected || false}
                      onChange={(e) => {
                        setJobPostings(
                          jobPostings.map((j) =>
                            j.id === job.id ? { ...j, selected: e.target.checked } : j
                          )
                        );
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={job.logoUrl}
                      alt={`${job.companyName} Logo`}
                      className="h-12 w-12 object-contain"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{job.companyName}</td>
                  <td className="py-2 px-4 border-b">{job.website}</td>
                  <td className="py-2 px-4 border-b">{job.companyProfile}</td>
                  <td className="py-2 px-4 border-b">{job.eligibleCourses}</td>
                  <td className="py-2 px-4 border-b">{job.batchYear}</td>
                  <td className="py-2 px-4 border-b">{job.jobRole}</td>
                  <td className="py-2 px-4 border-b">{job.jobLocation}</td>
                  <td className="py-2 px-4 border-b">{job.annualCTC}</td>
                  <td className="py-2 px-4 border-b">{job.rolesResponsibilities}</td>
                  <td className="py-2 px-4 border-b">{job.skillsQualifications}</td>
                  <td className="py-2 px-4 border-b">{job.selectionProcess}</td>
                  <td className="py-2 px-4 border-b">{job.registrationProcess}</td>
                  <td className="py-2 px-4 border-b">{job.lastDateToRegister}</td>
                  <td className="py-2 px-4 border-b">{job.benefitsIncentives}</td>
                  <td className="py-2 px-4 border-b">{job.roleDetails}</td>
                  <td className="py-2 px-4 border-b">{job.expectedSkillsTools}</td>
                  <td className="py-2 px-4 border-b">
                    {job.additionalSections.map((section, index) => (
                      <div key={index}>
                        <strong>{section.label}:</strong> {section.value}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">{job.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewApplicants(job);
                      }}
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    >
                      View Applicants
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHide(job.id);
                      }}
                      className="bg-gray-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Hide
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnhide(job.id);
                      }}
                      className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Unhide
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddedStudentTable;