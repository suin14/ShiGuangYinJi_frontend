<template>
  <div class="editor-container">
    <input type="text" class="article-title" placeholder="标题" />

    <QuillEditor ref="quillEditor" content-type="html" v-model:content="content" :options="editorOption" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watchEffect, toRaw } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:value']);

const content = ref(props.value);
const isListening = ref(false);
const quillEditor = ref(null);

const startRecognition = () => {
  if (isListening.value) return;
  console.log("开始语音识别...");
  recognition.start();
  isListening.value = true;
};

const editorOption = reactive({
  modules: {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ font: [] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'blockquote', 'code-block', 'image'],
        [{ color: [] }, { background: [] }],
        ['speech'],
      ],
      handlers: {
        speech: startRecognition,
      },
    },
  },
  placeholder: '请输入内容...',
  theme: 'snow',
});

watchEffect(() => {
  emit('update:value', content.value);
});

let recognition;

onMounted(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition. Please try Chrome.");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = 'zh-CN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    insertTextToQuill(transcript);
  });

  recognition.addEventListener('end', () => {
    isListening.value = false;
  });

  recognition.addEventListener('error', (event) => {
    alert(`Error occurred: ${event.error}`);
    isListening.value = false;
  });
});

const insertTextToQuill = (text) => {
  const quill = toRaw(quillEditor.value.getQuill());
  const length = quill.getSelection()?.index || 0;
  quill.insertText(length, text);
  quill.setSelection(length + text.length);
};
</script>

<style scoped lang="scss">
:deep(.ql-toolbar .ql-speech) {
  width: 24px;
  height: 22px;
  background-image: url('@/assets/icon/mic.svg');
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  border-radius: 30%;
}

.editor-container {
  position: relative;
}

:deep(.ql-editor) {
  border: 1.1px solid #ccc;
  min-height: 560px;
  background-color: #f6f6f6;
}
:deep(.ql-toolbar) {
  border: 1.1px solid #ccc;
  padding: 7px;
}
:deep(.ql-formats) {
  height: 21px;
  line-height: 21px;
}

.article-title {
  width: 96%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  font-size: 22px;
  outline: none;
  margin-bottom: 15px;
  background-color: transparent;
  color: #242424;
  font-weight: bold;
}
</style>
