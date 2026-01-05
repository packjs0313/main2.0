// @ts-nocheck
const sliderTracks = document.querySelectorAll('.slider-track');

// 이미지 배열
const images = [];
for (let i = 1; i <= 55; i++) {
    images.push(`imgnum/${i}.webp`);
}

sliderTracks.forEach(track => {
    const direction = track.dataset.direction || 'left';
    const baseSpeed = parseFloat(track.dataset.speed) || 0.6;
    const startIndex = parseInt(track.dataset.start) || 0;

    // 이미지 생성
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        track.appendChild(img);
    });

    // clone
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        track.appendChild(img);
    });

    window.addEventListener('load', () => {
        const firstImg = track.querySelector('img');
        if (!firstImg) return;

        const gap = 20;
        const imgWidth = firstImg.offsetWidth + gap;
        const totalWidth = imgWidth * images.length;

        // 🔥 시작 위치 계산
        const safeIndex = startIndex % images.length;
        let x = -imgWidth * safeIndex;

        if (direction === 'right') {
            x -= totalWidth;
        }

        const speed = baseSpeed * (direction === 'left' ? 1 : -1);

        function animate() {
            x -= speed;

            if (direction === 'left') {
                if (Math.abs(x) >= totalWidth) x += totalWidth;
            } else {
                if (x >= 0) x -= totalWidth;
            }

            track.style.transform = `translateX(${x}px)`;
            requestAnimationFrame(animate);
        }

        animate();
    });
});
