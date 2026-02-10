<script setup lang="ts">
import { ref } from "vue";

const msg = ref("");
const loading = ref(false);
const error = ref<string | null>(null);

async function handleGenerate() {
  loading.value = true;
  error.value = null;
  msg.value = "";

  try {
    const payload = {
      model: "arcee-ai/trinity-mini:free",
      messages: [
        {
          role: "user",
          content: "A short random idea for drawing in 1 sentence or less only. Use only text",
        },
      ],
    };

    const res = await fetch("/api/drawing-idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data?.error || `Request failed (${res.status})`);
    }

    msg.value = data?.choices?.[0]?.message?.content ?? "No response";
  } catch (e: any) {
    error.value = e?.message ?? "Something went wrong";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="app">
    <button class="prompt-button" type="button" @click="handleGenerate" :disabled="loading">
      {{ loading ? "Generating..." : "Generate drawing idea" }}
    </button>

    <p v-if="error" style="margin-top: 12px;">Error: {{ error }}</p>
    <p v-else-if="msg" class="prompt-result">{{ msg }}</p>
  </div>
</template>

<style src="/style/style.css"></style>
