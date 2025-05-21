import {useEffect, useRef} from "react";
import './PixelCard.css';

class Pixel {
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    color: string;
    speed: number;
    size: number;
    sizeStep: number;
    minSize: number;
    maxSizeInteger: number;
    maxSize: number;
    delay: number;
    counter: number;
    counterStep: number;
    isIdle: boolean;
    isReverse: boolean;
    isShimmer: boolean;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = this.getRandomValue(0.1, 0.9) * speed;
        this.size = 0;
        this.sizeStep = Math.random() * 0.8;
        this.minSize = 1.0;
        this.maxSizeInteger = 4;
        this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
        this.delay = delay;
        this.counter = 0;
        this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
        this.isIdle = false;
        this.isReverse = false;
        this.isShimmer = false;
    }

    getRandomValue(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    draw() {
        const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
        this.ctx.fillStyle = this.color;
        
        this.ctx.globalAlpha = 0.85;
        
        this.ctx.fillRect(
            this.x + centerOffset,
            this.y + centerOffset,
            this.size,
            this.size
        );
        
        this.ctx.globalAlpha = 1.0;
    }

    appear() {
        this.isIdle = false;
        if (this.counter <= this.delay) {
            this.counter += this.counterStep;
            return;
        }
        if (this.size >= this.maxSize) {
            this.isShimmer = true;
        }
        if (this.isShimmer) {
            this.shimmer();
        } else {
            this.size += this.sizeStep;
        }
        this.draw();
    }

    disappear() {
        this.isShimmer = false;
        this.counter = 0;
        if (this.size <= 0) {
            this.isIdle = true;
            return;
        } else {
            this.size -= 0.1;
        }
        this.draw();
    }

    shimmer() {
        if (this.size >= this.maxSize) {
            this.isReverse = true;
        } else if (this.size <= this.minSize) {
            this.isReverse = false;
        }
        if (this.isReverse) {
            this.size -= this.speed;
        } else {
            this.size += this.speed;
        }
    }
}

function getEffectiveSpeed(value: any, reducedMotion: any) {
    const min = 0;
    const max = 100;
    const throttle = 0.001;
    const parsed = parseInt(value, 10);

    if (parsed <= min || reducedMotion) {
        return min;
    } else if (parsed >= max) {
        return max * throttle;
    } else {
        return parsed * throttle;
    }
}

/**
 *  You can change/expand these as you like.
 */
const VARIANTS = {
    default: {
        activeColor: null,
        gap: 3,
        speed: 50,
        colors: "#fee2e2,#fca5a5,#ffffff",
        noFocus: false
    },
    blue: {
        activeColor: "#fee2e2",
        gap: 5,
        speed: 40,
        colors: "#fee2e2,#fca5a5,#dc2626",
        noFocus: false
    },
    yellow: {
        activeColor: "#fee2e2",
        gap: 2,
        speed: 35,
        colors: "#fee2e2,#fca5a5,#dc2626",
        noFocus: false
    },
    pink: {
        activeColor: "#fee2e2",
        gap: 3,
        speed: 90,
        colors: "#fee2e2,#fca5a5,#dc2626",
        noFocus: true
    },
    primary: {
        activeColor: "#fee2e2",
        gap: 4,
        speed: 45,
        colors: "#fee2e2,#fca5a5,#dc2626",
        noFocus: false
    },
    secondary: {
        activeColor: "#fee2e2",
        gap: 4,
        speed: 55,
        colors: "#fee2e2,#fca5a5,#dc2626",
        noFocus: false
    },
    success: {
        activeColor: "#fee2e2",
        gap: 3,
        speed: 40,
        colors: "#fee2e2,#fca5a5,#dc2626",
        noFocus: false
    },
    danger: {
        activeColor: "#fee2e2",
        gap: 2,
        speed: 60,
        colors: "#fee2e2,#fca5a5,#dc2626",
        noFocus: false
    },
    warning: {
        activeColor: "#fee2e2",
        gap: 3,
        speed: 45,
        colors: "#fee2e2,#fca5a5,#dc2626",
        noFocus: false
    },
    info: {
        activeColor: "#fee2e2",
        gap: 3,
        speed: 50,
        colors: "#fee2e2,#fca5a5,#dc2626",
        noFocus: false
    }
};

