<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { asset } from '$app/paths';

  let activeSection = $state('home');
  let isMenuOpen = $state(false);
  let isScrolled = $state(false);
  let darkMode = $state(true);
  let showBackToTop = $state(false);

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      darkMode = savedTheme === 'dark';
    }

    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
      showBackToTop = window.scrollY > 400;
      
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) activeSection = current;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  /**
     * @param {string} id
     */
  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      isMenuOpen = false;
    }
  }

  function toggleTheme() {
    darkMode = !darkMode;
    if (browser) {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }
  }

  const skills = {
    backend: ['.NET 8', 'ASP.NET Core', 'Node.js', 'REST APIs', 'CQRS', 'Clean Architecture'],
    databases: ['PostgreSQL', 'SQL Server', 'Redis', 'Query Optimization', 'Indexing'],
    languages: ['C#', 'TypeScript', 'JavaScript', 'Python', 'SQL'],
    frontend: ['React', 'React Native', 'Expo', 'Svelte', 'Tailwind CSS'],
    infrastructure: ['Docker', 'Linux', 'Jenkins', 'CI/CD', 'IIS'],
    tools: ['Git', 'Bitbucket', 'Unit Testing', 'Integration Testing', 'Microservices']
  };

  const projects = [
    {
      title: 'Internal Retrospective Platform',
      description: 'Built a comprehensive retrospective platform adopted by all Scrum teams, replacing existing Confluence workflows and improving team collaboration efficiency.',
      tech: ['.NET 8', 'React', 'PostgreSQL'],
      impact: 'Adopted by all teams',
      image: asset('/projects/retrospective-platform.jpg')
    },
    {
      title: 'API Monitoring',
      description: 'Developed an monitoring tool for DevOps teams.',
      tech: ['React'],
      impact: 'Improved Monitoring',
      image: asset('/projects/api-monitoring.jpg')
    },
    {
      title: 'Log Viewer',
      description: 'Developed log viewer with in-app decryption capabilities, significantly accelerating debugging workflows for QA and Dev teams.',
      tech: ['React', 'Decryption'],
      impact: 'Accelerated debugging',
      image: asset('/projects/log-viewer.jpg')
    },
    {
      title: 'Online Learning Platform',
      description: 'Deployed a full-featured learning management system on Linux VPS, managing the complete DevOps lifecycle from setup to monitoring.',
      tech: ['Moodle', 'React Router 7', 'Express', 'React', 'Linux'],
      impact: 'Full DevOps lifecycle',
      image: asset('/projects/learning-platform.jpg')
    },
    {
      title: 'Database Performance Tool',
      description: 'Engineered a specialized tool for legacy MultiValue systems with custom logic to dynamically resize files and eliminate storage fragmentation.',
      tech: ['MultiValue DB', 'Performance', 'Optimization'],
      impact: 'Eliminated fragmentation',
      image: asset('/projects/db-performance.jpg')
    }
  ];

  const experiences = [
    {
      role: 'Software Developer',
      company: 'Contour Software',
      period: 'Feb 2024 – Present',
      achievements: [
        'Built a high-performance customer search API over 5M+ PostgreSQL records, achieving near-Elasticsearch response times via indexing and query-plan optimization',
        'Architected nightly SFTP data sync pipeline with delta updates, reducing processing time and storage usage for large datasets',
        'Led React Native to Expo migration, improving build reliability and deployment consistency',
        'Refactored legacy ERP system (PICK/Basic, Windows Forms), reducing technical debt and improving maintainability'
      ]
    },
    {
      role: 'Junior Software Developer',
      company: 'Contour Software',
      period: 'Jul 2022 – Feb 2024',
      achievements: [
        'Developed ASP.NET Core REST APIs using CQRS and clean architecture principles',
        'Optimized PostgreSQL performance through execution-plan analysis and strategic indexing',
        'Implemented comprehensive unit and integration tests, achieving 100% coverage and significantly improving release stability',
        'Built CRM UI components using React and Material UI, enhancing user experience'
      ]
    },
    {
      role: 'Junior SQA Analyst',
      company: 'Contour Software',
      period: 'Mar 2022 – Jul 2022',
      achievements: [
        'Develop comprehensive test cases covering functional, non-functional, and user interface aspects of software applications, ensuring thorough testing and high-quality releases',
        'Leverage automation frameworks like Selenium to develop and execute automated tests for web applications, improving test coverage, efficiency, and regression testing capabilities'
      ]
    },
    {
      role: 'SQA Trainee',
      company: 'Contour Software',
      period: 'Dec 2021 – Mar 2022',
      achievements: [
        'Used the Selenium framework for automating test execution, reducing manual testing effort and improving test coverage'
      ]
    }
  ];

  const education = [
    {
      degree: 'MS Artificial Intelligence',
      school: 'FAST NUCES',
      period: 'Aug 2025 – Present',
      details: null,
      logo: 'https://upload.wikimedia.org/wikipedia/en/e/e4/National_University_of_Computer_and_Emerging_Sciences_logo.png'
    },
    {
      degree: 'BS Computer Science',
      school: 'Mohammad Ali Jinnah University',
      period: '2018 – 2022',
      details: 'CGPA: 3.92/4.0 | Silver Medalist | 2nd Position FYP Exhibition',
      logo: 'https://upload.wikimedia.org/wikipedia/en/8/81/MAJU-LOGO.jpg'
    }
  ];
