import React, { useContext, useEffect, useReducer, useState } from "react";
import "./AddEvent.css";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../Layout/header";
import Footer from "../Layout/footer";

const AddEvent = () => {

  const navigateTo = useNavigate();
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const [event, setEvent] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
  });


  useEffect(() => {

    if (!isAuthorized)
      navigateTo("/login");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:5000/api/v1/event/create", {
      name: event.name, desc: event.description, location: event.location, date: event.date
    }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }
    );

    setEvent({
      name: "",
      description: "",
      location: "",
      date: "",
    });
    toast.success("Event Added");
    navigateTo("/");
  };



  return (
    <>
      <Header />

      <div className="form-container">
        <h1 className="form-heading">Add Event</h1>
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Event Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={event.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={event.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="text"
              id="date"
              name="date"
              placeholder="MM/DD/YYYY"
              value={event.date}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={{ backgroundColor: "#019194" }} className="submit-button">
            Submit Event
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddEvent;
