import {
  ArrowRight,
  FileText,
  RefreshCw,
  Sparkles,
  Target,
} from "lucide-react";
import "./Overview.css";

function Overview() {
  return (
    <div className="overview-page">
      <section className="overview-hero">
        <div>
          <p className="section-label">CANDIDATE COMMAND CENTER · EARLY CAREER</p>

          <h1>
            Turn preparation into <em>evidence.</em>
          </h1>

          <p className="overview-description">
            Your workspace connects your resume, target role, interview
            performance, and next best move in one continuous loop.
          </p>

          <div className="overview-actions">
            <button className="lime-button">
              Build your baseline
              <ArrowRight size={17} />
            </button>

            <button className="dark-button">
              Open DSA lab
              <span>⌘</span>
            </button>
          </div>
        </div>

        <div className="readiness-preview">
          <div className="readiness-ring">
            <strong>63</strong>
            <span>READY</span>
          </div>

          <div>
            <p>READINESS INDEX</p>
            <h3>Developing</h3>
            <span>Keep building your signal</span>
          </div>
        </div>
      </section>

      <section className="overview-stats">
        <div className="stat-card">
          <div className="stat-header">
            <span>RESUME SIGNAL</span>
            <FileText size={17} />
          </div>

          <strong>Analyzed</strong>
          <p>Resume intelligence available</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>TARGET ROLE</span>
            <Target size={17} />
          </div>

          <strong>Backend Engineer</strong>
          <p>Early career</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>PRACTICE LOOP</span>
            <RefreshCw size={17} />
          </div>

          <strong>4 / 5</strong>
          <p>questions evaluated</p>
        </div>
      </section>

      <section className="overview-lower">
        <div className="next-move">
          <div className="section-title-row">
            <div>
              <p className="section-label">YOUR NEXT MOVE</p>
              <h2>Build from your evidence</h2>
            </div>

            <span>03 / 04</span>
          </div>

          <div className="move-list">
            <div className="move-item completed">
              <div className="move-number">01</div>

              <div>
                <strong>Resume baseline</strong>
                <p>Resume analyzed successfully</p>
              </div>

              <span>✓</span>
            </div>

            <div className="move-item completed">
              <div className="move-number">02</div>

              <div>
                <strong>Role alignment</strong>
                <p>Backend Engineer selected</p>
              </div>

              <span>✓</span>
            </div>

            <div className="move-item active">
              <div className="move-number">03</div>

              <div>
                <strong>Interview practice</strong>
                <p>Complete your next technical round</p>
              </div>

              <ArrowRight size={17} />
            </div>

            <div className="move-item">
              <div className="move-number">04</div>

              <div>
                <strong>Readiness report</strong>
                <p>Track improvement over time</p>
              </div>

              <ArrowRight size={17} />
            </div>
          </div>
        </div>

        <aside className="coach-card">
          <Sparkles size={22} />

          <p className="section-label">COACH NOTE</p>

          <h3>
            Your next report should turn broad preparation into a short list
            of useful moves.
          </h3>

          <button>
            GET STARTED
            <ArrowRight size={14} />
          </button>
        </aside>
      </section>
    </div>
  );
}

export default Overview;
