import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { addPropertyControls, ControlType } from "framer"

gsap.registerPlugin(SplitText, ScrollTrigger);

// ------------------------------------------------------------ //
// TYPE DEFINITIONS
// ------------------------------------------------------------ //

type AnimationProperty<T> = {
    from?: T
    to: T
}

type AnimationProperties = {
    reel?: boolean
    mask?: boolean
    color?: AnimationProperty<string>
    textStrokeColor?: AnimationProperty<string>
    textStrokeWidth?: AnimationProperty<number>
    opacity?: AnimationProperty<number>
    x?: AnimationProperty<number | (() => number)>
    y?: AnimationProperty<number | (() => number)>
    scale?: AnimationProperty<number | (() => number)>
    scaleX?: AnimationProperty<number | (() => number)>
    scaleY?: AnimationProperty<number | (() => number)>
    filter?: AnimationProperty<number | (() => number)> // Blur
    rotate?: AnimationProperty<number | (() => number)>
    rotateX?: AnimationProperty<number | (() => number)>
    letterSpacing?: AnimationProperty<number | (() => number)>
    skewX?: AnimationProperty<number | (() => number)>
    skewY?: AnimationProperty<number | (() => number)>
    transformOrigin?: string
    duration?: number
    stagger?: number | { [key: string]: any }
    delay?: number
    origin?: "start" | "center" | "edges" | "random" | "end"
    ease?: string
}

type Gradient = {
    from: string
    to: string
    angle?: number
}

interface Props {
    text: string
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span"
    className?: string
    preset?: keyof typeof animationPresets
    animationType?: "scrub" | "trigger" | "manual"
    animateIn?: boolean
    animateOut?: boolean
    replay?: boolean
    section?: React.RefObject<HTMLElement>
    viewport?: "top" | "center" | "bottom"
    lines?: Partial<AnimationProperties>
    words?: Partial<AnimationProperties>
    chars?: Partial<AnimationProperties>
    linesOut?: Partial<AnimationProperties>
    wordsOut?: Partial<AnimationProperties>
    charsOut?: Partial<AnimationProperties>
    font?: {
        fontFamily?: string
        fontSize?: string | number
        fontWeight?: string | number
        fontStyle?: string
        textAlign?: "left" | "center" | "right" | "justify"
        letterSpacing?: string | number
        lineHeight?: string | number
        textTransform?: "none" | "capitalize" | "uppercase" | "lowercase"
        textDecoration?: string
    }
    color?: string
    useGradient?: boolean
    gradient?: Gradient
}

type AnimationPresetProperties = {
    lines?: Partial<AnimationProperties>
    words?: Partial<AnimationProperties>
    chars?: Partial<AnimationProperties>
    linesOut?: Partial<AnimationProperties>
    wordsOut?: Partial<AnimationProperties>
    charsOut?: Partial<AnimationProperties>
}

