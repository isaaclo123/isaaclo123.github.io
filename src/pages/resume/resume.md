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
  *B.S. in Computer Science, College of Science and Engineering (GPA 3.86) \hfill Sept 2017 -
  May 2020*\
  Completed Coursework: Data Structures, Machine Architecture, Adv. Programming Principles,
  Program Design, Databases, Networking, Internet Programming\
  Current Coursework: AI, Machine Learning, Software Engineering

\lineheader{skills}

* **Backend**: Python/Django, C/C++, Node.js, Java, SQL
* **Frontend**: HTML, Angular, Vue, React, SASS/CSS
* **Misc**: Bash, NixOS, OCaml, Ansible, Docker, Git/Gitlab, R, Nginx, RESTful

\lineheader{Work}

* **COUNTRY Financial** \hfill Minneapolis, MN\
  *Software Developer Intern \hfill Summer 2019*
    * Increased call response times by developing a customizable call monitoring dashboard
      application with message alerts. Written with Django, React.js, Bootstrap CSS, HTML. Deployed
      with Gitlab pipelines and Ansible.
    * Currently working to improve on-call system efficiency by migrating COUNTRY Financial's
      on-call system to Target's GoAlert. Wrote an Ansible playbook for deploying Goalert and a
      Postgres database to a server.
\

* **Voy** \hfill Minneapolis, MN\
  *App Developer \hfill 2018*
    * Developed a GPS-guided tour application prototype with the startup Voy for Minnedemo 2018.
      The app helped the company earn a TBSr Innovation award, acceptance to the YC startup
      school, and \$3000 of funding from the University of Minnesota Twin Cities. Written with
      Nativescript and Vue.js

\

* **21st Century Education** \hfill Santa Clara, CA\
  *Software Developer Intern \hfill 2015-2017*
    * Reduced operational costs by migrating an existing cloud server instance to server hardware.
      Configured a Linux OS with a firewall, VPN, and data storage system.
    * Increased event publicity by setting up a company event webpage with Jekyll.

\lineheader{Projects}

* **Receipt Splitter** (github.com/isaaclo123/receipt-split)
    * Wrote a web application enabling the easy and precise splitting of receipt costs. Allows for
      the sharing of receipt costs and splitting the cost of individual receipt items amongst users.
      Written with Typescript, Redux, React.js, Flask, and sqlite.

\

* **Transcriber bot** (github.com/isaaclo123/transcriber_bot)
    * Wrote a python bot for transcribing the text within reddit image posts, aiding the
      visually impaired. Used OpenCV and Pytesseract to read text from images, Sqlite for logging
      information, and coverage/pytest for testing.
\

* **InFarm** (devpost.com/software/minnehacks)
    * Created a SMS service to help farmers in developing countries advance their personal
      education and increase their agricultural productivity. Wrote the service with Twilio and
      Node.js. Submitted for Minnehack 2019.
\

* **System Configurations** (github.com/isaaclo123/nix-config) & (github.com/isaaclo123/my-playbook)
    * Created configuration files for declarative software deployments for my personal computer and
      VPS instance. Personal computer configurations are written with the NixOS declarative language
      and the VPS configurations are written with Ansible.
