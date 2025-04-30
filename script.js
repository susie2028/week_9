
// -------------------- 섹션1: 인트로 영상 관련 --------------------
document.addEventListener("DOMContentLoaded", () => {
  const video1 = document.getElementById("video1");
  const video2 = document.getElementById("video2");
  const video3 = document.getElementById("video3");
  const startBtn = document.getElementById("startBtn");
  const textAfterFall = document.getElementById("textAfterFall");
  const callServiceBtn = document.getElementById("callServiceBtn");
  const miniVideoWrapper = document.getElementById("miniVideoWrapper");
  const miniVideo = document.getElementById("miniVideo");
  const enterPrompt = document.getElementById("enterPrompt");
  const enterBtn = document.getElementById("enterBtn");
  const scrollHint = document.getElementById("scrollHint");
  const speechBubble = document.getElementById("speechBubble"); // ⬅️ 추가

  // 걷는다 버튼 클릭
  startBtn.addEventListener("click", () => {
    document.getElementById("clickPrompt").style.display = "none";
    startBtn.style.display = "none";
    video1.play();
  });

  // video1 끝나면 텍스트 등장
  video1.addEventListener("ended", () => {
    textAfterFall.classList.remove("hidden");
    textAfterFall.classList.add("fade-in");

    const callBtn = document.getElementById("callServiceBtn");
    callBtn.classList.add("fade-in-delayed");
  });

  // 예 버튼 클릭
  callServiceBtn.addEventListener("click", () => {
    textAfterFall.classList.add("hidden");
    miniVideoWrapper.classList.remove("hidden");
    miniVideoWrapper.classList.add("show-mini");
    miniVideo.currentTime = 0;
    miniVideo.play();

    setTimeout(() => {
      miniVideoWrapper.classList.remove("show-mini");
      miniVideoWrapper.classList.add("hidden");

      video1.classList.add("hidden");
      video2.classList.remove("hidden");
      video2.play();
    }, 4000);
  });

  // 🐭 말풍선 6초에 등장
  video2.addEventListener("timeupdate", () => {
    if (video2.currentTime >= 8 && speechBubble.classList.contains("hidden")) {
      speechBubble.classList.remove("hidden");
    }
  });

  // 🎬 video2 끝나도 말풍선은 그대로 유지
video2.addEventListener("ended", () => {
  enterPrompt.classList.remove("hidden");
  enterPrompt.classList.add("fade-in");

  const enterBtn = document.getElementById("enterBtn");
  enterBtn.classList.add("fade-in-delayed");
});

// ✅ 입장 버튼 → video3 재생 & 말풍선 제거
enterBtn.addEventListener("click", () => {
  enterPrompt.classList.add("hidden");
  speechBubble.classList.add("hidden"); // ✨ 이 줄만 추가!
  
  video2.classList.add("hidden");
  video3.classList.remove("hidden");
  video3.play();
});


  // video3 끝 → 스크롤 문구
  video3.addEventListener("ended", () => {
    scrollHint.classList.remove("hidden");
    scrollHint.classList.add("fade-in");
  });
});

// -------------------- 섹션2: 이미지 시퀀스 (197장) --------------------
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("scrollCanvas");
  const context = canvas.getContext("2d");

  const frameCount = 197;
  const currentFrame = index =>
  `assets/images/slide_for_webP/slide${String(index).padStart(3, '0')}.webp`;

  const images = [];
  let loadedImages = 0;
  const imageSeq = { frame: 0 };

  function setCanvasSize() {
  const baseWidth = 1920;
  const baseHeight = 2000;
  const ratio = baseHeight / baseWidth;

  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth * ratio;
}


  window.addEventListener('resize', setCanvasSize);
  setCanvasSize();

  // 이미지 미리 불러오기
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
      loadedImages++;
      if (loadedImages === 1) render(); // 첫 번째 프레임만 먼저 보여줌
    };
    images.push(img);
  }

  function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const img = images[imageSeq.frame];

  if (img && img.complete) {
    const scale = Math.min(
      canvas.width / img.width * 1.05,   // 살짝 더 크게 (1.05배)
      canvas.height / img.height * 1.05
    );

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const x = (canvas.width - newWidth) / 2;
    const y = canvas.height - newHeight + 20; // 약간 위로 (아래 여백 줄이기)

    context.drawImage(img, x, y, newWidth, newHeight);
  }
}






  window.addEventListener("scroll", () => {
    const section = document.getElementById("section2");
    const rect = section.getBoundingClientRect();
    const scrollTop = -rect.top;
    const maxScroll = section.offsetHeight - window.innerHeight;
    const scrollFraction = Math.min(1, Math.max(0, scrollTop / maxScroll));

    const frameIndex = Math.floor(scrollFraction * (frameCount - 1));
    if (frameIndex !== imageSeq.frame) {
      imageSeq.frame = frameIndex;
      requestAnimationFrame(render);
    }
  });
});


// -------------------- 섹션3 --------------------
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video5");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          video.play();
          obs.unobserve(video); // 🎯 한 번만 재생되도록 설정
        }
      });
    },
    { threshold: 0.7 } // 👈 50% 이상 보이면 재생
  );

  observer.observe(video);
});