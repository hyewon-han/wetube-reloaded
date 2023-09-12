const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");
const videoComment = document.querySelector(".video__comment");
const deleteIcon = document.querySelectorAll(".delete__icon");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  deleteIcon.className = "delete__icon";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.dataset.id = id;
  span2.className = "delete__icon";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
  const newDeleteIcon = document.querySelector(".delete__icon");
  if (newDeleteIcon) {
    newDeleteIcon.addEventListener("click", handleDelete);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //string을 보내고 있지만 사실 json string이야!!
    },
    body: JSON.stringify({ text }),
  });
  // fetch로 보내게 되는 것은 JSON object
  // JSON.stringify는 JS object를 받아서 string으로 돌려준다.
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId); //fake comment 생성
  }
};

const handleDelete = async (event) => {
  const commentId = event.target.dataset.id;
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId: videoContainer.dataset.id }),
  });
  if (response.status === 201) {
    event.target.parentNode.remove();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (deleteIcon) {
  deleteIcon.forEach((icon) => {
    icon.addEventListener("click", handleDelete);
  });
}
