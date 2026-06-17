import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ReportPage.css'
import Footer from './Footer'
import Header from './Header'

function ReportPage() {
  const [values, setValues] = useState({
    fname: '',
    lname: '',
    email: '',
    description: '',
    room: '',
    building: '',
  })

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    email: false,
    description: false,
    room: false,
    building: false,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues({ ...values, [e.target.id]: e.target.value })
    setErrors({ ...errors, [e.target.id]: false })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newErrors = {
      fname: values.fname.trim() === '',
      lname: values.lname.trim() === '',
      email: values.email.trim() === '',
      description: values.description.trim() === '',
      room: values.room.trim() === '',
      building: values.building.trim() === '',
    }

    setErrors(newErrors)

    const isValid = Object.values(newErrors).every(v => v === false)

    if (isValid) {
      alert('Report submitted successfully!')
      setValues({ fname: '', lname: '', email: '', description: '', room: '', building: '' })
    }
  }

  return (
    <div className="report-page">
    <div className="wrapper">
      <div className="header">
        <h1>Report A Bug</h1>
      </div>

      <form className="form-body" onSubmit={handleSubmit}>

        <div className="row">
          <div className="field">
            <label htmlFor="fname">First Name <span className="req">*</span></label>
            <input type="text" id="fname" placeholder="John" value={values.fname} onChange={handleChange} className={errors.fname ? 'error' : ''} />
          </div>
          <div className="field">
            <label htmlFor="lname">Last Name <span className="req">*</span></label>
            <input type="text" id="lname" placeholder="Doe" value={values.lname} onChange={handleChange} className={errors.lname ? 'error' : ''} />
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">Email <span className="req">*</span></label>
          <input type="email" id="email" placeholder="you@example.com" value={values.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
        </div>

        <div className="field">
          <label htmlFor="description">Description <span className="req">*</span></label>
          <textarea id="description" placeholder="Describe the issue in detail..." value={values.description} onChange={handleChange} className={errors.description ? 'error' : ''} />
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="room">Room Number <span className="req">*</span></label>
            <input type="text" id="room" placeholder="e.g. 204" value={values.room} onChange={handleChange} className={errors.room ? 'error' : ''} />
          </div>
          <div className="field">
            <label htmlFor="building">Building Name <span className="req">*</span></label>
            <input type="text" id="building" placeholder="e.g. Main Hall" value={values.building} onChange={handleChange} className={errors.building ? 'error' : ''} />
          </div>
        </div>

        <div className="footer">
          <Link to="/" className="btn-back">Back to Home</Link>
          <button type="submit" className="btn-submit">Submit</button>
        </div>

      </form>

    </div>
    <Footer />
    </div>
  )
}

export default ReportPage