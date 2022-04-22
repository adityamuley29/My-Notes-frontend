import React, { useContext, useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import ListItem from "../components/ListItem";
import AuthContext from "../context/AuthContext";
import Spinner from "../components/spinner";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useContext(AuthContext);
  let [loading, setLoading] = useState(false);

  const token = JSON.parse(user);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/get-Notes/${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: `${user}`,
        },
      });
      const data = await response.json();
      setNotes(data.myNotes);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {loading ? (
          <div className="spinner-container"><Spinner loading={loading} /></div>
        ) : (
          notes.map((note, index) => <ListItem key={index} note={note} />)
        )}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