// ------------------------------------------------------------ //
// ANIMATION PRESETS
// ------------------------------------------------------------ //
const animationPresets: { [key: string]: AnimationPresetProperties } = {
    fluidityInMotion: {
        chars: {
            opacity: { from: 0, to: 1 },
            y: { from: 120, to: 0 },
            x: { from: -20, to: 0 },
            rotate: { from: -15, to: 0 },
            filter: { from: 5, to: 0 },
            duration: 1.5,
            stagger: 0.03,
            ease: "liquid",
        }
    },
    grandPrize: {
        chars: { reel: true, duration: 2.5, stagger: { each: 0.15, from: "start" }, ease: "expo.inOut" }
    },
    rideTheWave: {
        chars: {
            y: { from: 80, to: 0 },
            skewY: { from: 10, to: 0 },
            opacity: { from: 0, to: 1 },
            duration: 2,
            stagger: { each: 0.05, from: "center", ease: "sine.out" },
            ease: "power3.inOut",
        }
    },
    unfoldYourStory: {
        words: {
            color: { from: "#444", to: "#eee" },
            rotateX: { from: -90, to: 0 },
            y: { from: 50, to: 0 },
            opacity: { from: 0, to: 1 },
            duration: 2,
            stagger: 0.1,
            ease: "expo.out",
            transformOrigin: "bottom",
        }
    },
    warpSpeedAhead: {
        lines: {
            x: { from: -1000, to: 0 },
            opacity: { from: 0, to: 1 },
            skewX: { from: -30, to: 0 },
            filter: { from: 20, to: 0 },
            scaleX: { from: 1.5, to: 1 },
            transformOrigin: "left",
            duration: 1.5,
            stagger: 0.1,
            ease: "power3.inOut",
        }
    },
    chaosIntoOrder: {
        chars: {
            opacity: { from: 0, to: 1 },
            scale: { from: 0.2, to: 1 },
            rotate: { from: -270, to: 0 },
            y: { from: 200, to: 0 },
            duration: 2,
            stagger: { amount: 0.8, from: "random" },
            ease: "power4.out",
        }
    },
    chromaticFlow: {
        chars: {
            color: { from: "#333", to: "#eee" },
            y: { from: 80, to: 0 },
            skewX: { from: -10, to: 0 },
            opacity: { from: 0, to: 1 },
            duration: 1,
            stagger: 0.04,
            ease: "expo.out",
        }
    },
    squashAndStretch: {
        words: {
            y: { from: -100, to: 0 },
            scaleY: { from: 2.5, to: 1 },
            scaleX: { from: 0.7, to: 1 },
            opacity: { from: 0, to: 1 },
            duration: 2,
            stagger: 0.1,
            transformOrigin: "center",
            ease: "elastic.out(1, 0.5)",
        }
    },
    bringIntoFocus: {
        chars: {
            filter: { from: 40, to: 0 },
            opacity: { from: 0, to: 1 },
            scale: { from: 1.2, to: 1 },
            x: { from: -30, to: 0 },
            duration: 1.5,
            stagger: 0.03,
            ease: "power3.out",
        }
    },
    shearDelight: {
        lines: {
            y: { from: 150, to: 0 },
            opacity: { from: 0, to: 1 },
            skewY: { from: 10, to: 0 },
            skewX: { from: -10, to: 0 },
            color: { from: "#666", to: "#eee" },
            duration: 2,
            stagger: 0.15,
            ease: "expo.out",
        }
    },
    cascadeOfIdeas: {
        chars: {
            opacity: { from: 0, to: 1 },
            y: { from: -100, to: 0 },
            rotate: { from: 30, to: 0 },
            scale: { from: 0.5, to: 1 },
            stagger: 0.04,
            duration: 2,
            ease: "power4.out",
            origin: "start",
        }
    },
    letItRain: {
        chars: {
            opacity: { from: 0, to: 1 },
            y: { from: -300, to: 0 },
            duration: 2,
            stagger: { amount: 1.5, from: "random" },
            ease: "bounce.out",
        }
    },
    magneticForce: {
        chars: {
            opacity: { from: 0, to: 1 },
            y: { from: () => gsap.utils.random(-100, 100), to: 0 },
            x: { from: () => gsap.utils.random(-100, 100), to: 0 },
            scale: { from: 0.1, to: 1 },
            rotate: { from: () => gsap.utils.random(-90, 90), to: 0 },
            duration: 2,
            stagger: { amount: 1, from: "random" },
            ease: "power3.in",
        },
        charsOut: {
            opacity: { to: 0 },
            y: { to: () => gsap.utils.random(-150, 150) },
            x: { to: () => gsap.utils.random(-150, 150) },
            scale: { to: 0.1 },
            rotate: { to: () => gsap.utils.random(-90, 90) },
            duration: 1.5,
            stagger: { amount: 1, from: "random" },
            ease: "power4.in",
        }
    },
    floatingBubbles: {
        chars: {
            opacity: { from: 0, to: 1 },
            y: { from: 100, to: 0 },
            x: { from: -20, to: 0 },
            scale: { from: 0.7, to: 1 },
            filter: { from: 5, to: 0 },
            duration: 3,
            stagger: { amount: 1, from: "random", ease: "power2.inOut" },
            ease: "sine.out",
        }
    },
    heavyImpact: {
        words: {
            opacity: { from: 0, to: 1 },
            y: { from: -200, to: 0 },
            rotate: { from: 15, to: 0 },
            duration: 2,
            stagger: 0.1,
            ease: "bounce.out",
        }
    },
    jitterbugEnergy: {
        chars: {
            y: { from: 80, to: 0 },
            rotate: { from: 90, to: 0 },
            opacity: { from: 0, to: 1 },
            scale: { from: 0.5, to: 1 },
            duration: 1.5,
            stagger: { amount: 0.8, from: "random" },
            ease: "elastic.out(1, 0.2)",
        }
    },
    staticShock: {
        chars: {
            opacity: { from: 0, to: 1 },
            y: { from: 20, to: 0 },
            duration: 2,
            stagger: 0.02,
            ease: "rough({ template: none.out, strength: 15, points: 30, taper: 'both', randomize: true, clamp: false })",
        }
    },
    liquidMetal: {
        chars: {
            opacity: { from: 0, to: 1 },
            y: { from: 100, to: 0 },
            scaleY: { from: 3, to: 1 },
            filter: { from: 10, to: 0 },
            transformOrigin: "bottom",
            duration: 1.8,
            stagger: { each: 0.05, from: "center", ease: "sine.out" },
            ease: "liquid",
        }
    },
    anticipationPop: {
        chars: {
            opacity: { from: 0, to: 1 },
            y: { from: 80, to: 0 },
            scale: { from: 0.7, to: 1 },
            rotate: { from: -20, to: 0 },
            duration: 1.5,
            stagger: 0.04,
            ease: "anticipation",
        }
    },
    skewAndSettle: {
        chars: {
            opacity: { from: 0, to: 1 },
            y: { from: 100, to: 0 },
            skewX: { from: 30, to: 0 },
            duration: 2,
            stagger: { amount: 0.8, from: "center" },
            ease: "elastic.out(1, 0.4)",
        }
    },
    systemCorruption: {
        chars: {
            opacity: { from: 0, to: 1 },
            x: { from: () => gsap.utils.random(-25, 25), to: 0 },
            y: { from: () => gsap.utils.random(-25, 25), to: 0 },
            skewX: { from: () => gsap.utils.random(-20, 20), to: 0 },
            skewY: { from: () => gsap.utils.random(-20, 20), to: 0 },
            rotate: { from: () => gsap.utils.random(-30, 30), to: 0 },
            duration: 0.8,
            stagger: { each: 0.03, from: "random" },
            ease: "power3.out",
        },
        charsOut: {
            opacity: { to: 0 },
            x: { to: () => gsap.utils.random(-30, 30) },
            y: { to: () => gsap.utils.random(-30, 30) },
            skewX: { to: () => gsap.utils.random(-30, 30) },
            skewY: { to: () => gsap.utils.random(-30, 30) },
            rotate: { to: () => gsap.utils.random(-90, 90) },
            duration: 0.5,
            stagger: { each: 0.02, from: "random" },
            ease: "power2.in"
        }
    },
    madeWithRevelo: {
        words: {
            opacity: { from: 0, to: 1 },
            y: { from: 20, to: 0 },
            duration: 1,
            stagger: 0.05,
            ease: "expo.out",
        }
    }
}


