let searchTerm = "";
let openOnly = false;

function isClassFull(course) {
    return !course.Classification.Open;
}

function doesTermMatch(course) {
    if (searchTerm === "") {return true};
    if (course.Code.toLowerCase().includes(searchTerm) || course.Title.toLowerCase().includes(searchTerm) || course.CRN.toString().toLowerCase().includes(searchTerm) || course.Instructors.map((instructor)=>instructor.Name.toLowerCase()).join(" & ").includes(searchTerm)) {return true;}
    return false;
}

function dataToHTML(course) {
    return `<section class="course-card">
    <h2>${course.Code}: ${course.Title}</h2>
    <p class="status ${course.Classification.Open?"open":"closed"}">
        <i class="${course.Classification.Open?"fa-solid fa-circle-check":"fa-solid fa-circle-xmark"}"></i>
        ${course.Classification.Open?"Open":"Closed"} &bull; ${course.CRN} &bull; ${course.Classification.Open?"Seats Available: "+(course.EnrollmentMax-course.EnrollmentCurrent):"Number on Waitlist: "+(course.WaitlistMax-course.WaitlistAvailable)}
    </p>
    <p>
        ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour${course.Hours==1?"":"s"}
    </p>
    <p>
        <strong>${course.Instructors.map((instructor)=>instructor.Name).join(" & ")}</strong>
    </p>
</section>`;
}

function showMatchingCourses() {
    let courses = document.querySelector(".courses");
    courses.innerHTML = "";
    let matches = courseList.filter((course)=>doesTermMatch(course)&&!(openOnly&&isClassFull(course)));
    if (matches.length==0) {
        courses.textContent = "No courses match your search.";
        return;
    };
    matches.forEach(match => {courses.insertAdjacentHTML("beforeend",dataToHTML(match))});
}

function filterCourses() {
    searchTerm = document.getElementById("search_term").value.toLowerCase();
    openOnly = document.getElementById("is_open").checked;
    showMatchingCourses();
}