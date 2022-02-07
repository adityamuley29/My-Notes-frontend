import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";

const INITIAL_DATA = {
  "body":"",
  "createdBy": ""
}

const NotePage = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [note, setNote] = useState(INITIAL_DATA);
  const { addToast } = useToasts();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === "new") return;

    let response = await fetch(`/api/notes/${id}/`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, "createdBy": `${user.email}` }),
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
    fetch(`/api/notes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Somthing went wrong!");
        }
      })
      .then((resJson) => {
        // addToast(`Note Updated 👍`,{
        //   appearance:"success",
        //   autoDismiss:true
        // })
      })
      .catch((error) => {
        addToast(error, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  let deleteNote = async () => {
    fetch(`/api/notes/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(note),
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
    history("/");
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
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
