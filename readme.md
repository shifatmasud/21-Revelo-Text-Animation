# Revelo Text Animation Component

A versatile React component for creating stunning, scroll-based text animations with GSAP.

**Live Demo:** [**https://top-screens-057770.framer.app/page-4**](https://top-screens-057770.framer.app/page-4)

---

### TL;DR (Too Long; Didn't Read)

This is a powerful React component that lets you easily add complex, professional-grade text animations to your website with minimal code. You pick a preset effect, and it animates your text as the user scrolls.

---

### ELI5 (Explain Like I'm 5)

Imagine you have some words on a webpage. This tool is like a magic box that makes the words do cool tricks when you scroll! The letters can fly in from the sides, bounce like rubber balls, unfold like a piece of paper, or even glitch like a video game. You just give the magic box your words and tell it which trick to do.

---

### Context Map

This project is a self-contained text animation system designed as a React component, making it easy to drop into any React-based website or Framer project.

-   **Core Purpose:** To animate text elements (characters, words, or lines) as they enter the viewport.
-   **Key Technologies:**
    -   **React:** The component is built using React for easy integration into modern web apps.
    -   **GSAP (GreenSock Animation Platform):** The industry-standard JavaScript animation library powers all the effects.
        -   `SplitText`: A GSAP plugin used to break down text into individual characters, words, and lines, allowing each to be animated independently.
        -   `ScrollTrigger`: A GSAP plugin that triggers animations based on the user's scroll position.
-   **Main Features:**
    -   **21+ Animation Presets:** A wide variety of pre-configured effects like `fluidityInMotion`, `grandPrize`, `systemCorruption`, and `warpSpeedAhead` are available out-of-the-box.
    -   **Customizable:** While presets are powerful, you can override any animation property (like duration, easing, and transformations) for full creative control.
    -   **Multiple Animation Types:**
        -   `trigger`: The animation plays once when the element scrolls into view.
        -   `scrub`: The animation's progress is directly linked to the scroll bar's position.
        -   `manual`: The animation is controlled programmatically via props.
    -   **Framer Integration:** Includes property controls for easy visual editing within the Framer design tool.

### How It Works

1.  You add the `<Revelo>` component to your page.
2.  You pass it some text via the `text` prop.
3.  You choose an effect using the `preset` prop (e.g., `preset="rideTheWave"`).
4.  GSAP's `SplitText` plugin breaks your text into tiny pieces (characters, words, lines).
5.  GSAP's `ScrollTrigger` watches the page scroll. When the component is visible, it tells GSAP to play the animation you chose, moving all the tiny text pieces into place according to the preset's rules.
