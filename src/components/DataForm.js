import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DataForm.css';

const DataForm = () => {
  const [formData, setFormData] = useState({ name: '', age: '', group: '' });
  const [errors, setErrors] = useState({ name: '', age: '', group: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error message on change
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', age: '', group: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    if (!formData.age || formData.age <= 0) {
      newErrors.age = 'Age must be a positive number.';
      isValid = false;
    }

    if (!formData.group.trim()) {
      newErrors.group = 'Group is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      await axios.post('https://aggregate-functions.vercel.app/data', formData);
      alert('Data submitted successfully');
      setFormData({ name: '', age: '', group: '' }); // Clear the form
    } catch (error) {
      alert('Error submitting data');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.age}</div>
        </div>
        <div className="form-group">
          <label htmlFor="group">Group:</label>
          <input
            type="text"
            className={`form-control ${errors.group ? 'is-invalid' : ''}`}
            id="group"
            name="group"
            value={formData.group}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.group}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DataForm;
