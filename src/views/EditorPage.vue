<script setup>
import commitIcon from "@/assets/icon/commit.svg";
import saveIcon from "@/assets/icon/save.svg";
import deleteIcon from "@/assets/icon/delete.svg";
import {QuillEditor} from "@vueup/vue-quill";
import { ref, reactive, onMounted, watchEffect, toRaw } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {createDocument, editDocument} from '@/api/api.js';
import { useRoute } from 'vue-router';
import router from "@/router/index.js";

// 状态来跟踪当前选中的导航项
const currentView = ref('预览');
const searchInput = ref('');
// 定义切换视图的函数
const switchView = (view) => {
  currentView.value = view;
};

const route = useRoute();
const title = route.query.title || '';
const content = decodeURIComponent(route.query.content || '');


const emit = defineEmits(['update:value']);

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

const exportToPDF = async () => {
  // 功能实现有问题
  if (!quillEditor.value) {
    console.error('Quill editor is not initialized');
    return;
  }

  const quill = quillEditor.value.getQuill();  // 获取 Quill 实例
  if (!quill) {
    console.error('Quill instance is not available');
    return;
  }

  // 使用 html2canvas 渲染编辑器内容为图像
  const canvas = await html2canvas(quill.root, {
    allowTaint: true,  // 允许跨域图片渲染
    useCORS: true,     // 尝试使用 CORS 加载外部图片
    backgroundColor: 'transparent',
  });

  const imgData = canvas.toDataURL('image/png');  // 转换为 PNG 格式图像数据

  const doc = new jsPDF();

  // 将图像数据添加到 PDF 中
  doc.addImage(imgData, 'PNG', 10, 10, canvas.width * 0.2, canvas.height * 0.2);  // 调整图像大小和位置

  doc.save('.pdf');
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
        ['speech', 'image', 'video', 'export'],
      ],
      handlers: {
        speech: startRecognition,
        export: exportToPDF
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
  if (quillEditor.value) {
    const quill = quillEditor.value.getQuill();
    if (quill) {
      console.log('Quill editor initialized');
    }
  }

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

const confirmSubmit = async () => {
  const quill = quillEditor.value?.getQuill();
  if (!quill) {
    console.error('Quill editor is not initialized');
    return;
  }

  const title = document.querySelector('.article-title')?.value.trim();
  const contentHTML = quill.root.innerHTML;

  if (!title) {
    alert('标题不能为空');
    return;
  }

  if (route.query.title) {
    console.log(contentHTML)

    const response = await editDocument(route.query.id, {
      title,
      content: contentHTML
    });
    if (response.success) {
      alert(`文章已更新，状态：${selectedOption.value === 'public' ? '公开' : '私密'}`);
    } else {
      alert('更新失败，请重试');
    }

    showDialog.value = false;
    selectedOption.value = '';

    router.push({ path: '/user' });
  } else {
    const response = await createDocument(title, contentHTML);

    if (response.success) {
      alert(`文章已提交，状态：${selectedOption.value === 'public' ? '公开' : '私密'}`);
    } else {
      alert('提交失败，请重试');
    }

    showDialog.value = false;
    selectedOption.value = '';
  }
};

const saveDraft = () => {
  alert('草稿已保存');

};

const discard = () => {
  alert('文章已丢弃');
};
</script>

<template>
  <div class="container">
<!--    <div class="left-box">-->
<!--      <div class="left-box-navi">-->
<!--        <span @click="switchView('预览')" :class="{ active: currentView === '预览' }">预览</span> |-->
<!--        <span @click="switchView('版式')" :class="{ active: currentView === '版式' }">版式</span>-->
<!--      </div>-->
<!--      <div class="left-box-content">-->
<!--        <div v-if="currentView === '预览'">预览内容</div>-->
<!--        <div v-if="currentView === '版式'">模板内容</div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="main-box">
      <div class="editor-container">
        <input type="text" v-model="title" class="article-title" placeholder="标题" />

        <QuillEditor ref="quillEditor" content-type="html" v-model:content="content" :options="editorOption" />

        <div class="btn-container">
          <button @click="openDialog" class="btn-icon">
            <img :src="commitIcon" alt="提交" />
          </button>
          <button @click="saveDraft" class="btn-icon">
            <img :src="saveIcon" alt="保存" />
          </button>
<!--          <button @click="discard" class="btn-icon">-->
<!--            <img :src="deleteIcon" alt="丢弃" />-->
<!--          </button>-->
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
    </div>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 188vh;
  user-select: none;
}

.left-box {
  flex: 1;
  background-color: #f6f6f6;
  padding: 3vh;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  height: 75vh;
  margin-top: 5vh;
}

.left-box-navi {
  margin-bottom: 2vh;
  cursor: pointer;
}

.active {
  font-weight: bold;
  color: #213547;
  font-family: 'ShangGuB', sans-serif;
}

.main-box {
  flex: 3;
  margin-left: 5vh;
  margin-right: 10vh;
}

.main-box :deep(.ql-toolbar .ql-speech) {
  width: 24px;
  height: 22px;
  background-image: url('@/assets/icon/mic.svg');
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  border-radius: 30%;
}

.main-box :deep(.ql-toolbar .ql-export) {
  width: 24px;
  height: 22px;
  background-image: url('@/assets/icon/export.svg');
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  border-radius: 30%;
}

.main-box .editor-container {
  position: relative;
}

.main-box :deep(.ql-editor) {
  border: 1.1px solid #ccc;
  height: 72vh;
  background-color: #f6f6f6;
  width: 173vh;
}
.main-box :deep(.ql-toolbar) {
  border: 1.1px solid #ccc;
  padding: 7px;
}
.main-box :deep(.ql-formats) {
  height: 21px;
  line-height: 21px;
}

.main-box .article-title {
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

.main-box .btn-icon {
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

.main-box .btn-icon:hover {
  background-color: #444343;
  transform: scale(1.1);
}

.main-box .btn-icon img {
  width: 25px;
  height: auto;
}

.main-box .btn-container {
  position: absolute;
  bottom: 1vh;
  right: -10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.main-box .dialog-overlay {
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

.main-box .dialog-box {
  background: white;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

.main-box .dialog-box p {
  margin-top: -20px;
}

.main-box .dialog-box .dialog-btn {
  margin: 5px 0;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: #3d493f;
  outline: none;
}

.main-box .dialog-box button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.main-box .close-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: right;
  outline: none;
}

.main-box .close-btn img {
  width: 24px;
  height: 24px;
}

.main-box .close-btn:hover img {
  opacity: 0.8;
}
</style>
