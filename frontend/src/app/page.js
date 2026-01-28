'use client'

import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>John Doe</h1>
        <p className="subtitle">DevOps Engineer | Full Stack Developer</p>
      </section>

      <section className="about">
        <h2>About Me</h2>
        <p>Learning DevOps through hands-on microservices, Docker, and Jenkins CI/CD pipelines.</p>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <div className="skill-grid">
          <div className="skill-card">Docker</div>
          <div className="skill-card">Jenkins</div>
          <div className="skill-card">Node.js</div>
          <div className="skill-card">Next.js</div>
        </div>
      </section>

      <section className="contact">
        <h2>Contact Me</h2>
        <ContactForm />
      </section>
    </main>
  )
}
