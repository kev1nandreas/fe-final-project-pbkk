"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export interface FadeInUpOptions {
	trigger?: string | HTMLElement;
	start?: string;
	end?: string;
	toggleActions?: string;
	duration?: number;
	delay?: number;
	yFrom?: number;
	yTo?: number;
	opacityFrom?: number;
	opacityTo?: number;
	ease?: string;
	stagger?: number;
}

/**
 * Hook for fade-in-up animation with scroll trigger
 */
export function useFadeInUp<T extends HTMLElement>(
	options: FadeInUpOptions = {},
) {
	const ref = useRef<T>(null);

	useEffect(() => {
		if (!ref.current) return;

		const {
			start = "top 80%",
			end,
			toggleActions = "play none none none",
			duration = 1,
			delay = 0,
			yFrom = 20,
			yTo = 0,
			opacityFrom = 0,
			opacityTo = 1,
			ease = "power3.out",
		} = options;

		const animation = gsap.fromTo(
			ref.current,
			{
				y: yFrom,
				opacity: opacityFrom,
			},
			{
				y: yTo,
				opacity: opacityTo,
				duration,
				delay,
				ease,
				scrollTrigger: {
					trigger: options.trigger || ref.current,
					start,
					end,
					toggleActions,
				},
			},
		);

		return () => {
			animation.kill();
		};
	}, [options]);

	return ref;
}

/**
 * Hook for staggered fade-in animation for multiple children
 */
export function useStaggerFadeIn<T extends HTMLElement>(
	options: FadeInUpOptions = {},
) {
	const ref = useRef<T>(null);

	useEffect(() => {
		if (!ref.current) return;

		const {
			start = "top 80%",
			toggleActions = "play none none none",
			duration = 0.8,
			yFrom = 30,
			yTo = 0,
			opacityFrom = 0,
			opacityTo = 1,
			ease = "power3.out",
			stagger = 0.1,
		} = options;

		const children = ref.current.children;
		if (!children.length) return;

		const animation = gsap.fromTo(
			children,
			{
				y: yFrom,
				opacity: opacityFrom,
			},
			{
				y: yTo,
				opacity: opacityTo,
				duration,
				ease,
				stagger,
				scrollTrigger: {
					trigger: ref.current,
					start,
					toggleActions,
				},
			},
		);

		return () => {
			animation.kill();
		};
	}, [options]);

	return ref;
}

/**
 * Hook for scale-in animation
 */
export function useScaleIn<T extends HTMLElement>(
	options: Omit<FadeInUpOptions, "yFrom" | "yTo"> & {
		scaleFrom?: number;
		scaleTo?: number;
	} = {},
) {
	const ref = useRef<T>(null);

	useEffect(() => {
		if (!ref.current) return;

		const {
			start = "top 80%",
			toggleActions = "play none none none",
			duration = 0.8,
			scaleFrom = 0.8,
			scaleTo = 1,
			opacityFrom = 0,
			opacityTo = 1,
			ease = "back.out(1.7)",
		} = options;

		const animation = gsap.fromTo(
			ref.current,
			{
				scale: scaleFrom,
				opacity: opacityFrom,
			},
			{
				scale: scaleTo,
				opacity: opacityTo,
				duration,
				ease,
				scrollTrigger: {
					trigger: ref.current,
					start,
					toggleActions,
				},
			},
		);

		return () => {
			animation.kill();
		};
	}, [options]);

	return ref;
}

/**
 * Hook for slide-in animation (from left/right)
 */
export function useSlideIn<T extends HTMLElement>(
	direction: "left" | "right" = "left",
	options: Omit<FadeInUpOptions, "yFrom" | "yTo"> & {
		distance?: number;
	} = {},
) {
	const ref = useRef<T>(null);

	useEffect(() => {
		if (!ref.current) return;

		const {
			start = "top 80%",
			toggleActions = "play none none none",
			duration = 1,
			distance = 50,
			opacityFrom = 0,
			opacityTo = 1,
			ease = "power3.out",
		} = options;

		const xFrom = direction === "left" ? -distance : distance;

		const animation = gsap.fromTo(
			ref.current,
			{
				x: xFrom,
				opacity: opacityFrom,
			},
			{
				x: 0,
				opacity: opacityTo,
				duration,
				ease,
				scrollTrigger: {
					trigger: ref.current,
					start,
					toggleActions,
				},
			},
		);

		return () => {
			animation.kill();
		};
	}, [direction, options]);

	return ref;
}

/**
 * Standalone function to animate any element (no hook)
 */
export function animateFadeInUp(
	element: HTMLElement | string,
	options: FadeInUpOptions = {},
) {
	const {
		start = "top 80%",
		toggleActions = "play none none none",
		duration = 1,
		yFrom = 20,
		yTo = 0,
		opacityFrom = 0,
		opacityTo = 1,
		ease = "power3.out",
	} = options;

	return gsap.fromTo(
		element,
		{
			y: yFrom,
			opacity: opacityFrom,
		},
		{
			y: yTo,
			opacity: opacityTo,
			duration,
			ease,
			scrollTrigger: {
				trigger: options.trigger || element,
				start,
				toggleActions,
			},
		},
	);
}
