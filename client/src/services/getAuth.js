function getAuthState() {
  const token = localStorage.getItem("token") || "";
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw && raw !== "undefined" && raw !== "null") {
      user = JSON.parse(raw);
    }
  } catch {
    user = null;
  }
  return { token, user, isAuthed: Boolean(token && user) };
}

export default getAuthState;
