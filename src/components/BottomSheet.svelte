<script>
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import { trapFocus } from '../lib/utils';

    export let show = false;
    export let title = '';

    const dispatch = createEventDispatcher();
    let bottomSheetElement;
    let cleanupFocusTrap;

    $: if (show && bottomSheetElement) {
        // Trap focus when bottom sheet opens
        cleanupFocusTrap = trapFocus(bottomSheetElement);
        bottomSheetElement.addEventListener('escape', close);
    } else if (cleanupFocusTrap) {
        // Clean up focus trap when bottom sheet closes
        cleanupFocusTrap();
        cleanupFocusTrap = null;
    }

    onDestroy(() => {
        if (cleanupFocusTrap) {
            cleanupFocusTrap();
        }
    });

    function close() {
        show = false;
        dispatch('close');
    }
</script>

<div class="bottom-sheet-overlay" class:show on:click={close} on:keydown={(e) => { if (e.key === 'Escape') close(); }} role="button" tabindex="0"></div>

<div class="bottom-sheet" 
    bind:this={bottomSheetElement}
    class:show
    aria-modal="true"
    aria-labelledby="bottom-sheet-title"
    role="dialog"
    tabindex="-1"
>
        aria-modal="true"
    aria-labelledby="bottom-sheet-title"
    role="dialog"
    tabindex="-1"
>
    <div class="bottom-sheet-header">
        <h3 id="bottom-sheet-title">{title}</h3>
        <button 
            on:click={close}
            aria-label="Close dialog"
        >&times;</button>
    </div>
    <div class="bottom-sheet-content">
        <slot></slot>
    </div>
</div>

<style>
    .bottom-sheet-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .bottom-sheet-overlay.show {
        opacity: 1;
        visibility: visible;
    }

    .bottom-sheet {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        max-height: 90%;
        background-color: var(--background-color);
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        transform: translateY(100%);
        transition: transform 0.3s ease, visibility 0.3s ease;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        visibility: hidden;
    }

    .bottom-sheet.show {
        transform: translateY(0);
        visibility: visible;
    }

    .bottom-sheet-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid var(--border-color);
    }

    .bottom-sheet-header h3 {
        margin: 0;
        font-size: 1.2em;
    }

    .bottom-sheet-header button {
        background: none;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
        color: var(--text-color);
    }

    .bottom-sheet-content {
        flex-grow: 1;
        padding: 16px;
        overflow-y: auto;
    }

    /* Desktop styles */
    @media (min-width: 768px) {
        .bottom-sheet {
            position: fixed;
            top: 0;
            right: 0;
            width: 350px; /* Adjust as needed */
            height: 100%;
            max-height: 100%;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }

        .bottom-sheet.show {
            transform: translateX(0);
        }

        .bottom-sheet-overlay {
            display: none; /* No overlay on desktop */
        }
    }
</style>
