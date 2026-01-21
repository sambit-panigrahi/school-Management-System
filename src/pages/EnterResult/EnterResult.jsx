import { useState } from "react";
import Sidebar from "../../Components/Slidebar";
import "./EnterResult.css";

const EnterResult = () => {
  const [formData, setFormData] = useState({
    admissionNo: "",
    studentName: "",
    className: "BCA",
    term: "Term 1",
    subjects: [{ subject: "", total: 100, marksObtained: "" }],
  });

  const subjectOptions = [
    "C", "C++", "JAVA", "PYTHON", "JS", "WEBDEV", "OS", "LINUX", "UNIX", "ENGLISH",
  ];

  const handleAddSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { subject: "", total: 100, marksObtained: "" }],
    });
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index][field] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/result/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save result");

      alert("Result saved successfully!");
      setFormData({
        admissionNo: "",
        studentName: "",
        className: "BCA",
        term: "Term 1",
        subjects: [{ subject: "", total: 100, marksObtained: "" }],
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>ENTER STUDENT MARKS</h2>
        <form onSubmit={handleSubmit} className="enter-result-form">
          {/* Row 1 */}
          <div className="row">
            <input
              name="admissionNo"
              placeholder="Admission No"
              value={formData.admissionNo}
              onChange={handleChange}
              required
            />
            <input
              name="studentName"
              placeholder="Student Name"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 2 */}
          <div className="row">
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              required
            >
              <option>BCA</option>
              <option>BBA</option>
              <option>MCA</option>
              <option>MBA</option>
            </select>
            <input
              name="term"
              placeholder="Term / Exam"
              value={formData.term}
              onChange={handleChange}
              required
            />
          </div>

          {/* Subjects */}
          <h3>Subjects & Marks</h3>
          <div className="subjects-container">
            {formData.subjects.map((subj, index) => (
              <div className="subject-row" key={index}>
                <select
                  value={subj.subject}
                  onChange={(e) => handleSubjectChange(index, "subject", e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Subject
                  </option>
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <input value={subj.total} readOnly />
                <input
                  type="number"
                  placeholder="Marks Obtained"
                  value={subj.marksObtained}
                  onChange={(e) => handleSubjectChange(index, "marksObtained", e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          <button type="button" onClick={handleAddSubject} className="add-btn">
            Add Subject
          </button>

          <button type="submit" className="save-btn">
            Save Result
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterResult;
