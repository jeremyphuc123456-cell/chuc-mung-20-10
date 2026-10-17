/* =========================================================
   SỰ THỨC GIẤC CỦA TINY - CHÚC MỪNG 20/10
   Trang web thiệp tương tác & video chúc mừng Phụ Nữ Việt Nam
   ========================================================= */

// --- 1. CỐT TRUYỆN VÀ LỜI CHÚC ---
const storySteps = [
    {
        text: "này cậu gì ơi...",
        expression: "normal",
        clover: false
    },
    {
        text: "tớ là Tiny ✨",
        expression: "normal",
        clover: false
    },
    {
        text: "hôm nay tớ nhận lệnh từ vũ trụ là phải đến tìm cậu...",
        expression: "thinking",
        clover: false
    },
    {
        text: "ui... nhìn cậu hôm nay đẹp và rạng ngời quá đi! (//∇//)",
        expression: "blush",
        clover: false
    },
    {
        text: "nhân ngày Phụ nữ Việt Nam 20/10...",
        expression: "normal",
        clover: false
    },
    {
        text: "tớ muốn chúc cậu thật nhiều sức khỏe, an yên và ngập tràn niềm vui 🌸",
        expression: "happy",
        clover: false
    },
    {
        text: "chúc cậu luôn luôn xinh đẹp, tự tin tỏa sáng theo cách riêng của mình ✨",
        expression: "happy",
        clover: false
    },
    {
        text: "và đặc biệt là... hãy luôn giữ nụ cười hạnh phúc trên môi nhé 💖",
        expression: "happy",
        clover: false
    },
    {
        text: "tớ tặng cậu nhánh cỏ 4 lá may mắn này nè...",
        expression: "happy",
        clover: true
    },
    {
        text: "nè cầm lấy đi! Chúc mọi ước muốn của cậu đều thành hiện thực 🍀",
        expression: "wink",
        clover: true
    },
    {
        text: "nhưng bất ngờ vẫn chưa hết đâu nha...",
        expression: "thinking",
        clover: false
    },
    {
        text: "tớ còn chuẩn bị một món quà đặc biệt nữa dành riêng cho cậu đây! 🎬",
        expression: "excited",
        clover: false,
        isLast: true
    }
];

let currentStep = 0;
let isTyping = false;
let typeTimeout = null;

// DOM Elements
const introOverlay = document.getElementById('intro-overlay');
const startBtn = document.getElementById('start-btn');
const dialogBox = document.getElementById('dialog-box');
const dialogText = document.getElementById('dialog-text');
const nextBtn = document.getElementById('next-btn');
const giftChoicePanel = document.getElementById('gift-choice-panel');
const openVideoBtn = document.getElementById('open-video-btn');
const videoSection = document.getElementById('video-section');
const celebrationVideo = document.getElementById('celebration-video');
const tinyStage = document.getElementById('tiny-stage');
const cloverFloat = document.getElementById('clover-float');

// Tiny Eyes & Facial Features
const leftEyeNormal = document.querySelector('#left-eye .normal-eye');
const leftEyePupil = document.querySelector('#left-eye .eye-pupil');
const leftEyeHappy = document.querySelector('#left-eye .happy-eye');
const rightEyeNormal = document.querySelector('#right-eye .normal-eye');
const rightEyePupil = document.querySelector('#right-eye .eye-pupil');
const rightEyeHappy = document.querySelector('#right-eye .happy-eye');
const mouthPath = document.getElementById('mouth-path');