interface PixelCardProps {
    variant?: "default" | "blue" | "yellow" | "pink" | "primary" | "secondary" | "success" | "danger" | "warning" | "info";
    gap?: number;
    speed?: number;
    colors?: string;
    noFocus?: boolean;
    className?: string;
    title?: string;
    description?: string;
    children: React.ReactNode;
    bordered?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

interface VariantConfig {
    activeColor: string | null
    gap: number
    speed: number
    colors: string
    noFocus: boolean
}

export default function PixelCard({
    variant = "default",
    gap,
    speed,
    colors,
    noFocus,
    className = "",
    title,
    description,
    children,
    size = 'md',
    bordered = false
 }: PixelCardProps): JSX.Element {

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pixelsRef = useRef<Pixel[]>([]);
    const animationRef = useRef<any>(null);
    const timePreviousRef = useRef(performance.now());
    const reducedMotion = useRef(
        typeof window !== 'undefined' 
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false
    ).current;

    const variantCfg: VariantConfig = VARIANTS[variant] || VARIANTS.default;
    const finalGap = gap ?? variantCfg.gap;
    const finalSpeed = speed ?? variantCfg.speed;
    const finalColors = colors ?? variantCfg.colors;
    const finalNoFocus = noFocus ?? variantCfg.noFocus;

    const sizeClasses = {
        sm: 'h-60 w-48',   // Height: 240px, Width: 192px
        md: 'h-80 w-60',   // Height: 320px, Width: 240px
        lg: 'h-96 w-72',   // Height: 384px, Width: 288px
    };

    const initPixels = () => {
        if (!containerRef.current || !canvasRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const width = Math.floor(rect.width);
        const height = Math.floor(rect.height);
        const ctx = canvasRef.current.getContext("2d");

        canvasRef.current.width = width;
        canvasRef.current.height = height;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;

        const colorsArray = finalColors.split(",");
        const pxs = [];
        for (let x = 0; x < width; x += parseInt(finalGap.toString(), 10)) {
            for (let y = 0; y < height; y += parseInt(finalGap.toString(), 10)) {
                const color =
                    colorsArray[Math.floor(Math.random() * colorsArray.length)];

                const dx = x - width / 2;
                const dy = y - height / 2;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const delay = reducedMotion ? 0 : distance;
                if(!ctx) return;
                pxs.push(
                    new Pixel(
                        canvasRef.current,
                        ctx,
                        x,
                        y,
                        color,
                        getEffectiveSpeed(finalSpeed, reducedMotion),
                        delay
                    )
                );
            }
        }
        pixelsRef.current = pxs;
    };

    const doAnimate = (fnName: keyof Pixel) => {
        animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
        const timeNow = performance.now();
        const timePassed = timeNow - timePreviousRef.current;
        const timeInterval = 1000 / 60; // ~60 FPS

        if (timePassed < timeInterval) return;
        timePreviousRef.current = timeNow - (timePassed % timeInterval);

        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx || !canvasRef.current) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        let allIdle = true;
        for (let i = 0; i < pixelsRef.current.length; i++) {
            const pixel = pixelsRef.current[i];
            // @ts-ignore
            pixel[fnName]();
            if (!pixel.isIdle) {
                allIdle = false;
            }
        }
        if (allIdle) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const handleAnimation = (name: keyof Pixel) => {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(() => doAnimate(name));
    };

    const onMouseEnter = () => handleAnimation("appear");
    const onMouseLeave = () => handleAnimation("disappear");
    const onFocus: React.FocusEventHandler<HTMLDivElement> = (e) => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        handleAnimation("appear");
    };
    const onBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        handleAnimation("disappear");
    };

    useEffect(() => {
        initPixels();
        const observer = new ResizeObserver(() => {
            initPixels();
        });
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        
        // Auto-start the pixel animation after a small delay
        const timer = setTimeout(() => {
            handleAnimation("appear");
        }, 500);
        
        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationRef.current);
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalGap, finalSpeed, finalColors, finalNoFocus]);

    const borderedClass = bordered ? 'border-[2px]' : 'border-[1px]';

    return (
        <div
            ref={containerRef}
            className={`pixel-card ${sizeClasses[size]} ${borderedClass} ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={finalNoFocus ? undefined : onFocus}
            onBlur={finalNoFocus ? undefined : onBlur}
            tabIndex={finalNoFocus ? -1 : 0}
        >
            <canvas
                className="pixel-canvas"
                ref={canvasRef}
            />
            <div className="relative z-10 p-6 flex flex-col w-full h-full content-overlay rounded-[24px]">
                {title && <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>}
                {description && <p className="mb-4 text-gray-700 dark:text-gray-200">{description}</p>}
                <div className="mt-auto">
                    {children}
                </div>
            </div>
        </div>
    );
} 