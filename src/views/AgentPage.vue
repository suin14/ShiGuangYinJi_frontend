<script setup>
import { ref } from 'vue';

const messages = ref([
  { text: '你好！', sender: '系统' },
]);

const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({ text: newMessage.value, sender: '用户' });
    newMessage.value = '';
  }
};
</script>


<template>
  <div class="container">
    <div class="box">
      <div class="message-list">
        <div
            v-for="(message, index) in messages"
            :key="index"
            class="message"
            :class="{'user-message': message.sender === '用户', 'system-message': message.sender !== '用户'}"
        >
          <div>
            <strong>{{ message.sender }}</strong>
          </div>
          <div>{{ message.text }}</div>
        </div>
      </div>

      <div class="input-area">
        <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="输入消息..."
            class="input-box"
        />
        <div class="send-btn">
          <img src="@/assets/icon/send.svg" alt="发送" @click="sendMessage"/>
        </div>
        <div class="upload-btn">
          <img src="@/assets/icon/pin.svg" alt="上传" @click=""/>
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

.box {
  width: 150vh;
  background-color: #f6f6f6;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  height: 75vh;
  display: flex;
  flex-direction: column;
  flex: 3;
  padding: 5vh 3vh 3vh 5vh;
  margin-top: 5vh;
  margin-right: 5vh;
  text-align: left;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 10px;
}

.message {
  padding: 5px;
  margin: 10px 0;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.user-message {
  background-color: #e9eaee;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  text-align: right;
}

.system-message {
  background-color: #bbd0fa;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
}

.input-area {
  margin-top: 4vh;
  width: 100vh;
  height: 40px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 999px;
  overflow: hidden;
}

.input-box {
  padding: 0 30px 0 20px;
  width: 82%;
  height: 100%;
  font-size: 16px;
  color: #333;
  caret-color: rgba(1, 50, 12, 0.74);
  background: #fff;
  border: none;
  outline: none;
  border-radius: 999px;
  transition: background-color 0.3s ease;
}

.input-box::placeholder {
  color: rgba(51, 51, 51, 0.5);
}

.input-box:focus {
  background-color: #fff;
}

.upload-btn img,
.send-btn img {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding-left: 10px;
  padding-top: 5px;
}

.upload-btn:hover,
.send-btn:hover {
  transform: scale(1.1);
}
</style>