// Video Customization Elements
const videoFileInput = document.getElementById('video-file-input');
const customLinkBtn = document.getElementById('custom-link-btn');
const linkInputGroup = document.getElementById('link-input-group');
const videoUrlInput = document.getElementById('video-url-input');
const applyUrlBtn = document.getElementById('apply-url-btn');
const editNameBtn = document.getElementById('edit-name-btn');
const nameModal = document.getElementById('name-modal');
const recipientNameInput = document.getElementById('recipient-name-input');
const saveNameBtn = document.getElementById('save-name-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const recipientTitle = document.getElementById('recipient-title');
const replayBtn = document.getElementById('replay-btn');

// --- 2. BIỂU CẢM KHUÔN MẶT CỦA TINY ---
function setTinyExpression(expr) {
    // Reset to normal
    leftEyeNormal.style.display = 'block';
    leftEyePupil.style.display = 'block';
    leftEyeHappy.style.display = 'none';
    rightEyeNormal.style.display = 'block';
    rightEyePupil.style.display = 'block';
    rightEyeHappy.style.display = 'none';
    mouthPath.setAttribute('d', 'M 92 108 Q 100 114 108 108'); // Miệng bình thường

    if (expr === 'happy' || expr === 'blush') {
        leftEyeNormal.style.display = 'none';
        leftEyePupil.style.display = 'none';
        leftEyeHappy.style.display = 'block';
        rightEyeNormal.style.display = 'none';
        rightEyePupil.style.display = 'none';
        rightEyeHappy.style.display = 'block';
        mouthPath.setAttribute('d', 'M 90 106 Q 100 120 110 106'); // Nụ cười rộng
    } else if (expr === 'wink') {
        // Nháy mắt phải
        rightEyeNormal.style.display = 'none';
        rightEyePupil.style.display = 'none';
        rightEyeHappy.style.display = 'block';
        mouthPath.setAttribute('d', 'M 91 106 Q 100 118 109 106');
    } else if (expr === 'thinking') {
        leftEyePupil.setAttribute('cy', '76');
        rightEyePupil.setAttribute('cy', '76');
        mouthPath.setAttribute('d', 'M 93 110 Q 100 110 107 110'); // Miệng hơi bẽn lẽn
    }
}

// Chớp mắt ngẫu nhiên khi rảnh
setInterval(() => {
    if (storySteps[currentStep] && storySteps[currentStep].expression === 'normal') {
        leftEyeNormal.style.transform = 'scaleY(0.1)';
        rightEyeNormal.style.transform = 'scaleY(0.1)';
        leftEyePupil.style.opacity = '0';
        rightEyePupil.style.opacity = '0';
        setTimeout(() => {
            leftEyeNormal.style.transform = 'scaleY(1)';
            rightEyeNormal.style.transform = 'scaleY(1)';
            leftEyePupil.style.opacity = '1';
            rightEyePupil.style.opacity = '1';
        }, 150);
    }
}, 4000);

// --- 3. HIỆU ỨNG GÕ CHỮ (TYPEWRITER) ---
function typeWriter(text, i = 0) {
    if (i === 0) {
        dialogText.innerHTML = '';
        isTyping = true;
        nextBtn.style.opacity = '0.5';
    }

    if (i < text.length) {
        dialogText.innerHTML += text.charAt(i);
        typeTimeout = setTimeout(() => typeWriter(text, i + 1), 40);
    } else {
        isTyping = false;
        nextBtn.style.opacity = '1';
    }
}

function showStep(index) {
    if (index >= storySteps.length) {
        return;
    }

    const step = storySteps[index];
    setTinyExpression(step.expression);

    // Cỏ 4 lá bay lơ lửng
    if (step.clover) {
        cloverFloat.classList.add('active');
    } else {
        cloverFloat.classList.remove('active');
    }

    // Hiển thị lời thoại
    clearTimeout(typeTimeout);
    typeWriter(step.text);

    // Nếu là bước cuối cùng của lời thoại, chuẩn bị mở bảng quà tặng
    if (step.isLast) {
        nextBtn.querySelector('span').textContent = 'Xem quà tặng ✨';
    } else {
        nextBtn.querySelector('span').textContent = 'Tiếp tục ›';
    }
}

// Chuyển bước khi bấm nút "Tiếp tục"
nextBtn.addEventListener('click', () => {
    if (isTyping) {
        // Bấm khi đang gõ -> hiển thị toàn bộ chữ ngay
        clearTimeout(typeTimeout);
        dialogText.innerHTML = storySteps[currentStep].text;
        isTyping = false;
        nextBtn.style.opacity = '1';
        return;
    }

    if (storySteps[currentStep].isLast) {
        // Chuyển sang bảng chọn quà video
        dialogBox.style.display = 'none';
        giftChoicePanel.style.display = 'block';
    } else {
        currentStep++;
        showStep(currentStep);
    }
});

// Khi bấm nút "Mở Video Chúc Mừng 20/10"
openVideoBtn.addEventListener('click', () => {
    giftChoicePanel.style.display = 'none';
    videoSection.style.display = 'block';
    tinyStage.classList.add('video-mode');
    setTinyExpression('happy');

    // Kích hoạt pháo hoa giấy & tim bay
    triggerConfetti();

    // Tự động phát video chúc mừng
    celebrationVideo.play().catch(e => {
        console.log("Autoplay prevented:", e);
    });

    // Cuộn mượt xuống video nếu màn hình nhỏ
    videoSection.scrollIntoView({ behavior: 'smooth' });
});

// --- 4. TÙY BIẾN VIDEO (CHỌN TỪ THIẾT BỊ HOẶC LINK) ---
// Chọn file từ máy
videoFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileUrl = URL.createObjectURL(file);
        celebrationVideo.src = fileUrl;
        celebrationVideo.play();
        triggerConfetti();
    }
});

