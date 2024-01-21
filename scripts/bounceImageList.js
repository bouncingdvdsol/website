let imageFiles = JSON.parse(localStorage.getItem("imageFiles")) || [
  "dvd.png",
  "dogwifhat.png",
  "doge.png",
  "rocketgiovanni.png",
];

function createImageElement(src) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = src;
  img.addEventListener("click", function () {
    setMarquee(this.src);
  });
  return img;
}

const container = document.getElementById("image-container");
imageFiles.forEach(function (file) {
  let imagePath;
  if (typeof file === "object") {
    imagePath = "data:image/png;base64," + file.imageData;
  } else {
    imagePath = "images/" + file;
  }
  const img = createImageElement(imagePath);
  container.appendChild(img);
});

const addImage = document.getElementById("add-image");
addImage.addEventListener("click", function () {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageData = event.target.result;
      const fileName = file.name;

      imageFiles.push({
        imageName: fileName,
        imageData: imageData.split(",")[1],
      });
      localStorage.setItem("imageFiles", JSON.stringify(imageFiles));

      const newImage = createImageElement(imageData);
      console.log(newImage);
      container.appendChild(newImage);
    };
    reader.readAsDataURL(file);
  });
  input.click();
});
