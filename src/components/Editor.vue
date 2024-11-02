<template>
  <div class="editor-container">
    <input type="text" class="article-title" v-model="title" placeholder="标题" />
    <QuillEditor ref="myQuillEditor"
                 theme="snow"
                 v-model:content="content"
                 :options="data.editorOption"
                 contentType="html"
                 @update:content="setValue()"
    />
    <input type="file" hidden accept=".jpg,.png" ref="fileBtn" @change="handleUpload" />
    <button @click="startRecognition" class="btn-mic">
      <img :src="isListening ? loadingIcon : micIcon" alt="语音识别" />
    </button>
  </div>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { reactive, onMounted, ref, toRaw, watch } from 'vue'
import micIcon from '@/assets/icon/mic.svg';
import loadingIcon from '@/assets/icon/loading.svg';

const props = defineProps(['value'])
const emit = defineEmits(['updateValue'])
const content = ref('')
const myQuillEditor = ref()
watch(() => props.value, (val) => {
  toRaw(myQuillEditor.value).setHTML(val)
}, { deep: true })

const fileBtn = ref()
const data = reactive({
  content: '',
  editorOption: {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'blockquote', 'code-block', 'image'],
        [{ 'color': [] }, { 'background': [] }]
      ]
    },
    placeholder: '请输入内容...'
  }
})

const imgHandler = (state) => {
  if (state) {
    fileBtn.value.click()
  }
}

const setValue = () => {
  const text = toRaw(myQuillEditor.value).getHTML()
  emit('updateValue', text)
}

const handleUpload = async (e) => {
  const files = Array.from(e.target.files)
  if (!files.length) {
    return
  }
  const formdata = new FormData()
  formdata.append('file', files[0])

  try {
    const response = await fetch('IMAGE_UPLOAD_URL', {
      method: 'POST',
      body: formdata
    });
    const result = await response.json();

    if (result.url) {
      const quill = toRaw(myQuillEditor.value).getQuill()
      const length = quill.getSelection().index
      quill.insertEmbed(length, 'image', result.url)
      quill.setSelection(length + 1)
    } else {
      console.error('上传失败:', result.message);
    }
  } catch (error) {
    console.error('上传错误:', error);
  }
}

let recognition;
const transcript = ref('');
const isListening = ref(false);

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
    transcript.value = event.results[0][0].transcript;
    insertTextToQuill(transcript.value);
  });

  recognition.addEventListener('end', () => {
    isListening.value = false;
  });

  recognition.addEventListener('error', (event) => {
    alert(`Error occurred: ${event.error}`);
    isListening.value = false;
  });
});

const startRecognition = () => {
  if (isListening.value) return;
  recognition.start();
  isListening.value = true;
  transcript.value = '';
};

const insertTextToQuill = (text) => {
  const quill = toRaw(myQuillEditor.value).getQuill();
  const length = quill.getSelection().index;
  quill.insertText(length, text);
  quill.setSelection(length + text.length);
};

onMounted(() => {
  const quill = toRaw(myQuillEditor.value).getQuill();
  if (myQuillEditor.value) {
    quill.getModule('toolbar').addHandler('image', imgHandler);
  }
});
</script>

<style scoped lang="scss">
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

.btn-mic {
  position: absolute;
  bottom: 12px;
  right: 12px;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.btn-mic:hover {
  background-color: #444343;
  transform: scale(1.1);
}

.btn-mic img {
  width: 25px;
  height: auto;
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