// Toggle dán link
customLinkBtn.addEventListener('click', () => {
    linkInputGroup.style.display = linkInputGroup.style.display === 'none' ? 'flex' : 'none';
});

// Áp dụng link URL
applyUrlBtn.addEventListener('click', () => {
    const url = videoUrlInput.value.trim();
    if (url) {
        celebrationVideo.src = url;
        celebrationVideo.play();
        linkInputGroup.style.display = 'none';
        triggerConfetti();
    }
});

// Đổi tên người nhận
editNameBtn.addEventListener('click', () => {
    nameModal.classList.add('active');
    recipientNameInput.focus();
});

closeModalBtn.addEventListener('click', () => {
    nameModal.classList.remove('active');
});

saveNameBtn.addEventListener('click', () => {
    const name = recipientNameInput.value.trim();
    if (name) {
        recipientTitle.textContent = `Gửi Đến ${name}, Người Phụ Nữ Tuyệt Vời Nhất ✨`;
    }
    nameModal.classList.remove('active');
});

// Xem lại từ đầu
replayBtn.addEventListener('click', () => {
    videoSection.style.display = 'none';
    giftChoicePanel.style.display = 'none';
    dialogBox.style.display = 'block';
    tinyStage.classList.remove('video-mode');
    celebrationVideo.pause();
    celebrationVideo.currentTime = 0;
    currentStep = 0;
    showStep(currentStep);
});

// --- 5. BẦU TRỜI SAO VŨ TRỤ CANVAS ---
const starCanvas = document.getElementById('universe-canvas');
const starCtx = starCanvas.getContext('2d');
let stars = [];
let meteors = [];

function initCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    stars = [];
    const count = Math.min(180, Math.floor((starCanvas.width * starCanvas.height) / 7000));
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.02 + 0.005,
            direction: Math.random() > 0.5 ? 1 : -1
        });
    }
}

function createMeteor() {
    if (Math.random() < 0.015 && meteors.length < 3) {
        meteors.push({
            x: Math.random() * starCanvas.width * 1.2,
            y: -20,
            length: Math.random() * 80 + 40,
            speed: Math.random() * 7 + 6,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
            opacity: 1
        });
    }
}

