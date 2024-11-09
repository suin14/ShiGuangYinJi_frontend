<template>
  <div class="card">
    <img :src="imageSrc" alt="image" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <div class="user-info">
        <img :src="userAvatar" alt="user avatar" class="user-avatar" />
        <span class="user-name">{{ userName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    imageSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    userAvatar: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  width: 250px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-10px);
}

.card-image {
  width: 100%;
  object-fit: cover;
}

.card-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-size: 14px;
  color: #555;
}

</style>
