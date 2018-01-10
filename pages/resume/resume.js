let slides; // eslint-disable-line no-unused-vars

function load() { // eslint-disable-line no-unused-vars
  const slideData = [
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
    /*
      ),
        '<ul>' +
        '<li><b>University of Minnesota</b>' +
        '<br><u>Computer Science</u> Major' +
        '<br>GPA: <u>3.81</u></li>' +
        '<li><b>Leland High School</b>' +
        '<br><u>National Merit Finalist</u>' +
        '<br>GPA: <u>3.84</u></li>' +
        '</ul>'
    },
     *
    */
    /*
    {
      title: 'Former Education',
      description: ('<b>Leland High School</b>' +
        '<br><u>National Merit Finalist</u>' +
        '<br>GPA: <u>3.84</u>'),
    },*/
  ];
  slides = new Slides(slideData); // eslint-disable-line no-unused-vars,no-undef
}