// ------------------------------------------------------------ //
// HELPER FUNCTIONS
// ------------------------------------------------------------ //

const animatedProperties = {
    mask: {}, color: { render: (v: any) => v }, textStrokeColor: { render: (v: any) => v }, textStrokeWidth: { render: (v: any) => v },
    opacity: { render: (v: any) => v }, x: { render: (v: any) => `${v}%` }, y: { render: (v: any) => `${v}%` },
    scale: { render: (v: any) => v }, scaleX: { render: (v: any) => v }, scaleY: { render: (v: any) => v },
    filter: { render: (v: any) => `blur(${v}px)` }, rotate: { render: (v: any) => `${v}deg` }, rotateX: { render: (v: any) => `${v}deg` },
    letterSpacing: { render: (v: any) => `${v}px` }, skewX: { render: (v: any) => `${v}deg` }, skewY: { render: (v: any) => `${v}deg` },
};

function getValues(object: any, type: "from" | "to" = "from") {
    if (!object) return {}
    const values = Object.fromEntries(
        Object.entries(object)
            .map(([key, value]: [string, any]) => {
                if (value === undefined || value === null) return null;
                const property = animatedProperties[key as keyof typeof animatedProperties];
                if (!property) return null;
                const val = value[type as keyof typeof value];
                if (val === undefined || val === null) return null;

                if (typeof val === 'function') {
                    if ('render' in property) {
                        return [key, (index: any, target: any, targets: any) => (property as any).render(val(index, target, targets))];
                    }
                    return [key, val];
                }
                
                const renderedValue = 'render' in property ? (property as any).render(val) : val;
                return [key, renderedValue];
            })
            .filter((v): v is [string, any] => v !== null)
    )

    if (values.scale !== undefined) {
        values.scaleX = values.scale;
        values.scaleY = values.scale;
        delete values.scale;
    }
    
    return values;
}

