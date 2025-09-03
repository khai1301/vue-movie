<template>
    <div class="loading-overlay">
        <div class="spinner"></div>
    </div>
</template>
<style scoped>
.loading-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 6px solid #ddd;
  border-top: 6px solid #3498db; /* màu xoay */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>