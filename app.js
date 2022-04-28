const apiUrl = "https://www.thecolorapi.com/scheme";
const colorForm = document.getElementById("color-form");
const copyButtons = document.querySelectorAll(".copy-button");

colorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const color = formData.get("color").substring(1);
  const mode = formData.get("mode");

  fetch(`${apiUrl}?hex=${color}&format=json&mode=${mode}&count=5`)
    .then((res) => res.json())
    .then((data) => {
      data.colors.forEach((color, index) => {
        const hex = color.hex.value;
        document.getElementById(`color${index + 1}`).style.backgroundColor =
          hex;
        document.getElementById(`hex-code${index + 1}`).textContent = hex;
      });
    });
});

function copyHex(event) {
  const hexCode = event.target.textContent;
  navigator.clipboard.writeText(hexCode);

  const copyDiv = document.createElement("div");
  copyDiv.classList.add("copy-div");
  copyDiv.textContent = "Copied!";
  event.target.append(copyDiv);
  setTimeout(() => {
    copyDiv.parentNode.removeChild(copyDiv);
  }, 1000);
}

[...copyButtons].forEach((copyButton) => {
  copyButton.addEventListener("click", copyHex);
});
