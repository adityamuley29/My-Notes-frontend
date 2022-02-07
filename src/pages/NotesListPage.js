import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import ListItem from "../components/ListItem";
import AuthContext from "../context/AuthContext";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useContext(AuthContext);


  // const currentUser = jwtDecode(user.access);

  useEffect(() => {
    getNotes();
  }, []);


  let getNotes = async () => {
    // let response = await fetch("/api/notes/");

    let response = await fetch(`/api/fiternotes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ createdBy: `${user.email}` }),
    });

    let data = await response.json();
    // let filteredData = data.filter(data =>currentUser.email[0] === data.createdBy)
    // console.log(currentUser);
    // console.log(data);
    setNotes(data);
  };
  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
