<script setup lang="ts">
import { ref } from 'vue';
import OpenAI from 'openai';

const msg = ref('');
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "arcee-ai/trinity-mini:free",
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "A short random idea for drawing in 1 sentence or less only. Use only text"
          },
          

        ]
      }
    ]
  });
  const choiceMessage = completion?.choices?.[0]?.message;
  // Normalize content: OpenRouter may return an array of content blocks or a string
  const content = choiceMessage?.content;
  let text = '';
  if (Array.isArray(content)) {
    text = content.map(c => (typeof c === 'string' ? c : c?.text || '')).join('');
  } else if (typeof content === 'string') {
    text = content;
  } else {
    text = JSON.stringify(content || '');
  }

  // Update the reactive ref so the template shows the response
  msg.value = text;
  console.log('AI reply:', text);
}

async function handleGenerate() {
  await main();
}
</script>

<template>

  <div class="app">
    <button class="prompt-button" type="button" @click="handleGenerate">
      Generate drawing idea
    </button>
    <p v-if="msg" class="prompt-result">{{ msg }}</p>
  </div>
</template>

<style src="/style/style.css"></style>
