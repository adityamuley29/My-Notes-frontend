import React from "react";
import { Link } from "react-router-dom";

let getTime = (note)=>{
  return new Date(note.createdOn).toLocaleDateString()
}

let getTitle = (note) => {
  var title = note.body.title;
  if (title.length > 45) {
    return title.slice(0, 40)
  }
  return title;
};


let getContent = (note)=>{
  let title = getTitle(note)
  let content = note.title.replaceAll('\n',' ')
  content = content.replaceAll(title,'')

  if(content.length > 45){
    return content.slice(0,45) + '...'
  }else{
    return content
  }
}
const ListItem = ({ note }) => {
  // console.log(note._id);
  return (
    <Link to={`/note/${note._id}`}>
      <div className="notes-list-item">
        <h3>{note.title}</h3>
        <p><span>{getTime(note)}</span></p>
      </div>
    </Link>
  );
};

export default ListItem;