</script>

<svelte:head>
  <title>Mehdi Abbas - Software Developer</title>
  <meta name="description" content="Software Developer with 3.5+ years of experience in backend systems, PostgreSQL optimization, .NET Core APIs, and React frontends" />
</svelte:head>

<div class="{darkMode ? 'dark' : ''} min-h-screen">
  <div class="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 text-gray-900 dark:text-white transition-colors duration-300">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 pointer-events-none right-0 z-50 transition-all duration-300 {isScrolled ? 'bg-white/90 dark:bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
        <div class="flex justify-between items-center h-16">
          <button onclick={() => scrollToSection('home')} class="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Mehdi Abbas
          </button>
          
          <div class="hidden md:flex items-center space-x-6">
            {#each ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'] as section}
              <button
                onclick={() => scrollToSection(section)}
                class="capitalize transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 {activeSection === section ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-700 dark:text-gray-300'}"
              >
                {section}
              </button>
            {/each}
            <button 
              onclick={toggleTheme}
              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {#if darkMode}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              {:else}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              {/if}
            </button>
          </div>

          <div class="flex items-center gap-2 md:hidden">
            <button 
              onclick={toggleTheme}
              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {#if darkMode}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              {:else}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              {/if}
            </button>
            <button class="p-2" onclick={() => isMenuOpen = !isMenuOpen}>
              {#if isMenuOpen}
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              {:else}
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              {/if}
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      {#if isMenuOpen}
        <div class="pointer-events-auto md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
          <div class="px-2 pt-2 pb-3 space-y-1">
            {#each ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'] as section}
              <button
                onclick={() => scrollToSection(section)}
                class="block w-full text-left px-3 py-2 capitalize hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded transition-colors {activeSection === section ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-semibold' : ''}"
              >
                {section}
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </nav>

    <!-- Hero Section -->
    <section id="home" class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div class="max-w-4xl mx-auto text-center animate-fade-in-up">

        <div class="flex justify-center mb-8">
          <div class="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
            <img
              src={asset('/mehdi-profile.jpg')}
              alt="Mehdi Abbas"
              class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out transform hover:scale-105"
            />
          </div>
        </div>
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Mehdi Abbas
        </h1>
        <p class="text-2xl sm:text-3xl text-gray-700 dark:text-gray-300 mb-4">Software Developer | Full-Stack (Backend Focused)</p>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          3.5+ years of experience building high-performance backend systems and web applications.
          Experienced in PostgreSQL optimization, .NET Core APIs, and React-based frontends.
        </p>
        <div class="flex justify-center space-x-4 mb-12">
          <a href="https://github.com/Mehdi-Abbas" aria-label="github profile" target="_blank" rel="noopener noreferrer" class="p-3 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/mehdiabbas799/" aria-label="linkedin profile" target="_blank" rel="noopener noreferrer" class="p-3 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="mailto:mehdiabbas799@gmail.com" aria-label="email" class="p-3 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
          <a href="tel:+923302240360" aria-label="phone" class="p-3 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
        </div>
        <div class="flex justify-center gap-4 flex-wrap">
          <button
            onclick={() => scrollToSection('about')}
            class="inline-flex items-center px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 transition-all duration-300 hover:scale-105"
          >
            View My Work
            <svg class="ml-2 w-5 h-5 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <a
            href={asset("/Mehdi_Abbas_Software_Developer.pdf")}
            download
            class="inline-flex items-center px-8 py-3 bg-white dark:bg-white/10 text-blue-600 dark:text-blue-400 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-white/20 border-2 border-blue-600 dark:border-blue-400 transition-all duration-300 hover:scale-105"
          >
            <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Resume
          </a>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-white/5">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-center mb-12">
          <svg class="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <h2 class="text-4xl font-bold">About Me</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            <p>
              I'm a dedicated Software Developer with over 3.5 years of experience specializing in backend development, 
              database optimization, and building scalable web applications. Currently pursuing my MS in Artificial Intelligence 
              at FAST NUCES, I'm passionate about leveraging cutting-edge technologies to solve complex problems.
            </p>
            <p>
              At Contour Software, I've architected high-performance solutions including customer search APIs handling 5M+ 
              records with near-Elasticsearch response times, nightly SFTP data sync pipelines, and internal tools that 
              have been adopted across the organization.
            </p>
            <p>
              I specialize in PostgreSQL optimization, .NET Core API development, and creating efficient React-based user interfaces. 
              I believe in writing clean, testable code and have achieved 100% test coverage in production systems.
            </p>
          </div>
          <div class="bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-500/20 p-8 rounded-2xl backdrop-blur-sm border border-blue-200 dark:border-white/10">
            <h3 class="text-2xl font-semibold mb-4">Quick Facts</h3>
            <ul class="space-y-3 text-gray-700 dark:text-gray-300">
              <li>🎓 MS in Artificial Intelligence (In Progress)</li>
              <li>💼 3.5+ Years Experience</li>
              <li>🌍 Based in Karachi, Pakistan</li>
              <li>🏆 Silver Medalist | CGPA 3.92/4.0</li>
              <li>🚀 Backend Systems Specialist</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-center mb-12">
          <svg class="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          <h2 class="text-4xl font-bold">Skills & Technologies</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          {#each Object.entries(skills) as [category, items]}
            <div class="bg-white dark:bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/50 transition-all duration-300 hover:scale-105 shadow-lg">
              <h3 class="text-xl font-semibold mb-4 capitalize text-blue-600 dark:text-blue-400">{category}</h3>
              <div class="flex flex-wrap gap-2">
                {#each items as skill}
                  <span class="px-3 py-1 bg-linear-to-r from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full text-sm border border-blue-300 dark:border-blue-400/30 text-gray-800 dark:text-gray-200">
                    {skill}
                  </span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-white/5">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-center mb-12">
          <svg class="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          <h2 class="text-4xl font-bold">Featured Projects</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          {#each projects as project}
            <div class="bg-white dark:bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/50 transition-all duration-300 hover:scale-105 group shadow-lg">
              <div class="h-48 bg-linear-to-br from-blue-200 to-purple-200 dark:from-blue-500/30 dark:to-purple-500/30 overflow-hidden">
                {#if project.image}
                  <img src={project.image} alt={project.title} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                {:else}
                  <div class="w-full h-full flex items-center justify-center">
                    <svg class="w-16 h-16 text-blue-600 dark:text-white/50 group-hover:text-blue-700 dark:group-hover:text-white/80 transition-colors" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  </div>
                {/if}
              </div>
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">{project.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">{project.description}</p>
                <div class="flex flex-wrap gap-2 mb-3">
                  {#each project.tech as tech}
                    <span class="px-2 py-1 bg-blue-100 dark:bg-blue-500/20 rounded text-xs text-gray-800 dark:text-gray-200">
                      {tech}
                    </span>
                  {/each}
                </div>
                <p class="text-blue-600 dark:text-blue-400 text-sm font-semibold">✓ {project.impact}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-center mb-12">
          <svg class="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          <h2 class="text-4xl font-bold">Professional Experience</h2>
        </div>
        <div class="space-y-8">
          {#each experiences as exp}
            <div class="relative pl-8 pb-8 border-l-2 border-blue-400 dark:border-blue-400/30 last:pb-0">
              <div class="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400"></div>
              <div class="bg-white dark:bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/50 transition-all duration-300 shadow-lg">
                <h3 class="text-xl font-semibold">{exp.role}</h3>
                <p class="text-blue-600 dark:text-blue-400 mb-2">{exp.company}</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">{exp.period}</p>
                <ul class="space-y-2">
                  {#each exp.achievements as achievement}
                    <li class="text-gray-700 dark:text-gray-300 text-sm flex items-start">
                      <span class="text-blue-600 dark:text-blue-400 mr-2 mt-1">▸</span>
                      <span>{achievement}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-white/5">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-center mb-12">
          <svg class="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
          <h2 class="text-4xl font-bold">Education</h2>
        </div>
        <div class="space-y-6">
          {#each education as edu}
            <div class="bg-white dark:bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/50 transition-all duration-300 shadow-lg">
              <div class="flex items-start gap-4">
                <div class="shrink-0">
                  <div class="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center p-2 border border-gray-200 dark:border-gray-700">
                    <img src={edu.logo} alt="{edu.school} logo" class="w-full h-full rounded-full object-contain" />
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-semibold">{edu.degree}</h3>
                  <p class="text-blue-600 dark:text-blue-400 mb-2">{edu.school}</p>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{edu.period}</p>
                  {#if edu.details}
                    <p class="text-gray-700 dark:text-gray-300 text-sm mt-2 font-semibold">{edu.details}</p>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="flex items-center justify-center mb-8">
          <svg class="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <h2 class="text-4xl font-bold">Get In Touch</h2>
        </div>
        <p class="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          I'm always open to discussing new opportunities, innovative projects, or collaboration ideas. 
          Feel free to reach out!
        </p>
        <div class="flex justify-center gap-6 mb-8 flex-wrap">
          <a href="mailto:mehdiabbas799@gmail.com" class="flex items-center px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 transition-all duration-300 hover:scale-105">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Email Me
          </a>
          <a href="tel:+923302240360" class="flex items-center px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 transition-all duration-300 hover:scale-105">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Call Me
          </a>
          <a href="https://www.linkedin.com/in/mehdiabbas799/" target="_blank" rel="noopener noreferrer" class="flex items-center px-6 py-3 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-105 border border-gray-300 dark:border-white/20">
            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn
          </a>
          <a
            href={asset("/Mehdi_Abbas_Software_Developer.pdf")}
            download
            class="flex items-center px-6 py-3 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-105 border border-gray-300 dark:border-white/20"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Resume
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-white/10">
      <p>&copy; {new Date().getFullYear()} Mehdi Abbas. All rights reserved.</p>
    </footer>

    <!-- Back to Top Button -->
    {#if showBackToTop}
      <button
        onclick={() => scrollToSection('home')}
        class="fixed bottom-4 right-4 p-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 transition-all duration-300 hover:scale-110 z-50 animate-fade-in-up"
        aria-label="Back to top"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    {/if}
  </div>
</div>

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 1s ease-out;
  }
</style>