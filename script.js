document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Download handler
    const downloadIcon = document.querySelector('.download-icon');
    if (downloadIcon) {
        downloadIcon.addEventListener('click', function() {
            const link = document.createElement('a');
            console.log('clicked download icon');
            link.href = 'example.txt';
            link.download = 'example.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab and corresponding pane
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Signature Canvas Setup
    const canvas = document.getElementById('signatureCanvas');
    if (!canvas) return; // Exit if canvas is not found

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function resizeCanvas() {
        const container = canvas.parentElement;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Reset context properties after resize
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }

    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        lastX = x;
        lastY = y;
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastX = x;
        lastY = y;
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e.touches[0]);
    });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    });
    canvas.addEventListener('touchend', stopDrawing);

    // Initial setup and resize handling
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Handle tab changes to ensure canvas is properly sized
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.getAttribute('data-tab') === 'referencia') {
                setTimeout(resizeCanvas, 0);
            }
        });
    });
});
