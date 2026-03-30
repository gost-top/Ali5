/* ============================================
   الملف: script.js
   الوصف: ملف الجافاسكريبت الرئيسي
   ============================================ */

const App = {
  books: []
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  setupEventListeners();
  renderBooks();
  setupScrollHandler();
  setupMobileMenu();
});

function initApp() {
  console.log('✅ تم تحميل التطبيق بنجاح');
}

// ===== التنقل بين الصفحات =====
function hideAllPages() {
  const booksPage = document.getElementById('books-page');
  const videosPage = document.getElementById('videos-page');
  const homeSections = document.querySelectorAll('#homeSection');
  
  if (booksPage) booksPage.hidden = true;
  if (videosPage) videosPage.hidden = true;
  homeSections.forEach(section => section.classList.remove('hidden'));
  
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
}

function showHomePage() {
  hideAllPages();
  const homeLink = document.querySelector('.nav-link[onclick*="showHomePage"]');
  if (homeLink) homeLink.classList.add('active');
  document.title = 'علي النجار – أستاذ اللغة الإنجليزية';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showBooksPage() {
  const booksPage = document.getElementById('books-page');
  const homeSections = document.querySelectorAll('#homeSection');
  
  if (booksPage) booksPage.hidden = false;
  homeSections.forEach(section => section.classList.add('hidden'));
  
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const booksLink = document.querySelector('.nav-link[onclick*="showBooksPage"]');
  if (booksLink) booksLink.classList.add('active');
  
  document.title = 'مكتبة الكتب - علي النجار';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showVideosPage() {
  const videosPage = document.getElementById('videos-page');
  const homeSections = document.querySelectorAll('#homeSection');
  
  if (videosPage) videosPage.hidden = false;
  homeSections.forEach(section => section.classList.add('hidden'));
  
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const videosLink = document.querySelector('.nav-link[onclick*="showVideosPage"]');
  if (videosLink) videosLink.classList.add('active');
  
  document.title = 'فيديوهات الشرح - علي النجار';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== القائمة الجانبية للجوال =====
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeSidebar');
  const sidebar = document.getElementById('mobileSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (!menuBtn) return;
  
  menuBtn.addEventListener('click', () => {
    if (sidebar) sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
  }
  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }
}

function closeMobileMenu() {
  const sidebar = document.getElementById('mobileSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

window.closeMobileMenu = closeMobileMenu;

// ===== الكتب =====
function generateBooksData() {
  const books = [
    // المرحلة الابتدائية - 6 كتب
    { id: 1, title: 'اللغة الإنجليزية - الصف الأول الابتدائي', level: 'primary', cover: '1.jpg', pages: 120, size: '28.62 MB', downloadUrl: 'https://drive.google.com/file/d/1U34U_dLbkqaPg3ugnpV2mzxzxI6zuNsU/view?usp=sharing' },
    { id: 2, title: 'اللغة الإنجليزية - الصف الثاني الابتدائي', level: 'primary', cover: '2.jpg', pages: 135, size: '28.25 MB', downloadUrl: 'https://drive.google.com/file/d/1mClRslbNCvF454InfH9qYCOtfJJYpBQN/view?usp=sharing' },
    { id: 3, title: 'اللغة الإنجليزية - الصف الثالث الابتدائي', level: 'primary', cover: '3.jpg', pages: 142, size: '34.39 MB', downloadUrl: 'https://drive.google.com/file/d/1fVtIi6WZxQQN4HdnWvIIrnxsL64NWZ2l/view?usp=sharing' },
    { id: 4, title: 'اللغة الإنجليزية - الصف الرابع الابتدائي', level: 'primary', cover: '4.jpg', pages: 158, size: '42.03 MB', downloadUrl: 'https://drive.google.com/file/d/1w46GLjLY2VmrY0rS3EdwPVwQNkq2dsZs/view?usp=sharing' },
    { id: 5, title: 'اللغة الإنجليزية - الصف الخامس الابتدائي', level: 'primary', cover: '5.jpg', pages: 165, size: '44.00 MB', downloadUrl: 'https://drive.google.com/file/d/1lMka7j8ViR3MG0qRgV1KrRneK0zM9TXO/view?usp=sharing' },
    { id: 6, title: 'اللغة الإنجليزية - الصف السادس الابتدائي', level: 'primary', cover: '6.jpg', pages: 180, size: '47.12 MB', downloadUrl: 'https://drive.google.com/file/d/185NBYxoldd8wL3OLhYksfcS1xIsRuRij/view?usp=sharing' },
    
    // المرحلة الإعدادية - 3 كتب
    { id: 7, title: 'اللغة الإنجليزية - الصف الأول الإعدادي', level: 'middle', cover: '7.jpg', pages: 210, size: '64.51 MB', downloadUrl: 'https://drive.google.com/file/d/16f8KKKLnMgRBSMHBojyARo0fgwnku-iS/view?usp=sharing' },
    { id: 8, title: 'اللغة الإنجليزية - الصف الثاني الإعدادي', level: 'middle', cover: '8.jpg', pages: 225, size: '60.27 MB', downloadUrl: 'https://drive.google.com/file/d/1ku8XNmxWriCFQsEaBkaX-d-_gu_59x1x/view?usp=sharing' },
    { id: 9, title: 'اللغة الإنجليزية - الصف الثالث الإعدادي', level: 'middle', cover: '9.jpg', pages: 240, size: '56.24 MB', downloadUrl: 'https://drive.google.com/file/d/1h7SqmiY5_Ao4oo5nrekIlDocEaaAK6o-/view?usp=sharing' },
    
    // المرحلة الثانوية - 3 كتب
    { id: 10, title: 'اللغة الإنجليزية - الصف الأول الثانوي', level: 'high', cover: '10.jpg', pages: 280, size: '86.27 MB', downloadUrl: 'https://example.com/book10.pdf' },
    { id: 11, title: 'اللغة الإنجليزية - الصف الثاني الثانوي', level: 'high', cover: '11.jpg', pages: 295, size: '91.05 MB', downloadUrl: 'https://example.com/book11.pdf' },
    { id: 12, title: 'اللغة الإنجليزية - الصف الثالث الثانوي', level: 'high', cover: '12.jpg', pages: 320, size: '100 MB', downloadUrl: 'https://example.com/book12.pdf' }
  ];
  
  return books;
}

function renderBooks(filter = 'all') {
  const grid = document.getElementById('booksGrid');
  if (!grid) return;
  
  if (App.books.length === 0) App.books = generateBooksData();
  
  const filteredBooks = filter === 'all' 
    ? App.books 
    : App.books.filter(book => book.level === filter);
  
  grid.innerHTML = filteredBooks.map((book, index) => {
    let gradeText = '';
    if (book.title.includes('الأول')) gradeText = 'الصف الأول';
    else if (book.title.includes('الثاني')) gradeText = 'الصف الثاني';
    else if (book.title.includes('الثالث')) gradeText = 'الصف الثالث';
    else if (book.title.includes('الرابع')) gradeText = 'الصف الرابع';
    else if (book.title.includes('الخامس')) gradeText = 'الصف الخامس';
    else if (book.title.includes('السادس')) gradeText = 'الصف السادس';
    
    return `
    <div class="book-card" style="animation-delay: ${index * 0.05}s">
      <img src="${book.cover}" alt="${book.title}" loading="lazy">
      <h4>${book.title}</h4>
      <p>${gradeText} - ${book.level === 'primary' ? 'ابتدائي' : book.level === 'middle' ? 'إعدادي' : 'ثانوي'}</p>
      <p style="font-size:0.8rem;color:#999;">${book.pages} صفحة | ${book.size}</p>
      <a href="${book.downloadUrl}" class="book-download" target="_blank" onclick="event.stopPropagation();">
        <i class="fas fa-download"></i> تحميل PDF
      </a>
    </div>
  `}).join('');
}

function setupBookFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderBooks(btn.dataset.filter);
    });
  });
}

// ===== زر الصعود للأعلى =====
function setupScrollHandler() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
  });
  
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function setupEventListeners() {
  setupBookFilters();
}

// ===== تصدير الدوال إلى النطاق العام =====
window.showHomePage = showHomePage;
window.showBooksPage = showBooksPage;
window.showVideosPage = showVideosPage;
window.closeMobileMenu = closeMobileMenu;

console.log(`
╔════════════════════════════════════════╗
║   موقع الأستاذ علي النجار             ║
║   معلم اللغة الإنجليزية               ║
╠════════════════════════════════════════╣
║   الإصدار: 4.0 (بدون تسجيل دخول)      ║
║   الكتب: ابتدائي 6 | إعدادي 3 | ثانوي 3║
║   الفيديوهات: إعدادي | ثانوي          ║
╚════════════════════════════════════════╝
`);