const colorClasses = [
    'text-ctp-flamingo bg-ctp-flamingo/5 border-ctp-flamingo/30',
    'text-ctp-pink bg-ctp-pink/5 border-ctp-pink/30',
    'text-ctp-mauve bg-ctp-mauve/5 border-ctp-mauve/30',
    'text-ctp-red bg-ctp-red/5 border-ctp-red/30',
    'text-ctp-maroon bg-ctp-maroon/5 border-ctp-maroon/30',
    'text-ctp-peach bg-ctp-peach/5 border-ctp-peach/30',
    'text-ctp-yellow bg-ctp-yellow/5 border-ctp-yellow/30',
    'text-ctp-green bg-ctp-green/5 border-ctp-green/30',
    'text-ctp-teal bg-ctp-teal/5 border-ctp-teal/30',
    'text-ctp-sky bg-ctp-sky/5 border-ctp-sky/30',
    'text-ctp-sapphire bg-ctp-sapphire/5 border-ctp-sapphire/30',
    'text-ctp-blue bg-ctp-blue/5 border-ctp-blue/30',
];

const magicNumber = 37518; // yes, this is just a random number

/**
 * Generate a deterministic color from a string using a hash function
 */
export function getColorForString(tag: string): string {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
        hash = tag.charCodeAt(i) + ((hash << 5) - hash * magicNumber);
        hash = hash & hash;
    }

    const index = Math.abs(hash) % colorClasses.length;
    return colorClasses[index];
}
