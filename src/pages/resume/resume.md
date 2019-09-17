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
https://isaaclo.site \hfill 1(650)-503-1253 \
Minneapolis MN / San Jose CA \hfill linkedin.com/in/isaac-lo-325587124

\lineheader{education}

* **University of Minnesota Twin Cities** \hfill Minneapolis, MN\
  *B.S in Computer Science, College of Science and Engineering (GPA 3.84) \hfill 2017-2020*\
  Completed Coursework: Data Structures, Machine Architecture, Adv. Programming Principles,
  Program Design\
  Current Coursework: Databases, Networking, Internet Programming

\lineheader{skills}

* **Tools**: Git/Gitlab, Ansible, Docker, Apache, Nginx, Bash, NixOS, Electron, RESTful, GraphQL, R
* **Languages**: Python/Django, Node.js, Angular, Vue, React, HTML, SASS/CSS, Bootstrap, Java,
  C/C++, OCaml, SQL

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

* **My Playbook** [https://github.com/isaaclo123/my-playbook](https://github.com/isaaclo123/my-playbook)
    * Created a Ansible playbook for deploying my personal applications to a debian VPS instance.
      Used Nginx as a reverse proxy for applications like the ZNC IRC bouncer and the Radicale
      calendar server.
* **NixOS Configuration** [https://github.com/isaaclo123/nix-config](https://github.com/isaaclo123/nix-config)
    * Created configuration files for automated and revertable software deployments for my
      personal computer running NixOS. NixOS is a linux distribution "with reliable and
      reproducable" package management allowing "atomic upgrades and rollbacks". All configuration
      files are written in the Nix expression language, and home-manager is used to manage
      user-space configuration.
* **Transcriber_bot**
  [https://github.com/isaaclo123/transcriber_bot](https://github.com/isaaclo123/transcriber_bot)
    * Wrote a python bot for transcribing the text within reddit image posts, helping to aid the
      visually impaired. Used machine learning with OpenCV and Pytesseract to read text from
      images, Sqlite for logging information, and coverage/pytest for testing.
* **Leaflet**
  [https://github.com/Zarkoix/LeafletServer/](https://github.com/Zarkoix/LeafletServer/)
    * Collaborated with a fellow student to create a minimalistic note-taking web application.
      Wrote Django code for the application's RESTful/GraphQL backend.
* **Prepdbot**
  [https://github.com/isaaclo123/prepdbot_v3/](https://github.com/isaaclo123/prepdbot_v3/)
    * Wrote a python article-saving web-scraping bot for the Prepd Extemp Offline software. The bot
      saved and tagged over 500 articles a week, supporting Extemporaneous Speech team members in
      their preparation.
