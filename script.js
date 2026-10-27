const courseSearch = document.querySelector("#courseSearch");
const filterButtons = document.querySelectorAll(".filter-button");
const courseCards = [...document.querySelectorAll(".course-item")];
const courseResult = document.querySelector("#courseResult");
const noCourses = document.querySelector("#noCourses");
const currentYear = document.querySelector("#currentYear");

let activeFilter = "all";

function updateCourses() {
  if (!courseSearch || !courseResult || !noCourses) return;

  const searchTerm = courseSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  courseCards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = !searchTerm || `${card.textContent} ${card.dataset.search}`.toLowerCase().includes(searchTerm);
    const isVisible = matchesFilter && matchesSearch;

    card.classList.toggle("d-none", !isVisible);
    if (isVisible) visibleCount += 1;
  });

  courseResult.textContent = visibleCount === courseCards.length
    ? `Showing all ${visibleCount} courses`
    : activeFilter === "civil" && !searchTerm
      ? `Showing ${visibleCount} civil engineering and construction courses`
      : `Showing ${visibleCount} of ${courseCards.length} courses`;
  noCourses.classList.toggle("d-none", visibleCount !== 0);
}

courseSearch?.addEventListener("input", updateCourses);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    updateCourses();
  });
});

if (currentYear) currentYear.textContent = String(new Date().getFullYear());
