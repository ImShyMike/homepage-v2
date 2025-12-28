<script lang="ts">
    import { onMount } from 'svelte';
    import LucideSearch from '~icons/lucide/search';

    type SearchItem = {
        title: string;
        description: string;
        url: string;
        type: 'Post' | 'Project';
        tags?: string[];
        date?: number;
    };

    let open = $state(false);
    let query = $state('');
    let activeIndex = $state(0);
    let inputEl: HTMLInputElement | null = $state(null);
    let items: SearchItem[] = $state([]);

    let normalizedItems: SearchItem[] = $derived(
        items.map((item) => ({ ...item, date: item.date ?? 0 })).sort((a, b) => b.date - a.date)
    );

    let splitItems: Record<string, SearchItem[]> = $derived(
        normalizedItems.reduce(
            (acc, item) => {
                if (!acc[item.type]) {
                    acc[item.type] = [];
                }
                acc[item.type].push(item);
                return acc;
            },
            {} as Record<string, SearchItem[]>
        )
    );

    let normalizedQuery: string = $derived(query.trim().toLowerCase());

    let filteredItems: SearchItem[] = $derived(
        normalizedQuery.length === 0
            ? normalizedItems
            : normalizedItems.filter((item) => {
                  const haystack =
                      `${item.title} ${item.description} ${(item.tags ?? []).join(' ')}`.toLowerCase();
                  return normalizedQuery.split(/\s+/).every((token) => haystack.includes(token));
              })
    );

    $effect(() => {
        if (activeIndex >= filteredItems.length) {
            activeIndex = 0;
        }
    });

    function openMenu() {
        open = true;
        requestAnimationFrame(() => {
            inputEl?.focus();
            inputEl?.select();
        });
    }

    function closeMenu() {
        open = false;
        query = '';
        activeIndex = 0;
    }

    function toggleMenu() {
        open ? closeMenu() : openMenu();
    }

    function onInputKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeMenu();
            return;
        }

        if (event.key === 'ArrowDown' && filteredItems.length > 0) {
            event.preventDefault();
            activeIndex = (activeIndex + 1) % filteredItems.length;
            return;
        }

        if (event.key === 'ArrowUp' && filteredItems.length > 0) {
            event.preventDefault();
            activeIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
            return;
        }

        if (event.key === 'Enter' && filteredItems[activeIndex]) {
            window.location.href = filteredItems[activeIndex].url;
        }
    }

    onMount(() => {
        (async () => {
            try {
                const response = await fetch('/api/search.json');
                items = await response.json();
            } catch (error) {
                console.error('Failed to load search items:', error);
            }
        })();

        const handler = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                toggleMenu();
            } else if (event.key === 'Escape' && open) {
                closeMenu();
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    });
</script>

<button
    type="button"
    class="border-ctp-surface1 text-ctp-lavender hover:bg-ctp-lavender hover:text-ctp-crust flex cursor-pointer items-center justify-center border-l px-4 py-3 transition-colors"
    aria-expanded={open}
    aria-haspopup="dialog"
    aria-controls="search-menu"
    onclick={toggleMenu}
>
    <LucideSearch class="h-6 w-6" />
    <span class="sr-only">Open search</span>
</button>

{#if open}
    <div
        class="bg-ctp-crust/80 fixed inset-0 z-50 backdrop-blur"
        role="presentation"
        tabindex="-1"
        onclick={closeMenu}
        onkeydown={(event) => event.key === 'Escape' && closeMenu()}
    >
        <div
            class="mx-auto mt-16 w-full max-w-3xl px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-menu-title"
            tabindex="-1"
            onclick={(event) => event.stopPropagation()}
            onkeydown={(event) => event.key === 'Escape' && closeMenu()}
        >
            <div class="border-ctp-surface1 bg-ctp-base border shadow-2xl">
                <h2 id="search-menu-title" class="sr-only">Search</h2>
                <div class="border-ctp-surface1 flex items-center gap-3 border-b px-4 py-3">
                    <LucideSearch class="text-ctp-subtext0 h-5 w-5" />
                    <input
                        bind:this={inputEl}
                        bind:value={query}
                        class="placeholder:text-ctp-subtext0 flex-1 bg-transparent text-base outline-none"
                        placeholder="Search posts, projects, tags..."
                        autocomplete="off"
                        spellcheck="false"
                        onkeydown={onInputKeydown}
                    />
                    <div class="text-ctp-subtext0 flex items-center gap-2 text-xs">
                        <span class="hidden items-center gap-1 sm:flex">
                            <kbd class="border-ctp-surface1 rounded border px-1.5 py-0.5">Ctrl</kbd>
                            <span>+</span>
                            <kbd class="border-ctp-surface1 rounded border px-1.5 py-0.5">K</kbd>
                        </span>
                    </div>
                </div>

                <div
                    class="max-h-[60vh] overflow-y-auto"
                    id="search-menu"
                    role="listbox"
                    aria-label="Search results"
                >
                    {#if filteredItems.length === 0}
                        <p class="text-ctp-subtext0 px-4 py-6">
                            No matches yet. Try another keyword.
                        </p>
                    {:else}
                        {#each Object.entries(splitItems) as [type, itemsArray] (type)}
                            {@const typeItems = itemsArray.filter((item) =>
                                filteredItems.includes(item)
                            )}
                            {#if typeItems.length > 0}
                                <div
                                    class="bg-ctp-mantle/40 text-ctp-subtext0 flex items-center gap-2 px-4 py-2 text-sm font-semibold"
                                >
                                    <span>{type}</span>
                                </div>
                                {#each typeItems as item (item.url)}
                                    {@const globalIndex = filteredItems.findIndex(
                                        (i) => i.url === item.url
                                    )}
                                    <a
                                        href={item.url}
                                        class={`hover:bg-ctp-mantle! border-ctp-base border! no-underline! ${globalIndex === activeIndex ? 'bg-ctp-mantle border-ctp-mantle' : ''} border-ctp-surface1/60 hover:border-ctp-lavender/70 hover:bg-ctp-mantle/40 flex flex-col gap-1 border-b px-4 py-3 transition-colors`}
                                        onmouseenter={() => (activeIndex = globalIndex)}
                                        role="option"
                                        aria-selected={globalIndex === activeIndex}
                                    >
                                        <p
                                            class="text-ctp-text text-lg leading-tight font-semibold"
                                        >
                                            {item.title}
                                        </p>
                                        <p class="text-ctp-subtext0 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </a>
                                {/each}
                            {/if}
                        {/each}
                    {/if}
                </div>

                <div
                    class="bg-ctp-mantle/40 text-ctp-subtext0 flex items-center justify-between px-4 py-2 text-xs"
                >
                    <span>Click a result or press Enter to open.</span>
                    <span class="hidden items-center gap-2 sm:flex">
                        <kbd class="border-ctp-surface1 rounded border px-1.5 py-0.5">Esc</kbd>
                        <span>to close</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
{/if}
