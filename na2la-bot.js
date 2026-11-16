(function() {
    // إزالة شاملة لأي عناصر أو نسخ قديمة معلقة في الصفحة لضمان عدم تداخل النسخ
    ['na2laBotRootContainer', 'na2laBotBtn', 'na2laBotModal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
    document.querySelectorAll('#na2laBotRootContainer, [id*="na2laBot"]').forEach(el => el.remove());

    // تهيئة Firebase فقط إذا لم يكن مهيأ مسبقاً في app.js
    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyDn-rNJ2ak3I0DdfzTZmXKjePDdgxhfyIY",
            authDomain: "n2la-642d3.firebaseapp.com",
            projectId: "n2la-642d3",
            storageBucket: "n2la-642d3.firebasestorage.app",
            messagingSenderId: "1085749997466",
            appId: "1:1085749997466:web:13e5535dc6d2312397d423",
            measurementId: "G-KH4ZYFB8LC"
        });
    }

    // دوال مساعدة للتكامل مع Capacitor Native و AndroidBridge
    function triggerBotHaptic(ms = 20) {
        try {
            if (window.CapacitorNative && typeof window.CapacitorNative.vibrate === 'function') {
                window.CapacitorNative.vibrate(ms);
            } else if (window.AndroidBridge && typeof window.AndroidBridge.vibrate === 'function') {
                window.AndroidBridge.vibrate(ms);
            } else if (window.Capacitor?.Plugins?.Haptics) {
                window.Capacitor.Plugins.Haptics.impact({ style: 'LIGHT' });
            }
        } catch (e) {}
    }

    function showBotToast(message) {
        try {
            if (window.AndroidBridge && typeof window.AndroidBridge.showToast === 'function') {
                window.AndroidBridge.showToast(message);
                return;
            }
            if (window.Capacitor?.Plugins?.Toast) {
                window.Capacitor.Plugins.Toast.show({ text: message, duration: 'short' });
                return;
            }
        } catch (e) {}

        let toastEl = document.getElementById('na2laBotToastBanner');
        if (!toastEl) {
            toastEl = document.createElement('div');
            toastEl.id = 'na2laBotToastBanner';
            toastEl.style.cssText = 'position:fixed; bottom:90px; left:50%; transform:translateX(-50%); background:#0f172a; color:#f8fafc; border:1px solid #3b82f6; padding:8px 14px; border-radius:10px; font-size:11px; font-family:Cairo,sans-serif; z-index:2147483649; box-shadow:0 8px 20px rgba(0,0,0,0.45); max-width:88vw; text-align:center; direction:rtl;';
            document.body.appendChild(toastEl);
        }
        toastEl.textContent = message;
        toastEl.style.display = 'block';
        clearTimeout(window._na2laBotToastTimer);
        window._na2laBotToastTimer = setTimeout(() => {
            if (toastEl) toastEl.style.display = 'none';
        }, 3000);
    }

    function botEscapeHTML(str) {
        if (str === null || str === undefined) return '';
        return String(str).replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    }

    function utf8ToBase64(str) {
        const bytes = new TextEncoder().encode(str);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    // قراءة البيانات الحية من app.js مباشرة
    function getLiveAppData() {
        if (typeof appData !== 'undefined' && appData) return appData;
        if (window.appData) return window.appData;
        return {};
    }

    function getFirestoreDB() {
        if (typeof db !== 'undefined' && db) return db;
        if (typeof firebase !== 'undefined' && firebase.firestore) return firebase.firestore();
        return null;
    }

    const oldStyle = document.getElementById('na2laBotStyles');
    if (oldStyle) oldStyle.remove();

    const styleEl = document.createElement('style');
    styleEl.id = 'na2laBotStyles';
    styleEl.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        
        #na2laBotRootContainer {
            --primary-color: #3b82f6;
            --primary-hover: #2563eb;
            --accent-color: #10b981;
            --card-bg: #1e293b;
            --bg-color: #0f172a;
            --text-color: #f8fafc;
            --border-color: #334155;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --purple-color: #8b5cf6;
            --shadow-3d: 0 12px 30px -5px rgba(0, 0, 0, 0.55);
            font-family: 'Cairo', sans-serif !important;
            direction: rtl;
            text-align: right;
        }
        #na2laBotRootContainer[data-theme="royal"] {
            --primary-color: #8b5cf6;
            --primary-hover: #7c3aed;
            --accent-color: #ec4899;
            --card-bg: #2e1065;
            --bg-color: #1e1b4b;
            --text-color: #f3e8ff;
            --border-color: #4c1d95;
            --warning-color: #fbbf24;
            --danger-color: #f43f5e;
        }
        #na2laBotRootContainer[data-theme="emerald"] {
            --primary-color: #059669;
            --primary-hover: #047857;
            --accent-color: #34d399;
            --card-bg: #064e3b;
            --bg-color: #022c22;
            --text-color: #ecfdf5;
            --border-color: #065f46;
            --warning-color: #fbbf24;
            --danger-color: #f87171;
        }
        .admin-only-section {
            display: none;
        }
        @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        @keyframes floatAnim {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
        }
        .sync-account-hub-btn {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 5px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
            transition: transform 0.2s, box-shadow 0.2s;
            font-family: 'Cairo', sans-serif;
            white-space: nowrap;
            direction: rtl;
        }
        .sync-account-hub-btn:active {
            transform: scale(0.96);
        }
        @keyframes spinBolt {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .spinning { animation: spinBolt 0.6s linear infinite; }
        .chat-card {
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            border-right: 4px solid var(--primary-color);
            padding: 12px;
            border-radius: 10px;
            margin-top: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            font-family: 'Cairo', sans-serif;
            direction: rtl;
            text-align: right;
        }
        .penta-grid-box {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            margin: 8px 0;
            font-family: 'Cairo', sans-serif;
        }
        .penta-card {
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .penta-card-title {
            font-size: 9px;
            opacity: 0.8;
            margin-bottom: 2px;
        }
        .penta-card-value {
            font-size: 11px;
            font-weight: bold;
            color: var(--accent-color);
        }
        .bot-data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            font-size: 11px;
            background: var(--card-bg);
            border-radius: 8px;
            overflow: hidden;
            direction: rtl;
            text-align: right;
        }
        .bot-data-table th, .bot-data-table td {
            border: 1px solid var(--border-color);
            padding: 6px 8px;
            text-align: center;
        }
        .bot-data-table th {
            background: var(--primary-color);
            color: white;
            font-weight: bold;
        }
        #na2laBotMessages::-webkit-scrollbar,
        #mainBotMenuDropdownMenu::-webkit-scrollbar { width: 5px; }
        #na2laBotMessages::-webkit-scrollbar-thumb,
        #mainBotMenuDropdownMenu::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
    `;
    document.head.appendChild(styleEl);

    const containerDiv = document.createElement('div');
    containerDiv.id = 'na2laBotRootContainer';
    containerDiv.innerHTML = `
        <button id="na2laBotBtn" style="position: fixed; bottom: calc(72px + env(safe-area-inset-bottom, 0px)); right: 18px; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: white; border: none; width: 58px; height: 58px; border-radius: 50%; font-size: 26px; cursor: pointer; box-shadow: var(--shadow-3d); z-index: 2147483647; display: flex; align-items: center; justify-content: center; touch-action: none; user-select: none; animation: floatAnim 2.5s ease-in-out infinite;" title="🤖 مساعد Gemini الذكي Pro لمنصة نقلة">🤖</button>

        <div id="na2laBotModal" style="position: fixed; bottom: calc(85px + env(safe-area-inset-bottom, 0px)); right: 12px; width: 430px; max-width: calc(100vw - 24px); height: 78dvh; max-height: calc(100dvh - 105px); background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 20px; box-shadow: var(--shadow-3d); z-index: 2147483646; display: none; flex-direction: column; overflow: hidden; backdrop-filter: blur(25px); font-family: 'Cairo', sans-serif; direction: rtl; text-align: right;">
            
            <div style="background: linear-gradient(135deg, var(--primary-color), var(--primary-hover)); color: white; padding: 10px 14px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; font-size: 12px; flex-shrink: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); gap: 8px; direction: rtl;">
                
                <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                    <div style="position: relative; display: inline-block;">
                        <button type="button" class="sync-account-hub-btn" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9);" onclick="toggleMainBotMenuDropdown(event)">
                            ☰ القائمة
                        </button>
                        <div id="mainBotMenuDropdownMenu" onclick="event.stopPropagation()" style="display: none; position: absolute; top: 120%; right: 0; width: 285px; max-width: 85vw; max-height: 360px; overflow-y: auto; background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 14px; box-shadow: var(--shadow-3d); z-index: 2147483648; padding: 12px; color: var(--text-color); font-size: 11px; text-align: right; direction: rtl;">
                            
                            <div id="visitorMenuSection" style="display: none; flex-direction: column; gap: 5px; margin-bottom: 10px;">
                                <div style="font-weight: bold; margin-bottom: 4px; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; color: var(--accent-color);">
                                    📦 استعلام الشحنات للزوار
                                </div>
                                <button type="button" onclick="promptVisitorShipmentQuery(); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--accent-color); color: var(--accent-color); font-size: 11px; padding: 8px 10px; border-radius: 7px; cursor: pointer; font-weight: bold; width: 100%; text-align: right; display: block;">🔍 استعلام عن شحنة برقمها</button>
                            </div>

                            <div id="managerMenuSectionHeader" style="font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px; color: var(--warning-color); display: flex; align-items: center; gap: 5px;">
                                📂 أقسام المنصة والعرض المباشر
                            </div>
                            <div id="menuDropdownSectionsList" style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px;">
                                <button type="button" onclick="renderShipmentsInsideBot(); closeMainBotMenus();" style="background: var(--card-bg); color: var(--accent-color); border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%; display: block;">📦 عرض الشحنات بالبوت</button>
                                <button type="button" class="admin-only-section" onclick="renderPentaTableInsideBot(); closeMainBotMenus();" style="background: var(--card-bg); color: #38bdf8; border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%;">📊 الجدول الخماسي بالبوت</button>
                                <button type="button" class="admin-only-section" onclick="renderDeferredInvoicesInsideBot(); closeMainBotMenus();" style="background: var(--card-bg); color: var(--warning-color); border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%;">⏳ الفواتير الآجلة بالبوت</button>
                                <button type="button" class="admin-only-section" onclick="renderConsolidatedInvoicesInsideBot(); closeMainBotMenus();" style="background: var(--card-bg); color: var(--purple-color); border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%;">📑 الفواتير المجمعة بالبوت</button>
                                <button type="button" class="admin-only-section" onclick="renderFleetInsideBot(); closeMainBotMenus();" style="background: var(--card-bg); color: #38bdf8; border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%;">🚚 حالة الأسطول وصيانة الزيت</button>
                                <button type="button" class="admin-only-section" onclick="renderTreasuryInsideBot(); closeMainBotMenus();" style="background: var(--card-bg); color: #34d399; border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%;">💵 الخزينة والحسابات بالبوت</button>
                                <button type="button" onclick="openBotSection('chat-tab', 'الدردشة'); closeMainBotMenus();" style="background: var(--card-bg); color: #f472b6; border: 1px solid var(--border-color); border-radius: 7px; padding: 7px 10px; font-size: 11px; text-align: right; cursor: pointer; font-weight: bold; width: 100%; display: block;">💬 الانتقال لدردشة المنصة</button>
                            </div>

                            <div style="font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px; color: #a855f7;">
                                ⚙️ تفضيلات المساعد والمحادثة
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px;">
                                <button type="button" onclick="toggleTemporaryChatMode(); closeMainBotMenus();" id="botTempChatBtn" style="background: var(--card-bg); color: #a855f7; border: 1px solid #a855f7; padding: 6px 10px; border-radius: 7px; text-align: right; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; width: 100%; display: block;">🕵️ تفعيل/إلغاء المحادثة المؤقتة</button>
                                <button type="button" onclick="toggleBotContinuousVoice(); closeMainBotMenus();" id="botContinuousBtn" style="background: var(--card-bg); color: #38bdf8; border: 1px solid var(--border-color); padding: 6px 10px; border-radius: 7px; text-align: right; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; width: 100%; display: block;">🎤 الاستماع الصوتي المستمر</button>
                                <button type="button" onclick="toggleBotVoiceOutput(); closeMainBotMenus();" id="botVoiceToggleBtn" style="background: var(--card-bg); color: var(--accent-color); border: 1px solid var(--border-color); padding: 6px 10px; border-radius: 7px; text-align: right; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; width: 100%; display: block;">🔊 تبديل الناطق الصوتي (مفعل)</button>
                                <button type="button" onclick="clearBotChat(); closeMainBotMenus();" style="background: var(--card-bg); color: var(--danger-color); border: 1px solid var(--danger-color); padding: 6px 10px; border-radius: 7px; text-align: right; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; width: 100%; display: block;">🗑️ مسح الذاكرة الحالية</button>
                            </div>

                            <div style="font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; color: var(--accent-color);">
                                ⚡ إجراءات واستعلامات سريعة
                            </div>
                            <div id="menuDropdownQuickActionsList" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;">
                                <button type="button" onclick="sendBotQuickQuery('شحناتي'); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--accent-color); font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">📦 الشحنات</button>
                                <button type="button" class="admin-only-section" onclick="sendBotQuickQuery('الجدول الخماسي'); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--border-color); color: #38bdf8; font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">📊 الخماسي</button>
                                <button type="button" class="admin-only-section" onclick="sendBotQuickQuery('الفواتير'); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--border-color); color: #38bdf8; font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">🧾 الفواتير</button>
                                <button type="button" class="admin-only-section" onclick="sendBotQuickQuery('صيانة الشاحنات'); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">🛠️ الصيانة</button>
                                <button type="button" onclick="sendBotQuickQuery('معلومات صلاحية اشتراك شركتك'); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">💳 الاشتراك</button>
                                <button type="button" onclick="sendBotQuickQuery('اختبار القيادة'); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid var(--purple-color); color: var(--purple-color); font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">🎓 الاختبار</button>
                                <button type="button" onclick="exportChatArchiveData(); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid #38bdf8; color: #38bdf8; font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">📤 تصدير أرشيف</button>
                                <button type="button" onclick="document.getElementById('importArchiveFileInput').click(); closeMainBotMenus();" style="background: var(--card-bg); border: 1px solid #10b981; color: #10b981; font-size: 10px; padding: 6px; border-radius: 6px; cursor: pointer; font-weight: bold;">📥 استيراد أرشيف</button>
                            </div>
                        </div>
                    </div>

                    <div style="position: relative; display: inline-block;">
                        <button type="button" class="sync-account-hub-btn" onclick="toggleSyncHubDropdown(event)">
                            <span id="sync-icon-bolt">⚡</span> <span id="syncHubBtnLabel">شحناتي</span> 
                            <span id="btn-sync-badge" style="background: var(--danger-color, #ef4444); color: #fff; padding: 1px 5px; border-radius: 8px; font-size: 9px; font-weight: bold; display: none;">0</span>
                        </button>
                        <div id="syncHubDropdownMenu" onclick="event.stopPropagation()" style="display: none; position: absolute; top: 120%; right: 0; width: 265px; max-width: 82vw; background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: var(--shadow-3d); z-index: 2147483647; padding: 10px; color: var(--text-color); font-size: 11px; text-align: right; direction: rtl;">
                            <div style="font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; display: flex; justify-content: space-between;">
                                <span id="syncHubUserTitle">👤 الحساب المتصل</span>
                                <span style="color: var(--accent-color); cursor: pointer;" onclick="openConnectedAccountHub()">الملف ⬅</span>
                            </div>
                            <div id="syncHubCompanyTag" style="font-size: 9px; color: var(--warning-color); margin-bottom: 6px;">🏢 الشركة: جاري المزامنة...</div>
                            <div id="syncHubItemsList" style="max-height: 150px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px;"></div>
                        </div>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; overflow: hidden; justify-content: flex-end;">
                    <span id="botUserRoleBadge" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">🤖 مساعد Gemini Pro</span>
                    <span id="botStatusDot" onclick="toggleDutyStatus()" style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; cursor: pointer; flex-shrink: 0;" title="تبديل حالة العمل"></span>
                    <button type="button" onclick="toggleNa2laBot()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0 2px; flex-shrink: 0;" title="إغلاق">✕</button>
                </div>
            </div>

            <div id="na2laRssTickerContainer" style="display: none; background: rgba(217, 119, 6, 0.15); border-bottom: 1px solid var(--border-color); padding: 6px 12px; font-size: 11px; color: var(--warning-color); white-space: nowrap; overflow: hidden; position: relative; flex-shrink: 0;">
                <div style="display: inline-block; animation: marquee 18s linear infinite; font-weight: bold;">
                    🚀 أسطورة الطريق Pro | تتبع الشحنات للزوار برقم الشحنة، وعزل تام للبيانات والشركات
                </div>
            </div>

            <div style="padding: 6px 14px; background: var(--bg-color); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); font-size: 11px; flex-shrink: 0;">
                <span id="botNativeBadge" style="font-size: 10px; color: var(--accent-color); font-weight: bold;">📱 متصل بالسحابة</span>
                <div>
                    <select id="botThemeSelect" onchange="changeBotTheme(this.value)" style="padding: 4px 8px; font-size: 11px; border-radius: 8px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); cursor: pointer; font-family: 'Cairo', sans-serif; font-weight: bold;" title="تغيير ثيم الواجهة">
                        <option value="default">🎨 الداكن الأصلي</option>
                        <option value="royal">👑 الأرجواني الملكي</option>
                        <option value="emerald">💎 الزمردي الفاخر</option>
                    </select>
                </div>
            </div>

            <div id="tempChatAlertBanner" style="display: none; background: rgba(168, 85, 247, 0.25); border-bottom: 1px solid #a855f7; color: #d8b4fe; padding: 6px 12px; font-size: 11px; text-align: center; font-weight: bold; flex-shrink: 0;">
                🕵️ وضع الخصوصية الفائقة (محادثة مؤقتة): لن يتم حفظ هذه المحادثة في الذاكرة أو فايربيس.
            </div>

            <div id="na2laBotMessages" style="flex: 1 1 auto; min-height: 0; padding: 14px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 10px; line-height: 1.65; background: var(--card-bg); color: var(--text-color); text-align: right; direction: rtl;">
                <div style="background: var(--bg-color); padding: 12px 16px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: right; direction: rtl;">
                    مرحباً بك! أنا مساعدك الذكي <b>Gemini Pro</b>.<br>- للزوار: قم بكتابة <b>رقم شحنتك</b> مباشرة في الصندوق أدناه لتتبع حالة شحنتك بدقة تامة.
                </div>
            </div>

            <div style="padding: 10px 12px calc(10px + env(safe-area-inset-bottom, 0px)) 12px; border-top: 1px solid var(--border-color); display: flex; gap: 6px; background: var(--bg-color); align-items: center; position: relative; flex-shrink: 0; min-height: 56px; box-sizing: border-box; direction: rtl;">
                <input type="file" id="scaleTicketFileInput" accept="image/*" capture="environment" style="display: none;" onchange="handleScaleTicketUpload(this)">
                <input type="file" id="importArchiveFileInput" accept=".json,application/json" style="display: none;" onchange="importChatArchiveData(this)">
                
                <button type="button" onclick="triggerBotHaptic(); document.getElementById('scaleTicketFileInput').click()" title="رفع وتحليل بونة الميزان OCR" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); width: 38px; height: 38px; min-width: 38px; border-radius: 10px; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">📎</button>
                
                <input type="text" id="na2laBotInput" placeholder="أدخل رقم شحنتك للتتبع أو اسأل المساعد..." style="flex: 1; min-width: 0; height: 38px; margin: 0; padding: 0 12px; font-size: 12px; border-radius: 10px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; box-sizing: border-box; outline: none; direction: rtl; text-align: right;" onkeypress="if(event.key === 'Enter') sendBotQuickQuery()">

                <button type="button" id="na2laBotMicBtn" onclick="triggerBotHaptic(); startBotVoiceInput()" title="تسجيل صوتي" style="background: var(--warning-color); border: none; width: 38px; height: 38px; min-width: 38px; border-radius: 10px; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-3d); flex-shrink: 0;">🎤</button>
                
                <button type="button" onclick="triggerBotHaptic(); sendBotQuickQuery()" style="background: var(--primary-color); color: white; border: none; height: 38px; padding: 0 14px; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 12px; font-family: 'Cairo', sans-serif; white-space: nowrap; flex-shrink: 0; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);">إرسال</button>
            </div>
        </div>
    `;
    document.body.appendChild(containerDiv);

    // تحديث شارة الوضع Native في الهيدر
    const nativeBadgeEl = document.getElementById('botNativeBadge');
    if (nativeBadgeEl) {
        const isNative = !!(window.AndroidBridge || (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()));
        nativeBadgeEl.textContent = isNative ? '📱 وضع Native Android نشط' : '🌐 وضع الويب السحابي نشط';
    }

    window.toggleMainBotMenuDropdown = function(event) {
        if (event) event.stopPropagation();
        triggerBotHaptic(15);
        const menu = document.getElementById('mainBotMenuDropdownMenu');
        const syncMenu = document.getElementById('syncHubDropdownMenu');
        if (syncMenu) syncMenu.style.display = 'none';
        if (!menu) return;
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    };

    window.closeMainBotMenus = function() {
        const menu = document.getElementById('mainBotMenuDropdownMenu');
        const syncMenu = document.getElementById('syncHubDropdownMenu');
        if (menu) menu.style.display = 'none';
        if (syncMenu) syncMenu.style.display = 'none';
    };

    if (!window._na2laBotGlobalClickBound) {
        window._na2laBotGlobalClickBound = true;
        window.addEventListener('click', () => {
            if (typeof closeMainBotMenus === 'function') closeMainBotMenus();
        });
    }

    // دعم زر الرجوع في أندرويد (Capacitor Hardware Back Button) لإغلاق البوت بسلاسة
    try {
        if (window.Capacitor?.Plugins?.App && !window._na2laBotBackListenerBound) {
            window._na2laBotBackListenerBound = true;
            window.Capacitor.Plugins.App.addListener('backButton', () => {
                const modal = document.getElementById('na2laBotModal');
                if (modal && modal.style.display === 'flex') {
                    modal.style.display = 'none';
                }
            });
        }
    } catch (e) {}

    // بديل متوافق مع Capacitor لطلب رقم الشحنة بدلاً من prompt()
    window.promptVisitorShipmentQuery = function() {
        triggerBotHaptic(15);
        const modal = document.getElementById('na2laBotModal');
        if (modal && modal.style.display !== 'flex') {
            modal.style.display = 'flex';
        }
        const inputEl = document.getElementById('na2laBotInput');
        if (inputEl) {
            inputEl.placeholder = 'اكتب رقم الشحنة هنا (مثال: 178830) واضغط إرسال...';
            inputEl.focus();
        }
        showBotToast('أدخل رقم الشحنة في مربع الكتابة بالأسفل 🔍');
    };

    window.openBotSection = function(tabId, sectionName = '') {
        triggerBotHaptic(20);
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            showBotToast('⚠️ هذا القسم للأعضاء المسجلين فقط. يمكنك تتبع شحنتك برقمها.');
            return;
        }

        let container = document.getElementById('na2laBotMessages');
        if (container) {
            let botMsg = `حسناً، جارٍ الانتقال إلى قسم <b>${botEscapeHTML(sectionName || 'المطلوب')}</b>...`;
            container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${botMsg}</div>`;
            container.scrollTop = container.scrollHeight;
            speakBotReplyText(`حسناً، جارٍ الانتقال إلى قسم ${sectionName}`);
        }

        setTimeout(() => {
            // إغلاق نافذة البوت تلقائياً على الشاشات الصغيرة ليظهر القسم المفتوح بوضوح
            if (window.innerWidth <= 768) {
                const modal = document.getElementById('na2laBotModal');
                if (modal) modal.style.display = 'none';
            }
            if (typeof switchTab === 'function') {
                switchTab(tabId);
            } else {
                showBotToast('تم التبديل إلى: ' + (sectionName || tabId));
            }
        }, 450);
    };

    window.renderShipmentsInsideBot = async function() {
        triggerBotHaptic(15);
        await fetchRealFirebaseData();
        let tenant = getActiveTenantContext();
        let container = document.getElementById('na2laBotMessages');
        if (!container) return;

        if (tenant.activeRole === 'visitor') {
            container.innerHTML += `<div style="background: var(--bg-color); color: var(--warning-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color);">⚠️ الزائر يمكنه تتبع شحنة برقمها مباشرة في صندوق الدردشة.</div>`;
            container.scrollTop = container.scrollHeight;
            return;
        }

        let shipments = getIsolatedUserShipments();
        let replyHtml = `📦 <b>عرض الشحنات المباشر (عدد: ${shipments.length}):</b>`;
        if (shipments.length === 0) {
            replyHtml += `<div class="chat-card">لا توجد شحنات مسجلة حالياً ضمن نطاق شركتك.</div>`;
        } else {
            replyHtml += `<table class="bot-data-table"><tr><th>رقم الشحنة</th><th>العميل</th><th>الحالة</th><th>القيمة</th></tr>`;
            shipments.forEach(s => {
                replyHtml += `<tr><td><b>${botEscapeHTML(s.id || '-')}</b></td><td>${botEscapeHTML(s.name || '-')}</td><td><span style="color:var(--accent-color);">${botEscapeHTML(s.status || 'نشطة')}</span></td><td>${botEscapeHTML(s.price || 0)} ج.م</td></tr>`;
            });
            replyHtml += `</table>`;
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${replyHtml}</div>`;
        container.scrollTop = container.scrollHeight;
        speakBotReplyText("حسناً، تم عرض شحنات شركتك مباشرة في البوت.");
    };

    window.renderPentaTableInsideBot = async function() {
        triggerBotHaptic(15);
        await fetchRealFirebaseData();
        let tenant = getActiveTenantContext();
        let container = document.getElementById('na2laBotMessages');
        if (!container) return;

        if (tenant.activeRole === 'visitor' || tenant.activeRole === 'driver') {
            container.innerHTML += `<div style="background: var(--bg-color); color: var(--warning-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color);">⚠️ عذراً، الجدول الخماسي والتقارير المالية مخصصة للمديرين والمشرفين فقط.</div>`;
            container.scrollTop = container.scrollHeight;
            speakBotReplyText("عذراً، هذا القسم مخصص للمديرين والمشرفين فقط.");
            return;
        }

        let financials = getCompanyFinancials();
        let replyHtml = `
            📊 <b>الجدول الخماسي المعتمد (عرض مباشر بالبوت):</b>
            <div class="penta-grid-box">
                <div class="penta-card"><div class="penta-card-title">صافي الأرباح</div><div class="penta-card-value">${financials.netProfit}</div></div>
                <div class="penta-card"><div class="penta-card-title">الإيرادات</div><div class="penta-card-value">${financials.revenues}</div></div>
                <div class="penta-card"><div class="penta-card-title">الشحنات</div><div class="penta-card-value">${financials.shipmentsCount}</div></div>
                <div class="penta-card"><div class="penta-card-title">الديون والآجل</div><div class="penta-card-value">${financials.deferredDebt}</div></div>
                <div class="penta-card"><div class="penta-card-title">الخزينة</div><div class="penta-card-value">${financials.treasuryBalance}</div></div>
            </div>
        `;

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${replyHtml}</div>`;
        container.scrollTop = container.scrollHeight;
        speakBotReplyText("حسناً، تم عرض الجدول الخماسي المالي مباشرة في البوت.");
    };

    window.renderDeferredInvoicesInsideBot = async function() {
        triggerBotHaptic(15);
        await fetchRealFirebaseData();
        let tenant = getActiveTenantContext();
        let container = document.getElementById('na2laBotMessages');
        if (!container) return;

        if (tenant.activeRole === 'visitor' || tenant.activeRole === 'driver') {
            container.innerHTML += `<div style="background: var(--bg-color); color: var(--warning-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color);">⚠️ عذراً، الفواتير الآجلة مخصصة للمديرين والمشرفين فقط.</div>`;
            container.scrollTop = container.scrollHeight;
            speakBotReplyText("عذراً، هذا القسم مخصص للمديرين والمشرفين فقط.");
            return;
        }

        let invoices = getIsolatedDeferredInvoices();
        let replyHtml = `⏳ <b>الفواتير الآجلة المسجلة (عدد: ${invoices.length}):</b>`;
        if (invoices.length === 0) {
            replyHtml += `<div class="chat-card">لا توجد فواتير أجل مسجلة حالياً.</div>`;
        } else {
            replyHtml += `<table class="bot-data-table"><tr><th>رقم الفاتورة</th><th>العميل</th><th>المبلغ</th><th>الحالة</th></tr>`;
            invoices.forEach(inv => {
                let isPaid = inv.status === 'paid' || inv.status === 'مسدد' || Number(inv.remainingAmount || 0) <= 0;
                let statusText = isPaid ? 'مسدد ✅' : (inv.status === 'overdue' ? 'متأخر ⚠️' : (inv.status || 'معلق/آجل'));
                let statusColor = isPaid ? 'var(--accent-color, #10b981)' : (inv.status === 'overdue' ? 'var(--danger-color, #ef4444)' : 'var(--warning-color, #f59e0b)');
                let invCode = inv.invoiceId || inv.invoiceNumber || inv.id || '-';
                
                replyHtml += `<tr>
                    <td><b>${botEscapeHTML(invCode)}</b></td>
                    <td>${botEscapeHTML(inv.clientName || inv.name || '-')}</td>
                    <td>${botEscapeHTML(inv.remainingAmount ?? inv.totalAmount ?? inv.price ?? 0)} ج.م</td>
                    <td><span style="color: ${statusColor}; font-weight: bold;">${botEscapeHTML(statusText)}</span></td>
                </tr>`;
            });
            replyHtml += `</table>`;
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${replyHtml}</div>`;
        container.scrollTop = container.scrollHeight;
        speakBotReplyText("حسناً، تم عرض الفواتير الآجلة وتحديث حالة السداد مباشرة في البوت.");
    };

    window.renderConsolidatedInvoicesInsideBot = async function() {
        triggerBotHaptic(15);
        await fetchRealFirebaseData();
        let tenant = getActiveTenantContext();
        let container = document.getElementById('na2laBotMessages');
        if (!container) return;

        if (tenant.activeRole === 'visitor' || tenant.activeRole === 'driver') {
            container.innerHTML += `<div style="background: var(--bg-color); color: var(--warning-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color);">⚠️ عذراً، الفواتير المجمعة مخصصة للمديرين والمشرفين فقط.</div>`;
            container.scrollTop = container.scrollHeight;
            speakBotReplyText("عذراً، هذا القسم مخصص للمديرين والمشرفين فقط.");
            return;
        }

        let conInvoices = getIsolatedConsolidatedInvoices();
        let replyHtml = `📑 <b>الفواتير المجمعة للشركة (عدد: ${conInvoices.length}):</b>`;
        if (conInvoices.length === 0) {
            replyHtml += `<div class="chat-card">لا توجد فواتير مجمعة مسجلة حالياً.</div>`;
        } else {
            replyHtml += `<table class="bot-data-table"><tr><th>رقم الفاتورة</th><th>العميل</th><th>عدد الشحنات</th><th>الإجمالي</th></tr>`;
            conInvoices.forEach(inv => {
                let count = (inv.shipmentIds || inv.shipments || []).length;
                replyHtml += `<tr><td><b>${botEscapeHTML(inv.invoiceNumber || inv.id || '-')}</b></td><td>${botEscapeHTML(inv.client || inv.clientName || '-')}</td><td>${count}</td><td>${botEscapeHTML(inv.total || inv.totalAmount || 0)} ج.م</td></tr>`;
            });
            replyHtml += `</table>`;
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${replyHtml}</div>`;
        container.scrollTop = container.scrollHeight;
        speakBotReplyText("حسناً، تم عرض الفواتير المجمعة مباشرة في البوت.");
    };

    window.renderFleetInsideBot = async function() {
        triggerBotHaptic(15);
        await fetchRealFirebaseData();
        let tenant = getActiveTenantContext();
        let container = document.getElementById('na2laBotMessages');
        if (!container) return;

        if (tenant.activeRole === 'visitor' || tenant.activeRole === 'driver') {
            container.innerHTML += `<div style="background: var(--bg-color); color: var(--warning-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color);">⚠️ عذراً، حالة الأسطول وصيانة الزيت مخصصة للمديرين والمشرفين فقط.</div>`;
            container.scrollTop = container.scrollHeight;
            speakBotReplyText("عذراً، هذا القسم مخصص للمديرين والمشرفين فقط.");
            return;
        }

        let trucks = getIsolatedTrucks();
        let replyHtml = `🚚 <b>حالة الأسطول وصيانة الزيت (عدد: ${trucks.length}):</b>`;
        if (trucks.length === 0) {
            replyHtml += `<div class="chat-card">لا توجد مركبات مسجلة في الأسطول حالياً.</div>`;
        } else {
            replyHtml += `<table class="bot-data-table"><tr><th>المركبة</th><th>السائق</th><th>عداد الـ KM</th><th>الزيت القادم</th></tr>`;
            trucks.forEach(t => {
                replyHtml += `<tr><td><b>${botEscapeHTML(t.num || '-')}</b></td><td>${botEscapeHTML(t.driver || '-')}</td><td>${botEscapeHTML(t.km || 0)} كم</td><td>${botEscapeHTML(t.nextOil || 0)} كم</td></tr>`;
            });
            replyHtml += `</table>`;
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${replyHtml}</div>`;
        container.scrollTop = container.scrollHeight;
        speakBotReplyText("حسناً، تم عرض حالة الأسطول والصيانة مباشرة في البوت.");
    };

    window.renderTreasuryInsideBot = async function() {
        triggerBotHaptic(15);
        await fetchRealFirebaseData();
        let tenant = getActiveTenantContext();
        let container = document.getElementById('na2laBotMessages');
        if (!container) return;

        if (tenant.activeRole === 'visitor' || tenant.activeRole === 'driver') {
            container.innerHTML += `<div style="background: var(--bg-color); color: var(--warning-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color);">⚠️ عذراً، حسابات الخزينة والمصروفات مخصصة للمديرين والمشرفين فقط.</div>`;
            container.scrollTop = container.scrollHeight;
            speakBotReplyText("عذراً، قسم الخزينة والحسابات مخصص للمديرين فقط.");
            return;
        }

        let financials = getCompanyFinancials();
        let replyHtml = `
            💵 <b>حسابات الخزينة والمصروفات:</b>
            <div class="chat-card">
                💰 <b>رصيد الخزينة الحالي:</b> <span style="color:var(--accent-color);">${financials.treasuryBalance}</span><br>
                📉 <b>إجمالي المصروفات:</b> <span style="color:var(--danger-color);">${financials.expensesTotal}</span><br>
                📊 <b>صافي الأرباح:</b> ${financials.netProfit}
            </div>
        `;

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${replyHtml}</div>`;
        container.scrollTop = container.scrollHeight;
        speakBotReplyText("حسناً، تم عرض الخزينة والحسابات مباشرة في البوت.");
    };

    // التحكم بسحب الزر باللمس والماوس بسلاسة على أندرويد
    const botBtn = document.getElementById('na2laBotBtn');
    let isBotDragging = false, startBotX = 0, startBotY = 0, initBotLeft = 0, initBotTop = 0, hasBotDragged = false;

    if (botBtn) {
        const startDrag = (clientX, clientY) => {
            isBotDragging = true; hasBotDragged = false;
            startBotX = clientX; startBotY = clientY;
            let rect = botBtn.getBoundingClientRect();
            botBtn.style.right = 'auto'; botBtn.style.bottom = 'auto';
            botBtn.style.left = rect.left + 'px'; botBtn.style.top = rect.top + 'px';
            initBotLeft = rect.left; initBotTop = rect.top;
        };
        const onDrag = (clientX, clientY, e) => {
            if (!isBotDragging) return;
            let dx = clientX - startBotX, dy = clientY - startBotY;
            if (dx * dx + dy * dy > 36) {
                hasBotDragged = true;
                if (e && e.cancelable) e.preventDefault();
            }
            let newLeft = Math.max(10, Math.min(initBotLeft + dx, window.innerWidth - botBtn.offsetWidth - 10));
            let newTop = Math.max(10, Math.min(initBotTop + dy, window.innerHeight - botBtn.offsetHeight - 10));
            botBtn.style.left = newLeft + 'px'; botBtn.style.top = newTop + 'px';
        };
        const stopDrag = () => { if (!isBotDragging) return; isBotDragging = false; };

        botBtn.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
        document.addEventListener('mousemove', (e) => onDrag(e.clientX, e.clientY, e));
        document.addEventListener('mouseup', stopDrag);
        
        botBtn.addEventListener('touchstart', (e) => { if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
        document.addEventListener('touchmove', (e) => { if (isBotDragging && e.touches.length === 1) { onDrag(e.touches[0].clientX, e.touches[0].clientY, e); } }, { passive: false });
        document.addEventListener('touchend', stopDrag);

        botBtn.addEventListener('click', () => {
            if (!hasBotDragged) {
                triggerBotHaptic(20);
                toggleNa2laBot();
            }
            hasBotDragged = false;
        });
    }

    window.realFirebaseShipments = [];
    window.realFirebaseDrivers = [];
    window.realFirebaseDeferredInvoices = [];
    window.realFirebaseConsolidatedInvoices = [];
    window.realFirebaseTreasury = [];
    window.realFirebaseExpenses = [];
    window.realFirebaseTrucks = [];
    window.realFirebaseAppData = {};
    window.lastBotContext = null;
    window.isTempChatActive = false;
    window._lastFirebaseFetchTime = 0;

    const driverQuizzes = [
        {
            q: "ما هو الإجراء الأول الواجب اتخاذه عند انخفاض مفاجئ في ضغط فرامل الهواء بالشاحنة؟",
            options: ["التوقف فوراً جانب الطريق وتأمين المقطورة", "زيادة السرعة للوصول لأقرب ورشة", "الضغط بقوة متكررة على دواسة البنزين", "إيقاف المحرك أثناء السرعة العالية"],
            correct: 0,
            explain: "انخفاض ضغط الهواء يحتم التوقف الفوري الآمن وتأمين الشاحنة لتجنب انغلاق الفرامل التلقائي (Spring Brakes)."
        },
        {
            q: "كيف يجب توزيع أوزان البضائع الثقيلة على سطح المقطورة؟",
            options: ["وضع كل الثقل في الجزء الخلفي جداً", "توزيع الثقل بانتظام فوق المحاور والمركز", "ترك الجزء الأمامي فارغاً تماماً", "تجميع كل الثقل في جهة واحدة لليمين"],
            correct: 1,
            explain: "التوزيع المتوازن للبضائع فوق محاور الشاحنة يضمن الثبات في المنحنيات ويمنع انزلاق المقطورة (Jackknifing)."
        }
    ];

    window.handleImageRequest = function(query) {
        let subject = query.replace(/(صورة|صوره|اترك لي|ابحث عن|أريد|ابي|اتني بـ|جيبلي|هاتلي|توليد|ارسم)/g, '').trim() || 'شاحنة نقل حديثة على الطريق السريع';
        let imageUrl = 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=700&auto=format&fit=crop&q=80';
        return `
            <div class="chat-card">
                <div style="font-weight: bold; color: var(--purple-color); font-size: 11px; margin-bottom: 6px;">🎨 محرك Gemini - رسم وتوليد وسائط: "${botEscapeHTML(subject)}"</div>
                <img src="${imageUrl}" style="width: 100%; max-height: 220px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color);" alt="${botEscapeHTML(subject)}">
                <div style="margin-top: 6px; font-size: 10px; color: var(--text-color);">تم توليد وإخراج المشهد المخصص بدقة وسرعة سحابية.</div>
            </div>
        `;
    };

    window.toggleTemporaryChatMode = function() {
        triggerBotHaptic(15);
        window.isTempChatActive = !window.isTempChatActive;
        let btn = document.getElementById('botTempChatBtn');
        let banner = document.getElementById('tempChatAlertBanner');
        if (btn) {
            btn.style.background = window.isTempChatActive ? "var(--purple-color)" : "var(--card-bg)";
            btn.style.color = window.isTempChatActive ? "#fff" : "#a855f7";
            btn.innerText = window.isTempChatActive ? "🕵️ مؤقت: مفعل" : "🕵️ تفعيل/إلغاء المحادثة المؤقتة";
        }
        if (banner) { banner.style.display = window.isTempChatActive ? "block" : "none"; }
        showBotToast(window.isTempChatActive ? "تم تفعيل وضع المحادثة المؤقتة 🕵️" : "تم إلغاء وضع المحادثة المؤقتة.");
    };

    // تصدير الأرشيف متوافق مع Capacitor Native و Web
    window.exportChatArchiveData = async function() {
        triggerBotHaptic(20);
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        let chatHistory = JSON.parse(localStorage.getItem(storageKey) || '[]');
        let exportBundle = { version: "10.0-PRO-NATIVE", tenant, exportDate: new Date().toISOString(), chatHistory };
        let jsonStr = JSON.stringify(exportBundle, null, 2);
        let fileName = `Na2la_Archive_${Date.now()}.json`;
        let pureBase64 = utf8ToBase64(jsonStr);

        if (typeof saveNativeOrWebFile === 'function') {
            await saveNativeOrWebFile(pureBase64, fileName, 'application/json');
            showBotToast("✅ تم تصدير أرشيف المحادثات بنجاح.");
            return;
        }

        if (window.AndroidBridge && typeof window.AndroidBridge.downloadFile === 'function') {
            window.AndroidBridge.downloadFile(fileName, pureBase64);
            showBotToast("✅ تم حفظ الأرشيف في مجلد التنزيلات.");
            return;
        }

        let blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
        let url = URL.createObjectURL(blob);
        let downloadAnchor = document.createElement('a');
        downloadAnchor.href = url;
        downloadAnchor.download = fileName;
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        URL.revokeObjectURL(url);
        showBotToast("✅ تم تصدير أرشيف السجلات والمحادثات بنجاح.");
    };

    window.importChatArchiveData = function(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                try {
                    let importedData = JSON.parse(e.target.result);
                    if (importedData && Array.isArray(importedData.chatHistory)) {
                        let tenant = getActiveTenantContext();
                        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
                        localStorage.setItem(storageKey, JSON.stringify(importedData.chatHistory));
                        loadChatHistory();
                        showBotToast("✅ تم استيراد ونقل الأرشيف بنجاح.");
                    } else { showBotToast("⚠️ تنسيق الملف غير صحيح."); }
                } catch(err) { showBotToast("❌ حدث خطأ أثناء قراءة الأرشيف."); }
            };
            reader.readAsText(input.files[0]);
        }
    };

    // قراءة السياق النشط من المتغيرات الحية في app.js أولاً ثم localStorage
    window.getActiveTenantContext = function() {
        let sessionObj = null;
        try {
            const rawSession = localStorage.getItem('na2la_active_session');
            if (rawSession) sessionObj = JSON.parse(rawSession);
        } catch (e) {}

        let liveDriver = (typeof loggedInDriverName !== 'undefined' && loggedInDriverName) ? loggedInDriverName : window.loggedInDriverName;
        let liveRole = (typeof currentUserRole !== 'undefined' && currentUserRole) ? currentUserRole : window.currentUserRole;
        let liveCompId = (typeof currentCompanyId !== 'undefined' && currentCompanyId) ? currentCompanyId : window.currentCompanyId;

        let rawUser = liveDriver || sessionObj?.userId || localStorage.getItem('logged_in_driver_name') || localStorage.getItem('na2la_current_user_identifier') || localStorage.getItem('current_user_name') || 'زائر كريم';
        let activeRole = liveRole || sessionObj?.role || localStorage.getItem('current_user_role') || localStorage.getItem('na2la_user_role') || localStorage.getItem('user_role') || 'visitor';
        let activeCompanyId = liveCompId || sessionObj?.companyId || localStorage.getItem('current_company_id') || localStorage.getItem('panda_company_id') || localStorage.getItem('na2la_current_company_id') || 'company_main';

        // جلب اسم الشركة الحقيقي من قائمة السائقين في appData إن وجد
        let liveData = getLiveAppData();
        let driversPool = (liveData.drivers && liveData.drivers.length > 0) ? liveData.drivers : (realFirebaseDrivers || []);
        let matchedDriver = driversPool.find(d => d.name === rawUser || d.companyId === activeCompanyId);
        let activeCompanyName = matchedDriver?.companyName || window.currentCompanyName || localStorage.getItem('current_company_name') || 'أسطورة الطريق الرئيسية';

        if (!rawUser || rawUser === 'زائر كريم' || (activeRole === 'visitor' && rawUser !== 'كرم عجاج')) {
            return {
                activeDriver: 'زائر كريم',
                activeCompanyId: activeCompanyId || 'guest_company',
                activeCompanyName: 'زائر غير مسجل',
                activeRole: 'visitor'
            };
        }

        let activeDriver = String(rawUser).trim();
        let roleLower = String(activeRole).toLowerCase();
        if (activeDriver === 'كرم عجاج' || activeDriver === 'المدير' || roleLower.includes('admin') || roleLower.includes('owner') || activeRole === 'مدير' || activeRole === 'مدير نظام' || activeRole === 'مدير شركة') {
            activeRole = 'admin';
        } else if (roleLower.includes('supervisor') || activeRole === 'مشرف') {
            activeRole = 'supervisor';
        } else {
            activeRole = 'driver';
        }

        return { activeDriver, activeCompanyId, activeCompanyName, activeRole };
    };

    // جلب البيانات من السحابة مع الاستفادة من المزامنة الحية في appData
    window.fetchRealFirebaseData = async function(force = false) {
        let now = Date.now();
        let liveData = getLiveAppData();

        // مزامنة فورية من appData في app.js إذا كانت محملة
        if (liveData.shipments && liveData.shipments.length > 0) realFirebaseShipments = liveData.shipments;
        if (liveData.drivers && liveData.drivers.length > 0) realFirebaseDrivers = liveData.drivers;
        if (liveData.deferredInvoices && liveData.deferredInvoices.length > 0) realFirebaseDeferredInvoices = liveData.deferredInvoices;
        if (liveData.consolidatedInvoices && liveData.consolidatedInvoices.length > 0) realFirebaseConsolidatedInvoices = liveData.consolidatedInvoices;
        if (liveData.treasury && liveData.treasury.length > 0) realFirebaseTreasury = liveData.treasury;
        if (liveData.expenses && liveData.expenses.length > 0) realFirebaseExpenses = liveData.expenses;
        if (liveData.trucks && liveData.trucks.length > 0) realFirebaseTrucks = liveData.trucks;

        if (!force && window._lastFirebaseFetchTime && (now - window._lastFirebaseFetchTime < 120000)) {
            return;
        }

        try {
            const firestoreDb = getFirestoreDB();
            if (!firestoreDb) return;
            let tenant = getActiveTenantContext();

            if (tenant.activeRole === 'visitor') {
                try {
                    const shipmentsSnap = await firestoreDb.collection('shipments').limit(200).get();
                    if (!shipmentsSnap.empty) {
                        realFirebaseShipments = shipmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {}
                window._lastFirebaseFetchTime = now;
                return;
            }

            let companyId = tenant.activeCompanyId;

            if (!liveData.drivers || liveData.drivers.length === 0) {
                try {
                    const driversSnap = await firestoreDb.collection('drivers').where('companyId', '==', companyId).limit(50).get();
                    if (!driversSnap.empty) realFirebaseDrivers = driversSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch(e) {}
            }

            if (!liveData.shipments || liveData.shipments.length === 0) {
                try {
                    const shipmentsSnap = await firestoreDb.collection('shipments').where('companyId', '==', companyId).limit(100).get();
                    if (!shipmentsSnap.empty) realFirebaseShipments = shipmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch(e) {}
            }

            if (!liveData.deferredInvoices || liveData.deferredInvoices.length === 0) {
                try {
                    const invoicesSnap = await firestoreDb.collection('deferredInvoices').where('companyId', '==', companyId).limit(50).get();
                    if (!invoicesSnap.empty) realFirebaseDeferredInvoices = invoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch(e) {}
            }

            if (!liveData.consolidatedInvoices || liveData.consolidatedInvoices.length === 0) {
                try {
                    const conInvoicesSnap = await firestoreDb.collection('consolidatedInvoices').where('companyId', '==', companyId).limit(50).get();
                    if (!conInvoicesSnap.empty) realFirebaseConsolidatedInvoices = conInvoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch(e) {}
            }

            if (!liveData.treasury || liveData.treasury.length === 0) {
                try {
                    const treasurySnap = await firestoreDb.collection('treasury').where('companyId', '==', companyId).limit(50).get();
                    if (!treasurySnap.empty) realFirebaseTreasury = treasurySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch(e) {}
            }

            if (!liveData.expenses || liveData.expenses.length === 0) {
                try {
                    const expensesSnap = await firestoreDb.collection('expenses').where('companyId', '==', companyId).limit(50).get();
                    if (!expensesSnap.empty) realFirebaseExpenses = expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch(e) {}
            }

            if (!liveData.trucks || liveData.trucks.length === 0) {
                try {
                    const trucksSnap = await firestoreDb.collection('trucks').where('companyId', '==', companyId).limit(50).get();
                    if (!trucksSnap.empty) realFirebaseTrucks = trucksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch(e) {}
            }

            window._lastFirebaseFetchTime = now;
        } catch(e) {}
    };

    // بحث مباشر في Firestore عن شحنة برقمها (مفيد للزوار والشحنات القديمة)
    window.findShipmentDirectly = async function(rawQuery) {
        let cleanedQuery = String(rawQuery || '').replace(/[^\d]/g, '');
        let exactText = String(rawQuery || '').trim().toLowerCase();
        let liveData = getLiveAppData();
        let pool = [
            ...(liveData.shipments || []),
            ...(realFirebaseShipments || [])
        ];

        let match = null;
        if (cleanedQuery.length >= 4) {
            match = pool.find(s => matchesCompany(s) && (String(s.id).trim() === cleanedQuery || String(s.id).includes(cleanedQuery)));
        }
        if (!match && exactText.length >= 3) {
            match = pool.find(s => matchesCompany(s) && String(s.id).toLowerCase() === exactText);
        }
        if (match) return match;

        // استعلام مباشر من Firestore بالرقم في حال لم تكن في القائمة المحملة محلياً
        const firestoreDb = getFirestoreDB();
        if (firestoreDb && cleanedQuery.length >= 4) {
            try {
                const docSnap = await firestoreDb.collection('shipments').doc(cleanedQuery).get();
                if (docSnap.exists) {
                    let item = { id: docSnap.id, ...docSnap.data() };
                    if (matchesCompany(item)) return item;
                }
                const whereSnap = await firestoreDb.collection('shipments').where('id', '==', cleanedQuery).limit(1).get();
                if (!whereSnap.empty) {
                    let doc = whereSnap.docs[0];
                    let item = { id: doc.id, ...doc.data() };
                    if (matchesCompany(item)) return item;
                }
            } catch (e) {}
        }
        return null;
    };

    window.getCompanySubscriptionInfo = async function() {
        let tenant = getActiveTenantContext();
        let subData = {
            companyName: tenant.activeCompanyName || 'أسطورة الطريق الرئيسية',
            adminName: tenant.activeDriver || 'غير محدد',
            phone: 'غير متوفر',
            planName: 'monthly',
            status: 'نشط ✅',
            expiryDate: '2026-09-28'
        };

        if (tenant.activeRole === 'visitor') {
            return {
                companyName: 'زائر غير مسجل',
                adminName: 'زائر كريم',
                phone: 'غير متوفر',
                planName: 'معاينة عامة',
                status: 'متاح للزوار',
                expiryDate: 'دائم'
            };
        }

        try {
            let liveData = getLiveAppData();
            let driversPool = (liveData.drivers && liveData.drivers.length > 0) ? liveData.drivers : realFirebaseDrivers;
            if (tenant.activeDriver && tenant.activeDriver !== 'زائر كريم') {
                let driverRec = driversPool.find(d => d.name === tenant.activeDriver);
                if (driverRec) {
                    subData.companyName = driverRec.companyName || driverRec.title || tenant.activeCompanyName;
                    subData.adminName = driverRec.name || tenant.activeDriver;
                    subData.phone = driverRec.phone || driverRec.mobile || 'غير متوفر';
                    subData.planName = driverRec.subPlan || driverRec.plan || driverRec.package || 'monthly';
                    let st = driverRec.subStatus || driverRec.status || 'active';
                    subData.status = (st === 'active' || st === 'نشط' || st === true) ? 'نشط ✅' : 'منتهي ⚠️';
                    subData.expiryDate = driverRec.subExpiry || driverRec.expiryDate || driverRec.expiry || '2026-09-28';
                }
            }
        } catch(e) {}

        return subData;
    };

    window.matchesCompany = function(item) {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return true;
        if (!item) return false;
        let itemComp = String(item.companyId || 'company_main').trim().toLowerCase();
        let activeComp = String(tenant.activeCompanyId || 'company_main').trim().toLowerCase();
        return itemComp === activeComp;
    };

    window.getIsolatedUserShipments = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return [];

        let liveData = getLiveAppData();
        let allShipments = (liveData.shipments && liveData.shipments.length > 0) ? liveData.shipments : realFirebaseShipments;
        let companyFiltered = allShipments.filter(matchesCompany);

        if (tenant.activeRole === 'admin' || tenant.activeRole === 'supervisor') {
            return companyFiltered;
        }

        return companyFiltered.filter(s => {
            let sDriver = String(s.assignedDriver || s.driver || s.name || '').trim();
            let currentDriver = String(tenant.activeDriver).trim();
            return sDriver === currentDriver;
        });
    };

    window.getIsolatedTreasury = function() {
        let liveData = getLiveAppData();
        let allTreasury = (liveData.treasury && liveData.treasury.length > 0) ? liveData.treasury : realFirebaseTreasury;
        return allTreasury.filter(matchesCompany);
    };

    window.getIsolatedExpenses = function() {
        let liveData = getLiveAppData();
        let allExpenses = (liveData.expenses && liveData.expenses.length > 0) ? liveData.expenses : realFirebaseExpenses;
        return allExpenses.filter(matchesCompany);
    };

    window.getIsolatedDeferredInvoices = function() {
        let liveData = getLiveAppData();
        let allInvoices = (liveData.deferredInvoices && liveData.deferredInvoices.length > 0) ? liveData.deferredInvoices : realFirebaseDeferredInvoices;
        return allInvoices.filter(matchesCompany);
    };

    window.getIsolatedConsolidatedInvoices = function() {
        let liveData = getLiveAppData();
        let allCon = (liveData.consolidatedInvoices && liveData.consolidatedInvoices.length > 0) ? liveData.consolidatedInvoices : realFirebaseConsolidatedInvoices;
        return allCon.filter(matchesCompany);
    };

    window.getIsolatedTrucks = function() {
        let liveData = getLiveAppData();
        let allTrucks = (liveData.trucks && liveData.trucks.length > 0) ? liveData.trucks : realFirebaseTrucks;
        return allTrucks.filter(matchesCompany);
    };

    window.parseNumericCurrency = function(val) {
        if (!val && val !== 0) return '0 ج.م';
        if (typeof val === 'number') return val.toLocaleString() + ' ج.م';
        let cleanStr = String(val).replace(/[^\d.-]/g, '');
        let num = parseFloat(cleanStr);
        return isNaN(num) ? '0 ج.م' : num.toLocaleString() + ' ج.م';
    };

    window.getCompanyFinancials = function() {
        let tenant = getActiveTenantContext();
        let shipments = getIsolatedUserShipments();
        let shipmentsCount = shipments.length;

        if (tenant.activeRole === 'visitor' || tenant.activeRole === 'driver') {
            return { treasuryBalance: '0 ج.م', expensesTotal: '0 ج.م', revenues: '0 ج.م', netProfit: '0 ج.م', deferredDebt: '0 ج.م', invoicesCount: 0, shipmentsCount: 0 };
        }

        let isolatedTreasury = getIsolatedTreasury();
        let isolatedExpenses = getIsolatedExpenses();
        let isolatedInvoices = getIsolatedDeferredInvoices();

        let totalRevenues = shipments.reduce((sum, s) => sum + Number(s.price || 0), 0);
        let totalExpenses = isolatedExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
        let netProfit = totalRevenues - totalExpenses;
        
        let treasuryBalance = isolatedTreasury.reduce((sum, t) => {
            let amt = Number(t.amount || 0);
            return (t.type === 'in' || t.type === 'deposit') ? sum + amt : sum - amt;
        }, 0);

        let deferredDebt = isolatedInvoices.reduce((sum, inv) => {
            let isPaid = inv.status === 'paid' || inv.status === 'مسدد' || Number(inv.remainingAmount || 0) <= 0;
            if (!isPaid) return sum + Number(inv.remainingAmount ?? inv.totalAmount ?? inv.price ?? 0);
            return sum;
        }, 0);
        
        return { 
            treasuryBalance: parseNumericCurrency(treasuryBalance), 
            expensesTotal: parseNumericCurrency(totalExpenses), 
            revenues: parseNumericCurrency(totalRevenues),
            netProfit: parseNumericCurrency(netProfit),
            deferredDebt: parseNumericCurrency(deferredDebt),
            invoicesCount: isolatedInvoices.length, 
            shipmentsCount 
        };
    };

    window.syncPlatformUserData = function() {
        let tenant = getActiveTenantContext();
        let isManager = (tenant.activeRole === 'admin' || tenant.activeRole === 'supervisor');
        let isVisitor = (tenant.activeRole === 'visitor');

        let badgeEl = document.getElementById('botUserRoleBadge');
        if (badgeEl) {
            badgeEl.innerText = isVisitor
                ? `🤖 تتبع الشحنات للزوار (رقم الشحنة فقط)`
                : `🤖 ${tenant.activeDriver} (${isManager ? tenant.activeCompanyName : 'سائق مسجل'})`;
        }

        let companyTagEl = document.getElementById('syncHubCompanyTag');
        if (companyTagEl) {
            companyTagEl.innerText = isVisitor
                ? `🏢 وضع زائر (تتبع برقم الشحنة)`
                : (isManager ? `🏢 الشركة: ${tenant.activeCompanyName}` : `👤 السائق: ${tenant.activeDriver}`);
        }
        
        let rssBar = document.getElementById('na2laRssTickerContainer');
        if (rssBar) rssBar.style.display = isManager ? 'block' : 'none';

        let syncLabel = document.getElementById('syncHubBtnLabel');
        if (syncLabel) syncLabel.innerText = isVisitor ? 'تتبع شحنة' : 'شحناتي';

        const visitorMenuSec = document.getElementById('visitorMenuSection');
        if (visitorMenuSec) {
            visitorMenuSec.style.display = isVisitor ? 'flex' : 'none';
        }

        document.querySelectorAll('.admin-only-section').forEach(el => {
            el.style.display = isManager ? 'block' : 'none';
        });

        const managerHeader = document.getElementById('managerMenuSectionHeader');
        if (managerHeader) {
            managerHeader.style.display = isManager ? 'flex' : 'none';
        }

        updateSyncButtonBadge();
        checkDutyStatusIndicator();
        return tenant;
    };

    window.updateSyncButtonBadge = function() {
        const badgeEl = document.getElementById('btn-sync-badge');
        if (badgeEl) {
            const syncedShipments = getIsolatedUserShipments();
            badgeEl.innerText = syncedShipments.length;
            badgeEl.style.display = (syncedShipments.length > 0 && !isVisitorRole()) ? 'inline-block' : 'none';
        }
    };

    window.isVisitorRole = function() {
        let tenant = getActiveTenantContext();
        return tenant.activeRole === 'visitor';
    };

    window.toggleSyncHubDropdown = function(event) {
        if (event) event.stopPropagation();
        triggerBotHaptic(15);
        let tenant = getActiveTenantContext();
        const bolt = document.getElementById('sync-icon-bolt');
        if (bolt) bolt.classList.add('spinning');
        setTimeout(() => { if (bolt) bolt.classList.remove('spinning'); }, 600);

        const menu = document.getElementById('mainBotMenuDropdownMenu');
        if (menu) menu.style.display = 'none';

        const dropdown = document.getElementById('syncHubDropdownMenu');
        const userTitleSpan = document.getElementById('syncHubUserTitle');
        const listContainer = document.getElementById('syncHubItemsList');
        if (!dropdown) return;
        if (dropdown.style.display === 'block') { dropdown.style.display = 'none'; return; }

        userTitleSpan.innerText = isVisitorRole() ? `👤 زائر كريم` : `👤 ${tenant.activeDriver}`;
        
        if (isVisitorRole()) {
            listContainer.innerHTML = `<div style="padding: 6px; text-align: center; color: var(--warning-color);">اكتب رقم شحنتك (مثل 178830) في صندوق الدردشة لتتبعها فوراً.</div>`;
        } else {
            const syncedShipments = getIsolatedUserShipments();
            listContainer.innerHTML = syncedShipments.length === 0
                ? `<div style="padding: 6px; text-align: center;">لا توجد شحنات معزولة</div>`
                : syncedShipments.slice(0, 6).map(s => `<div style="padding: 5px 8px; background:var(--card-bg); margin-bottom:4px; border-radius:6px; cursor:pointer;" onclick="renderShipmentsInsideBot(); closeMainBotMenus();">📦 ${botEscapeHTML(s.id || 'شحنة')} (${botEscapeHTML(s.status || 'نشطة')}) ⬅</div>`).join('');
        }
        dropdown.style.display = 'block';
    };

    window.openConnectedAccountHub = function() {
        closeMainBotMenus();
        if (isVisitorRole()) {
            showBotToast('⚠️ الزائر ليس لديه بروفايل خاص. يرجى تسجيل الدخول لحسابك.');
            return;
        }
        openBotSection('account-tab', 'البروفايل');
    };

    window.toggleDutyStatus = function() {
        triggerBotHaptic(15);
        let currentStatus = localStorage.getItem('driver_duty_status') || 'active';
        let newStatus = currentStatus === 'active' ? 'offline' : 'active';
        localStorage.setItem('driver_duty_status', newStatus);
        checkDutyStatusIndicator();
        showBotToast(newStatus === 'active' ? '🟢 حالتك الآن: متاح للعمل' : '🔴 حالتك الآن: غير متاح');
    };

    window.checkDutyStatusIndicator = function() {
        let dot = document.getElementById('botStatusDot');
        let currentStatus = localStorage.getItem('driver_duty_status') || 'active';
        if (dot) { dot.style.background = currentStatus === 'active' ? '#10b981' : '#ef4444'; }
    };

    // دالة مشاركة تفاصيل الشحنة المتتبعة عبر Capacitor Native Share
    window.shareTrackedShipmentNative = async function(shipmentId, clientName, item, status, price) {
        triggerBotHaptic(20);
        const shareMsg = `📦 *حالة الشحنة #${shipmentId} - أسطورة الطريق*\n👤 *العميل:* ${clientName}\n🚛 *الحمولة:* ${item}\n📌 *الحالة:* ${status}\n💰 *الأجرة:* ${price} ج.م`;
        if (window.CapacitorNative && typeof window.CapacitorNative.shareText === 'function') {
            const shared = await window.CapacitorNative.shareText(`تتبع شحنة #${shipmentId}`, shareMsg);
            if (shared) return;
        }
        window.open(`https://wa.me/?text=${encodeURIComponent(shareMsg)}`, '_blank');
    };

    // التشغيل الفوري لفرض قيود الرتبة قبل جلب البيانات
    syncPlatformUserData();
    fetchRealFirebaseData().then(() => { syncPlatformUserData(); });

    let isBotVoiceOutputOn = true, isBotContinuousActive = false;

    window.toggleNa2laBot = function() {
        let modal = document.getElementById('na2laBotModal');
        if (!modal) return;
        let isHidden = (modal.style.display === 'none' || modal.style.display === '');
        modal.style.display = isHidden ? 'flex' : 'none';
        if (isHidden) {
            syncPlatformUserData();
            fetchRealFirebaseData().then(() => {
                syncPlatformUserData();
                loadChatHistory();
            });
        }
    };

    window.toggleBotVoiceOutput = function() {
        triggerBotHaptic(15);
        isBotVoiceOutputOn = !isBotVoiceOutputOn;
        let btn = document.getElementById('botVoiceToggleBtn');
        if (btn) {
            btn.innerText = isBotVoiceOutputOn ? "🔊 تبديل الناطق الصوتي (مفعل)" : "🔇 تبديل الناطق الصوتي (صامت)";
            btn.style.color = isBotVoiceOutputOn ? "var(--accent-color)" : "var(--danger-color)";
        }
        showBotToast(isBotVoiceOutputOn ? "🔊 تم تفعيل الناطق الصوتي" : "🔇 تم كتم الناطق الصوتي");
    };

    window.toggleBotContinuousVoice = function() {
        triggerBotHaptic(15);
        isBotContinuousActive = !isBotContinuousActive;
        let btn = document.getElementById('botContinuousBtn');
        if (isBotContinuousActive) { 
            btn.innerText = "🎤 الاستماع المستمر: مفعل"; 
            btn.style.color = "var(--accent-color)";
            startBotVoiceInput(); 
        } else { 
            btn.innerText = "🎤 الاستماع الصوتي المستمر"; 
            btn.style.color = "#38bdf8";
        }
    };

    window.handleScaleTicketUpload = function(input) {
        if (input.files && input.files[0]) {
            triggerBotHaptic(20);
            let fileName = botEscapeHTML(input.files[0].name);
            let container = document.getElementById('na2laBotMessages');
            container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 10px 14px; border-radius: 12px; align-self: flex-start; text-align: right; direction: rtl;">📎 تحليل بونة الميزان: ${fileName}</div>`;
            setTimeout(() => {
                let botReply = `✅ <b>نجاح استخراج الأوزان (OCR):</b> القائم 32 طن، الفارغ 10 طن، الصافي 22 طن.`;
                container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${botReply}</div>`;
                container.scrollTop = container.scrollHeight;
            }, 800);
        }
    };

    window.saveChatHistory = function(sender, htmlContent) {
        if (window.isTempChatActive) return;
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        let history = JSON.parse(localStorage.getItem(storageKey) || '[]');
        history.push({ sender, htmlContent, timestamp: new Date().toISOString() });
        if (history.length > 40) history = history.slice(-40);
        localStorage.setItem(storageKey, JSON.stringify(history));
    };

    window.loadChatHistory = async function() {
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        let history = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const container = document.getElementById('na2laBotMessages');
        if (!container) return;

        let welcomeText = tenant.activeRole === 'visitor'
            ? `مرحباً بك يا <b>زائرنا الكريم</b>. يرجى كتابة <b>رقم شحنتك</b> مباشرة (مثل: 178830...) هنا في المربع أدناه لتتبع حالة شحنتك بدقة.`
            : `مرحباً بك يا <b>${botEscapeHTML(tenant.activeDriver)}</b> (${tenant.activeRole === 'driver' ? 'سائق' : (tenant.activeRole === 'admin' ? 'مدير' : 'مشرف')}). تم تفعيل العزل التام والمزامنة السحابية.`;

        container.innerHTML = `<div style="background: var(--bg-color); padding: 12px 16px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${welcomeText}</div>`;
        history.forEach(msg => {
            let alignStyle = msg.sender === 'user' ? 'align-self: flex-start;' : 'align-self: flex-end;';
            let bgStyle = msg.sender === 'user' ? 'var(--primary-color)' : 'var(--bg-color)';
            let colorStyle = msg.sender === 'user' ? 'white' : 'var(--text-color)';
            container.innerHTML += `<div style="background: ${bgStyle}; color: ${colorStyle}; padding: 10px 14px; border-radius: 12px; ${alignStyle} border: 1px solid var(--border-color); text-align: right; direction: rtl;">${msg.htmlContent}</div>`;
        });
        container.scrollTop = container.scrollHeight;
    };

    window.clearBotChat = function() {
        triggerBotHaptic(25);
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        localStorage.removeItem(storageKey);
        loadChatHistory();
        showBotToast("🗑️ تم مسح محادثات الذاكرة الحالية بنجاح.");
    };

    window.changeBotTheme = function(themeId) {
        triggerBotHaptic(15);
        let rootContainer = document.getElementById('na2laBotRootContainer');
        if (!rootContainer) return;
        if (themeId === 'default') rootContainer.removeAttribute('data-theme');
        else rootContainer.setAttribute('data-theme', themeId);
        localStorage.setItem('na2la_bot_theme', themeId);
    };

    const savedBotTheme = localStorage.getItem('na2la_bot_theme');
    if (savedBotTheme && savedBotTheme !== 'default') {
        changeBotTheme(savedBotTheme);
        const sel = document.getElementById('botThemeSelect');
        if (sel) sel.value = savedBotTheme;
    }

    // إدخال صوتي متوافق مع AndroidBridge / Capacitor / Web
    window.startBotVoiceInput = async function() {
        const micBtn = document.getElementById('na2laBotMicBtn');
        try {
            if (window.Capacitor?.Plugins?.SpeechRecognition) {
                const SR = window.Capacitor.Plugins.SpeechRecognition;
                await SR.requestPermissions();
                if (micBtn) micBtn.style.background = '#ef4444';
                const result = await SR.start({ language: 'ar-EG', maxResults: 1, partialResults: false, popup: false });
                if (micBtn) micBtn.style.background = 'var(--warning-color)';
                if (result && result.matches && result.matches[0]) {
                    document.getElementById('na2laBotInput').value = result.matches[0];
                    sendBotQuickQuery(result.matches[0]);
                }
                return;
            }
        } catch (e) {
            if (micBtn) micBtn.style.background = 'var(--warning-color)';
        }

        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            showBotToast('⚠️ التعرف الصوتي غير مدعوم على هذا الجهاز.');
            return;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'ar-EG';
        if (micBtn) micBtn.style.background = '#ef4444';
        recognition.onresult = (event) => {
            let text = event.results[0][0].transcript;
            document.getElementById('na2laBotInput').value = text;
            sendBotQuickQuery(text);
        };
        recognition.onerror = () => {
            if (micBtn) micBtn.style.background = 'var(--warning-color)';
            showBotToast('⚠️ تعذر التقاط الصوت، تأكد من إذن الميكروفون.');
        };
        recognition.onend = () => {
            if (micBtn) micBtn.style.background = 'var(--warning-color)';
        };
        recognition.start();
    };

    // ناطق صوتي متوافق مع AndroidBridge / Capacitor / Web
    window.speakBotReplyText = function(text) {
        if (!isBotVoiceOutputOn || !text) return;
        try {
            if (window.AndroidBridge && typeof window.AndroidBridge.speakText === 'function') {
                window.AndroidBridge.speakText(text);
                return;
            }
            if (window.Capacitor?.Plugins?.TextToSpeech) {
                window.Capacitor.Plugins.TextToSpeech.speak({ text: text, lang: 'ar-EG', rate: 1.0 });
                return;
            }
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                let utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'ar-EG';
                window.speechSynthesis.speak(utterance);
            }
        } catch (e) {}
    };

    window.sendBotQuickQuery = async function(customText = null) {
        let inputEl = document.getElementById('na2laBotInput');
        let container = document.getElementById('na2laBotMessages');
        let text = customText || (inputEl ? inputEl.value.trim() : "");
        if (!text || !container) return;

        let safeUserText = botEscapeHTML(text);
        container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 10px 14px; border-radius: 12px; align-self: flex-start; text-align: right; direction: rtl;">${safeUserText}</div>`;
        saveChatHistory('user', safeUserText);
        if (inputEl && !customText) inputEl.value = "";
        container.scrollTop = container.scrollHeight;

        await fetchRealFirebaseData();
        let tenant = syncPlatformUserData();
        let botReply = '';
        let lower = text.toLowerCase();

        let matchedShipment = await findShipmentDirectly(text);

        if (matchedShipment) {
            let sId = botEscapeHTML(matchedShipment.id || '-');
            let sName = botEscapeHTML(matchedShipment.name || '-');
            let sAddr = botEscapeHTML(matchedShipment.address || '-');
            let sItem = botEscapeHTML(matchedShipment.item || '-');
            let sPrice = botEscapeHTML(matchedShipment.price || 0);
            let sStatus = botEscapeHTML(matchedShipment.status || 'نشطة');
            let sDate = botEscapeHTML(matchedShipment.date || '-');

            botReply = `
                📦 <strong>نتيجة تتبع الشحنة رقم (${sId}):</strong>
                <div class="chat-card">
                    👤 <b>العميل:</b> ${sName}<br>
                    📍 <b>العنوان:</b> ${sAddr}<br>
                    📦 <b>الحمولة:</b> ${sItem}<br>
                    💰 <b>الأجرة:</b> ${sPrice} ج.م<br>
                    📌 <b>حالة الشحنة:</b> <b style="color:var(--accent-color);">${sStatus}</b><br>
                    📅 <b>التاريخ:</b> ${sDate}<br>
                    <button type="button" onclick="shareTrackedShipmentNative('${sId}', '${sName}', '${sItem}', '${sStatus}', '${sPrice}')" style="margin-top:8px; background:var(--primary-color); color:#fff; border:none; padding:5px 10px; border-radius:6px; font-size:10px; cursor:pointer; font-family:'Cairo',sans-serif; font-weight:bold;">📤 مشاركة تفاصيل الشحنة</button>
                </div>
            `;
        }
        else if (tenant.activeRole === 'visitor') {
            if (lower.includes('كيف') || lower.includes('شحنة') || lower.includes('تتبع')) {
                botReply = `📦 أهلاً بك يا زائر كريم. لتتبع شحنتك، يرجى كتابة <b>رقم الشحنة</b> (مثل رقم 178830...) مباشرة في صندوق الكتابة أدناه ليقوم النظام بعرض تفاصيلها وحالتها الفورية لك.`;
            } else {
                botReply = `⚠️ عذراً يا زائرنا الكريم، لم يتم العثور على شحنة بهذا الرقم ("${safeUserText}"). يرجى التحقق من رقم الشحنة الصحيح والمحاولة مرة أخرى.`;
            }
        }
        else if (lower.includes('اختبار القيادة')) {
            let randQuiz = driverQuizzes[Math.floor(Math.random() * driverQuizzes.length)];
            botReply = `<div class="chat-card"><b>${botEscapeHTML(randQuiz.q)}</b><br>${botEscapeHTML(randQuiz.explain)}</div>`;
        }
        else if (lower.includes('صيانة الشاحنات') || lower.includes('صيانة') || lower.includes('عطل')) {
            if (tenant.activeRole === 'driver') {
                botReply = `⚠️ عذراً، قسم صيانة الأسطول العام مخصص للمديرين والمشرفين فقط.`;
            } else {
                botReply = `
                    🛠️ <b>مساعد الصيانة والتشخيص الذكي (AI Mechanic):</b><br>
                    اختر نوع المشكلة للاستعلام الفوري:<br>
                    - مشكلة في الدينامو أو الشحن ⚡<br>
                    - خشونة أو ثقل في الدبرياج والفتيس ⚙️<br>
                    - ارتفاع حرارة المحرك 🌡️<br>
                    - خروج دخان من الشكمان 💨
                `;
            }
        }
        else if (lower.includes('صلاحية اشتراك') || lower.includes('الاشتراك')) {
            let subInfo = await getCompanySubscriptionInfo();
            botReply = `💳 <b>كارت الاشتراك:</b><br>الشركة: <b>${botEscapeHTML(subInfo.companyName)}</b><br>الباقة: <b>${botEscapeHTML(subInfo.planName)}</b><br>الحالة: <b style="color:var(--accent-color);">${botEscapeHTML(subInfo.status)}</b><br>الانتهاء: <b>${botEscapeHTML(subInfo.expiryDate)}</b>`;
        }
        else if (lower.includes('شحناتي') || lower.includes('الشحنات')) {
            await renderShipmentsInsideBot();
            return;
        }
        else if (lower.includes('الجدول الخماسي') || lower.includes('الخماسي')) {
            if (tenant.activeRole === 'driver') {
                botReply = `⚠️ عذراً، الجدول الخماسي مخصص للمديرين والمشرفين فقط.`;
            } else {
                await renderPentaTableInsideBot();
                return;
            }
        }
        else if (lower.includes('الفواتير المجمعة')) {
            if (tenant.activeRole === 'driver') {
                botReply = `⚠️ عذراً، الفواتير المجمعة مخصصة للمديرين والمشرفين فقط.`;
            } else {
                await renderConsolidatedInvoicesInsideBot();
                return;
            }
        }
        else if (lower.includes('الفواتير')) {
            if (tenant.activeRole === 'driver') {
                botReply = `⚠️ عذراً، الفواتير الآجلة مخصصة للمديرين والمشرفين فقط.`;
            } else {
                await renderDeferredInvoicesInsideBot();
                return;
            }
        }
        else if (lower.includes('الخزنة') || lower.includes('الخزينة')) {
            if (tenant.activeRole === 'driver') {
                botReply = `⚠️ عذراً، حسابات الخزينة مخصصة للمديرين والمشرفين فقط.`;
            } else {
                await renderTreasuryInsideBot();
                return;
            }
        }
        else if (lower.includes('الأسطول') || lower.includes('الزيت')) {
            if (tenant.activeRole === 'driver') {
                botReply = `⚠️ عذراً، حالة الأسطول والصيانة مخصصة للمديرين والمشرفين فقط.`;
            } else {
                await renderFleetInsideBot();
                return;
            }
        }
        else if (lower.includes('رسم')) {
            botReply = handleImageRequest(text);
        }
        else {
            botReply = `
                🤖 استجابة من مساعد Gemini Pro حول: "${safeUserText}".<br>
                💡 <i>ملاحظة: لتتبع أي شحنة، قم بكتابة رقم الشحنة مباشرة في الصندوق أدناه.</i>
            `;
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 10px 14px; border-radius: 12px; align-self: flex-end; border: 1px solid var(--border-color); text-align: right; direction: rtl;">${botReply}</div>`;
        saveChatHistory('bot', botReply);
        container.scrollTop = container.scrollHeight;
        speakBotReplyText(botReply.replace(/<[^>]*>?/gm, ''));
    };

    // الدعم التلقائي لتتبع الشحنة إذا فُتح التطبيق من رابط QR (?shipmentId=...)
    setTimeout(() => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const qrShipmentId = urlParams.get('shipmentId');
            if (qrShipmentId) {
                const modal = document.getElementById('na2laBotModal');
                if (modal) modal.style.display = 'flex';
                sendBotQuickQuery(qrShipmentId);
            }
        } catch (e) {}
    }, 900);
})();
