const skills = Array.from(document.querySelectorAll('.skill'));
let activeSkill = null;

function getRowTop(el) {
    return el.getBoundingClientRect().top;
}

// Cache collapsed heights once
skills.forEach(skill => {
    skill.dataset.collapsedHeight = skill.offsetHeight;
    skill.style.height = `${skill.dataset.collapsedHeight}px`;
});

skills.forEach(skill => {
    const desc = skill.querySelector('.skill-desc');

    skill.addEventListener('click', () => {
        const rowTop = getRowTop(skill);

        // Collapse previously active skill
        if (activeSkill && activeSkill !== skill) {
            activeSkill.classList.remove('active');
            activeSkill.style.height = `${activeSkill.dataset.collapsedHeight}px`;
        }

        const isActive = skill.classList.contains('active');

        // Lock heights of siblings in the same row
        skills.forEach(other => {
            if (getRowTop(other) === rowTop && other !== skill) {
            other.style.height = `${other.dataset.collapsedHeight}px`;
            }
        });

        if (!isActive) {
            skill.classList.add('active');
            const expandedHeight = parseInt(skill.dataset.collapsedHeight) + desc.scrollHeight;
            skill.style.height = `${expandedHeight}px`;
            activeSkill = skill;
        } else {
            skill.classList.remove('active');
            skill.style.height = `${skill.dataset.collapsedHeight}px`;
            activeSkill = null;
        }
    });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();