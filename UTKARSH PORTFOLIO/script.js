// JavaScript for adding interactivity or dynamic content

// Example: Alert on page load
window.addEventListener('load', () => {
    alert('Welcome to Utkarsh’s Portfolio!');
});

// Example: Add hover effect to section headings
document.querySelectorAll('.section-heading').forEach(heading => {
    heading.addEventListener('mouseover', () => {
        heading.style.color = '#2E7D32';
    });

    heading.addEventListener('mouseout', () => {
        heading.style.color = '#4CAF50';
    });
});
