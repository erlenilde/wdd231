const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

function displayCourseDetails(course) {
    const courseDetails = document.getElementById("course-details");
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(", ")}</p>
    `;
    courseDetails.showModal();

    // Botão para fechar o modal
    document.getElementById("closeModal").onclick = () => courseDetails.close();
}    

const renderCourses = (courses) => {
    const container = document.getElementById('courseContainer');
    container.innerHTML = "";
    courses.forEach((course) => {

        const card = document.createElement("div");
        card.classList.add("course-card");

        card.innerHTML = `
            <h4>${course.subject} ${course.number}</h4> 
            
        `; 
        //- ${course.title}//
        /*<p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p>${course.description}</p>*/

        if (course.completed) {
            card.classList.add("completed-course");
        }

        card.addEventListener("click", () => {
            displayCourseDetails(course);
        });

        container.appendChild(card);
    });

    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const creditDisplay = document.getElementById("creditTotal");
    if (creditDisplay) {
        creditDisplay.textContent = `Total credits: ${totalCredits}`;
    }
}



renderCourses(courses);

document.addEventListener("DOMContentLoaded", () => {
    renderCourses(courses);

    const btnall = document.getElementById("btnall");
    const btnwdd = document.getElementById("btnwdd");
    const btncse = document.getElementById("btncse");

    btnall.addEventListener("click", () => renderCourses(courses));
    btnwdd.addEventListener("click", () => {
        const filtered = courses.filter(course => course.subject === "WDD");
        renderCourses(filtered);
    });
    btncse.addEventListener("click", () => {
        const filtered = courses.filter(course => course.subject === "CSE");
        renderCourses(filtered);
    });
})


