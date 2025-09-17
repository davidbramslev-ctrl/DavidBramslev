document.addEventListener("DOMContentLoaded", () => {
  const filmItems = document.querySelectorAll(".film-list li");
  const modal = document.getElementById("modal");
  const videoFrame = document.getElementById("videoFrame");
  const filmInfo = document.getElementById("filmInfo");
  
    const body = document.body;

    // Mapping titles to a single image filename
    const bgImages = {
  "OVER-WOKE": "media/OVER-WOKE1.png",
  "YOU LIKE DRUGS": "media/YouLikeDrugs1.png",
  "WHERE DID I GO": "media/WhereDidIGo.jpg",
    "EN LYCKLIG MAN": "media/EnLyckligman5.png",
  "WHITE ANASTASIA": "media/WHITEANASTASIA3.png",
  "FEELINGS": "media/Feelings1.PNG",
  "KEVINS GOLD": "media/KevinsGold1.jpeg",
  "COFFEE BREAK": "media/CoffeeBreak1.JPG"
    };
    let modalActive = false;

    let modalBgImage = '';
    filmItems.forEach(item => {
  item.addEventListener("click", () => {

        const videoUrl = item.getAttribute("data-video");
        const infoText = item.getAttribute("data-info");
        const title = item.textContent.trim().toUpperCase();
        const imgPath = bgImages[title];
        if (imgPath) {
          body.style.backgroundImage = `url('${imgPath}')`;
          body.style.backgroundSize = 'cover';
          body.style.backgroundPosition = 'center';
          body.style.backgroundRepeat = 'no-repeat';
          modalActive = true;
        }
        videoFrame.src = videoUrl;
        filmInfo.textContent = infoText;
        modal.classList.remove("hidden");
      });

      item.addEventListener("mouseenter", () => {
        if (modalActive) return;
        const title = item.textContent.trim().toUpperCase();
        const imgPath = bgImages[title];
        if (imgPath) {
          body.style.backgroundImage = `url('${imgPath}')`;
          body.style.backgroundSize = 'cover';
          body.style.backgroundPosition = 'center';
          body.style.backgroundRepeat = 'no-repeat';
        }
      });

      item.addEventListener("mouseleave", () => {
        if (modalActive) return;
        setTimeout(() => {
          // Only clear background if not hovering any film title
          const isHoveringAny = Array.from(filmItems).some(el => el.matches(':hover'));
          if (!isHoveringAny) {
            body.style.backgroundImage = '';
          }
        }, 500);
      });
    });

    // Close modal when clicking outside modal-content
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        videoFrame.src = ""; // Stop video when closing
        body.style.backgroundImage = '';
        modalActive = false;
      }
    });
});