function drawUniverse() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

    // Vẽ sao lấp lánh
    stars.forEach(s => {
        s.opacity += s.speed * s.direction;
        if (s.opacity > 0.95 || s.opacity < 0.2) {
            s.direction *= -1;
        }

        starCtx.beginPath();
        starCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(220, 245, 255, ${s.opacity})`;
        starCtx.shadowBlur = s.size * 3;
        starCtx.shadowColor = '#00e1ff';
        starCtx.fill();
    });

    // Vẽ sao băng
    createMeteor();
    for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x -= Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.01;

        if (m.opacity <= 0 || m.y > starCanvas.height || m.x < -100) {
            meteors.splice(i, 1);
            continue;
        }

        const tailX = m.x + Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const grad = starCtx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
        grad.addColorStop(0.3, `rgba(114, 246, 255, ${m.opacity * 0.7})`);
        grad.addColorStop(1, 'rgba(0, 225, 255, 0)');

        starCtx.beginPath();
        starCtx.moveTo(m.x, m.y);
        starCtx.lineTo(tailX, tailY);
        starCtx.strokeStyle = grad;
        starCtx.lineWidth = 2;
        starCtx.stroke();
    }

    requestAnimationFrame(drawUniverse);
}

window.addEventListener('resize', initCanvas);
initCanvas();
drawUniverse();

// --- 6. HIỆU ỨNG CONFETTI & TIM RƠI ---
const confettiCanvas = document.getElementById('confetti-canvas');
const confCtx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiRunning = false;

function triggerConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiParticles = [];
    const colors = ['#ff5277', '#ff7eb3', '#ffd166', '#00e1ff', '#a855f7', '#ffffff'];

    for (let i = 0; i < 90; i++) {
        confettiParticles.push({
            x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
            y: window.innerHeight / 2,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 16,
            vy: (Math.random() - 0.8) * 18,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 8,
            opacity: 1,
            shape: Math.random() > 0.4 ? 'circle' : 'heart'
        });
    }

    if (!confettiRunning) {
        confettiRunning = true;
        animateConfetti();
    }
}

function animateConfetti() {
    confCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let activeCount = 0;

    confettiParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // Trọng lực
        p.rotation += p.rotSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0) {
            activeCount++;
            confCtx.save();
            confCtx.translate(p.x, p.y);
            confCtx.rotate((p.rotation * Math.PI) / 180);
            confCtx.globalAlpha = Math.max(0, p.opacity);
            confCtx.fillStyle = p.color;

            if (p.shape === 'circle') {
                confCtx.beginPath();
                confCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                confCtx.fill();
            } else {
                // Vẽ hình trái tim
                confCtx.beginPath();
                const d = p.size;
                confCtx.moveTo(0, 0);
                confCtx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
                confCtx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);
                confCtx.fill();
            }

            confCtx.restore();
        }
    });

    if (activeCount > 0) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiRunning = false;
        confCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// --- 7. ÂM THANH NỀN (WEB AUDIO API TỰ ĐỘNG PHÁT GIAI ĐIỆU DU DƯƠNG) ---
class GentleMusicPlayer {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.melodyTimer = null;
        this.noteIndex = 0;
        
        // Giai điệu Canon lãng mạn nhẹ nhàng (Tần số nốt nhạc Hz)
        this.notes = [
            261.63, 329.63, 392.00, 523.25, // C - E - G - C
            196.00, 246.94, 293.66, 392.00, // G - B - D - G
            220.00, 261.63, 329.63, 440.00, // A - C - E - A
            164.81, 207.65, 246.94, 329.63, // E - G# - B - E
            174.61, 220.00, 261.63, 349.23, // F - A - C - F
            261.63, 329.63, 392.00, 523.25, // C - E - G - C
            174.61, 220.00, 261.63, 349.23, // F - A - C - F
            196.00, 246.94, 293.66, 392.00  // G - B - D - G
        ];
    }

    start() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        this.isPlaying = true;
        this.playNextNote();
    }

    playNextNote() {
        if (!this.isPlaying) return;

        const freq = this.notes[this.noteIndex % this.notes.length];
        this.noteIndex++;

        // Tạo dao động âm thanh mềm mại kiểu Electric Piano / Music Box
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Hiệu ứng phai dần êm ái
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 1.7);

        // Nốt tiếp theo sau 360ms
        this.melodyTimer = setTimeout(() => this.playNextNote(), 380);
    }

    stop() {
        this.isPlaying = false;
        clearTimeout(this.melodyTimer);
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
            return false;
        } else {
            this.start();
            return true;
        }
    }
}

const musicPlayer = new GentleMusicPlayer();
const audioBtn = document.getElementById('audio-btn');
const audioIcon = document.getElementById('audio-icon');

audioBtn.addEventListener('click', () => {
    const isPlaying = musicPlayer.toggle();
    audioIcon.textContent = isPlaying ? '🎵' : '🔇';
});

// --- 8. KHỞI ĐỘNG KHI CHẠM VÀO MÀN HÌNH ---
startBtn.addEventListener('click', () => {
    introOverlay.classList.remove('active');
    
    // Tự động phát nhạc nhẹ
    musicPlayer.start();
    audioIcon.textContent = '🎵';

    // Bắt đầu câu chuyện của Tiny
    setTimeout(() => {
        showStep(0);
    }, 600);
});
