// ==================== SPINNING WHEEL ====================
class SpinWheel {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.segments = [
            { value: 0, color: '#5B3A8C' },
            { value: 100, color: '#9B59B6' },
            { value: 0, color: '#7D5BA6' },
            { value: 5, color: '#FF69B4' },
            { value: 0, color: '#5B3A8C' },
            { value: 3, color: '#9B59B6' },
            { value: 0, color: '#7D5BA6' },
            { value: 2, color: '#FF69B4' },
            { value: 0, color: '#5B3A8C' },
            { value: 1, color: '#9B59B6' },
            { value: 0, color: '#7D5BA6' },
            { value: 5, color: '#FF69B4' },
        ];
        this.currentAngle = 0;
        this.spinning = false;
        this.onSpinComplete = null;
        this.draw();
    }

    draw() {
        const ctx = this.ctx;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        const segmentAngle = (2 * Math.PI) / this.segments.length;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw outer decorative ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#3D1B6E';
        ctx.fill();
        ctx.strokeStyle = '#5B3A8C';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw segments
        this.segments.forEach((segment, i) => {
            const startAngle = this.currentAngle + i * segmentAngle;
            const endAngle = startAngle + segmentAngle;

            // Draw segment fill
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = segment.color;
            ctx.fill();
            ctx.strokeStyle = '#1A0A2E';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw segment value text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + segmentAngle / 2);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 22px Nunito';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 4;
            ctx.fillText(segment.value.toString(), radius * 0.65, 6);
            ctx.restore();
        });

        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
        ctx.fillStyle = '#2D1B4E';
        ctx.fill();
        ctx.strokeStyle = '#9B59B6';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw center pink dot
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#FF69B4';
        ctx.fill();
    }

    spin() {
        if (this.spinning) return;
        this.spinning = true;

        const spinDuration = 4000 + Math.random() * 2000;
        const totalRotation = (5 + Math.random() * 5) * 2 * Math.PI;
        const startTime = performance.now();
        const startAngle = this.currentAngle;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);

            // Easing function (ease out cubic)
            const eased = 1 - Math.pow(1 - progress, 3);

            this.currentAngle = startAngle + totalRotation * eased;
            this.draw();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.spinning = false;
                const segmentAngle = (2 * Math.PI) / this.segments.length;
                let normalizedAngle = this.currentAngle % (2 * Math.PI);
                if (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;
                // The pointer is at the top (12 o'clock = -PI/2)
                let winAngle = (-Math.PI / 2 - normalizedAngle) % (2 * Math.PI);
                if (winAngle < 0) winAngle += 2 * Math.PI;
                const winIndex = Math.floor(winAngle / segmentAngle);
                const winValue = this.segments[winIndex % this.segments.length].value;

                if (this.onSpinComplete) {
                    this.onSpinComplete(winValue);
                }
            }
        };

        requestAnimationFrame(animate);
    }

    isSpinning() {
        return this.spinning;
    }

    reset() {
        this.currentAngle = 0;
        this.spinning = false;
        this.draw();
    }
}
