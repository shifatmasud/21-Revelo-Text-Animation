import * as React from 'react';
import Revelo from './Component/Revelo';

const Subtitle = ({children}: {children: React.ReactNode}) => (
    <p className="subtitle">{children}</p>
)

export default function App() {
  return (
    <main>
      {/* Example 1: Hero */}
      <section className="section section--hero">
        <div className="animation-container">
          <Revelo text="Fluidity in Motion" as="h1" className="hero-heading" preset="fluidityInMotion" animationType="trigger" viewport="center" replay={true} />
        </div>
      </section>
      
      {/* Example 2: Jackpot */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="GRAND PRIZE" as="h2" className="feature-heading" preset="grandPrize" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>A perfectly centered vertical reel for each character creates a premium, high-stakes jackpot effect.</Subtitle>
        </div>
      </section>

      {/* Example 3: The Wave */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="Ride the Wave" as="h2" className="feature-heading" preset="rideTheWave" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>Staggering Y-axis movement on characters with a sine ease creates a beautiful, continuous wave effect.</Subtitle>
        </div>
      </section>

      {/* Example 4: 3D Unfold */}
      <section className="section">
         <div className="animation-container">
            <Revelo text="Unfold Your Story" as="h2" className="feature-heading" preset="unfoldYourStory" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>Animating words on the X-axis with perspective creates a stunning 3D unfolding effect.</Subtitle>
         </div>
      </section>
      
      {/* Example 5: Warp Speed */}
      <section className="section">
         <div className="animation-container">
            <Revelo text="Warp Speed Ahead" as="h2" className="feature-heading" preset="warpSpeedAhead" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>Combine horizontal movement, scale, blur and skew to make lines of text rush in with dynamic urgency.</Subtitle>
         </div>
      </section>

      {/* Example 6: Chaotic Reveal */}
      <section className="section">
         <div className="animation-container">
            <Revelo text="Chaos Into Order" as="h2" className="feature-heading" preset="chaosIntoOrder" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>Using a "random" stagger origin makes characters fly in from all directions to assemble the final word.</Subtitle>
         </div>
      </section>

       {/* Example 7: Chromatic Flow */}
      <section className="section">
         <div className="animation-container">
            <Revelo text="Chromatic Flow" as="h2" className="feature-heading" preset="chromaticFlow" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>A simple but elegant effect that combines a color transition with subtle skewed movement.</Subtitle>
         </div>
      </section>

      {/* Example 8: Squash & Stretch */}
      <section className="section">
         <div className="animation-container">
            <Revelo text="Squash & Stretch" as="h2" className="feature-heading" preset="squashAndStretch" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>Use GSAP's elastic ease to make words bounce and stretch into place with playful energy.</Subtitle>
         </div>
      </section>

       {/* Example 9: Focus In */}
      <section className="section">
         <div className="animation-container">
            <Revelo text="Bring Into Focus" as="h2" className="feature-heading" preset="bringIntoFocus" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>Animate the CSS blur filter and add a slight drift for a cinematic "rack focus" effect.</Subtitle>
         </div>
      </section>

       {/* Example 10: Shear Delight */}
      <section className="section">
         <div className="animation-container">
            <Revelo text="Shear Delight" as="h2" className="feature-heading" preset="shearDelight" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>Animating skew, color, and y-position on lines creates a striking diagonal curtain reveal.</Subtitle>
         </div>
      </section>

      {/* Example 11: The Cascade */}
      <section className="section">
         <div className="animation-container">
            <Revelo text="Cascade of Ideas" as="h2" className="feature-heading" preset="cascadeOfIdeas" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>A heavy stagger on characters makes each one fall and settle into place like dominoes.</Subtitle>
         </div>
      </section>

      {/* Example 12: Text Rain */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="Let it Rain" as="h2" className="feature-heading" preset="letItRain" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>Characters fall from the sky and bounce into place, simulating rainfall with GSAP's bounce ease.</Subtitle>
        </div>
      </section>

      {/* Example 13: Magnetic Assemble */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="Magnetic Force" as="h2" className="feature-heading" preset="magneticForce" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>Characters are pulled erratically from all directions and snap into place, as if drawn by a powerful magnetic force, then fly apart on exit.</Subtitle>
        </div>
      </section>

      {/* Example 14: Floating Bubbles */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="Floating Bubbles" as="h2" className="feature-heading" preset="floatingBubbles" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>Characters gently float and drift upwards, creating a serene, underwater-like motion.</Subtitle>
        </div>
      </section>

      {/* Example 15: Heavy Impact */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="Heavy Impact" as="h2" className="feature-heading" preset="heavyImpact" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>Words fall from above and collide with the baseline with a satisfying bounce.</Subtitle>
        </div>
      </section>

      {/* Example 16: Jitterbug Energy */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="Jitterbug Energy" as="h2" className="feature-heading" preset="jitterbugEnergy" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>A high-frequency elastic ease makes characters jitter and vibrate into place with chaotic energy.</Subtitle>
        </div>
      </section>

      {/* Example 17: Static Shock */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="Static Shock" as="h2" className="feature-heading" preset="staticShock" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>GSAP's RoughEase plugin makes each character's path intensely jittery, creating a high-frequency, electric energy.</Subtitle>
        </div>
      </section>

      {/* Example 18: Liquid Metal */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="Liquid Metal" as="h2" className="feature-heading" preset="liquidMetal" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>A custom ease curve combined with `scaleY` creates a fluid, morphing effect, as if the letters are made of liquid metal.</Subtitle>
        </div>
      </section>

      {/* Example 19: Anticipation Pop */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="Anticipation Pop" as="h2" className="feature-heading" preset="anticipationPop" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>This custom ease makes words dip down slightly before popping up into place, adding a playful and engaging personality.</Subtitle>
        </div>
      </section>

      {/* Example 20: Skew & Settle */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="Skew & Settle" as="h2" className="feature-heading" preset="skewAndSettle" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>A strong elastic ease on `skewX` causes characters to spring and wobble before settling into place.</Subtitle>
        </div>
      </section>

      {/* Example 21: System Corruption */}
      <section className="section">
        <div className="animation-container">
            <Revelo text="System Corruption" as="h2" className="feature-heading" preset="systemCorruption" animationType="trigger" viewport="center" replay={true} />
            <Subtitle>A chaotic, game-inspired glitch with randomized transforms creates a critical failure effect on entrance and exit.</Subtitle>
        </div>
      </section>

      <section className="section section--footer">
        <Revelo text="Made with Revelo." as="h2" className="footer-heading" preset="madeWithRevelo" animationType="trigger" viewport="center" replay={false} />
      </section>
    </main>
  );
}