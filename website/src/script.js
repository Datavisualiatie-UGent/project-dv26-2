window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.footnote-ref a').forEach(link => {
        const targetId = link.getAttribute('href');

        // Safety check
        if (!targetId || !targetId.startsWith('#')) return;

        // Find the footnote at the bottom of the page
        const targetFootnote = document.querySelector(targetId);

        if (targetFootnote) {
            // Extract the text and clean up the return arrow
            let text = targetFootnote.textContent.replace('↩︎', '').replace('↩', '').trim();
            link.parentElement.setAttribute('data-tooltip', text);
        }
    });
});