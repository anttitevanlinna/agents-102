(function () {
    'use strict';

    function collapseTheoryPrompts() {
        document.querySelectorAll('body.theory-handbook .prompt-block').forEach(function (block) {
            if (block.closest('details.theory-prompt')) return;

            var details = document.createElement('details');
            details.className = 'theory-prompt';

            var summary = document.createElement('summary');
            summary.className = 'theory-prompt__summary';
            summary.textContent = 'Prompt';
            var header = block.querySelector(':scope > .prompt-block__header');
            if (header) {
                header.remove();
            }

            block.replaceWith(details);
            details.appendChild(summary);
            details.appendChild(block);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', collapseTheoryPrompts, { once: true });
    } else {
        collapseTheoryPrompts();
    }
}());
