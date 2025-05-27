let currentPage = 1;

function goToPage(pageNumber) {
  const pages = document.querySelectorAll(".page");

  pages.forEach((page, index) => {
    page.classList.add("hidden");
    page.classList.remove("visible");
  });

  const target = document.getElementById(`page${pageNumber}`);
  if (target) {
    target.classList.remove("hidden");
    target.classList.add("visible");
    currentPage = pageNumber;

    // Jika menuju page puisi, jalankan animasi puisi
    if (pageNumber === 2) animatePoem();
  }
}

function nextPage(pageNumber) {
  goToPage(pageNumber);
}

function replay() {
  const iframe = document.getElementById("video-iframe");
  iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
  iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  goToPage(4);
}

// Animasi puisi muncul baris demi baris
const poemLines = [
  "Di bawah langit yang penuh bintang,",
  "Aku menulis namamu di hatiku yang paling dalam.",
  "Setiap detik bersamamu adalah anugerah,",
  "Dan hari ini, di ulang tahunmu, aku hanya ingin kau tahu...",
  "Aku mencintaimu, lebih dari kata-kata bisa ungkapkan."
];

function animatePoem() {
  const poemElement = document.getElementById("poem");
  poemElement.innerHTML = "";
  let index = 0;

  function showNextLine() {
    if (index < poemLines.length) {
      const line = document.createElement("p");
      line.textContent = poemLines[index];
      line.style.opacity = "0";
      line.style.transition = "opacity 1s";
      poemElement.appendChild(line);
      setTimeout(() => (line.style.opacity = "1"), 100);
      index++;
      setTimeout(showNextLine, 2000);
    }
  }

  showNextLine();
}

document.addEventListener("DOMContentLoaded", () => {
  goToPage(1);
});
