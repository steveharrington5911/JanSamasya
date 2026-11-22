
import { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: '',
    location: '',
    description: ''
  });

  const [complaintId, setComplaintId] = useState('');
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const complaints = JSON.parse(
      localStorage.getItem('janSamasyaComplaints') || '[]'
    );

    const id = 'JS' + Date.now().toString().slice(-8);

    const newComplaint = {
      ...form,
      id,
      status: 'Pending',
      date: new Date().toLocaleDateString()
    };

    complaints.push(newComplaint);

    localStorage.setItem(
      'janSamasyaComplaints',
      JSON.stringify(complaints)
    );

    setComplaintId(id);
    setMessage('Your complaint has been submitted successfully!');
    setTrackResult(null);

    setForm({
      name: '',
      email: '',
      category: '',
      location: '',
      description: ''
    });
  };

  const handleTrack = () => {
    const complaints = JSON.parse(
      localStorage.getItem('janSamasyaComplaints') || '[]'
    );

    const result = complaints.find(
      (complaint) =>
        complaint.id.toLowerCase() === trackId.trim().toLowerCase()
    );

    setTrackResult(result || false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Jan<span>Samasya</span></div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#report">Report Problem</a>
          <a href="#track">Track Complaint</a>
        </div>
        <a href="#report" className="nav-btn">Submit Complaint</a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">YOUR CITY. YOUR VOICE.</p>
          <h1>Make Your City<br />A <span>Better Place.</span></h1>
          <p>Report civic issues, raise your voice and help make your neighbourhood cleaner, safer and better.</p>
          <a href="#report" className="primary-btn">Report an Issue →</a>
        </div>
        <div className="hero-card">
          <div className="hero-icon">🏙️</div>
          <h3>Change Starts With You</h3>
          <p>Your complaint can make a difference.</p>
        </div>
      </section>

      <section className="about" id="about">
        <p className="section-tag">HOW IT WORKS</p>
        <h2>Making Reporting Simple</h2>
        <div className="steps">
          <div className="step-card">
            <span>01</span>
            <h3>Report an Issue</h3>
            <p>Submit details about the civic problem in your area.</p>
          </div>
          <div className="step-card">
            <span>02</span>
            <h3>Get Complaint ID</h3>
            <p>Receive a unique ID to identify your complaint.</p>
          </div>
          <div className="step-card">
            <span>03</span>
            <h3>Track Progress</h3>
            <p>Check the latest status of your submitted complaint.</p>
          </div>
        </div>
      </section>

      <section className="report" id="report">
        <p className="section-tag">RAISE YOUR VOICE</p>
        <h2>Report a Civic Issue</h2>
        <p>Tell us about the problem in your neighbourhood.</p>

        <form className="complaint-form" onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Problem Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option>Road Damage</option>
            <option>Streetlight</option>
            <option>Garbage</option>
            <option>Water Supply</option>
            <option>Drainage</option>
            <option>Other</option>
          </select>

          <label>Exact Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter problem location"
            required
          />

          <label>Problem Description</label>
          <textarea
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the issue..."
            required
          />

          <button type="submit">Submit Complaint</button>

          {message && (
            <p style={{ color: 'green', marginTop: '15px' }}>
              {message}
            </p>
          )}

          {complaintId && (
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
              Your Complaint ID: {complaintId}
            </p>
          )}
        </form>
      </section>

      <section className="track" id="track">
        <p className="section-tag">COMPLAINT STATUS</p>
        <h2>Track Your Complaint</h2>
        <p>Enter your complaint ID to check its status.</p>

        <div className="track-box">
          <input
            type="text"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            placeholder="Enter Complaint ID"
          />
          <button type="button" onClick={handleTrack}>Track Now</button>
        </div>

        {trackResult === false && (
          <p style={{ color: 'red', marginTop: '20px' }}>
            Complaint not found. Please check your ID.
          </p>
        )}

        {trackResult && (
          <div className="step-card" style={{ maxWidth: '550px', margin: '25px auto' }}>
            <h3>Complaint Details</h3>
            <p>Complaint ID: {trackResult.id}</p>
            <p>Category: {trackResult.category}</p>
            <p>Location: {trackResult.location}</p>
            <p>Status: {trackResult.status}</p>
            <p>Date: {trackResult.date}</p>
          </div>
        )}
      </section>

      <footer>
        <h2>JanSamasya</h2>
        <p>Your City. Your Voice. Your Responsibility.</p>
        <p>© 2026 JanSamasya. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
