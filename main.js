document.addEventListener("DOMContentLoaded", () => {
  const sliderSections = document.querySelectorAll('.slider-container');

  sliderSections.forEach(section => {
    const track = section.querySelector('.slider-track');
    const slides = section.querySelectorAll('.slide');
    const prevBtn = section.querySelector('.slider-btn.prev');
    const nextBtn = section.querySelector('.slider-btn.next');
    let currentSlide = 0;

    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        track.style.transform = `translateX(-${100 * currentSlide}%)`;
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        track.style.transform = `translateX(-${100 * currentSlide}%)`;
      }
    });
  });
});

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const thumbs = document.querySelectorAll('.thumb');
  const main = document.getElementById('mouseholeMain');
  const title = document.getElementById('mouseholeTitle');
  const desc = document.getElementById('mouseholeDesc');
  const price = document.getElementById('mouseholePrice');

  const filterBtns = document.querySelectorAll('.filter-btn');

  // 썸네일 클릭 → 내용 교체
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      main.style.backgroundImage = `url('${thumb.dataset.img}')`;
      title.textContent = thumb.dataset.title;
      desc.textContent = thumb.dataset.desc;
      price.innerHTML = `1시간 기준 · <strong>${thumb.dataset.price}</strong>`;
    });
  });

  // 필터 버튼 클릭 → 썸네일 필터링
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      thumbs.forEach(thumb => {
        if (filter === 'all' || thumb.dataset.category === filter) {
          thumb.classList.remove('hidden');
        } else {
          thumb.classList.add('hidden');
        }
      });

      // 첫 번째 보이는 썸네일로 초기화
      const firstVisible = Array.from(thumbs).find(t => !t.classList.contains('hidden'));
      if (firstVisible) firstVisible.click();
    });
  });
});
