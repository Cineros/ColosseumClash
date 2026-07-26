import "./LandingPage.css";


export default function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Create stunning cards with ready-made templates</h1>

          <p>
            Browse a growing collection of professional card templates or
            design your own from scratch. Customize layouts, colors, artwork,
            and text to create something unique.
          </p>

          <div className="hero-actions">
            <a href="/creator" className="primary-button">
              Create a Card
            </a>

            <a href="/gallery" className="secondary-button">
              Explore Templates
            </a>
          </div>
        </div>
      </section>

      <section className="templates">
        <h2>Featured Templates</h2>

        <div className="template-grid">
          <TemplateCard
            title="Fantasy Adventure"
            description="Epic fantasy layouts for character cards, quests, and collectibles."
            category="Fantasy"
          />

          <TemplateCard
            title="Modern Business"
            description="Clean professional templates for presentations and profiles."
            category="Professional"
          />

          <TemplateCard
            title="Trading Card"
            description="Classic collectible layouts with stats, artwork, and custom fields."
            category="Collectibles"
          />
        </div>
      </section>
    </div>
  );
}

interface TemplateCardProps {
  title: string;
  description: string;
  category: string;
}

function TemplateCard({
  title,
  description,
  category,
}: TemplateCardProps) {
  return (
    <article className="template-card">
      <div className="template-preview">
        <span>{category}</span>
      </div>

      <div className="template-content">
        <h3>{title}</h3>
        <p>{description}</p>

        <button className="use-template-button">
          Use Template
        </button>
      </div>
    </article>
  );
}
