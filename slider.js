let slider = () => {
  let slider = document.getElementById("slider");
  let images = [];
  let lastImage = 2;
  let firstImage = 0;
  let slides = 3;

  for (let img of slider.getElementsByTagName("img")) {
    images.push(img.getAttribute("src"));
  }

  slider.innerHTML = "";

  const insertSlide = (img, index, position) => {
    let template = `
    <div id="slide${index}" class="slide">
        <img src=${img} alt="image${index}"/>
    </div>
    `;
    position === "start"
      ? slider.insertAdjacentHTML("afterbegin", template)
      : slider.insertAdjacentHTML("beforeend", template);
  };

  const nextSlide = () => {
    slider.removeChild(slider.firstElementChild);

    if (lastImage < images.length - 1) {
      lastImage += 1;
      firstImage += 1;
      if (firstImage > images.length - 1) {
        firstImage = 0;
      }
    } else {
      lastImage = 0;
      firstImage = images.length - slides + 1;
    }
    insertSlide(images[lastImage], lastImage, "end");
  };

  const prevSlide = () => {
    slider.removeChild(slider.lastElementChild);
    if (firstImage == 0) {
      firstImage = images.length - 1;
      lastImage = firstImage - slides + 1;
    } else {
      firstImage -= 1;
      lastImage = firstImage + slides - 1;
      if (lastImage > images.length - 1) {
        lastImage = 0;
      }
    }
    insertSlide(images[firstImage], firstImage, "start");
  };

  images.forEach((img, index) => {
    if (index <= slides - 1) {
      insertSlide(img, index, "end");
    } else {
      return;
    }
  });

  let nav = `
  <button id="prevBtn">Prev</button><button id="nextBtn">Next</button>
  `;
  document.body.insertAdjacentHTML("beforeend", nav);

  document.getElementById("nextBtn").addEventListener("click", nextSlide);
  document.getElementById("prevBtn").addEventListener("click", prevSlide);
};

slider();
