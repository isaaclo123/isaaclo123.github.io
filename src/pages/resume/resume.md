---
geometry: margin=1.5cm
output: pdf_document

header-includes: |
    \usepackage{enumitem}
    \usepackage{amsfonts}
    \setlist[itemize,1]{label=$\bullet$,leftmargin=1em}
    \setlist[itemize,2]{label=$\diamond$}

    \pagenumbering{gobble}

    \newcommand{\lineheader}[1]
    {
        \vspace{0.5em}
        \normalsize
        \uppercase
        {#1}
        \vspace{-0.9em}
        \linebreak
        \vspace{-0.5em}
        \hspace{-0.5em}
        \noindent\rule{\textwidth}{0.5pt}
    }
---

\Large \textbf{Isaac Lo} \hfill \normalsize isaaclo123@gmail.com \
isaaclo.site \hfill 1(650)-503-1253 \
Minneapolis MN / San Jose CA \hfill linkedin.com/in/isaac-lo-325587124

\lineheader{education}

* **University of Minnesota Twin Cities** \hfill Minneapolis, MN\
  *B.S in Computer Science, College of Science and Engineering (GPA 3.84) \hfill 2017-2020*\
  *M.S in Computer Science \hfill Projected 2020-2022*\
  Completed Coursework: Data Structures, Machine Architecture, Adv. Programming Principles,
  Program Design\
  Current Coursework: Databases, Networking, Internet Programming

\lineheader{skills}

* **Backend**: Python/Django, C/C++, Node.js, Java, SQL
* **Frontend**: HTML, Angular, Vue, React, SASS/CSS
* **Misc**: Bash, NixOS, OCaml, Ansible, Docker, Git/Gitlab, R, Nginx, RESTful

\lineheader{Work}

* **COUNTRY Financial** \hfill Minneapolis, MN\
  *Software Developer Intern \hfill Summer 2019*
    - Developed a customizable Call Dashboard Application, used in COUNTRY offices across the US.
      Wrote the software with Django, React.js, Bootstrap CSS, and HTML and deployed it with Gitlab
      pipelines and Ansible.
    - Currently migrating COUNTRY Financial's on-call system to Target's GoAlert solution with
      Docker.
\

* **Voy** \hfill Minneapolis, MN\
  *App Developer \hfill 2018*
    * Developed a GPS-guided tour application with the startup Voy with Nativescript and Vue.js.
      The app helped the company earn a TBSr Innovation award, acceptance to the YC startup school,
      and \$3000 of funding from the University of Minnesota Twin Cities.

\

* **21st Century Education** \hfill Santa Clara, CA\
  *Software Deveoper Intern \hfill 2015-2017*
    * Migrated an existing cloud server instance to server hardware. Configured a Linux OS with
      a firewall, VPN, and data storage system, reducing overall operational costs.
    * Set up a company event webpage using Jekyll, informing prospective customers and increasing
      event publicity.
    * Wrote a key company education application with AngularJS, Node, and HTML. Delivered a
      presentation to investors and shareholders about the project.

\lineheader{Projects}

* **Transcriber bot** (github.com/isaaclo123/transcriber_bot)
    * Wrote a python bot for transcribing the text within reddit image posts, helping to aid the
      visually impaired. Used machine learning with OpenCV and Pytesseract to read text from
      images, Sqlite for logging information, and coverage/pytest for testing.
\

* **InFarm** (devpost.com/software/minnehacks)
    * Created a SMS service to help farmers in developing countries advance their personal
      education and increase their agricultural productivity. Wrote the service with Twilio and
      Node.js. Submitted for Minnehack 2019.
\

* **NixOS Configuration** (github.com/isaaclo123/nix-config)
    * Created configuration files for declarative and revertable software deployments for my
      personal computer running NixOS. All configuration files are written in the Nix expression
      language, with Home-manager used for dotfile management.
\

* **My Playbook** (github.com/isaaclo123/my-playbook)
    * Created a Ansible playbook for consistent and declarative deployments of my personal
      applications to a Debian VPS instance. Used Nginx as a reverse proxy for applications like
      the ZNC IRC bouncer and the Radicale calendar server.
