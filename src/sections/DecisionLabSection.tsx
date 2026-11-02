import { DecisionLab } from '../architecture/components/DecisionLab'

/** Transparent, user-driven scenario model. No recommendation engine or live feed. */
export default function DecisionLabSection() {
  return (
    <section id="decision-lab" className="experience integrated-decision-lab" aria-label="Investment Decision Lab">
      <DecisionLab />
      <div className="decision-lab-actions">
        <span>Educational scenario model · no data is transmitted or stored.</span>
        <a
          href="https://wa.me/971585899112?text=I%20ran%20an%20illustrative%20scenario%20and%20want%20to%20discuss%20the%20assumptions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss your assumptions →
        </a>
      </div>
    </section>
  )
}
