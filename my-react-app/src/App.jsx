import React from 'react';
import DomeGallery from './components/DomeGallery';
import './index.css';

// This component contains all the portfolio content from the HTML file
const Portfolio = () => {
  return (
    <>
      {/* Header and hero content */}
      <section id="entry-experience" className="hero-section">
        <div className="hero-content">
          <div className="hero-avatar">
            <img src="./src/img/Profile.jpg" alt="Student Avatar" />
          </div>
          <h1 className="tagline">Hey Student! Glad you swung by.</h1>
          <p className="subline">Here’s how my portfolio can inspire your learning journey.</p>
          <div className="hero-video">
            <video src="" autoPlay loop muted></video>
          </div>
        </div>
      </section>

      {/* The interactive Dome Gallery placed in the middle */}
      <div style={{ height: '70vh', width: '100%', padding: '20px 0', overflow: 'hidden' }}>
        <DomeGallery grayscale={false} />
      </div>

      {/* Content below the Dome Gallery */}
      <section id="dialogue-bubbles" className="grid-section">
        <div className="dialogue-bubble">
          <p>Looking for inspiration in projects?</p>
          <div className="video-container-small">
            <iframe
              src="https://www.youtube.com/embed/project-inspiration"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="dialogue-bubble">
          <p>I share my journey, notes, and real-world projects.</p>
          <div className="video-container-small">
            <iframe
              src="https://www.youtube.com/embed/student-journey"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="dialogue-bubble">
          <p>From coding basics to advanced AI — find something useful here.</p>
          <div className="video-container-small">
            <iframe
              src="https://www.youtube.com/embed/ai-basics"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section id="student-features" className="carousel-section">
        <h2>Projects</h2>
        <div className="carousel-container">
          <div className="carousel-item flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>Forest Fire Detection</h3>
                <p>AI + Satellite Data system</p>
                <div className="tags">
                  <span>Python</span>
                  <span>TensorFlow</span>
                  <span>Keras</span>
                </div>
              </div>
              <div className="flip-card-back">
                <iframe
                  src="https://www.youtube.com/embed/forest-fire-demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="carousel-item flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>Database Design Basics</h3>
                <p>SQL + ER modeling explained</p>
                <div className="tags">
                  <span>SQL</span>
                  <span>Schema</span>
                </div>
              </div>
              <div className="flip-card-back">
                <iframe
                  src="https://www.youtube.com/embed/sql-basics"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="carousel-item flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>AI RAG Chatbot</h3>
                <p>Context-aware chatbot project</p>
                <div className="tags">
                  <span>LangChain</span>
                  <span>OpenAI API</span>
                  <span>Flask</span>
                </div>
              </div>
              <div className="flip-card-back">
                <iframe
                  src="https://www.youtube.com/embed/rag-chatbot-demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="resources">
          <h2>Study Resources</h2>
          <ul>
            <li><a href="#">GitHub Repos</a></li>
            <li><a href="#">Notes Blog</a></li>
            <li><a href="#">Cheat Sheets</a></li>
          </ul>
          <div className="resource-video">
            <iframe
              src="https://www.youtube.com/embed/resources-overview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section id="call-to-action" className="centered-section">
        <h2 className="cta-text">Want to learn together? Let’s connect and grow.</h2>
        <a href="#" id="cta-button" className="cta-button">Join Study Circle</a>
        <div className="cta-video">
          <iframe
            src="https://www.youtube.com/embed/call-to-action-intro"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <footer id="student-footer" className="minimal-footer">
        <p className="footer-quote">Knowledge shared = Knowledge multiplied 🚀</p>
        <div className="footer-icons">
          <span className="icon">📚</span>
          <span className="icon">💻</span>
          <span className="icon">💡</span>
        </div>
        <div className="footer-video">
          <iframe
            src="https://www.youtube.com/embed/final-message"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </footer>
    </>
  );
};

export default function App() {
  return (
    <>
      {/* Background video layer */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: -1 }}>
        <video autoPlay muted loop style={{ minWidth: '100%', minHeight: '100%', width: 'auto', height: 'auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <source src="./src/Background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main portfolio content layer */}
      <div id="portfolio-container" style={{ position: 'relative', zIndex: 1, backgroundColor: 'rgba(6, 0, 16, 0.7)' }}>
        <Portfolio />
      </div>
    </>
  );
}