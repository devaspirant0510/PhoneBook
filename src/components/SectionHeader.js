export function SectionHeader(prefix) {
    const div = document.createElement("div");
    div.className = "section-header";
    div.textContent = prefix;
    return div;
}