const defaultMode = localStorage.getItem('darkModeState') ? localStorage.getItem('darkModeState') : localStorage.setItem('darkModeState',false);

const toggleMode = (state = defaultMode, action) => {
  if (action.type === "DARKMODE") {
    return (state = true);
  } else if (action.type === "LIGHTMODE") {
    return (state = false);
  } else {
    return state;
  }
};

export default toggleMode;
