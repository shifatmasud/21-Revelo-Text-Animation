import * as React from "react"
import { useEffect, useRef, useState, useId } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { addPropertyControls, ControlType } from "framer"

gsap.registerPlugin(SplitText, ScrollTrigger)

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
    textShadow?: AnimationProperty<string>
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

interface Props {
    text: string
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span"
    className?: string
    preset?: keyof typeof animationPresets
    animationType?: "scrub" | "trigger" | "manual"
    animateIn?: boolean
    animateOut?: boolean
    replay?: boolean
    duration?: number
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
    glitchColor?: string
    lettersOnlyReel?: boolean
    debugMarkers?: boolean
    staticShockDuration?: number
    staticShockSpeed?: number
    staticShockDisplacement?: number
    fluidityInMotionDuration?: number
    grandPrizeDuration?: number
    rideTheWaveDuration?: number
    unfoldYourStoryDuration?: number
    warpSpeedAheadDuration?: number
    chaosIntoOrderDuration?: number
    chromaticFlowDuration?: number
    squashAndStretchDuration?: number
    bringIntoFocusDuration?: number
    shearDelightDuration?: number
    cascadeOfIdeasDuration?: number
    letItRainDuration?: number
    magneticForceDuration?: number
    floatingBubblesDuration?: number
    heavyImpactDuration?: number
    jitterbugEnergyDuration?: number
    staticShockDurationProp?: number
    liquidMetalDuration?: number
    anticipationPopDuration?: number
    skewAndSettleDuration?: number
    systemCorruptionDuration?: number
    madeWithReveloDuration?: number
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
        },
    },
    grandPrize: {
        chars: {
            reel: true,
            duration: 2.5,
            stagger: { each: 0.15, from: "start" },
            ease: "expo.inOut",
        },
    },
    rideTheWave: {
        chars: {
            y: { from: 80, to: 0 },
            skewY: { from: 10, to: 0 },
            opacity: { from: 0, to: 1 },
            duration: 2,
            stagger: { each: 0.05, from: "center", ease: "sine.out" },
            ease: "power3.inOut",
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
    },
    letItRain: {
        chars: {
            opacity: { from: 0, to: 1 },
            y: { from: -300, to: 0 },
            duration: 2,
            stagger: { amount: 1.5, from: "random" },
            ease: "bounce.out",
        },
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
            duration: 1,
            stagger: { amount: 1, from: "random" },
            ease: "power3.out",
        },
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
        },
    },
    heavyImpact: {
        words: {
            opacity: { from: 0, to: 1 },
            y: { from: -200, to: 0 },
            rotate: { from: 15, to: 0 },
            duration: 2,
            stagger: 0.1,
            ease: "bounce.out",
        },
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
        },
    },
    staticShock: {
        chars: {
            color: { from: "#333333", to: "#EEEEEE" },
            opacity: { from: 0, to: 1 },
            x: { from: () => gsap.utils.random(-50, 50), to: 0 },
            y: { from: () => gsap.utils.random(-50, 50), to: 0 },
            rotate: { from: () => gsap.utils.random(-25, 25), to: 0 },
            scale: { from: () => gsap.utils.random(0.5, 1.5), to: 1 },
            textShadow: {
                from: "2px 2px 0px #00e6e6, -2px -2px 0px #ff00ff",
                to: "0px 0px 0px transparent, 0px 0px 0px transparent",
            },
            duration: 0.4,
            stagger: { each: 0.01, from: "random" },
            ease: "rough({ template: none.out, strength: 300, points: 200, taper: 'none', randomize: true, clamp: false })",
        },
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
        },
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
        },
    },
    skewAndSettle: {
        chars: {
            opacity: { from: 0, to: 1 },
            y: { from: 100, to: 0 },
            skewX: { from: 30, to: 0 },
            duration: 2,
            stagger: { amount: 0.8, from: "center" },
            ease: "elastic.out(1, 0.4)",
        },
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
            ease: "power2.in",
        },
    },
    madeWithRevelo: {
        words: {
            opacity: { from: 0, to: 1 },
            y: { from: 20, to: 0 },
            duration: 1,
            stagger: 0.05,
            ease: "expo.out",
        },
    },
}

