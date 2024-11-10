<template>
  <div class="editor-container">
    <input type="text" class="article-title" placeholder="标题" />

    <QuillEditor ref="quillEditor" content-type="html" v-model:content="content" :options="editorOption" />
    <div class="btn-container">
      <button @click="openDialog" class="btn-icon">
        <img :src="commitIcon" alt="提交" />
      </button>
      <button @click="saveDraft" class="btn-icon">
        <img :src="saveIcon" alt="保存" />
      </button>
      <button @click="discard" class="btn-icon">
        <img :src="deleteIcon" alt="丢弃" />
      </button>
    </div>

    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog-box">
        <button class="close-btn" @click="closeDialog">
          <img src="@/assets/icon/close.svg" alt="关闭" />
        </button>
        <p>请选择文章状态：</p>
        <button class="dialog-btn" @click="selectOption('public')">公开(所有用户可见)</button>
        <button class="dialog-btn" @click="selectOption('private')">私密(仅自己可见)</button>
        <button class="dialog-btn" :disabled="!selectedOption" @click="confirmSubmit">确认</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, onMounted, watchEffect, toRaw } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import commitIcon from '@/assets/icon/commit.svg';
import saveIcon from '@/assets/icon/save.svg';
import deleteIcon from '@/assets/icon/delete.svg';

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
const showDialog = ref(false);
const selectedOption = ref('');

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
        [{ color: [] }, { background: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ font: [] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['speech', 'image'],
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

const openDialog = () => {
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
};

const selectOption = (option) => {
  selectedOption.value = option;
};

const confirmSubmit = () => {
  alert(`文章已提交，状态：${selectedOption.value === 'public' ? '公开' : '私密'}`);
  showDialog.value = false;
  selectedOption.value = '';
};

const saveDraft = () => {
  alert('草稿已保存');
};

const discard = () => {
  alert('文章已丢弃');
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
  height: 72vh;
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
  font-family: 'ShangGuB', sans-serif;
}

.btn-icon {
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
  outline: none;
}

.btn-icon:hover {
  background-color: #444343;
  transform: scale(1.1);
}

.btn-icon img {
  width: 25px;
  height: auto;
}

.btn-container {
  position: absolute;
  bottom: 1vh;
  right: -10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-box {
  background: white;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

.dialog-box p {
  margin-top: -20px;
}

.dialog-box .dialog-btn {
  margin: 5px 0;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: #3d493f;
  outline: none;
}

.dialog-box button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.close-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: right;
  outline: none;
}

.close-btn img {
  width: 24px;
  height: 24px;
}

.close-btn:hover img {
  opacity: 0.8;
}
</style>