// ------------------------------------------------------------ //
// MAIN COMPONENT
// ------------------------------------------------------------ //
export default function Revelo(props: Props) {
    const { 
        text, as = "div", className, preset, animationType = "trigger",
        animateIn, animateOut, replay = true, section, viewport = "center",
        font = {},
        color = "#EEEEEE",
        useGradient, gradient: gradientProp,
    } = props;

    const elementRef = useRef<HTMLDivElement>(null);
    const splitRef = useRef<HTMLDivElement>(null);
    const [pluginsLoaded, setPluginsLoaded] = useState(false);

    // Combine preset and override props
    const presetProps: AnimationPresetProperties = preset ? animationPresets[preset] : {};
    const finalProps = {
        lines: { ...presetProps.lines, ...props.lines },
        words: { ...presetProps.words, ...props.words },
        chars: { ...presetProps.chars, ...props.chars },
        linesOut: { ...presetProps.linesOut, ...props.linesOut },
        wordsOut: { ...presetProps.wordsOut, ...props.wordsOut },
        charsOut: { ...presetProps.charsOut, ...props.charsOut },
    };
    
    // Check if the chosen preset/override has a color animation
    const isColorAnimated = finalProps.lines?.color || finalProps.words?.color || finalProps.chars?.color;

    useEffect(() => {
        // @ts-ignore
        if (window.gsap && window.gsap.plugins.CustomEase) {
            setPluginsLoaded(true);
            return;
        }

        const loadScript = (src: string) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve(true);
                    return;
                }
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.onload = () => resolve(true);
                script.onerror = () => reject(new Error(`Script load error for ${src}`));
                document.body.appendChild(script);
            });
        };
        
        const customEaseURL = "https://cdn.jsdelivr.net/npm/gsap@3.13.1/dist/CustomEase.min.js";
        const easePackURL = "https://cdn.jsdelivr.net/npm/gsap@3.13.1/dist/EasePack.min.js";

        // @ts-ignore
        if (!window.gsap) {
            // @ts-ignore
            window.gsap = gsap;
        }

        Promise.all([loadScript(customEaseURL), loadScript(easePackURL)])
            .then(() => {
                // @ts-ignore
                if (window.CustomEase) {
                    // @ts-ignore
                    gsap.registerPlugin(window.CustomEase);
                    try {
                        // @ts-ignore
                        if (!gsap.config().eases.liquid) {
                            // @ts-ignore
                            window.CustomEase.create("liquid", "M0,0 C0.082,0.894 0.19,1.018 1,1");
                        }
                        // @ts-ignore
                        if (!gsap.config().eases.anticipation) {
                            // @ts-ignore
                            window.CustomEase.create("anticipation", "M0,0 C0.168,-0.1 0.222,1.2 0.4,1.05 0.6,0.85 0.818,1.004 1,1");
                        }
                    } catch (e) {
                        console.error("Revelo: Failed to create custom eases.", e);
                    }
                } else {
                     console.error("Revelo Error: CustomEase plugin not found on window object after script load.");
                }
                setPluginsLoaded(true);
            })
            .catch(error => {
                console.error("Revelo: Failed to load GSAP plugins from CDN.", error);
                setPluginsLoaded(true); 
            });
    }, []);

    useEffect(() => {
        if (!pluginsLoaded) return;

        const animation = {
            inTimeline: null as gsap.core.Timeline | null,
            outTimeline: null as gsap.core.Timeline | null,
            scrollTrigger: null as ScrollTrigger | null,
            splitText: null as SplitText | null,
        }
        
        const hasInAnimation = Object.keys(finalProps.lines).length > 0 || Object.keys(finalProps.words).length > 0 || Object.keys(finalProps.chars).length > 0;

        const setupGsap = () => {
            if (!splitRef.current || !hasInAnimation) {
                if (elementRef.current) elementRef.current.style.opacity = "1"
                return
            }

            animation.inTimeline = gsap.timeline({ paused: true })
            animation.outTimeline = gsap.timeline({ paused: true })
            
            animation.splitText = new SplitText(splitRef.current, {
                type: `${Object.keys(finalProps.lines).length > 0 ? "lines," : ""}${Object.keys(finalProps.words).length > 0 ? "words," : ""}${Object.keys(finalProps.chars).length > 0 ? "chars" : ""}`,
                mask: finalProps.lines?.mask ? "lines" : finalProps.words?.mask ? "words" : finalProps.chars?.mask ? "chars" : undefined,
                linesClass: "line",
                wordsClass: "word",
                charsClass: "char",
            })
            
            if (elementRef.current) elementRef.current.style.opacity = "1"

            const targets = {
                lines: Object.keys(finalProps.lines).length > 0 && animation.splitText.lines,
                words: Object.keys(finalProps.words).length > 0 && animation.splitText.words,
                chars: Object.keys(finalProps.chars).length > 0 && animation.splitText.chars,
            }

            const hasOutAnimation = Object.keys(finalProps.linesOut).length > 0 || Object.keys(finalProps.wordsOut).length > 0 || Object.keys(finalProps.charsOut).length > 0;

            // --- IN ANIMATIONS ---
            ;(['lines', 'words', 'chars'] as const).forEach(key => {
                const target = targets[key];
                const animProps = finalProps[key];
                if (target && target.length > 0 && animProps) {
                    
                    if (key === 'chars' && animProps.reel) {
                        const reelChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};':\"\\|,.<>/?~".split('');
                        const charElements = target as HTMLElement[];
                        if (charElements.length === 0) return;

                        let charHeight = charElements[0].getBoundingClientRect().height;
                        if (charHeight === 0) return;

                        const duration = animProps.duration ?? 1, ease = animProps.ease ?? "expo.out", delay = animProps.delay ?? 0, stagger = animProps.stagger ?? 0;
                        let staggerOptions: gsap.StaggerVars = typeof stagger === 'number' ? { amount: stagger, from: animProps.origin ?? "start" } : stagger;

                        const reelContainers: HTMLElement[] = [], reelData: { length: number }[] = [];
                        charElements.forEach(charEl => {
                            const originalChar = charEl.textContent;
                            if (!originalChar || originalChar.trim() === '') return;
                            const reelLength = gsap.utils.random(20, 30, 1);
                            charEl.style.overflow = 'hidden'; charEl.style.height = `${charHeight}px`; charEl.style.display = 'inline-flex'; charEl.style.alignItems = 'flex-start';
                            const reelContainer = document.createElement('div'); reelContainer.style.willChange = 'transform, filter';
                            const finalCharDiv = document.createElement('div'); finalCharDiv.style.height = `${charHeight}px`; finalCharDiv.textContent = originalChar; reelContainer.appendChild(finalCharDiv);
                            for (let i = 0; i < reelLength; i++) {
                                const reelCharDiv = document.createElement('div'); reelCharDiv.style.height = `${charHeight}px`; reelCharDiv.textContent = reelChars[Math.floor(Math.random() * reelChars.length)]; reelContainer.appendChild(reelCharDiv);
                            }
                            charEl.innerHTML = ''; charEl.appendChild(reelContainer);
                            reelContainers.push(reelContainer); reelData.push({ length: reelLength });
                        });
                        gsap.set(reelContainers, { y: (i) => -reelData[i].length * charHeight });
                        animation.inTimeline?.to(reelContainers, { y: 0, duration, ease, delay, stagger: staggerOptions }, 0);
                        return; 
                    }

                    const duration = animProps.duration ?? 1, ease = animProps.ease ?? "expo.out", delay = animProps.delay ?? 0, stagger = animProps.stagger ?? 0;
                    let staggerOptions: gsap.StaggerVars = typeof stagger === 'number' ? { amount: stagger, from: animProps.origin ?? "start" } : stagger;
                    const fromVars: any = { ...getValues(animProps, "from"), force3D: true };
                    const toVars: any = { ...getValues(animProps, "to"), duration, ease, delay, stagger: staggerOptions };
                    if (animProps.transformOrigin) { fromVars.transformOrigin = animProps.transformOrigin; toVars.transformOrigin = animProps.transformOrigin; }
                    animation.inTimeline?.fromTo(target, fromVars, toVars, 0)
                }
            })

            // --- OUT ANIMATIONS ---
            if (hasOutAnimation) {
                 ;(['lines', 'words', 'chars'] as const).forEach(key => {
                    const target = targets[key];
                    const animProps = finalProps[`${key}Out`];
                    if (target && target.length > 0 && animProps) {
                        const duration = animProps.duration ?? 1, ease = animProps.ease ?? "expo.out", delay = animProps.delay ?? 0, stagger = animProps.stagger ?? 0;
                        let staggerOptions: gsap.StaggerVars = typeof stagger === 'number' ? { amount: stagger, from: animProps.origin ?? "start" } : stagger;
                        const toVars: any = { ...getValues(animProps, "to"), duration, ease, delay, stagger: staggerOptions };
                        if (animProps.transformOrigin) toVars.transformOrigin = animProps.transformOrigin;
                        animation.outTimeline?.to(target, toVars, 0)
                    }
                })
            }

            if (animationType !== "manual") {
                let start, end;
                const vp = viewport ?? "center";
                if (animationType === "scrub") {
                    start = vp === "top" ? "top center" : vp === "bottom" ? "top bottom" : "top 80%";
                    end = vp === "top" ? "bottom top" : vp === "bottom" ? "bottom center" : "bottom 20%";
                } else {
                    start = `top ${vp}`; end = `bottom ${vp}`;
                }

                animation.scrollTrigger = ScrollTrigger.create({
                    trigger: section?.current || elementRef.current,
                    start, end, once: !replay && animationType === "trigger",
                    onEnter: () => animationType === "trigger" && animation.inTimeline?.restart(),
                    onLeave: () => { if (animationType === "trigger" && replay) hasOutAnimation ? animation.outTimeline?.restart() : animation.inTimeline?.reverse(); },
                    onEnterBack: () => animationType === "trigger" && replay && animation.inTimeline?.restart(),
                    onLeaveBack: () => { if (animationType === "trigger" && replay) hasOutAnimation ? animation.outTimeline?.restart() : animation.inTimeline?.reverse(); },
                    onUpdate: (self) => { if (animationType === "scrub" && animation.inTimeline) gsap.to(animation.inTimeline, { progress: self.progress, duration: 1, ease: "expo.out", overwrite: true }); },
                })
            }
        }
        setupGsap()

        if (animationType === 'manual' && animation.inTimeline) {
            if (animateIn) animation.inTimeline.restart();
            else animation.inTimeline.reverse();
        }
        if (animationType === 'manual' && animation.outTimeline && animateOut) {
            animation.outTimeline.restart();
        }

        return () => {
            animation.scrollTrigger?.kill()
            animation.inTimeline?.revert()
            animation.outTimeline?.revert()
            animation.splitText?.revert()
        }
    }, [pluginsLoaded, text, preset, animationType, animateIn, animateOut, replay, section, viewport, JSON.stringify(props.lines), JSON.stringify(props.words), JSON.stringify(props.chars), JSON.stringify(props.linesOut), JSON.stringify(props.wordsOut), JSON.stringify(props.charsOut)])

    const gradient = useGradient ? gradientProp : undefined;
    const textStyles: React.CSSProperties = { ...font };

    // Only apply the base color or gradient if the animation preset itself isn't controlling the color.
    if (!isColorAnimated) {
        if (gradient) {
            textStyles.color = 'transparent';
            textStyles.backgroundImage = `linear-gradient(${gradient.angle ?? 90}deg, ${gradient.from}, ${gradient.to})`;
            textStyles.WebkitBackgroundClip = 'text';
            textStyles.backgroundClip = 'text';
        } else {
            textStyles.color = color;
        }
    }

    const TextElement = React.createElement(
        as,
        {
            className: className,
            style: textStyles,
            ref: splitRef
        },
        text
    );

    return (
        <div ref={elementRef} style={{ position: "relative", opacity: 0, width: "100%" }}>
            {TextElement}
        </div>
    )
}