// ------------------------------------------------------------ //
// HELPER FUNCTIONS
// ------------------------------------------------------------ //

const animatedProperties = {
    mask: {},
    color: { render: (v: any) => v },
    textStrokeColor: { render: (v: any) => v },
    textStrokeWidth: { render: (v: any) => v },
    textShadow: { render: (v: any) => v },
    opacity: { render: (v: any) => v },
    x: { render: (v: any) => `${v}%` },
    y: { render: (v: any) => `${v}%` },
    scale: { render: (v: any) => v },
    scaleX: { render: (v: any) => v },
    scaleY: { render: (v: any) => v },
    filter: { render: (v: any) => `blur(${v}px)` },
    rotate: { render: (v: any) => `${v}deg` },
    rotateX: { render: (v: any) => `${v}deg` },
    letterSpacing: { render: (v: any) => `${v}px` },
    skewX: { render: (v: any) => `${v}deg` },
    skewY: { render: (v: any) => `${v}deg` },
}

function getValues(object: any, type: "from" | "to" = "from") {
    if (!object) return {}
    const values = Object.fromEntries(
        Object.entries(object)
            .map(([key, value]: [string, any]) => {
                if (value === undefined || value === null) return null
                const property =
                    animatedProperties[key as keyof typeof animatedProperties]
                if (!property) return null
                const val = value[type as keyof typeof value]
                if (val === undefined || val === null) return null

                if (typeof val === "function") {
                    if ("render" in property) {
                        return [
                            key,
                            (index: any, target: any, targets: any) =>
                                (property as any).render(
                                    val(index, target, targets)
                                ),
                        ]
                    }
                    return [key, val]
                }

                const renderedValue =
                    "render" in property ? (property as any).render(val) : val
                return [key, renderedValue]
            })
            .filter((v): v is [string, any] => v !== null)
    )

    if (values.scale !== undefined) {
        values.scaleX = values.scale
        values.scaleY = values.scale
        delete values.scale
    }

    return values
}

