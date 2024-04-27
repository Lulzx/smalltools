<template>
    <div>
        <div class="mb-4">
            <span class="font-bold">Landing Page Copy Analysis</span>
        </div>

        <div>
            <!-- class="bg-white dark:bg-dark my-4 px-8 py-3 rounded-md max-w-sm text-dark dark:text-light"> -->
            <input type="text" v-model="url" @keyup.enter="analyze" />&nbsp;
            <button @click="analyze">Analyze</button>
        </div>

        <div class="my-4 text-lg">
            {{ updates }}
        </div>

        <div class="my-4" v-if="analysis">
            <span v-html="snarkdown(analysis)"></span>
        </div>

        <!-- <div class="my-4" v-if="scrapedText">
            <span class="mb-4 font-bold text-2xl">Content</span>
            <pre>{{ scrapedText }}</pre>
        </div> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ky from 'ky';
import snarkdown from "snarkdown";

const url = ref('');

const updates = ref('');

const scrapedText = ref('');

const analysis = ref('');

const analyze = async () => {
    updates.value = "";
    try {
        updates.value = "analysis started...";
        const isDev =
            typeof process !== "undefined" && process.env.NODE_ENV === "development";

        const BACKEND = isDev ? "http://localhost:8787" : "https://api.lulz.workers.dev";
        const endpoint = `${BACKEND}/copy?url=${url.value}`;

        const response = await ky.get(endpoint).text();
        console.log(response);
        updates.value = "analysis done!";
        analysis.value = response;
    } catch (error) {
        console.error(error);
    }
}
</script>