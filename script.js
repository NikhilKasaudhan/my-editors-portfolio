const form = document.getElementById("video-form");
const videoList = document.getElementById("video-list");
const totalMinutesEl = document.getElementById("total-minutes");

let totalMinutes = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const url = document.getElementById("video-url").value.trim();
  const duration = parseInt(document.getElementById("video-duration").value);
  const thumbnailFile = document.getElementById("thumbnail-upload").files[0];

  if (!url || !duration || !thumbnailFile) {
    alert("Please fill all fields and select a thumbnail.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const thumbnailURL = reader.result;

    addVideoToList({ url, duration, thumbnailURL });
    updateTotalMinutes(duration);
    form.reset();
  };

  reader.readAsDataURL(thumbnailFile);
});

function addVideoToList({ url, duration, thumbnailURL }) {
  const div = document.createElement("div");
  div.classList.add("video-item");

  div.innerHTML = `
    <h3><a href="${url}" target="_blank">${url}</a></h3>
    <img src="${thumbnailURL}" alt="Thumbnail" />
    <p>Duration: ${duration} minutes</p>
  `;
  videoList.appendChild(div);
}

function updateTotalMinutes(minutes) {
  totalMinutes += minutes;
  totalMinutesEl.textContent = totalMinutes;
}
