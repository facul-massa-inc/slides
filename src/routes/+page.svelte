<script lang="ts">
    import * as slidesImport from "$lib/slides";
    import { parseIntMaybeNull } from "$lib/util";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    let curSlide = 0;
    let mounted = false;
    const slides = Object.keys(slidesImport).map(k => (<any>slidesImport)[k]);
    
    onMount(() => {
        curSlide = parseIntMaybeNull(sessionStorage.getItem("slide")) ?? 0;
        window.addEventListener("wheel", (ev) => {
            curSlide = Math.max(0, Math.min(curSlide + Math.sign(ev.deltaY), slides.length-1));
        });
        mounted = true;
    });
    $: saveSlide(curSlide);

    function saveSlide(slide: number) {
        if(!browser || !mounted) return;
        sessionStorage.setItem("slide", slide.toString());
    }
</script>
<style>
    :global(body), :global(html) {
        position: absolute;
        margin: 0;
        width: 100%;
        height: 100%;
    }
    :global(body) {
        background-image: linear-gradient(blueviolet, purple);
        font-family: Arial, Helvetica, sans-serif;
        display: flex;
        flex-flow: column;
    }
    :global(h1), :global(p) {
        color: white;
    }
    header {
        position: fixed;
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        padding-top: 10px;
    }
    .header-spacer {
        height: 60px;
    }
    img {
        flex: 1;
        height: 100%;
        object-fit: contain;
        object-position: 0;
        padding-left: 20px;
    }
    h1 {
        padding-right: 20px;
        text-align: right;
        flex: 1;
        margin: 0;
        font-size: 3em;
    }
    main {
        flex: 1;
    }
    footer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        overflow-y: auto;
    }
</style>
{#if mounted}
{#if curSlide != 0}
    <header>
        <img src="unifglogobranca.png" alt="">
        <h1>2024.2</h1>
    </header>
    <div class="header-spacer"></div>
{/if}
<main>
    <svelte:component this={slides[curSlide]} />
</main>
<footer>
    <input type="radio" name="slide" bind:group={curSlide} value={0} checked>
    {#each {length: slides.length - 1} as _, i}
        <input type="radio" name="slide" bind:group={curSlide} value={i+1}> 
    {/each}
</footer>
{/if}