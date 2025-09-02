<template>
  <header class="header">
    <div class="header-container">
      <div class="header-brand">
        <router-link to="/" class="brand-link">
          <h1 class="brand-title">MovieHub</h1>
        </router-link>
      </div>

      <nav class="header-nav" :class="{ 'nav-open': isMobileMenuOpen }">
        <ul class="nav-list">
          <li class="nav-item" v-for="menu in menus" :key="menu.name">
            <router-link :to="menu.slug" class="nav-link" @click="closeMobileMenu">
              {{ menu.name }}
            </router-link>
            <ul class="drop-down" v-if="menu.children">
              <li class="nav-item-drop" v-for="children in menu.children" :key="children.name">
                <router-link :to="`${menu.slug}/${children.slug}`" class="nav-link" @click="closeMobileMenu">
                  {{ children.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div class="header-search">
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search movies, TV shows..."
            class="search-input"
            @input="handleSearch"
            @keyup.enter="performSearch"
          />
          <button class="search-button" @click="performSearch">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="header-actions">
        <button class="action-button" @click="toggleTheme">
          <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="5"></circle>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
          </svg>
        </button>
      </div>

      <button class="mobile-menu-toggle" @click="toggleMobileMenu">
        <span class="hamburger-line" :class="{ 'line-1': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'line-2': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'line-3': isMobileMenuOpen }"></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { getDataCategory, getDataCountry, getDataYear } from '@/services/HeaderServices'
import {getDataHome} from '@/services/home/HomeServices'

// Reactive data
const searchQuery = ref('')
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const dataCategory = ref([]);
const dataCountry = ref([])
const dataYear = ref([])

onMounted(async () => {
  const resCate = await getDataCategory();
  dataCategory.value = resCate.data.items;

  const resCountry = await getDataCountry();
  dataCountry.value = resCountry.data.items;
  
  const resYear = await getDataYear();
  dataYear.value = resYear.data.items;

})
const menus = computed(() => [
  {
    name: "Phim mới",
    slug: "/",
  },
  {
    name: "Danh sách phim",
    slug: "/danh-sach",
    children: [
      { name: "Phim bộ", slug: "phim-bo" },
      { name: "Phim lẻ", slug: "phim-le" },
      { name: "TV Shows", slug: "tv-shows" },
      { name: "Hoạt hình", slug: "hoat-hinh" },
      { name: "Phim Vietsub", slug: "phim-vietsub" },
      { name: "Phim thuyết minh", slug: "phim-thuyet-minh" },
      { name: "Phim lồng tiếng", slug: "phim-long-tien" },
      { name: "Phim bộ đang chiếu", slug: "phim-bo-dang-chieu" },
      { name: "Phim bộ hoàn thành", slug: "phim-bo-hoan-thanh" },
      { name: "Phim sắp chiếu", slug: "phim-sap-chieu" },
      { name: "Subteam", slug: "subteam" },
      { name: "Phim chiếu rạp", slug: "phim-chieu-rap" }
    ]
  },
  {
    name: "Thể loại",
    slug: "/the-loai",
    children: dataCategory.value.map((item) => ({
      id: item._id,
      name: item.name,
      slug: item.slug,
    }))
  },
  {
    name: "Quốc gia",
    slug: "/quoc-gia",
    children: dataCountry.value.map((item) => ({
      id: item._id,
      name: item.name,
      slug: item.slug,
    }))
  },
  {
    name: "Năm",
    slug: "/nam",
    children: dataYear.value.map((item) => ({
      id: item._id,
      name: item.year,
      slug: item.year,
    }))
  }
])


const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const toggleTheme = () => {
  // Toggle between light and dark theme
  document.documentElement.classList.toggle('dark-theme')
}

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  const header = document.querySelector('.header')
  if (header && !header.contains(event.target)) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
// // Methods
// const handleSearch = () => {
//   // Emit search event or handle search logic
//   console.log('Search query:', searchQuery.value)
// }

// const performSearch = () => {
//   if (searchQuery.value.trim()) {
//     // Perform search action
//     console.log('Performing search for:', searchQuery.value)
//   }
// }
</script>

<style scoped>
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.header {
  background: #000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* Brand Styles */
.header-brand {
  flex-shrink: 0;
}

.brand-link {
  text-decoration: none;
  color: inherit;
}

.brand-title {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Navigation Styles */
.header-nav {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  top: 0px;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
}

.nav-item {
  margin: 0;
  position: relative;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

/* .nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
} */

.nav-item:hover > .drop-down {
  display: grid;
}

.nav-link.router-link-active, .nav-link:hover {
  color: #ff9601;
}

.drop-down {
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  display: none;
  background: #000;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px 20px;
  padding: 30px 10px 10px 10px;
  opacity: 0.8;
}

.nav-item-drop {
  min-width: max-content;
}

/* Search Styles */
.header-search {
  flex: 1;
  max-width: 400px;
  margin: 0 20px;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 12px 50px 12px 20px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  background: white;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.search-button {
  position: absolute;
  right: 5px;
  background: #667eea;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: #5a6fd8;
  transform: scale(1.1);
}

.search-icon {
  width: 18px;
  height: 18px;
  color: white;
}

/* Action Buttons */
.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.action-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.action-icon {
  width: 20px;
  height: 20px;
  color: white;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: white;
  margin: 3px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.line-1 {
  transform: rotate(45deg) translate(5px, 5px);
}

.line-2 {
  opacity: 0;
}

.line-3 {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    padding: 0 15px;
  }

  .header-nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .nav-open {
    transform: translateY(0);
  }

  .nav-list {
    flex-direction: column;
    gap: 0;
    padding: 20px;
  }

  .nav-item {
    width: 100%;
  }

  .nav-link {
    display: block;
    padding: 15px 20px;
    border-radius: 10px;
    text-align: center;
  }

  .header-search {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .brand-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 10px;
  }

  .brand-title {
    font-size: 1.3rem;
  }

  .header-actions {
    gap: 10px;
  }

  .action-button {
    width: 35px;
    height: 35px;
  }
}

/* Dark theme support */
:root {
  --bg-primary: #ffffff;
  --text-primary: #333333;
}

.dark-theme {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
