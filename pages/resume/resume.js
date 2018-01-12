let slides; // eslint-disable-line no-unused-vars

function load() { // eslint-disable-line no-unused-vars
  const slideData = [
    /*
    {
      title: 'Education',
      description: (
        '<p><b>University of Minnesota</b>' +
        '<br><u>Computer Science</u> Major' +
        '<br>GPA: <u>3.81</u></p>' +
        '<p><b>Leland High School</b>' +
        '<br><u>National Merit Finalist</u>' +
        '<br>GPA: <u>3.84</u></p>'
      ),
    },
    */
    {
      title: 'Education',
      description: (
        '<ul>' +
        '<li><b>University of Minnesota</b>' +
        '<br><u>Computer Science</u> Major' +
        '<br>GPA: <u>3.81</u></li>' +
        '<li><b>Leland High School</b>' +
        '<br><u>National Merit Finalist</u>' +
        '<br>GPA: <u>3.84</u></li>' +
        '</ul>'
      ),
    },
    {
      title: 'Work<br>Experience',
      description: (
        '<p><b>Interim Software Developer</b>' +
        '<br><b>(21st Century Education)</b>' +
        '<br>Installed a company <u>server</u>' +
        '<br>Set up a company <u>event page</u>' +
        '<br>Wrote code for <u>21Vocab</u></p>'
      ),
    },
    {
      title: 'Teaching<br>Experience',
      description: (
        '<ul>' +
        '<li><b>Math and Coding</b> (2015-16)' +
        '<br>Taught <u>Tkinter</u> to children' +
        '<br>at San Jose Library</li>' +
        '<li><b>Coding for Fun</b> (Fall 2015)' +
        '<br>Taught <u>Scratch</u> to children' +
        '<br>at Carden Academy Almaden</li>' +
        '</ul>'
      ),
    },
    {
      title: 'Activities',
      description: (
        '<ul>' +
        '<li><b>Chair</b> (2015-17)' +
        '<br>Leland Congressional Debate</li>' +
        '<li><b>Secretary</b> (2015-17)' +
        '<br>Leland Magic Club</li>' +
        '<li><b>Secretary</b> (2014-16)' +
        '<br>Leland Domino Club</li>' +
        '</ul>'
      ),
    },
    {
      title: 'Skills',
      description: (
        '<ul>' +
        '<li><b>Backend</b>: Python, Django' +
        '<br>Java, SQL</li>' +
        '<li><b>Frontend</b>: HTML, CSS, JS,' +
        '<br>AngularJS, Vue.js, Jekyll</li>' +
        '<li><b>Misc</b>: Linux, Git, GPG' +
        '<br>SSH, Pandoc, LATEX</li>' +
        '</ul>'
      ),
    },
  ];
  slides = new Slides(slideData); // eslint-disable-line no-unused-vars,no-undef
}
