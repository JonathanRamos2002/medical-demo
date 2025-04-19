document.addEventListener('DOMContentLoaded', function() {
    const addRecordBtn = document.querySelector('.add-record-btn');
    const timelineContainer = document.querySelector('.medical-timeline');
    
    function checkScroll() {
        // Calculate how far we've scrolled
        const scrolled = window.scrollY + window.innerHeight;
        // Get the total scrollable height
        const totalHeight = document.documentElement.scrollHeight;
        // Calculate the threshold (20px from bottom)
        const threshold = totalHeight - 20;

        // Show button only when we're near the bottom
        if (scrolled >= threshold) {
            addRecordBtn.classList.add('visible');
        } else {
            addRecordBtn.classList.remove('visible');
        }
    }
    
    let timeout;
    window.addEventListener('scroll', function() {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(function() {
            checkScroll();
        });
    });
    

    // Add new timeline entry functionality
    addRecordBtn.addEventListener('click', function() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('es-SV', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const newTimelineItem = document.createElement('div');
        newTimelineItem.className = 'timeline-item';
        newTimelineItem.innerHTML = `
            <div class="timeline-date">${formattedDate}</div>
            <div class="timeline-content">
                <h3 class="timeline-title">
                    <span contenteditable="true" class="edit-title">Nueva Entrada</span>
                    <span class="download-icon">↓</span>
                </h3>
                <p contenteditable="true" class="edit-placeholder">Haga clic aquí para agregar contenido...</p>
            </div>
        `;

        // Handle title editing
        const titleElement = newTimelineItem.querySelector('.edit-title');
        titleElement.addEventListener('focus', function() {
            if (this.textContent.trim() === 'Nueva Entrada') {
                this.textContent = '';
            }
        });

        titleElement.addEventListener('blur', function() {
            if (this.textContent.trim() === '') {
                this.textContent = 'Nueva Entrada';
            }
        });

        // Handle content editing
        const contentElement = newTimelineItem.querySelector('.edit-placeholder');
        contentElement.addEventListener('focus', function() {
            if (this.textContent.trim() === 'Haga clic aquí para agregar contenido...') {
                this.textContent = '';
            }
        });

        contentElement.addEventListener('blur', function() {
            if (this.textContent.trim() === '') {
                this.textContent = 'Haga clic aquí para agregar contenido...';
            }
        });

        // Insert at the top of the timeline
        timelineContainer.insertBefore(newTimelineItem, timelineContainer.firstChild);

        // Scroll the new entry into view with smooth animation
        newTimelineItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Focus on the editable title
        setTimeout(() => {
            titleElement.focus();
        }, 500);
    });

    // Check initial position
    checkScroll();
}); 