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
https://loisa.ac \hfill 1(650)-503-1253 \
Baton Rouge LA / San Jose CA \hfill linkedin.com/in/isaac-lo-325587124

\lineheader{education}

* **University of Minnesota Twin Cities** \hfill Minneapolis, MN\
  *B.S. in Computer Science, College of Science and Engineering (GPA 3.82) \hfill Sept 2017 -
  May 2020*
* **Coursework**: Data Structures, Machine Architecture, Adv. Programming Principles, Program 
  Design,
  Databases, Networking, Internet Programming, AI, Machine Learning, Software Engineering

\lineheader{skills}

* **Backend**: Python/Django/Flask, C/C#/C++, Rust, Node.js, Java, Spring Bean, SQL, DynamoDB
* **Frontend**: HTML, Angular, Vue, React, SASS/CSS, Typescript
* **Misc**: Bash, NixOS, OCaml, Ansible, Docker, Git/Gitlab, Nginx, RESTful, AWS, GCP

\lineheader{Work}

* **Coursedog** \hfill Remote \
  *Senior Software Engineer \hfill April 2026 -- Current*
    * Architecting and developing full-stack features using Vue.js, Node.js, and MongoDB to deliver a next-generation Course Evaluation platform for higher education institutions.
    * Spearheading AI-driven development to accelerate and modernize student feedback analytics.

* **ClassRanked** \hfill Remote \
  *Senior Software Engineer \hfill Feb 2023 -- April 2026*
    * Owned end-to-end architecture, UI/UX design, full-stack development (Python, React), and AWS cloud deployment for the core Course Evaluation SaaS platform.
    * Scaled the product from its initial customer to 15+ university clients, directly driving product-market fit and growth leading to the company's acquisition by Coursedog.

* **Beckman Coulter** \hfill Minneapolis, MN\
  *Software Engineer \hfill May 2021 - Feb 2023*
    * Writing and maintaining C# code for the Beckman Coulter Immunoassay Analyzer instrument UI.
    * Took charge of Unit Test parallelization efforts, cutting UT pipeline run times by 50%, increasing
      developer productivity.
    * Wrote Powershell scripts to automate the installation and testing of new language translation packs.

* **Cognizant** \hfill Minneapolis, MN\
  *Software Developer \hfill Nov 2020 - May 2021*
    * Wrote AWS Cloudformation templates to create a code pipeline for automated deployment of a 
      web application. Developed a Java Spring Boot application connected to Amazon DynamoDB.
    * Solved user issues in client applications in Microsoft Access, Ruby on Rails, Spring, and 
      SQL.

* **COUNTRY Financial** \hfill Minneapolis, MN\
  *Software Developer Intern \hfill Summer 2019*
    * Reduced call response times by developing a call monitoring dashboard application with
      customizable filters and message alerts. Written with Django, React.js, Bootstrap CSS, and
      HTML. Deployed the code with Gitlab pipelines and Ansible. The application is currently
      running in production in COUNTRY offices across the US.

\lineheader{Projects}

* **Interactive Book Blanket** (dearyall.net/book-blanket-2025)
    * Engineered a responsive, interactive web application allowing users to explore reading history
      through a dynamic digital quilt interface.

* **Receipt Splitter** (github.com/isaaclo123/receipt-split)
    * Wrote a web application enabling the easy and precise splitting of receipt costs. Allows for
      the easy sharing of receipt costs and splitting the cost of individual receipt items amongst
      users. Written with Typescript, Redux, React.js, Flask, and SQL. Deployed with Docker, 
      Ansible, and Travis CI to Google Cloud Compute.

* **Transcriber bot** (github.com/isaaclo123/transcriber_bot)
    * Wrote a python bot for transcribing the text within reddit image posts, aiding the
      visually impaired. Used OpenCV and Pytesseract to read text from images, Sqlite for logging
      information, and coverage/pytest for testing.

* **InFarm** (devpost.com/software/minnehacks)
    * Created a SMS service to help farmers in developing countries advance their personal
      education and increase their agricultural productivity. Wrote the service with Twilio and
      Node.js. Submitted for Minnehack 2019.