Revelo.displayName = "Revelo"

// ------------------------------------------------------------ //
// FRAMER PROPERTY CONTROLS
// ------------------------------------------------------------ //

addPropertyControls(Revelo, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Fluidity in Motion",
    },
    preset: {
        type: ControlType.Enum,
        title: "Preset",
        options: Object.keys(animationPresets).filter(p => p !== 'madeWithRevelo'),
        defaultValue: "fluidityInMotion",
    },
    animationType: {
        type: ControlType.SegmentedEnum,
        title: "Type",
        options: ["trigger", "scrub", "manual"],
        defaultValue: "trigger",
    },
    animateIn: {
        type: ControlType.Boolean,
        title: "Animate In",
        defaultValue: false,
        hidden: (props) => props.animationType !== "manual",
    },
    animateOut: {
        type: ControlType.Boolean,
        title: "Animate Out",
        defaultValue: false,
        hidden: (props) => props.animationType !== "manual",
    },
    replay: {
        type: ControlType.Boolean,
        title: "Replay",
        defaultValue: true,
        hidden: (props) => props.animationType === "manual",
    },
    viewport: {
        type: ControlType.SegmentedEnum,
        title: "Viewport",
        options: ["top", "center", "bottom"],
        defaultValue: "center",
        hidden: (props) => props.animationType === "manual",
    },
    as: {
        type: ControlType.SegmentedEnum,
        title: "Tag",
        options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "span"],
        defaultValue: "div",
    },
    font: {
        type: ControlType.Font,
        title: "Font",
        controls: "extended"
    },
    color: {
        type: ControlType.Color,
        title: "Color",
        defaultValue: "#EEEEEE",
        hidden: (props) => props.useGradient,
    },
    useGradient: {
        type: ControlType.Boolean,
        title: "Gradient",
        defaultValue: false,
    },
    gradient: {
        type: ControlType.Object,
        title: " ",
        controls: {
            from: { type: ControlType.Color, title: "From", defaultValue: "#333333" },
            to: { type: ControlType.Color, title: "To", defaultValue: "#FFFFFF" },
            angle: { type: ControlType.Number, title: "Angle", defaultValue: 90, min: 0, max: 360, step: 1 },
        },
        hidden: (props) => !props.useGradient,
    },
})
