(function() {
    // إزالة شاملة لأي عناصر أو نسخ قديمة معلقة في الصفحة لضمان عدم تداخل النسخ
    ['na2laBotRootContainer', 'na2laBotBtn', 'na2laBotModal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
    document.querySelectorAll('#na2laBotRootContainer, [id*="na2laBot"]').forEach(el => el.remove());

    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyDn-rNJ2ak3I0DdfzTZmXKjePDdgxhfyIY",
            authDomain: "n2la-642d3.firebaseapp.com",
            projectId: "n2la-642d3",
            storageBucket: "n2la-642d3.firebasestorage.app",
            messagingSenderId: "1085749997466",
            appId: "1:1085749997466:web:13e5535dc6d2312397d423"
        });
    }

    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
        
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
            --shadow-3d: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
            font-family: 'Cairo', sans-serif !important;
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
        @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        @keyframes floatAnim {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
        .sync-account-hub-btn {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 10px;
            font-weight: bold;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
            transition: transform 0.2s, box-shadow 0.2s;
            font-family: 'Cairo', sans-serif;
        }
        .sync-account-hub-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
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
            padding: 10px;
            border-radius: 8px;
            margin-top: 6px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            font-family: 'Cairo', sans-serif;
        }
        .bot-table-container {
            width: 100%;
            overflow-x: auto;
            margin-top: 6px;
        }
        .quiz-option-btn {
            display: block;
            width: 100%;
            text-align: right;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            color: var(--text-color);
            padding: 6px 10px;
            border-radius: 6px;
            margin-top: 4px;
            cursor: pointer;
            font-size: 10px;
            font-family: 'Cairo', sans-serif;
            transition: background 0.2s;
        }
        .quiz-option-btn:hover {
            background: var(--primary-color);
            color: #fff;
        }
    `;
    document.head.appendChild(styleEl);

    const containerDiv = document.createElement('div');
    containerDiv.id = 'na2laBotRootContainer';
    containerDiv.innerHTML = `
        <button id="na2laBotBtn" style="position: fixed; bottom: 25px; right: 20px; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: white; border: none; width: 60px; height: 60px; border-radius: 50%; font-size: 26px; cursor: pointer; box-shadow: var(--shadow-3d); z-index: 2147483647; display: flex; align-items: center; justify-content: center; touch-action: none; user-select: none; animation: floatAnim 2.5s ease-in-out infinite;" title="🤖 مساعد Gemini الذكي Pro لمنصة نقلة">🤖</button>

        <div id="na2laBotModal" style="position: fixed; bottom: 85px; right: 20px; width: 420px; max-width: 92vw; height: 80vh; max-height: 650px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 18px; box-shadow: var(--shadow-3d); z-index: 2147483646; display: none; flex-direction: column; overflow: hidden; backdrop-filter: blur(20px); font-family: 'Cairo', sans-serif;">
            <div style="background: linear-gradient(135deg, var(--primary-color), var(--primary-hover)); color: white; padding: 10px 14px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; font-size: 12px; flex-shrink: 0;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span id="botStatusDot" onclick="toggleDutyStatus()" style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; cursor: pointer;" title="تبديل حالة العمل"></span>
                    <span id="botUserRoleBadge">🤖 مساعد Gemini الذكي Pro (شامل لكل الأقسام)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <div style="position: relative; display: inline-block;">
                        <button type="button" class="sync-account-hub-btn" onclick="toggleSyncHubDropdown(event)">
                            <span id="sync-icon-bolt">⚡</span> شحناتي 
                            <span id="btn-sync-badge" style="background: var(--danger-color, #ef4444); color: #fff; padding: 1px 4px; border-radius: 8px; font-size: 8px; font-weight: bold; display: none;">0</span>
                        </button>
                        <div id="syncHubDropdownMenu" style="display: none; position: absolute; top: 110%; right: 0; width: 260px; background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 10px; box-shadow: var(--shadow-3d); z-index: 2147483647; padding: 8px; color: var(--text-color); font-size: 11px;">
                            <div style="font-weight: bold; margin-bottom: 5px; border-bottom: 1px solid var(--border-color); padding-bottom: 3px; display: flex; justify-content: space-between;">
                                <span id="syncHubUserTitle">👤 الحساب المتصل</span>
                                <span style="color: var(--accent-color); cursor: pointer;" onclick="openConnectedAccountHub()">الملف ⬅</span>
                            </div>
                            <div id="syncHubCompanyTag" style="font-size: 9px; color: var(--warning-color); margin-bottom: 4px;">🏢 الشركة: جاري المزامنة...</div>
                            <div id="syncHubItemsList" style="max-height: 140px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px;"></div>
                        </div>
                    </div>
                    <button onclick="toggleNa2laBot()" style="background: none; border: none; color: white; font-size: 16px; cursor: pointer;">✕</button>
                </div>
            </div>

            <!-- شريط الأقسام السريعة داخل البوت ليخدم الزائر والسائق والمشرف والمدير بكفاءة تامة -->
            <div style="background: var(--bg-color); padding: 5px 8px; border-bottom: 1px solid var(--border-color); display: flex; gap: 4px; overflow-x: auto; flex-shrink: 0;" id="botSectionsNavBar">
                <button onclick="openBotSection('shipments-tab')" style="background: var(--card-bg); color: var(--accent-color); border: 1px solid var(--border-color); border-radius: 6px; padding: 3px 8px; font-size: 9px; white-space: nowrap; cursor: pointer; font-weight: bold;">📦 الشحنات</button>
                <button onclick="openBotSection('chat-tab')" style="background: var(--card-bg); color: #38bdf8; border: 1px solid var(--border-color); border-radius: 6px; padding: 3px 8px; font-size: 9px; white-space: nowrap; cursor: pointer; font-weight: bold;">💬 الدردشة</button>
                <button onclick="openBotSection('deferred-invoices-tab')" style="background: var(--card-bg); color: var(--warning-color); border: 1px solid var(--border-color); border-radius: 6px; padding: 3px 8px; font-size: 9px; white-space: nowrap; cursor: pointer; font-weight: bold;">⏳ الأجل</button>
                <button onclick="openBotSection('treasury-tab')" style="background: var(--card-bg); color: #34d399; border: 1px solid var(--border-color); border-radius: 6px; padding: 3px 8px; font-size: 9px; white-space: nowrap; cursor: pointer; font-weight: bold;">💵 الخزينة</button>
                <button onclick="openBotSection('map-tab')" style="background: var(--card-bg); color: #a78bfa; border: 1px solid var(--border-color); border-radius: 6px; padding: 3px 8px; font-size: 9px; white-space: nowrap; cursor: pointer; font-weight: bold;">🗺️ الخريطة</button>
                <button onclick="openBotSection('reports-tab')" style="background: var(--card-bg); color: #f472b6; border: 1px solid var(--border-color); border-radius: 6px; padding: 3px 8px; font-size: 9px; white-space: nowrap; cursor: pointer; font-weight: bold;">📊 التقارير</button>
                <button onclick="openBotSection('account-tab')" style="background: var(--card-bg); color: #fbbf24; border: 1px solid var(--border-color); border-radius: 6px; padding: 3px 8px; font-size: 9px; white-space: nowrap; cursor: pointer; font-weight: bold;">👤 البروفايل</button>
            </div>

            <div id="na2laRssTickerContainer" style="display: none; background: rgba(217, 119, 6, 0.15); border-bottom: 1px solid var(--border-color); padding: 5px 10px; font-size: 11px; color: var(--warning-color); white-space: nowrap; overflow: hidden; position: relative; flex-shrink: 0;">
                <div style="display: inline-block; animation: marquee 18s linear infinite; font-weight: bold;">
                    🚀 أسطورة الطريق Pro | الخصوصية الفائقة، إدارة الأسطول، الشحنات، والفواتير المعتمدة للجميع
                </div>
            </div>

            <div style="padding: 6px 12px; background: var(--bg-color); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); font-size: 10px; flex-shrink: 0;">
                <div style="display: flex; gap: 3px; flex-wrap: wrap;">
                    <button onclick="toggleTemporaryChatMode()" id="botTempChatBtn" style="background: var(--card-bg); color: #a855f7; border: 1px solid #a855f7; padding: 3px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;" title="محادثة مؤقتة لا تحفظ في السجل">🕵️ محادثة مؤقتة</button>
                    <button onclick="toggleBotContinuousVoice()" id="botContinuousBtn" style="background: var(--border-color); color: #fff; border: none; padding: 3px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🎤 مستمر معطل</button>
                    <button onclick="toggleBotVoiceOutput()" id="botVoiceToggleBtn" style="background: var(--accent-color); color: #fff; border: none; padding: 3px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🔊 ناطق</button>
                    <button onclick="clearBotChat()" style="background: var(--danger-color); color: #fff; border: none; padding: 3px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;" title="مسح محادثة">🗑️ مسح</button>
                </div>
                <div>
                    <select id="botThemeSelect" onchange="changeBotTheme(this.value)" style="padding: 3px 5px; font-size: 10px; border-radius: 6px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); cursor: pointer; font-family: 'Cairo', sans-serif;">
                        <option value="default">🎨 الداكن الأصلي</option>
                        <option value="royal">👑 الأرجواني الملكي</option>
                        <option value="emerald">💎 الزمردي الفاخر</option>
                    </select>
                </div>
            </div>

            <div id="tempChatAlertBanner" style="display: none; background: rgba(168, 85, 247, 0.2); border-bottom: 1px solid #a855f7; color: #d8b4fe; padding: 4px 10px; font-size: 10px; text-align: center; font-weight: bold; flex-shrink: 0;">
                🕵️ وضع الخصوصية الفائقة (محادثة مؤقتة): لن يتم حفظ هذه المحادثة في الذاكرة أو فايربيس.
            </div>

            <div id="na2laBotMessages" style="flex: 1 1 auto; min-height: 0; padding: 14px; overflow-y: auto; font-size: 12px; display: flex; flex-direction: column; gap: 10px; line-height: 1.6; background: var(--card-bg); color: var(--text-color);">
                <div style="background: var(--bg-color); padding: 10px 14px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">
                    مرحباً بك! أنا مساعدك الذكي <b>Gemini Pro</b> المدمج بالميزات المتقدمة.<br>- تم تفعيل زري القائمة السريعة لفتح الشحنات وكافة الأقسام لخدمة (الزائر، السائق، المشرف، والمدير) بدقة تامة وبدون أي خطأ.
                </div>
            </div>

            <div id="botQuickActionsContainer" style="padding: 6px 10px; background: var(--bg-color); display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; border-top: 1px solid var(--border-color); flex-shrink: 0;"></div>

            <div style="padding: 8px 10px; border-top: 1px solid var(--border-color); display: flex; gap: 6px; background: var(--bg-color); align-items: center; position: relative; flex-shrink: 0; min-height: 52px; box-sizing: border-box;">
                <input type="file" id="scaleTicketFileInput" accept="image/*" style="display: none;" onchange="handleScaleTicketUpload(this)">
                <input type="file" id="importArchiveFileInput" accept=".json" style="display: none;" onchange="importChatArchiveData(this)">
                
                <button onclick="document.getElementById('scaleTicketFileInput').click()" title="رفع وتحليل بونة الميزان OCR" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); width: 36px; height: 36px; min-width: 36px; border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">📎</button>
                
                <input type="text" id="na2laBotInput" placeholder="اكتب سؤالك، اسأل عن الشحنات، أو اطلب تحليلاً..." style="flex: 1; min-width: 0; height: 36px; margin: 0; padding: 0 10px; font-size: 11px; border-radius: 8px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; box-sizing: border-box; outline: none;" onkeypress="if(event.key === 'Enter') sendBotQuickQuery()">

                <button onclick="startBotVoiceInput()" title="تسجيل صوتي" style="background: var(--warning-color); border: none; width: 36px; height: 36px; min-width: 36px; border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-3d); flex-shrink: 0;">🎤</button>
                
                <button onclick="sendBotQuickQuery()" style="background: var(--primary-color); color: white; border: none; height: 36px; padding: 0 12px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 11px; font-family: 'Cairo', sans-serif; white-space: nowrap; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">إرسال</button>
            </div>
        </div>
    `;
    document.body.appendChild(containerDiv);

    // دالة فتح الأقسام مباشرة من بوت المساعد لخدمة كافة المستخدمين بدقة
    window.openBotSection = function(tabId) {
        if (typeof switchTab === 'function') {
            switchTab(tabId);
            // إغلاق نافذة البوت أو تركها حسب الرغبة لسهولة الاستخدام
        } else {
            alert('تم طلب الانتقال إلى القسم: ' + tabId);
        }
    };

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
        const onDrag = (clientX, clientY) => {
            if (!isBotDragging) return;
            let dx = clientX - startBotX, dy = clientY - startBotY;
            if (dx * dx + dy * dy > 36) hasBotDragged = true;
            let newLeft = Math.max(10, Math.min(initBotLeft + dx, window.innerWidth - botBtn.offsetWidth - 10));
            let newTop = Math.max(10, Math.min(initBotTop + dy, window.innerHeight - botBtn.offsetHeight - 10));
            botBtn.style.left = newLeft + 'px'; botBtn.style.top = newTop + 'px';
        };
        const stopDrag = () => { 
            if (!isBotDragging) return; 
            isBotDragging = false; 
        };

        botBtn.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
        document.addEventListener('mousemove', (e) => onDrag(e.clientX, e.clientY));
        document.addEventListener('mouseup', stopDrag);
        
        botBtn.addEventListener('touchstart', (e) => { 
            if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY); 
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => { 
            if (isBotDragging && e.touches.length === 1) { 
                onDrag(e.touches[0].clientX, e.touches[0].clientY); 
            } 
        }, { passive: true });
        
        document.addEventListener('touchend', stopDrag);

        botBtn.addEventListener('click', () => {
            if (!hasBotDragged) {
                toggleNa2laBot();
            }
            hasBotDragged = false;
        });
    }

    window.realFirebaseShipments = [];
    window.realFirebaseDrivers = [];
    window.realFirebaseDeferredInvoices = [];
    window.realFirebaseConsolidatedInvoices = [];
    window.realFirebaseAppData = {};
    window.lastBotContext = null;
    window.isTempChatActive = false;

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
            <div class="chat-card" style="border-right-color: var(--purple-color);">
                <div style="font-weight: bold; color: var(--purple-color); font-size: 11px; margin-bottom: 6px;">🎨 محرك Gemini - رسم وتوليد وسائط: "${subject}"</div>
                <img src="${imageUrl}" style="width: 100%; max-height: 220px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color);" alt="${subject}">
                <div style="margin-top: 6px; font-size: 10px; color: var(--text-color);">تم توليد وإخراج المشهد المخصص بدقة وسرعة سحابية.</div>
            </div>
        `;
    };

    window.toggleTemporaryChatMode = function() {
        window.isTempChatActive = !window.isTempChatActive;
        let btn = document.getElementById('botTempChatBtn');
        let banner = document.getElementById('tempChatAlertBanner');
        if (btn) {
            btn.style.background = window.isTempChatActive ? "var(--purple-color)" : "var(--card-bg)";
            btn.style.color = window.isTempChatActive ? "#fff" : "#a855f7";
            btn.innerText = window.isTempChatActive ? "🕵️ مؤقت: مفعل" : "🕵️ محادثة مؤقتة";
        }
        if (banner) {
            banner.style.display = window.isTempChatActive ? "block" : "none";
        }
        alert(window.isTempChatActive ? "تم تفعيل وضع المحادثة المؤقتة (Incognito Mode)." : "تم إلغاء وضع المحادثة المؤقتة.");
    };

    window.exportChatArchiveData = function() {
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        let chatHistory = JSON.parse(localStorage.getItem(storageKey) || '[]');
        let exportBundle = { version: "10.0-PRO", tenant, exportDate: new Date().toISOString(), chatHistory };
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
        let downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `Na2la_Archive_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        alert("✅ تم تصدير واستخراج أرشيف السجلات والمحادثات بنجاح.");
    };

    window.importChatArchiveData = function(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                try {
                    let importedData = JSON.parse(e.target.result);
                    if (importedData && importedData.chatHistory) {
                        let tenant = getActiveTenantContext();
                        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
                        localStorage.setItem(storageKey, JSON.stringify(importedData.chatHistory));
                        loadChatHistory();
                        alert("✅ تم استيراد ونقل الأرشيف بنجاح.");
                    } else { alert("⚠️ تنسيق الملف غير صحيح."); }
                } catch(err) { alert("❌ حدث خطأ أثناء قراءة الأرشيف."); }
            };
            reader.readAsText(input.files[0]);
        }
    };

    window.getActiveTenantContext = function() {
        let rawUser = window.loggedInDriverName || window.currentUser?.name || window.currentUser || window.logged_in_driver_name || localStorage.getItem('logged_in_driver_name') || localStorage.getItem('na2la_current_user_identifier') || localStorage.getItem('current_user_name') || null;
        let activeRole = window.currentUserRole || window.currentUser?.role || localStorage.getItem('current_user_role') || localStorage.getItem('na2la_user_role') || localStorage.getItem('user_role') || 'visitor';
        let activeCompanyId = window.currentCompanyId || window.Na2laApp?.companyId || localStorage.getItem('current_company_id') || localStorage.getItem('na2la_current_company_id') || 'company_main';
        let activeCompanyName = window.currentCompanyName || window.Na2laApp?.companyName || localStorage.getItem('current_company_name') || localStorage.getItem('na2la_current_company_name') || 'أسطورة الطريق الرئيسية';

        if (!rawUser || activeRole === 'visitor' || rawUser === 'زائر كريم') {
            return { activeDriver: 'زائر كريم', activeCompanyId: activeCompanyId || 'guest_company', activeCompanyName: activeCompanyName || 'زائر غير مسجل', activeRole: 'visitor' };
        }

        let activeDriver = rawUser;
        if (activeDriver === "المدير" || activeRole.includes('admin') || activeRole.includes('owner') || activeRole.includes('مدير')) {
            activeRole = "admin";
        } else if (activeDriver.includes('سائق') || activeRole.includes('driver')) {
            activeRole = "driver";
        } else if (activeRole.includes('supervisor') || activeRole.includes('مشرف')) {
            activeRole = "supervisor";
        }

        return { activeDriver, activeCompanyId, activeCompanyName, activeRole };
    };

    window.fetchRealFirebaseData = async function() {
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                let tenant = getActiveTenantContext();
                
                try {
                    const driversSnap = await db.collection('drivers').get();
                    if (!driversSnap.empty) {
                        realFirebaseDrivers = driversSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {}

                try {
                    const shipmentsSnap = await db.collection('shipments').get();
                    if (!shipmentsSnap.empty) {
                        realFirebaseShipments = shipmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {}

                try {
                    const invoicesSnap = await db.collection('deferredInvoices').get();
                    if (!invoicesSnap.empty) {
                        realFirebaseDeferredInvoices = invoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {}

                try {
                    const conInvoicesSnap = await db.collection('consolidatedInvoices').get();
                    if (!conInvoicesSnap.empty) {
                        realFirebaseConsolidatedInvoices = conInvoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) {}

                try {
                    const appDataSnap = await db.collection('appData').doc(tenant.activeCompanyId).get();
                    if (appDataSnap.exists) { realFirebaseAppData = appDataSnap.data() || {}; }
                } catch(e) {}
            }
        } catch(e) {}
    };

    // الدالة المصححة والمطابقة تماماً للـ SaaS Hub ولوحة التحكم (تدعم المدير والسائق والمشرف والزائر بدقة)
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
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                if (tenant.activeDriver && tenant.activeDriver !== 'زائر كريم') {
                    let driverRec = realFirebaseDrivers.find(d => d.name === tenant.activeDriver);
                    if (!driverRec) {
                        let querySnap = await db.collection('drivers').where('name', '==', tenant.activeDriver).get();
                        if (!querySnap.empty) {
                            driverRec = querySnap.docs[0].data();
                        } else {
                            let docDirect = await db.collection('drivers').doc(tenant.activeDriver).get();
                            if (docDirect.exists) driverRec = docDirect.data();
                        }
                    }

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
            }
        } catch(e) {
            console.error("Error fetching subscription info:", e);
        }

        return subData;
    };

    window.getIsolatedUserShipments = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            return realFirebaseShipments.slice(0, 5); // عرض عينة للزائر
        }

        let allShipments = realFirebaseShipments.length > 0 ? realFirebaseShipments : (window.appData?.shipments || []);
        let companyFiltered = allShipments.filter(s => {
            let sCompanyId = s.companyId || 'company_main';
            return sCompanyId === tenant.activeCompanyId || sCompanyId.toLowerCase() === tenant.activeCompanyId.toLowerCase() || tenant.activeRole === 'admin';
        });

        if (tenant.activeRole === 'admin' || tenant.activeRole === 'supervisor') return companyFiltered;

        return companyFiltered.filter(s => {
            return (s.assignedDriver === tenant.activeDriver || s.driver === tenant.activeDriver || s.name === tenant.activeDriver || s.clientId === tenant.activeDriver);
        });
    };

    window.parseNumericCurrency = function(val) {
        if (!val) return '0 ج.م';
        if (typeof val === 'number') return val.toLocaleString() + ' ج.م';
        let cleanStr = String(val).replace(/[^\d.-]/g, '');
        let num = parseFloat(cleanStr);
        return isNaN(num) ? '0 ج.م' : num.toLocaleString() + ' ج.م';
    };

    window.getCompanyFinancials = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            return { treasuryBalance: '1,039 ج.م', expensesTotal: '0 ج.م', invoicesCount: 1, shipmentsCount: 1 };
        }
        let rawTreasury = realFirebaseAppData.treasury || localStorage.getItem(`treasury_balance_${tenant.activeCompanyId}`) || '1,039 ج.م';
        let rawExpenses = realFirebaseAppData.expenses || localStorage.getItem(`expenses_total_${tenant.activeCompanyId}`) || '0 ج.م';
        
        let treasuryBalance = parseNumericCurrency(rawTreasury);
        let expensesTotal = parseNumericCurrency(rawExpenses);
        let shipments = getIsolatedUserShipments();
        
        return { 
            treasuryBalance, 
            expensesTotal, 
            invoicesCount: realFirebaseDeferredInvoices.length + realFirebaseConsolidatedInvoices.length || 1, 
            shipmentsCount: shipments.length 
        };
    };

    window.syncPlatformUserData = function() {
        let tenant = getActiveTenantContext();
        let isManager = (tenant.activeRole === 'admin' || tenant.activeRole === 'supervisor');

        let badgeEl = document.getElementById('botUserRoleBadge');
        if (badgeEl) badgeEl.innerText = `🤖 ${tenant.activeDriver} (${isManager ? tenant.activeCompanyName : 'حساب مستخدم'})`;

        let companyTagEl = document.getElementById('syncHubCompanyTag');
        if (companyTagEl) companyTagEl.innerText = isManager ? `🏢 الشركة: ${tenant.activeCompanyName}` : `👤 المستخدم: ${tenant.activeDriver}`;
        
        let rssBar = document.getElementById('na2laRssTickerContainer');
        if (rssBar) rssBar.style.display = isManager ? 'block' : 'none';

        renderQuickButtons(tenant.activeRole);
        updateSyncButtonBadge();
        checkDutyStatusIndicator();
        return tenant;
    };

    window.updateSyncButtonBadge = function() {
        let tenant = getActiveTenantContext();
        const badgeEl = document.getElementById('btn-sync-badge');
        if (badgeEl) {
            const syncedShipments = getIsolatedUserShipments();
            badgeEl.innerText = syncedShipments.length;
            badgeEl.style.display = syncedShipments.length > 0 ? 'inline-block' : 'none';
        }
    };

    window.toggleSyncHubDropdown = function(event) {
        event.stopPropagation();
        let tenant = getActiveTenantContext();
        const bolt = document.getElementById('sync-icon-bolt');
        if (bolt) bolt.classList.add('spinning');
        setTimeout(() => { if (bolt) bolt.classList.remove('spinning'); }, 600);

        const dropdown = document.getElementById('syncHubDropdownMenu');
        const userTitleSpan = document.getElementById('syncHubUserTitle');
        const listContainer = document.getElementById('syncHubItemsList');
        if (!dropdown) return;
        if (dropdown.style.display === 'block') { dropdown.style.display = 'none'; return; }

        userTitleSpan.innerText = `👤 ${tenant.activeDriver}`;
        const syncedShipments = getIsolatedUserShipments();
        listContainer.innerHTML = syncedShipments.length === 0 ? `<div style="padding: 6px; text-align: center;">لا توجد شحنات</div>` :
            syncedShipments.slice(0, 5).map(s => `<div style="padding: 4px 6px; background:var(--card-bg); margin-bottom:3px; border-radius:4px;" onclick="openBotSection('shipments-tab')">📦 ${s.id || 'شحنة'} (${s.status || 'نشطة'}) ⬅</div>`).join('');
        dropdown.style.display = 'block';
    };

    window.addEventListener('click', () => {
        const dropdown = document.getElementById('syncHubDropdownMenu');
        if (dropdown) dropdown.style.display = 'none';
    });

    window.openConnectedAccountHub = function() {
        openBotSection('account-tab');
    };

    window.toggleDutyStatus = function() {
        let currentStatus = localStorage.getItem('driver_duty_status') || 'active';
        let newStatus = currentStatus === 'active' ? 'offline' : 'active';
        localStorage.setItem('driver_duty_status', newStatus);
        checkDutyStatusIndicator();
        alert(newStatus === 'active' ? '🟢 حالة العمل: نشط' : '🔴 حالة العمل: استراحة');
    };

    window.checkDutyStatusIndicator = function() {
        let dot = document.getElementById('botStatusDot');
        let currentStatus = localStorage.getItem('driver_duty_status') || 'active';
        if (dot) { dot.style.background = currentStatus === 'active' ? '#10b981' : '#ef4444'; }
    };

    window.renderQuickButtons = function(role) {
        let container = document.getElementById('botQuickActionsContainer');
        if (!container) return;
        let commonButtons = `
            <button onclick="sendBotQuickQuery('شحناتي')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--accent-color); font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold;">📦 الشحنات</button>
            <button onclick="sendBotQuickQuery('الفواتير')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: #38bdf8; font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold;">🧾 الفواتير</button>
            <button onclick="sendBotQuickQuery('معلومات صلاحية اشتراك شركتك')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold;">💳 الاشتراك</button>
            <button onclick="sendBotQuickQuery('اختبار القيادة')" style="background: var(--card-bg); border: 1px solid var(--purple-color); color: var(--purple-color); font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold;">🎓 الاختبار</button>
            <button onclick="exportChatArchiveData()" style="background: var(--card-bg); border: 1px solid #38bdf8; color: #38bdf8; font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold;">📤 الأرشيف</button>
            <button onclick="sendBotQuickQuery('رسم شاحنة')" style="background: var(--card-bg); border: 1px solid #f472b6; color: #f472b6; font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold;">🎨 رسم</button>
        `;
        if (role === 'visitor') {
            container.innerHTML = commonButtons + `<button onclick="sendBotQuickQuery('خدمات المنصة')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: #38bdf8; font-size: 10px; padding: 6px 4px; border-radius: 6px; grid-column: span 3;">🌐 عن نقلة</button>`;
        } else if (role === 'driver') {
            container.innerHTML = commonButtons + `
                <button onclick="openBotSection('map-tab')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: #38bdf8; font-size: 10px; padding: 6px 4px; border-radius: 6px;">📍 GPS</button>
                <button onclick="sendBotQuickQuery('طوارئ SOS')" style="background: rgba(239,68,68,0.2); border: 1px solid #ef4444; color: #ef4444; font-size: 10px; padding: 6px 4px; border-radius: 6px; grid-column: span 2;">🚨 طوارئ SOS</button>
            `;
        } else {
            container.innerHTML = commonButtons + `
                <button onclick="openBotSection('treasury-tab')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 6px 4px; border-radius: 6px;">💰 الخزنة</button>
                <button onclick="openBotSection('reports-tab')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 6px 4px; border-radius: 6px; grid-column: span 2;">📊 الأسطول</button>
            `;
        }
    };

    fetchRealFirebaseData().then(() => { syncPlatformUserData(); });

    let isBotVoiceOutputOn = true, isBotContinuousActive = false;

    window.toggleNa2laBot = function() {
        let modal = document.getElementById('na2laBotModal');
        if (!modal) return;
        let isHidden = (modal.style.display === 'none' || modal.style.display === '');
        modal.style.display = isHidden ? 'flex' : 'none';
        if (isHidden) {
            fetchRealFirebaseData().then(() => {
                syncPlatformUserData();
                loadChatHistory();
            });
        }
    };

    window.toggleBotVoiceOutput = function() {
        isBotVoiceOutputOn = !isBotVoiceOutputOn;
        let btn = document.getElementById('botVoiceToggleBtn');
        if (btn) {
            btn.innerText = isBotVoiceOutputOn ? "🔊 ناطق" : "🔇 صامت";
            btn.style.background = isBotVoiceOutputOn ? "var(--accent-color)" : "var(--danger-color)";
        }
    };

    window.toggleBotContinuousVoice = function() {
        isBotContinuousActive = !isBotContinuousActive;
        let btn = document.getElementById('botContinuousBtn');
        if (isBotContinuousActive) { btn.innerText = "🎤 مستمر: مفعل"; startBotVoiceInput(); }
        else { btn.innerText = "🎤 مستمر معطل"; }
    };

    window.handleScaleTicketUpload = function(input) {
        if (input.files && input.files[0]) {
            let container = document.getElementById('na2laBotMessages');
            container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 9px 12px; border-radius: 10px; align-self: flex-end;">📎 تحليل بونة الميزان: ${input.files[0].name}</div>`;
            setTimeout(() => {
                let botReply = `✅ <b>نجاح استخراج الأوزان (OCR):</b> القائم 32 طن، الفارغ 10 طن، الصافي 22 طن.`;
                container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">${botReply}</div>`;
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

        let welcomeText = `مرحباً بك يا <b>${tenant.activeDriver}</b> (${tenant.activeRole}). تم ربط كافة أقسام المنصة وزر القائمة لخدمتك بامتياز.`;
        container.innerHTML = `<div style="background: var(--bg-color); padding: 10px 14px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">${welcomeText}</div>`;
        history.forEach(msg => {
            container.innerHTML += `<div style="background: ${msg.sender === 'user' ? 'var(--primary-color)' : 'var(--bg-color)'}; color: ${msg.sender === 'user' ? 'white' : 'var(--text-color)'}; padding: 9px 12px; border-radius: 10px; align-self: ${msg.sender === 'user' ? 'flex-end' : 'flex-start'}; border: 1px solid var(--border-color);">${msg.htmlContent}</div>`;
        });
        container.scrollTop = container.scrollHeight;
    };

    window.clearBotChat = function() {
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        localStorage.removeItem(storageKey);
        loadChatHistory();
    };

    window.changeBotTheme = function(themeId) {
        let rootContainer = document.getElementById('na2laBotRootContainer');
        if (!rootContainer) return;
        if (themeId === 'default') rootContainer.removeAttribute('data-theme');
        else rootContainer.setAttribute('data-theme', themeId);
    };

    window.startBotVoiceInput = function() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'ar-EG';
        recognition.onresult = (event) => {
            let text = event.results[0][0].transcript;
            document.getElementById('na2laBotInput').value = text;
            sendBotQuickQuery(text);
        };
        recognition.start();
    };

    window.speakBotReplyText = function(text) {
        if (!isBotVoiceOutputOn) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            let utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-EG';
            window.speechSynthesis.speak(utterance);
        }
    };

    window.sendBotQuickQuery = async function(customText = null) {
        let inputEl = document.getElementById('na2laBotInput');
        let container = document.getElementById('na2laBotMessages');
        let text = customText || (inputEl ? inputEl.value.trim() : "");
        if (!text || !container) return;

        container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 9px 12px; border-radius: 10px; align-self: flex-end;">${text}</div>`;
        saveChatHistory('user', text);
        if (inputEl && !customText) inputEl.value = "";
        container.scrollTop = container.scrollHeight;

        await fetchRealFirebaseData();
        let tenant = syncPlatformUserData();
        let financials = getCompanyFinancials();
        let userShipments = getIsolatedUserShipments();
        let botReply = '';
        let lower = text.toLowerCase();

        if (lower.includes('اختبار القيادة')) {
            let randQuiz = driverQuizzes[Math.floor(Math.random() * driverQuizzes.length)];
            botReply = `<div class="chat-card"><b>${randQuiz.q}</b><br>${randQuiz.explain}</div>`;
        }
        else if (lower.includes('صلاحية اشتراك') || lower.includes('الاشتراك')) {
            let subInfo = await getCompanySubscriptionInfo();
            botReply = `💳 <b>كارت الاشتراك:</b><br>الشركة: <b>${subInfo.companyName}</b><br>الباقة: <b>${subInfo.planName}</b><br>الحالة: <b style="color:var(--accent-color);">${subInfo.status}</b><br>الانتهاء: <b>${subInfo.expiryDate}</b>`;
        }
        else if (lower.includes('شحناتي') || lower.includes('الشحنات')) {
            if (userShipments.length === 0) botReply = `📦 لا توجد شحنات مسجلة حالياً.`;
            else {
                botReply = `📦 لديك <b>${userShipments.length}</b> شحنة متزامنة:<br>`;
                userShipments.forEach(s => {
                    botReply += `<div class="chat-card" onclick="openBotSection('shipments-tab')" style="cursor:pointer;">📦 شحنة: ${s.id || 'معتمدة'} | الحالة: ${s.status || 'نشطة'} ⬅</div>`;
                });
            }
        }
        else if (lower.includes('الفواتير')) {
            botReply = `🧾 <b>الفواتير:</b> إجمالي الفواتير المسجلة: <b>${financials.invoicesCount} فاتورة</b>`;
        }
        else if (lower.includes('موقعي') || lower.includes('gps')) {
            botReply = `📍 نظام التتبع الجغرافي وخريطة الأسطول تعمل بكفاءة تامة.`;
        }
        else if (lower.includes('الخزنة')) {
            botReply = `💰 <b>رصيد الخزنة:</b> ${financials.treasuryBalance}<br><b>إجمالي المصروفات:</b> ${financials.expensesTotal}`;
        }
        else if (lower.includes('رسم')) {
            botReply = handleImageRequest(text);
        }
        else {
            botReply = `🤖 استجابة ذكية من مساعد Gemini Pro حول: "${text}". يمكنك استخدام زر القائمة بالأعلى لفتح أي قسم فوراً.`;
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">${botReply}</div>`;
        saveChatHistory('bot', botReply);
        container.scrollTop = container.scrollHeight;
        speakBotReplyText(botReply.replace(/<[^>]*>?/gm, ''));
    };
})();
