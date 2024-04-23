var courseCount = 0;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("lightTheme").addEventListener("click", toggleTheme);
  document.getElementById("darkTheme").addEventListener("click", toggleTheme);
  document.getElementById("homeButton").addEventListener("click", redirectToHomePage);
  document.getElementById("userIcon").addEventListener("click", redirectToLoginPage);
  getCourses();
});

function redirectToLoginPage() {
  window.location.href = "login.html"; 
}

function redirectToHomePage() {
  window.location.href = "index.html";
}

function getCourses() {
  let table = document.getElementById("courseTable");
  courseCount = Number(localStorage.getItem("courseCount"));
  for (let i = 1; i <= courseCount; i++) {

    if (localStorage.getItem("courseName" + i) == null) {
      continue;
    }

    console.log(i);
    console.log(localStorage.getItem("courseName" + i));
    console.log(localStorage.getItem("courseTime" + i));
    console.log(localStorage.getItem("courseInstructor" + i));
    console.log(localStorage.getItem("courseEducation" + i));

    let editing = false;

    tray = document.createElement("tr");
    tray.id = i;

    let courseName = document.createElement("td");
    courseName.id = "courseName" + i;
    let courseNameText = document.createTextNode(localStorage.getItem("courseName" + i));
    courseNameText.id = "courseNameText" + i;

    let courseTime = document.createElement("td");
    courseTime.id = "courseTime" + i;
    let courseTimeText = document.createTextNode(localStorage.getItem("courseTime" + i));
    courseTimeText.id = "courseTimeText" + i;

    let courseInstructor = document.createElement("td");
    courseInstructor.id = "courseInstructor" + i;
    let courseInstructorText = document.createTextNode(localStorage.getItem("courseInstructor" + i));
    courseInstructorText.id = "courseInstructorText" + i;

    let courseEducation = document.createElement("td");
    courseEducation.id = "courseEducation" + i;
    let courseEducationText = document.createTextNode(localStorage.getItem("courseEducation" + i));
    courseEducationText.id = "courseEducationText" + i;

    let courseOptions = document.createElement("td");
    let courseEdit = document.createElement("button");
    let courseEditText = document.createTextNode("Editar");
    let courseDelete = document.createElement("button");
    let courseDeleteText = document.createTextNode("Deletar");

    courseEdit.addEventListener('click', () => {
      if (editing == false) {
        editing = true;
        let editTray = document.getElementById(i);

        let nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.value = localStorage.getItem("courseName" + i);
        nameInput.id = "nameInput" + i;
        editTray.cells[0].appendChild(nameInput);

        let timeInput = document.createElement("input");
        timeInput.setAttribute("type", "number");
        timeInput.id = "timeInput" + i;
        timeInput.value = localStorage.getItem("courseTime" + i);
        editTray.cells[1].appendChild(timeInput);

        let instrInput = document.createElement("input");
        instrInput.setAttribute("type", "text");
        instrInput.id = "instrInput" + i;
        instrInput.value = localStorage.getItem("courseInstructor" + i);
        editTray.cells[2].appendChild(instrInput);

        let educInput = document.createElement("select");
        educInput.id = "educInput" + i;

        let tecInput = document.createElement("option");
        tecInput.setAttribute("value", "Tecnologo");
        tecInput.text = "Tecnologo";
        educInput.appendChild(tecInput);

        let profInput = document.createElement("option");
        profInput.setAttribute("value", "Profissionalizante");
        profInput.text = "Profissionalizante";
        educInput.appendChild(profInput);

        let supInput = document.createElement("option");
        supInput.setAttribute("value", "EnsinoSuperior");
        supInput.text = "Ensino superior";
        educInput.appendChild(supInput);

        editTray.cells[3].appendChild(educInput);

        courseNameText.remove();
        courseTimeText.remove();
        courseInstructorText.remove();
        courseEducationText.remove();
      }
      else {
        editing = false;

        let nameInput = document.getElementById("nameInput" + i);
        let timeInput = document.getElementById("timeInput" + i);
        let instrInput = document.getElementById("instrInput" + i);
        let educInput = document.getElementById("educInput" + i);

        let newName = nameInput.value;
        let newTime = timeInput.value;
        let newInstr = instrInput.value;
        let newEduc = educInput.options[educInput.selectedIndex].text;

        localStorage.setItem("courseName" + i, newName);
        localStorage.setItem("courseTime" + i, newTime);
        localStorage.setItem("courseInstructor" + i, newInstr);
        localStorage.setItem("courseEducation" + i, newEduc);

        window.location.reload();
      }
    });

    courseDelete.addEventListener('click', () => {
      let tray = document.getElementById(i);
      tray.remove();

      let name = localStorage.getItem("courseName" + i);
      localStorage.removeItem("courseName" + i);
      localStorage.removeItem("courseTime" + i);
      localStorage.removeItem("courseInstructor" + i);
      localStorage.removeItem("courseEducation" + i);

      localStorage.setItem("courseCount", courseCount);

      window.alert("Curso de " + name + " deletado com sucesso!");

      location.reload();
    });

    courseName.appendChild(courseNameText);
    courseTime.appendChild(courseTimeText);
    courseInstructor.appendChild(courseInstructorText);
    courseEducation.appendChild(courseEducationText);
    courseEdit.appendChild(courseEditText);
    courseDelete.appendChild(courseDeleteText);

    courseOptions.appendChild(courseEdit);
    courseOptions.appendChild(courseDelete);

    tray.appendChild(courseName);
    tray.appendChild(courseTime);
    tray.appendChild(courseInstructor);
    tray.appendChild(courseEducation);
    tray.appendChild(courseOptions);

    table.appendChild(tray);
  }
}

