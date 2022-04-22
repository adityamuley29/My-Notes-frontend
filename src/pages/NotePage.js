import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import AuthContext from "../context/AuthContext";


const INITIAL_DATA = {
  title: "",
  createdOn: "",
};

const NotePage = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [note, setNote] = useState(INITIAL_DATA);
  const { addToast } = useToasts();
  const { user } = useContext(AuthContext);

  const token = JSON.parse(user);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === "new") return;
    let response = await fetch(`/get-Note/${id}`);
    let data = await response.json();
    console.log(data);
    setNote(data.myNote);
  };

  let createNote = async () => {
    fetch(`/add-Note`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, title: note.title }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Somthing went wrong!");
        }
      })
      .then((resJson) => {
        addToast(`Note added 👍`, {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        addToast(error, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  let updateNote = async () => {
    fetch(`/update-Note/${id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: note.title }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Somthing went wrong!");
        }
      })
      .then((resJson) => {
        addToast(`Note Updated 👍`, {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        addToast(error, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  let deleteNote = async () => {
    fetch(`/delete-Note/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          
          return response.json();
        } else {
          throw new Error("Somthing went wrong!");
        }
      })
      .then((resJson) => {
        addToast(`Note deleted 👍`, {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        addToast(error, {
          appearance: "error",
          autoDismiss: true,
        });
      });
      history('/');
  };

  let handleSubmit = () => {
    if (id !== "new" && note.body === "") {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note !== null) {
      createNote();
    }

    history("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ title: e.target.value });
        }}
        value={note?.title}
      ></textarea>
    </div>
  );
};

export default NotePage;