// ------------------------------------------------------------ //
// MAIN COMPONENT
// ------------------------------------------------------------ //
export default function Revelo(props: Props) {
    const {
        text,
        as = "div",
        className,
        preset,
        animationType = "trigger",
        animateIn,
        animateOut,
        replay = true,
        duration,
        section,
        viewport = "center",
        font = {},
        color = "#EEEEEE",
        glitchColor = "#333333",
        lettersOnlyReel = false,
        debugMarkers = false,
        staticShockDuration = 1,
        staticShockSpeed = 5,
        staticShockDisplacement = 15,
    } = props

    const elementRef = useRef<HTMLDivElement>(null)
    const splitRef = useRef<HTMLDivElement>(null)
    const [pluginsLoaded, setPluginsLoaded] = useState(false)
    const filterId = `revelo-filter-${useId().replace(/:/g, "")}`

    useEffect(() => {
        if (
            window.gsap &&
            (window.gsap.plugins as any).CustomEase &&
            (window.gsap.plugins as any).RoughEase
        ) {
            setPluginsLoaded(true)
            return
        }

        const loadScript = (src: string) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve(true)
                    return
                }
                const script = document.createElement("script")
                script.src = src
                script.async = true
                script.onload = () => resolve(true)
                script.onerror = () =>
                    reject(new Error(`Script load error for ${src}`))
                document.body.appendChild(script)
            })
        }

        const customEaseURL =
            "https://cdn.jsdelivr.net/npm/gsap@3.13.1/dist/CustomEase.min.js"
        const roughEaseURL =
            "https://cdn.jsdelivr.net/npm/gsap@3.13.1/dist/RoughEase.min.js"
        const easePackURL =
            "https://cdn.jsdelivr.net/npm/gsap@3.13.1/dist/EasePack.min.js"

        // @ts-ignore
        if (!window.gsap) {
            // @ts-ignore
            window.gsap = gsap
        }

        Promise.all([
            loadScript(customEaseURL),
            loadScript(roughEaseURL),
            loadScript(easePackURL),
        ])
            .then(() => {
                // @ts-ignore
                if (window.CustomEase) {
                    // @ts-ignore
                    gsap.registerPlugin(window.CustomEase, window.RoughEase)
                    try {
                        // @ts-ignore
                        if (!gsap.config().eases.liquid) {
                            // @ts-ignore
                            window.CustomEase.create(
                                "liquid",
                                "M0,0 C0.082,0.894 0.19,1.018 1,1"
                            )
                        }
                        // @ts-ignore
                        if (!gsap.config().eases.anticipation) {
                            // @ts-ignore
                            window.CustomEase.create(
                                "anticipation",
                                "M0,0 C0.168,-0.1 0.222,1.2 0.4,1.05 0.6,0.85 0.818,1.004 1,1"
                            )
                        }
                    } catch (e) {
                        console.error(
                            "Revelo: Failed to create custom eases.",
                            e
                        )
                    }
                } else {
                    console.error(
                        "Revelo Error: CustomEase plugin not found on window object after script load."
                    )
                }
                setPluginsLoaded(true)
            })
            .catch((error) => {
                console.error(
                    "Revelo: Failed to load GSAP plugins from CDN.",
                    error
                )
                setPluginsLoaded(true)
            })
    }, [])

    useEffect(() => {
        if (!pluginsLoaded) return

        const presetProps: AnimationPresetProperties = preset
            ? JSON.parse(JSON.stringify(animationPresets[preset]))
            : {}

        if (preset === "staticShock" && presetProps.chars?.color) {
            presetProps.chars.color.from = glitchColor
        }

        const presetDurationPropName = preset ? `${preset}Duration` : undefined
        // The staticShock preset has a conflicting prop name, so we use a different one
        const actualPropName =
            preset === "staticShock"
                ? "staticShockDurationProp"
                : presetDurationPropName
        const presetSpecificDuration = actualPropName
            ? (props[actualPropName as keyof Props] as number | undefined)
            : undefined

        let effectiveDuration: number | undefined = undefined
        if (
            presetSpecificDuration !== undefined &&
            presetSpecificDuration !== null
        ) {
            effectiveDuration = presetSpecificDuration
        } else if (duration !== undefined && duration !== null) {
            effectiveDuration = duration
        }

        if (effectiveDuration !== undefined) {
            const keys: (keyof AnimationPresetProperties)[] = [
                "lines",
                "words",
                "chars",
                "linesOut",
                "wordsOut",
                "charsOut",
            ]
            for (const key of keys) {
                if (
                    presetProps[key] &&
                    Object.keys(presetProps[key]).length > 0
                ) {
                    ;(presetProps[key] as AnimationProperties).duration =
                        effectiveDuration
                }
            }
        }

        const animationProps = {
            lines: { ...presetProps.lines, ...props.lines },
            words: { ...presetProps.words, ...props.words },
            chars: { ...presetProps.chars, ...props.chars },
            linesOut: { ...presetProps.linesOut, ...props.linesOut },
            wordsOut: { ...presetProps.wordsOut, ...props.wordsOut },
            charsOut: { ...presetProps.charsOut, ...props.charsOut },
        }

        for (const key of [
            "lines",
            "words",
            "chars",
            "linesOut",
            "wordsOut",
            "charsOut",
        ]) {
            const propSet = animationProps[key as keyof typeof animationProps]
            if (propSet && propSet.color) {
                propSet.color = { ...propSet.color, to: color }
            }
        }

        const animation = {
            inTimeline: null as gsap.core.Timeline | null,
            outTimeline: null as gsap.core.Timeline | null,
            scrollTrigger: null as ScrollTrigger | null,
            splitText: null as SplitText | null,
        }

        const hasInAnimation =
            Object.keys(animationProps.lines).length > 0 ||
            Object.keys(animationProps.words).length > 0 ||
            Object.keys(animationProps.chars).length > 0
        const hasOutAnimation =
            Object.keys(animationProps.linesOut).length > 0 ||
            Object.keys(animationProps.wordsOut).length > 0 ||
            Object.keys(animationProps.charsOut).length > 0

        const setupGsap = () => {
            if (!splitRef.current || !hasInAnimation) {
                if (elementRef.current) elementRef.current.style.opacity = "1"
                return
            }

            animation.inTimeline = gsap.timeline({ paused: true })
            animation.outTimeline = gsap.timeline({ paused: true })

            animation.splitText = new SplitText(splitRef.current, {
                type: `${Object.keys(animationProps.lines).length > 0 ? "lines," : ""}${Object.keys(animationProps.words).length > 0 ? "words," : ""}${Object.keys(animationProps.chars).length > 0 ? "chars" : ""}`,
                mask: animationProps.lines?.mask
                    ? "lines"
                    : animationProps.words?.mask
                      ? "words"
                      : animationProps.chars?.mask
                        ? "chars"
                        : undefined,
                linesClass: "line",
                wordsClass: "word",
                charsClass: "char",
            })

            if (elementRef.current) elementRef.current.style.opacity = "1"

            const targets = {
                lines:
                    Object.keys(animationProps.lines).length > 0 &&
                    animation.splitText.lines,
                words:
                    Object.keys(animationProps.words).length > 0 &&
                    animation.splitText.words,
                chars:
                    Object.keys(animationProps.chars).length > 0 &&
                    animation.splitText.chars,
            }

            // --- IN ANIMATIONS ---
            ;(["lines", "words", "chars"] as const).forEach((key) => {
                const target = targets[key]
                const animProps = animationProps[key]
                if (
                    !target ||
                    target.length === 0 ||
                    !animProps ||
                    Object.keys(animProps).length === 0
                )
                    return

                if (preset === "staticShock" && key === "chars") {
                    const duration = animProps.duration ?? 0.4
                    const ease = animProps.ease ?? "none"
                    const fromValues = getValues(animProps, "from")
                    const toValues = getValues(animProps, "to")
                    const feDisplacementMap = document.querySelector(
                        `#${filterId} feDisplacementMap`
                    )
                    const feTurbulence = document.querySelector(
                        `#${filterId} feTurbulence`
                    )

                    animation.inTimeline.fromTo(
                        target,
                        { ...fromValues },
                        {
                            ...toValues,
                            duration,
                            ease,
                            stagger: animProps.stagger,
                        }
                    )
                    if (feDisplacementMap) {
                        animation.inTimeline.fromTo(
                            feDisplacementMap,
                            { attr: { scale: staticShockDisplacement } },
                            { attr: { scale: 0 }, duration, ease },
                            "<"
                        )
                    }

                    const flickerDuration = 1 / staticShockSpeed
                    const repeatCount = Math.floor(
                        staticShockDuration * staticShockSpeed
                    )

                    if (repeatCount > 0) {
                        const loopTl = gsap.timeline({
                            repeat: repeatCount,
                            delay: -0.1,
                        })
                        loopTl.to(target, {
                            duration: flickerDuration,
                            x: () => gsap.utils.random(-8, 8),
                            y: () => gsap.utils.random(-8, 8),
                            rotate: () => gsap.utils.random(-10, 10),
                            skewX: () => gsap.utils.random(-15, 15),
                            scale: () => gsap.utils.random(0.95, 1.05),
                            opacity: () => gsap.utils.random(0.4, 1),
                            color: () =>
                                Math.random() > 0.5 ? glitchColor : color,
                            textShadow: () =>
                                Math.random() > 0.5
                                    ? "1px 1px 0px #00e6e6, -1px -1px 0px #ff00ff"
                                    : "0px 0px 0px transparent",
                            ease: "rough({ strength: 20, points: 10, randomize: true })",
                            stagger: { each: 0.02, from: "random" },
                        })
                        if (feDisplacementMap && feTurbulence) {
                            loopTl.to(
                                feDisplacementMap,
                                {
                                    duration: flickerDuration,
                                    attr: {
                                        scale: () =>
                                            gsap.utils.random(
                                                0,
                                                staticShockDisplacement * 0.75
                                            ),
                                    },
                                    ease: "steps(1)",
                                },
                                "<"
                            )
                            loopTl.to(
                                feTurbulence,
                                {
                                    duration: flickerDuration,
                                    attr: {
                                        baseFrequency: () =>
                                            `0.0${gsap.utils.random(1, 9)} 0.0${gsap.utils.random(1, 9)}`,
                                    },
                                    ease: "steps(1)",
                                },
                                "<"
                            )
                        }
                        animation.inTimeline.add(loopTl)
                    }

                    const settleTl = gsap.timeline()
                    settleTl.to(target, {
                        duration: 0.5,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        skewX: 0,
                        scale: 1,
                        opacity: 1,
                        color: color,
                        textShadow: "0px 0px 0px transparent",
                        ease: "power3.out",
                        stagger: { each: 0.02, from: "random" },
                    })
                    if (feDisplacementMap) {
                        settleTl.to(
                            feDisplacementMap,
                            {
                                duration: 0.5,
                                attr: { scale: 0 },
                                ease: "power3.out",
                            },
                            "<"
                        )
                    }
                    animation.inTimeline.add(settleTl)
                } else if (key === "chars" && animProps.reel) {
                    const charElements = target as HTMLElement[]
                    const charHeight = charElements[0]?.offsetHeight
                    if (!charHeight) return

                    const letters =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                    const allChars =
                        letters + "0123456789!@#$%^&*()_+-=[]{}|;:<>?,./"
                    const reelChars = lettersOnlyReel ? letters : allChars

                    charElements.forEach((charEl, i) => {
                        const originalChar = charEl.textContent
                        if (!originalChar || originalChar.trim() === "") return

                        const reelContainer = document.createElement("div")
                        const totalReelChars = 30

                        let reelContent = ""
                        for (let j = 0; j < totalReelChars - 1; j++) {
                            const randomChar = reelChars.charAt(
                                Math.floor(Math.random() * reelChars.length)
                            )
                            reelContent += `<div style="height: ${charHeight}px;">${randomChar}</div>`
                        }
                        reelContent += `<div style="height: ${charHeight}px;">${originalChar}</div>`
                        reelContainer.innerHTML = reelContent

                        charEl.innerHTML = ""
                        charEl.appendChild(reelContainer)
                        charEl.style.height = `${charHeight}px`
                        charEl.style.overflow = "hidden"
                        charEl.style.display = "inline-block"

                        animation.inTimeline?.fromTo(
                            reelContainer,
                            { y: 0, ...getValues(animProps, "from") },
                            {
                                y: -charHeight * (totalReelChars - 1),
                                ...getValues(animProps, "to"),
                                duration: animProps.duration,
                                ease: animProps.ease,
                                delay: (animProps.stagger as any)?.each
                                    ? i * (animProps.stagger as any).each
                                    : 0,
                            },
                            0
                        )
                    })
                } else {
                    const duration = animProps.duration ?? 1
                    const ease = animProps.ease ?? "expo.out"
                    const delay = animProps.delay ?? 0
                    const stagger = animProps.stagger ?? 0
                    let staggerOptions: gsap.StaggerVars =
                        typeof stagger === "number"
                            ? {
                                  amount: stagger,
                                  from: animProps.origin ?? "start",
                              }
                            : stagger

                    const fromVars: any = {
                        ...getValues(animProps, "from"),
                        force3D: true,
                    }

                    const toVars: any = {
                        ...getValues(animProps, "to"),
                        duration,
                        ease,
                        delay,
                        stagger: staggerOptions,
                    }

                    if (animProps.transformOrigin) {
                        fromVars.transformOrigin = animProps.transformOrigin
                        toVars.transformOrigin = animProps.transformOrigin
                    }
                    animation.inTimeline?.fromTo(target, fromVars, toVars, 0)
                }
            })

            // --- OUT ANIMATIONS ---
            if (hasOutAnimation) {
                ;(["lines", "words", "chars"] as const).forEach((key) => {
                    const target = targets[key]
                    const animProps = animationProps[`${key}Out`]
                    if (
                        target &&
                        target.length > 0 &&
                        animProps &&
                        Object.keys(animProps).length > 0
                    ) {
                        const duration = animProps.duration ?? 1
                        const ease = animProps.ease ?? "expo.out"
                        const delay = animProps.delay ?? 0
                        const stagger = animProps.stagger ?? 0
                        let staggerOptions: gsap.StaggerVars =
                            typeof stagger === "number"
                                ? {
                                      amount: stagger,
                                      from: animProps.origin ?? "start",
                                  }
                                : stagger

                        const toVars: any = {
                            ...getValues(animProps, "to"),
                            duration,
                            ease,
                            delay,
                            stagger: staggerOptions,
                        }

                        if (animProps.transformOrigin) {
                            toVars.transformOrigin = animProps.transformOrigin
                        }

                        animation.outTimeline?.to(target, toVars, 0)
                    }
                })
            }
        }

        const ctx = gsap.context(() => {
            setupGsap()

            if (animationType === "manual") {
                if (animateOut) {
                    if (hasOutAnimation && animation.outTimeline) {
                        animation.inTimeline?.progress(1, false)
                        animation.outTimeline.restart()
                    } else if (hasInAnimation && animation.inTimeline) {
                        animation.inTimeline.progress(1, false)
                        animation.inTimeline.reverse()
                    }
                } else if (animateIn) {
                    animation.inTimeline?.restart()
                }
            } else {
                const triggerElement = section?.current || elementRef.current
                let start, end
                const vp = viewport ?? "center"

                if (animationType === "scrub") {
                    start =
                        vp === "top"
                            ? "top center"
                            : vp === "bottom"
                              ? "top bottom"
                              : "top 80%"
                    end =
                        vp === "top"
                            ? "bottom top"
                            : vp === "bottom"
                              ? "bottom center"
                              : "bottom 20%"
                } else {
                    start = `top ${vp}`
                    end = `bottom ${vp}`
                }

                animation.scrollTrigger = ScrollTrigger.create({
                    trigger: triggerElement,
                    start,
                    end,
                    markers: debugMarkers,
                    scrub: animationType === "scrub" ? 1 : false,
                    once: !replay && animationType === "trigger",
                    onEnter: () =>
                        animationType === "trigger" &&
                        animation.inTimeline?.restart(),
                    onLeave: () => {
                        if (animationType === "trigger" && replay)
                            hasOutAnimation
                                ? animation.outTimeline?.restart()
                                : animation.inTimeline?.reverse()
                    },
                    onEnterBack: () =>
                        animationType === "trigger" &&
                        replay &&
                        animation.inTimeline?.restart(),
                    onLeaveBack: () => {
                        if (animationType === "trigger" && replay) {
                            animation.inTimeline?.reverse()
                        }
                    },
                    onUpdate: (self) => {
                        if (animationType === "scrub" && animation.inTimeline) {
                            gsap.to(animation.inTimeline, {
                                progress: self.progress,
                                duration: 1,
                                ease: "expo.out",
                                overwrite: true,
                            })
                        }
                    },
                })
            }
        }, elementRef)

        return () => {
            ctx.revert()
            if (animation.scrollTrigger) animation.scrollTrigger.kill()
            if (animation.inTimeline) animation.inTimeline.kill()
            if (animation.outTimeline) animation.outTimeline.kill()
            if (animation.splitText) animation.splitText.revert()
        }
    }, [
        pluginsLoaded,
        text,
        preset,
        animationType,
        animateIn,
        animateOut,
        replay,
        section,
        viewport,
        color,
        glitchColor,
        debugMarkers,
        staticShockDuration,
        staticShockSpeed,
        staticShockDisplacement,
        lettersOnlyReel,
        duration,
        props.fluidityInMotionDuration,
        props.grandPrizeDuration,
        props.rideTheWaveDuration,
        props.unfoldYourStoryDuration,
        props.warpSpeedAheadDuration,
        props.chaosIntoOrderDuration,
        props.chromaticFlowDuration,
        props.squashAndStretchDuration,
        props.bringIntoFocusDuration,
        props.shearDelightDuration,
        props.cascadeOfIdeasDuration,
        props.letItRainDuration,
        props.magneticForceDuration,
        props.floatingBubblesDuration,
        props.heavyImpactDuration,
        props.jitterbugEnergyDuration,
        props.staticShockDurationProp,
        props.liquidMetalDuration,
        props.anticipationPopDuration,
        props.skewAndSettleDuration,
        props.systemCorruptionDuration,
        props.madeWithReveloDuration,
        JSON.stringify(props.font),
        JSON.stringify(props.lines),
        JSON.stringify(props.words),
        JSON.stringify(props.chars),
        JSON.stringify(props.linesOut),
        JSON.stringify(props.wordsOut),
        JSON.stringify(props.charsOut),
    ])

    const Tag = as
    const style: React.CSSProperties = {
        opacity: 0,
        ...font,
        color: color,
        position: "relative",
        filter: preset === "staticShock" ? `url(#${filterId})` : undefined,
    }

    return (
        <Tag ref={elementRef} className={className} style={style}>
            {preset === "staticShock" && (
                <svg
                    style={{
                        position: "absolute",
                        width: 0,
                        height: 0,
                        overflow: "hidden",
                    }}
                >
                    <filter id={filterId}>
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.01 0.01"
                            numOctaves="1"
                            result="turbulence"
                            seed={Math.random()}
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="turbulence"
                            scale="0"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </svg>
            )}
            <span
                ref={splitRef}
                style={{ display: "inline-block", width: "100%" }}
            >
                {text}
            </span>
        </Tag>
    )
}

