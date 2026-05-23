/** Inter font stack with natural leading and zero tracking — used throughout the app */
export const interText = "font-['Inter',Helvetica] leading-[normal] tracking-normal";

/** Small muted secondary text (task descriptions, dates) */
export const taskSecondaryText = `text-xs font-normal text-[#a8a29f] ${interText}`;

/** Common base for task list badge elements */
export const taskBadgeBase = `h-auto border-0 text-[11px] font-normal ${interText}`;
