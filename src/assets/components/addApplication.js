import React from "react";

const AddApplication = ({ isOpen, onClose, onSubmit,formData,onChange }) => {
  return (
    isOpen ? 
        <div className="modal-overlay">
            <div className="modal-content">
                    <h2 className="modal-title">Add Job Application</h2>
                    <form onSubmit={(e) => {onSubmit(e)}}>
                    {/* Form Fields */}
                    <div className="form-group">
                        <label>Title:</label>
                        <input 
                            type        = "text" 
                            placeholder = "Title"  
                            value       = {formData?.title} 
                            name        = "title" 
                            onChange    = {(e)=>onChange(e)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Company Name:</label>
                        <input 
                            type        = "text"
                            placeholder = "company name" 
                            value       = {formData?.company} 
                            name        = "company" 
                            onChange    = {(e)=>onChange(e)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Date applied:</label>
                        <input type="date" value={formData?.dateApplied} name="dateApplied" onChange={(e)=>onChange(e)}  required />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select value={formData?.status} name="status" onChange={(e)=>onChange(e)}>Some option
                            <option value="applied">Applied</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                        <button type="button" className="close-btn" onClick={onClose}>
                            Close
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        : null
    );
};

export default AddApplication;
