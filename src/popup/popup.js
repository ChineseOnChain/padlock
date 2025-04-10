document.addEventListener('DOMContentLoaded', () => {
    // ====================== 翻译模块 ======================
    const translations = {
      en: {
        title: "Padlock (挂锁)",
        heading: "🔒 Padlock (挂锁)",
        lengthLabel: "Length:",
        saltLabel: "Custom Salt:",
        uppercaseLabel: "Include Uppercase (A-Z)",
        lowercaseLabel: "Include Lowercase (a-z)",
        numbersLabel: "Include Numbers (0-9)",
        symbolsLabel: "Include Symbols (!@#$%^&*)",
        generateButton: "Generate",
        copyButton: "Copy",
        languageButton: "中文",
        copiedMessage: "Copied!",
        generateFirstMessage: "Generate a password first!",
        lengthError: "Length must be 8-128",
        charsetError: "Select at least one character type"
      },
      zh: {
        title: "挂锁 (Padlock)",
        heading: "🔒 挂锁 (Padlock)",
        lengthLabel: "长度:",
        saltLabel: "自定义盐值:",
        uppercaseLabel: "包含大写字母 (A-Z)",
        lowercaseLabel: "包含小写字母 (a-z)",
        numbersLabel: "包含数字 (0-9)",
        symbolsLabel: "包含符号 (!@#$%^&*)",
        generateButton: "生成",
        copyButton: "复制",
        languageButton: "English",
        copiedMessage: "已复制!",
        generateFirstMessage: "请先生成密码!",
        lengthError: "长度必须为8-128",
        charsetError: "请至少选择一种字符类型"
      }
    };
  
    // ====================== 状态管理 ======================
    let currentLanguage = 'zh';
    const elements = {
      length: document.getElementById('length'),
      salt: document.getElementById('salt'),
      uppercase: document.getElementById('uppercase'),
      lowercase: document.getElementById('lowercase'),
      numbers: document.getElementById('numbers'),
      symbols: document.getElementById('symbols'),
      generate: document.getElementById('generate'),
      copy: document.getElementById('copy'),
      password: document.getElementById('password'),
      languageToggle: document.getElementById('languageToggle')
    };
  
    const defaults = {
      length: 16,
      salt: '',
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      language: 'en'
    };
  
    // ====================== 初始化 ======================
    initExtension();
  
    // ====================== 核心功能 ======================
    function initExtension() {
      loadSettings();
      setupEventListeners();
      updateLanguage();
      generatePassword(); // 页面加载时生成首个密码
    }
  
    function setupEventListeners() {
      elements.generate.addEventListener('click', generatePassword);
      elements.copy.addEventListener('click', copyPassword);
      elements.languageToggle.addEventListener('click', toggleLanguage);
    }
  
    // ====================== 存储辅助工具 ======================
    function getStorage() {
      // Firefox使用'browser'，Chrome使用'chrome'
      return typeof browser !== 'undefined' ? browser.storage : chrome.storage;
    }
  
    // ====================== 密码生成 ======================
    function generatePassword() {
      const config = getConfig();
      
      if (!validateConfig(config)) return;
  
      const charset = buildCharset(config);
      elements.password.value = generateSecurePassword(charset, config.length);
      saveSettings();
    }
  
    function getConfig() {
      return {
        length: parseInt(elements.length.value) || defaults.length,
        salt: elements.salt.value,
        uppercase: elements.uppercase.checked,
        lowercase: elements.lowercase.checked,
        numbers: elements.numbers.checked,
        symbols: elements.symbols.checked
      };
    }
  
    function validateConfig(config) {
      if (config.length < 8 || config.length > 128) {
        showMessage('lengthError');
        return false;
      }
  
      if (!config.uppercase && !config.lowercase && !config.numbers && !config.symbols) {
        showMessage('charsetError');
        return false;
      }
  
      return true;
    }
  
    // Chairman
    function buildCharset(config) {
      let charset = '';
      if (config.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (config.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (config.numbers) charset += '0123456789';
      if (config.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      if (config.salt) charset += [...new Set(config.salt)].join('');
      return charset;
    }
  
    function generateSecurePassword(charset, length) {
      try {
        const arr = new Uint32Array(length);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, n => charset[n % charset.length]).join('');
      } catch (e) {
        console.warn("Using Math.random fallback");
        let pass = '';
        for (let i = 0; i < length; i++) {
          pass += charset[Math.floor(Math.random() * charset.length)];
        }
        return pass;
      }
    }
  
    // ====================== 语言功能 ======================
    function toggleLanguage() {
      currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
      updateLanguage();
      saveSettings();
    }
  
    function updateLanguage() {
      // 更新所有含data-i18n属性的元素
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
          el.textContent = translations[currentLanguage][key];
        }
      });
      
      // 更新语言切换按钮
      elements.languageToggle.textContent = translations[currentLanguage].languageButton;
      
      // 单独更新title标签
      document.title = translations[currentLanguage].title;
    }
  
    // ====================== 实用工具函数 ======================
    function copyPassword() {
      if (!elements.password.value) {
        showMessage('generateFirstMessage');
        return;
      }
      
      elements.password.select();
      document.execCommand('copy');
      showFeedback('copiedMessage');
    }
  
    function showMessage(key) {
      elements.password.value = translations[currentLanguage][key];
      setTimeout(() => elements.password.value = '', 2000);
    }
  
    function showFeedback(key) {
      const oldText = elements.copy.textContent;
      elements.copy.textContent = translations[currentLanguage][key];
      setTimeout(() => elements.copy.textContent = oldText, 1000);
    }
  
    // ====================== 存储功能 ======================
    async function loadSettings() {
      try {
        const storage = getStorage();
        const result = await storage.local.get('settings');
        const settings = result.settings || defaults;
        
        // 应用设置
        elements.length.value = settings.length || defaults.length;
        elements.salt.value = settings.salt || defaults.salt;
        elements.uppercase.checked = settings.uppercase ?? defaults.uppercase;
        elements.lowercase.checked = settings.lowercase ?? defaults.lowercase;
        elements.numbers.checked = settings.numbers ?? defaults.numbers;
        elements.symbols.checked = settings.symbols ?? defaults.symbols;
        
        // 设置语言
        currentLanguage = settings.language || defaults.language;
      } catch (e) {
        console.error("Error loading settings:", e);
      }
    }
  
    function saveSettings() {
      const storage = getStorage();
      storage.local.set({
        settings: {
          length: parseInt(elements.length.value),
          salt: elements.salt.value,
          uppercase: elements.uppercase.checked,
          lowercase: elements.lowercase.checked,
          numbers: elements.numbers.checked,
          symbols: elements.symbols.checked,
          language: currentLanguage
        }
      });
    }
  });
