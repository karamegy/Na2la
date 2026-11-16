// capacitor-bridge.js - الجسر البرمجي لمميزات Capacitor Native
const CapacitorNative = {
    isNative: () => typeof window.Capacitor !== 'undefined' && window.Capacitor.isNativePlatform(),

    async init() {
        if (!this.isNative()) return;

        const { App, StatusBar, SplashScreen } = window.Capacitor.Plugins;

        // 1. ضبط شريط الحالة (Status Bar) ليتطابق مع هوية التطبيق
        if (StatusBar) {
            try {
                await StatusBar.setBackgroundColor({ color: '#0f172a' });
                await StatusBar.setStyle({ style: 'DARK' });
            } catch (e) { console.warn('StatusBar error:', e); }
        }

        // 2. إخفاء شاشة البداية بسلاسة
        if (SplashScreen) {
            try { await SplashScreen.hide(); } catch (e) {}
        }

        // 3. معالجة زر الرجوع الفعلي في هواتف أندرويد
        if (App) {
            App.addListener('backButton', ({ canGoBack }) => {
                // إغلاق القائمة الجانبية أو النوافذ المنبثقة أولاً إن وجدت
                const sidebar = document.getElementById('sidebar-menu');
                if (sidebar && sidebar.classList.contains('open')) {
                    toggleSidebar();
                    return;
                }
                const openModals = document.querySelectorAll('.custom-modal, #visitor-booking-container, #driver-register-container');
                for (let m of openModals) {
                    if (m.style.display === 'flex') {
                        m.style.display = 'none';
                        return;
                    }
                }
                // الرجوع للرئيسية أو الخروج من التطبيق
                if (canGoBack) {
                    window.history.back();
                } else {
                    if (confirm('هل تريد الخروج من تطبيق أسطورة الطريق؟')) {
                        App.exitApp();
                    }
                }
            });
        }
    },

    // اهتزاز خفيف عند النقر أو حفظ العمليات
    async vibrate() {
        if (!this.isNative() || !window.Capacitor.Plugins.Haptics) return;
        try {
            await window.Capacitor.Plugins.Haptics.impact({ style: 'MEDIUM' });
        } catch (e) {}
    },

    // مشاركة أصلية للفواتير والتقارير عبر قائمة مشاركة الأندرويد
    async shareText(title, text, url = '') {
        if (this.isNative() && window.Capacitor.Plugins.Share) {
            try {
                await window.Capacitor.Plugins.Share.share({ title, text, url, dialogTitle: 'مشاركة عبر' });
                return true;
            } catch (e) { console.warn('Native share canceled:', e); }
        }
        return false;
    },

    // جلب إحداثيات GPS الأصلية بدقة عالية
    async getNativeGPS() {
        if (this.isNative() && window.Capacitor.Plugins.Geolocation) {
            try {
                const perm = await window.Capacitor.Plugins.Geolocation.requestPermissions();
                if (perm.location === 'granted') {
                    const pos = await window.Capacitor.Plugins.Geolocation.getCurrentPosition({ enableHighAccuracy: true });
                    return `${pos.coords.latitude},${pos.coords.longitude}`;
                }
            } catch (e) { console.warn('Native GPS fallback to web:', e); }
        }
        return null;
    }
};

document.addEventListener('DOMContentLoaded', () => CapacitorNative.init());
