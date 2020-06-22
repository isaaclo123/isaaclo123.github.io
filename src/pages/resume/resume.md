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
  *B.S. in Computer Science, College of Science and Engineering (GPA 3.82) \hfill Sept 2017 -
  May 2021*\
  Coursework: Data Structures, Machine Architecture, Adv. Programming Principles, Program Design,
  Databases, Networking, Internet Programming, AI, Machine Learning, Software Engineering

\lineheader{skills}

* **Backend**: Python/Django/Flask, C/C++, Node.js, Java, SQL
* **Frontend**: HTML, Angular, Vue, React, SASS/CSS, Typescript
* **Misc**: Bash, NixOS, OCaml, Ansible, Docker, Git/Gitlab, Nginx, RESTful, AWS

\lineheader{Work}

* **COUNTRY Financial** \hfill Minneapolis, MN\
  *Software Developer Intern \hfill Summer 2019*
    * Reduced call response times by developing a call monitoring dashboard application with
      customizable filters and message alerts. Written with Django, React.js, Bootstrap CSS, and
      HTML. Deployed the code with Gitlab pipelines and Ansible. The application is currently
      running in production in COUNTRY offices across the US.
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
    * Reduced operational costs by migrating data and applications to a cloud service provider.
      Configured a Linux OS with a firewall, VPN, and data storage system.
    * Increased event publicity by setting up a company event webpage with Jekyll.

\lineheader{Projects}

* **Receipt Splitter** (github.com/isaaclo123/receipt-split)
    * Wrote a web application enabling the easy and precise splitting of receipt costs. Allows for
      the easy sharing of receipt costs and splitting the cost of individual receipt items amongst
      users. Written with Typescript, Redux, React.js, Flask, and sqlite.

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

* **Personal Webpage** (github.com/isaaclo123/isaaclo123.github.io)
    * Designed and created my own personal webpage. Wrote the website with SASS, CSS, Webpack, and
      Javascript. Used minification and cached assets for web optimization.

\

* **System Configurations** (github.com/isaaclo123/nix-config) & (github.com/isaaclo123/my-playbook)
    * Created configuration files for declarative software deployments for my personal computer and
      VPS instance. Personal computer configurations are written with the NixOS declarative language
      and the VPS configurations are written with Ansible.
