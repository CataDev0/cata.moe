// src/lib/actions.ts
import type { Action } from 'svelte/action';

interface ViewportOptions {
	once?: boolean;
	margin?: string;
	onEnter?: () => void;
	onLeave?: () => void;
}

export const viewport: Action<HTMLElement, ViewportOptions | undefined> = (node, options) => {
	let observer: IntersectionObserver;

	const handleIntersect = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				node.classList.add('visible');
				options?.onEnter?.();
				if (options?.once) {
					observer.unobserve(node);
				}
			} else {
				node.classList.remove('visible');
				options?.onLeave?.();
			}
		});
	};

	const createObserver = () => {
		const observerOptions = {
			rootMargin: options?.margin ?? '0px'
		};
		observer = new IntersectionObserver(handleIntersect, observerOptions);
		observer.observe(node);
	};

	createObserver();

	return {
		destroy() {
			if (observer) {
				observer.disconnect();
			}
		}
	};
};