function addCourse() {
  let name = document.getElementById("CourseName").value;
  let time = document.getElementById("CourseTime").value;
  let instructor = document.getElementById("CourseInstructor").value;
  let education;
  if (document.getElementById("Tecnologo").checked) {
    education = "Tecnologo";
  }
  else if (document.getElementById("Profissionalizante").checked) {
    education = "Profissionalizante";
  }
  else if (document.getElementById("EnsinoSuperior").checked) {
    education = "Ensino Superior";
  }

  if (time <= 0) {
    window.alert("Insira um número de horas válido.");
  }
  else {
    courseCount++;

    localStorage.setItem("courseCount", courseCount);

    localStorage.setItem("courseName" + courseCount, name);
    localStorage.setItem("courseTime" + courseCount, time);
    localStorage.setItem("courseInstructor" + courseCount, instructor);
    localStorage.setItem("courseEducation" + courseCount, education);

    window.alert("Curso criado com sucesso!");
  }
}

// function getLastSessionTheme() {
//   let currentTheme = localStorage.getItem("siteTheme");
//   if (currentTheme == 1) {
//     switchLightTheme();
//   }
//   else {
//     switchDarkTheme();
//   }
// }

// function switchLightTheme() {
//   document.getElementById("site").className = "lightTheme";
//   localStorage.setItem("siteTheme", 1);
// }

// function switchDarkTheme() {
//   document.getElementById("site").className = "darkTheme";
//   localStorage.setItem("siteTheme", 0);
// }

function toggleTheme() {
  const body = document.body;
  const lightTheme = "lightTheme";
  const darkTheme = "darkTheme";

  if (body.classList.contains(lightTheme)) {
    body.classList.remove(lightTheme);
    body.classList.add(darkTheme);

    localStorage.setItem("theme", darkTheme);
  } else {
    body.classList.remove(darkTheme);
    body.classList.add(lightTheme);

    localStorage.setItem("theme", lightTheme);
  }
}

window.onload = function () {
  const theme = localStorage.getItem("theme");
  if (theme) {
    document.body.classList.add(theme);
  }
};
