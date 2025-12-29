import { visit } from 'unist-util-visit';

const regex = /:(!)?([a-zA-Z0-9_-]+):/g;

export default function remarkEmojify() {
    return (tree) => {
        visit(tree, 'text', (node, index, parent) => {
            if (!parent || !node.value) return;

            const parts = [];
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(node.value)) !== null) {
                const [full, isLarge, emojiName] = match;
                const start = match.index;
                const end = start + full.length;

                // text before emoji
                if (start > lastIndex) {
                    parts.push({
                        type: 'text',
                        value: node.value.slice(lastIndex, start),
                    });
                }

                // emoji image
                parts.push({
                    type: 'image',
                    url: `https://cachet.dunkirk.sh/emojis/${emojiName}/r`,
                    alt: emojiName,
                    title: emojiName,
                    data: {
                        hName: 'Image',
                        hProperties: {
                            className: isLarge ? ['emoji', 'large'] : ['emoji'],
                            loading: 'eager',
                        },
                    },
                });

                lastIndex = end;
            }

            // trailing text
            if (lastIndex < node.value.length) {
                parts.push({
                    type: 'text',
                    value: node.value.slice(lastIndex),
                });
            }

            if (parts.length > 0) {
                parent.children.splice(index, 1, ...parts);
                return index + parts.length;
            }
        });
    };
}

// need to make changes here?
// run this after every change: fd '^remark-' node_modules -t d -d 2 -x rm -r && rm -r .astro && bun i && bun dev
// why? i have no idea... but it works!