const presetDurationControls = Object.keys(animationPresets).reduce(
    (acc, presetKey) => {
        const title =
            presetKey
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase()) + " Duration"
        // The staticShock preset has a conflicting prop name for its effect duration, so we use a different prop name for animation duration
        const propName =
            presetKey === "staticShock"
                ? "staticShockDurationProp"
                : `${presetKey}Duration`

        acc[propName] = {
            type: ControlType.Number,
            title: title,
            min: 0,
            max: 10,
            step: 0.1,
            displayStepper: true,
            unit: "s",
            hidden: ({ preset }) => preset !== presetKey,
        }
        return acc
    },
    {} as any
)

addPropertyControls(Revelo, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Animated Text",
    },
    as: {
        type: ControlType.Enum,
        title: "Tag",
        options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "span"],
        defaultValue: "div",
    },
    preset: {
        type: ControlType.Enum,
        title: "Preset",
        options: Object.keys(animationPresets),
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
    duration: {
        type: ControlType.Number,
        title: "Duration (Global)",
        min: 0,
        max: 10,
        step: 0.1,
        displayStepper: true,
        unit: "s",
        tooltip:
            "A global override for duration. Can be overridden by preset-specific duration controls.",
    },
    ...presetDurationControls,
    viewport: {
        type: ControlType.SegmentedEnum,
        title: "Viewport",
        options: ["top", "center", "bottom"],
        defaultValue: "center",
        hidden: (props) => props.animationType === "manual",
    },
    font: {
        type: ControlType.Font,
        title: "Font",
        controls: "extended",
    },
    color: { type: ControlType.Color, title: "Color", defaultValue: "#EEEEEE" },
    glitchColor: {
        type: ControlType.Color,
        title: "Glitch Color",
        defaultValue: "#333333",
        hidden: (props) => props.preset !== "staticShock",
    },
    lettersOnlyReel: {
        type: ControlType.Boolean,
        title: "Letters Only",
        defaultValue: false,
        hidden: (props) => props.preset !== "grandPrize",
    },
    debugMarkers: {
        type: ControlType.Boolean,
        title: "Debug",
        defaultValue: false,
    },
    staticShockDuration: {
        type: ControlType.Number,
        title: "Shock Effect Duration",
        defaultValue: 1,
        min: 0,
        max: 10,
        step: 0.1,
        displayStepper: true,
        unit: "s",
        hidden: (props) => props.preset !== "staticShock",
    },
    staticShockSpeed: {
        type: ControlType.Number,
        title: "Shock Speed",
        defaultValue: 5,
        min: 1,
        max: 50,
        step: 1,
        displayStepper: true,
        hidden: (props) => props.preset !== "staticShock",
    },
    staticShockDisplacement: {
        type: ControlType.Number,
        title: "Displacement",
        defaultValue: 15,
        min: 0,
        max: 100,
        step: 1,
        displayStepper: true,
        hidden: (props) => props.preset !== "staticShock",
    },
})