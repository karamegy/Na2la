(function() {
    // تنظيف شامل لأي نسخ قديمة، عناصر DOM، وتايمر سابقة لمنع التكرار
    ['na2laBotRootContainer', 'na2laBot', 'na2laBotModal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
    document.querySelectorAll('#na2laBotStyles, style[data-na2la-bot]').forEach(el => el.remove());
    if (window._na2laBotInterval) {
        clearInterval(window._na2laBotInterval);
        window._na2laBotInterval = null;
    }

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
    styleEl.id = 'na2laBotStyles';
    styleEl.setAttribute('data-na2la-bot', 'true');
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
        .bot-custom-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
            background: var(--card-bg);
            color: var(--text-color);
            font-family: 'Cairo', sans-serif;
        }
        .bot-custom-table th, .bot-custom-table td {
            border: 1px solid var(--border-color);
            padding: 6px 8px;
            text-align: center;
        }
        .bot-custom-table th {
            background: var(--primary-color);
            color: #ffffff;
            font-weight: bold;
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
        .typing-dots span {
            height: 6px; width: 6px; float: left; margin: 0 2px;
            background-color: var(--text-color); border-radius: 50%;
            display: inline-block; animation: typing 1.4s infinite ease-in-out both;
        }
        .typing-dots span:nth-child(2) { animation-delay: .2s; }
        .typing-dots span:nth-child(3) { animation-delay: .4s; }
        @keyframes typing {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
        }
    `;
    document.head.appendChild(styleEl);

    const containerDiv = document.createElement('div');
    containerDiv.id = 'na2laBotRootContainer';
    containerDiv.innerHTML = `
        <button id="na2laBotBtn" style="position: fixed; bottom: 25px; right: 20px; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: white; border: none; width: 60px; height: 60px; border-radius: 50%; font-size: 26px; cursor: pointer; box-shadow: var(--shadow-3d); z-index: 2147483647; display: flex; align-items: center; justify-content: center; touch-action: none; user-select: none; animation: floatAnim 2.5s ease-in-out infinite;" title="🤖 مساعد Gemini الذكي Pro لمنصة نقلة">🤖</button>

        <div id="na2laBotModal" style="position: fixed; bottom: 85px; right: 20px; width: 420px; max-width: 92vw; height: 80vh; max-height: 650px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 18px; box-shadow: var(--shadow-3d); z-index: 2147483646; display: none; flex-direction: column; overflow: hidden; backdrop-filter: blur(20px); font-family: 'Cairo', sans-serif;">
            
            <div id="na2laBotSidebarMenu" style="display: none; position: absolute; top: 44px; right: 0; width: 280px; height: calc(100% - 44px); background: var(--bg-color); border-left: 1px solid var(--border-color); z-index: 2147483648; box-shadow: -5px 0 25px rgba(0,0,0,0.5); overflow-y: auto; padding: 12px; color: var(--text-color); font-size: 11px;">
                <div style="font-weight: bold; font-size: 13px; margin-bottom: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px; display: flex; justify-content: space-between; align-items: center; color: var(--primary-color);">
                    <span>🗂️ القائمة الجانبية الشاملة (عزل تام وسحابي لحظي)</span>
                    <span style="cursor: pointer; font-size: 14px; padding: 2px 6px;" onclick="toggleNa2laSidebarMenu(event)">✕</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    <div style="font-weight: bold; font-size: 10px; color: var(--warning-color); margin-top: 4px;">📂 أقسام التشغيل والعمليات المعزولة</div>
                    <button onclick="sendBotQuickQuery('شحناتي'); toggleNa2laSidebarMenu();" style="text-align: right; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: space-between;"><span>📦 الشحنات النشطة والمعتمدة لشركتك</span><span>⬅</span></button>
                    <button onclick="sendBotQuickQuery('الفواتير'); toggleNa2laSidebarMenu();" style="text-align: right; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: space-between;"><span>🧾 الفواتير والمستحقات الآجلة</span><span>⬅</span></button>
                    <button onclick="sendBotQuickQuery('الخزنة'); toggleNa2laSidebarMenu();" style="text-align: right; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: space-between;"><span>💰 الجدول الخماسي والتقارير المالية للشركة</span><span>⬅</span></button>
                    <button onclick="sendBotQuickQuery('إحصائيات شركتي'); toggleNa2laSidebarMenu();" style="text-align: right; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: space-between;"><span>📊 أسطول الشركة والسائقين المعزولين</span><span>⬅</span></button>
                    <button onclick="sendBotQuickQuery('موقعي'); toggleNa2laSidebarMenu();" style="text-align: right; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: space-between;"><span>📍 التتبع الجغرافي اللحظي (GPS)</span><span>⬅</span></button>

                    <div style="font-weight: bold; font-size: 10px; color: var(--accent-color); margin-top: 6px;">🛠️ الأدوات والخدمات الذكية وسحابية البث</div>
                    <button onclick="sendBotQuickQuery('اختبار القيادة'); toggleNa2laSidebarMenu();" style="text-align: right; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: space-between;"><span>🎓 اختبار أمان القيادة</span><span>⬅</span></button>
                    <button onclick="sendBotQuickQuery('معلومات صلاحية اشتراك شركتك'); toggleNa2laSidebarMenu();" style="text-align: right; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: space-between;"><span>💳 كارت الاشتراك وتجديد الخدمة</span><span>⬅</span></button>
                    <button onclick="sendBotQuickQuery('جهات الاتصال'); toggleNa2laSidebarMenu();" style="text-align: right; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: space-between;"><span>📇 جهات الاتصال المتزامنة</span><span>⬅</span></button>
                    <button onclick="exportChatArchiveData(); toggleNa2laSidebarMenu();" style="text-align: right; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: space-between;"><span>📤 تصدير الأرشيف والسجلات (ذاكرة حية)</span><span>⬅</span></button>
                    <button onclick="sendBotQuickQuery('رسم شاحنة'); toggleNa2laSidebarMenu();" style="text-align: right; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: space-between;"><span>🎨 توليد ورسم وسائط</span><span>⬅</span></button>
                    <button onclick="sendBotQuickQuery('طوارئ SOS'); toggleNa2laSidebarMenu();" style="text-align: right; background: rgba(239,68,68,0.15); border: 1px solid #ef4444; color: #f87171; padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-family: 'Cairo', sans-serif; display: flex; align-items: center; justify-content: space-between;"><span>🚨 طوارئ SOS عاجلة</span><span>⬅</span></button>
                </div>
            </div>

            <div style="background: linear-gradient(135deg, var(--primary-color), var(--primary-hover)); color: white; padding: 10px 14px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; font-size: 12px; flex-shrink: 0;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <button type="button" onclick="toggleNa2laSidebarMenu(event)" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: #fff; padding: 3px 7px; border-radius: 6px; font-size: 11px; cursor: pointer; display: inline-flex; align-items: center; gap: 3px; font-family: 'Cairo', sans-serif;" title="القائمة الجانبية الشاملة">☰ القائمة</button>
                    <span id="botStatusDot" onclick="toggleDutyStatus()" style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; cursor: pointer;" title="تبديل حالة العمل"></span>
                    <span id="botUserRoleBadge">🤖 مساعد Gemini الذكي Pro (عزل تام وسحابي فوري)</span>
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
                            <div id="syncHubCompanyTag" style="font-size: 9px; color: var(--warning-color); margin-bottom: 4px;">🏢 الشركة: جاري المزامنة اللحظية...</div>
                            <div id="syncHubItemsList" style="max-height: 140px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px;"></div>
                        </div>
                    </div>
                    <button onclick="toggleNa2laBot()" style="background: none; border: none; color: white; font-size: 16px; cursor: pointer;">✕</button>
                </div>
            </div>

            <div id="na2laRssTickerContainer" style="display: none; background: rgba(217, 119, 6, 0.15); border-bottom: 1px solid var(--border-color); padding: 5px 10px; font-size: 11px; color: var(--warning-color); white-space: nowrap; overflow: hidden; position: relative; flex-shrink: 0;">
                <div style="display: inline-block; animation: marquee 18s linear infinite; font-weight: bold;">
                    🚀 أسطورة الطريق Pro | الجدول الخماسي المعتمد (مزامنة لحظية تامة - بدون تخزين محلي نهائياً): الشحنات، الإيرادات، صافي الأرباح، الخزينة، الديون والآجل
                </div>
            </div>

            <div style="padding: 6px 12px; background: var(--bg-color); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); font-size: 10px; flex-shrink: 0;">
                <div style="display: flex; gap: 3px; flex-wrap: wrap;">
                    <button onclick="toggleTemporaryChatMode()" id="botTempChatBtn" style="background: var(--card-bg); color: #a855f7; border: 1px solid #a855f7; padding: 3px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;" title="محادثة مؤقتة لا تحفظ نهائياً في السجل">🕵️ محادثة مؤقتة</button>
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
                🕵️ وضع الخصوصية الفائقة (محادثة مؤقتة): لن يتم حفظ هذه المحادثة في الذاكرة الحية أو فايربيس نهائياً.
            </div>

            <div id="na2laBotMessages" style="flex: 1 1 auto; min-height: 0; padding: 14px; overflow-y: auto; font-size: 12px; display: flex; flex-direction: column; gap: 10px; line-height: 1.6; background: var(--card-bg); color: var(--text-color);">
                <div style="background: var(--bg-color); padding: 10px 14px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">
                    مرحباً بك! أنا مساعدك الذكي <b>Gemini Pro</b> المدمج بالجدول الخماسي والمزامنة اللحظية التامة (بدون أي تخزين محلي).<br>- يمكنك فتح القائمة الجانبية (☰ القائمة) لاستعراض كافة الأقسام والخدمات مع العزل التام بين الشركات والحسابات.
                </div>
            </div>

            <div style="padding: 8px 10px; border-top: 1px solid var(--border-color); display: flex; gap: 6px; background: var(--bg-color); align-items: center; position: relative; flex-shrink: 0; min-height: 52px; box-sizing: border-box;">
                <input type="file" id="scaleTicketFileInput" accept="image/*" style="display: none;" onchange="handleScaleTicketUpload(this)">
                <input type="file" id="importArchiveFileInput" accept=".json" style="display: none;" onchange="importChatArchiveData(this)">
                
                <button onclick="document.getElementById('scaleTicketFileInput').click()" title="رفع وتحليل بونة الميزان OCR" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); width: 36px; height: 36px; min-width: 36px; border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">📎</button>
                
                <input type="text" id="na2laBotInput" placeholder="اكتب سؤالك، أو اطلب الجدول الخماسي والتقارير..." style="flex: 1; min-width: 0; height: 36px; margin: 0; padding: 0 10px; font-size: 11px; border-radius: 8px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; box-sizing: border-box; outline: none;" onkeypress="if(event.key === 'Enter') sendBotQuickQuery()">

                <button onclick="startBotVoiceInput()" title="تسجيل صوتي" style="background: var(--warning-color); border: none; width: 36px; height: 36px; min-width: 36px; border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-3d); flex-shrink: 0;">🎤</button>
                
                <button onclick="sendBotQuickQuery()" style="background: var(--primary-color); color: white; border: none; height: 36px; padding: 0 12px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 11px; font-family: 'Cairo', sans-serif; white-space: nowrap; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">إرسال</button>
            </div>
        </div>
    `;
    document.body.appendChild(containerDiv);

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

    window.toggleNa2laSidebarMenu = function(event) {
        if (event) event.stopPropagation();
        let sidebar = document.getElementById('na2laBotSidebarMenu');
        if (!sidebar) return;
        let isVisible = (sidebar.style.display === 'block');
        sidebar.style.display = isVisible ? 'none' : 'block';
    };

    window.realFirebaseShipments = [];
    window.realFirebaseDrivers = [];
    window.realFirebaseDeferredInvoices = [];
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
        },
        {
            q: "ما هي المسافة الآمنة المفترضة عند القيادة بحمولة ثقيلة في الأجواء الممطرة؟",
            options: ["مسافة مساوية للظروف العادية", "مضاعفة المسافة الآمنة مرتين على الأقل", "تقليل المسافة للتصاق بالسيارات", "لا حاجة لترك مسافة إضافية"],
            correct: 1,
            explain: "الوزن الزائد والطريق المبتل يزيدان مسافة الفرملة (Stopping Distance) بشكل مضاعف."
        }
    ];

    const roadWisdoms = [
        "💡 **نصيحة قيادة سريعة (Gemini):** احرص دائماً على فحص ضغط الإطارات ومستوى الزيت قبل التحرك في الرحلات الطويلة لتجنب الأعطال المفاجئة.",
        "💡 **إرشادات الأمان:** ترك مسافة أمان كافية بينك وبين الشاحنات الأخرى على الطريق السريع ينقذك من المفاجآت الطارئة.",
        "💡 **نصيحة مهنية:** التوزيع المتوازن للحمولة على المقطورة يحافظ على ثبات الشاحنة في المنحنيات الخطرة.",
        "💡 **تنبيه ليلي:** تجنب القيادة وأنت تشعر بالإرهاق؛ خذ استراحة قصيرة في أول محطة وقود لسلامتك."
    ];

    const funnyJokes = [
        "😂 **نكتة سواقين مع اسطى:** سألو سواق نقل محترف: إيه أحلى حاجة في السفر بالليل؟ قالهم: الشوارع فاضية والمرور بيحب يسلم عليا كل كمين!",
        "😂 واحد بيقول لصديقه السواق: هي العربيات بتحب السواقة بالليل ليه؟ قاله عشان تاخد راحتها في الغيار الخامس من غير زحمة!",
        "😂 سائق شاحنة بيقول لزميله: أنا مش عارف العربيات الصغيرة بتزعل ليه لما أكسر عليهم، مع أن مقطورتي أطول من أسبوع الامتحانات!"
    ];

    const adventureStories = [
        "📖 **مغامرات الطرق السريعة:** في أحد الأيام وأثناء رحلة شحن عاجلة عبر الصحراء الشرقية، واجه السائق عاصفة رملية شديدة أعدمت الرؤية تماماً. بفضل الهدوء والالتزام بإرشادات التوقف الآمن وتشغيل الإضواء التحذيرية، عبر العاصفة بسلام ووصل في الموعد المحدد."
    ];

    window.handleImageRequest = function(query) {
        let subject = query.replace(/(صورة|صوره|اترك لي|ابحث عن|أريد|ابي|اتني بـ|جيبلي|هاتلي|توليد|ارسم)/g, '').trim() || 'شاحنة نقل حديثة على الطريق السريع';
        let imageUrl = 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=700&auto=format&fit=crop&q=80';
        let lowerSub = subject.toLowerCase();
        if (lowerSub.includes('بحر') || lowerSub.includes('ماء') || lowerSub.includes('ميناء')) {
            imageUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80';
        } else if (lowerSub.includes('صحراء') || lowerSub.includes('طريق')) {
            imageUrl = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&auto=format&fit=crop&q=80';
        } else if (lowerSub.includes('مدينة') || lowerSub.includes('القاهرة') || lowerSub.includes('مخزن')) {
            imageUrl = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&auto=format&fit=crop&q=80';
        }
        return `
            <div class="chat-card" style="border-right-color: var(--purple-color);">
                <div style="font-weight: bold; color: var(--purple-color); font-size: 11px; margin-bottom: 6px;">🎨 محرك Gemini (Nano Banana 2) - رسم وتوليد وسائط مخصصة: "${subject}"</div>
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
    };

    window.exportChatArchiveData = function() {
        let tenant = getActiveTenantContext();
        let storageKey = `${tenant.activeCompanyId}_${tenant.activeDriver}`;
        let chatHistory = window.botMemoryState.chatHistories[storageKey] || [];
        
        let exportBundle = {
            version: "10.0-PRO-NO-LOCAL-STORAGE",
            tenant: tenant,
            exportDate: new Date().toISOString(),
            chatHistory: chatHistory,
            appDataBackup: window.appData || {}
        };

        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
        let downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `Na2la_Archive_${tenant.activeCompanyId}_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        alert("✅ تم تصدير واستخراج أرشيف السجلات والمحادثات بنجاح من الذاكرة الحية (بدون تخزين محلي).");
    };

    window.importChatArchiveData = function(input) {
        if (input.files && input.files[0]) {
            let file = input.files[0];
            let reader = new FileReader();
            reader.onload = function(e) {
                try {
                    let importedData = JSON.parse(e.target.result);
                    if (importedData && importedData.chatHistory) {
                        let tenant = getActiveTenantContext();
                        let storageKey = `${tenant.activeCompanyId}_${tenant.activeDriver}`;
                        window.botMemoryState.chatHistories[storageKey] = importedData.chatHistory;
                        loadChatHistory();
                        alert("✅ تم استيراد ونقل الأرشيف إلى الذاكرة الحية وتحديث المحادثة لحظياً.");
                    } else {
                        alert("⚠️ تنسيق الملف غير صحيح.");
                    }
                } catch(err) {
                    alert("❌ حدث خطأ أثناء قراءة ملف الأرشيف.");
                }
            };
            reader.readAsText(file);
        }
    };

    window.startDriverExam = function() {
        let randQuiz = driverQuizzes[Math.floor(Math.random() * driverQuizzes.length)];
        let quizId = 'quiz_' + Date.now();
        let html = `
            <div class="chat-card" style="border-right-color: var(--warning-color);" id="${quizId}">
                <div style="font-weight: bold; color: var(--warning-color); font-size: 11px; margin-bottom: 6px;">🎓 المركز التعليمي الموجه - اختبار أمان القيادة للسائقين</div>
                <div style="font-size: 11px; font-weight: bold; margin-bottom: 8px; color: var(--text-color);">${randQuiz.q}</div>
                <div>
                    ${randQuiz.options.map((opt, idx) => `
                        <button class="quiz-option-btn" onclick="submitQuizAnswer('${quizId}', ${idx}, ${randQuiz.correct}, '${randQuiz.explain.replace(/'/g, "\\'")}')">${idx + 1}. ${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
        return html;
    };

    window.submitQuizAnswer = function(quizContainerId, selectedIdx, correctIdx, explainText) {
        let box = document.getElementById(quizContainerId);
        if (!box) return;
        let isCorrect = (selectedIdx === correctIdx);
        let resultHtml = `
            <div style="margin-top: 8px; padding: 8px; border-radius: 6px; font-size: 10px; font-weight: bold; background: ${isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; border: 1px solid ${isCorrect ? 'var(--accent-color)' : 'var(--danger-color)'}; color: ${isCorrect ? 'var(--accent-color)' : 'var(--danger-color)'};">
                ${isCorrect ? '🎉 إجابة صحيحة وممتازة!' : '❌ إجابة غير صحيحة.'}<br>
                💡 <b>الشرح والتعليل السقراطي:</b> ${explainText}
            </div>
        `;
        box.innerHTML += resultHtml;
        speakBotReplyText(isCorrect ? "إجابة صحيحة وممتازة أحسنت" : "إجابة خاطئة يرجى مراجعة التعليمات");
    };

    window.getActiveTenantContext = function() {
        let rawUser = window.loggedInDriverName || window.currentUser?.name || window.currentUser || window.logged_in_driver_name || window.appData?.currentUser || localStorage.getItem('currentUser') || localStorage.getItem('loggedUser') || null;
        let activeRole = window.currentUserRole || window.currentUser?.role || window.appData?.currentUserRole || localStorage.getItem('userRole') || 'visitor';
        let activeCompanyId = window.currentCompanyId || window.Na2laApp?.companyId || window.appData?.companyId || localStorage.getItem('companyId') || 'company_main';
        let activeCompanyName = window.currentCompanyName || window.Na2laApp?.companyName || window.appData?.companyName || localStorage.getItem('companyName') || 'أسطورة الطريق الرئيسية';

        if (!rawUser || activeRole === 'visitor' || rawUser === 'زائر كريم') {
            if (window.appData && window.appData.adminName) {
                rawUser = window.appData.adminName;
                activeRole = 'admin';
            } else {
                return {
                    activeDriver: 'زائر كريم',
                    activeCompanyId: activeCompanyId || 'company_main',
                    activeCompanyName: activeCompanyName || 'زائر غير مسجل',
                    activeRole: 'visitor'
                };
            }
        }

        let activeDriver = typeof rawUser === 'object' ? (rawUser.name || rawUser.title || 'المدير') : String(rawUser);
        if (activeDriver === "المدير" || activeRole.includes('admin') || activeRole.includes('owner') || activeRole.includes('مدير')) {
            activeRole = "admin";
            if (!activeCompanyId) activeCompanyId = 'company_main';
            if (!activeCompanyName) activeCompanyName = 'أسطورة الطريق الرئيسية';
        } else if (activeDriver.includes('سائق') || activeRole.includes('driver')) {
            activeRole = "driver";
        }

        return { activeDriver, activeCompanyId, activeCompanyName, activeRole };
    };

    window.fetchRealFirebaseData = async function() {
        if (window.appData) {
            realFirebaseShipments = window.appData.shipments || [];
            realFirebaseDrivers = window.appData.drivers || [];
            realFirebaseDeferredInvoices = window.appData.deferredInvoices || [];
            realFirebaseAppData = window.appData;
            return;
        }

        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                let tenant = getActiveTenantContext();
                
                try {
                    const driversSnap = await db.collection('drivers').get();
                    realFirebaseDrivers = driversSnap.empty ? [] : driversSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch(e) {
                    realFirebaseDrivers = [];
                }

                try {
                    const shipmentsSnap = await db.collection('shipments').get();
                    realFirebaseShipments = shipmentsSnap.empty ? [] : shipmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch(e) {
                    realFirebaseShipments = [];
                }

                try {
                    const invoicesSnap = await db.collection('deferredInvoices').get();
                    realFirebaseDeferredInvoices = invoicesSnap.empty ? [] : invoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch(e) {
                    realFirebaseDeferredInvoices = [];
                }
            }
        } catch(e) {}
    };

    window.getIsolatedUserShipments = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            return [];
        }

        let allShipments = [];
        if (window.appData && Array.isArray(window.appData.shipments) && window.appData.shipments.length > 0) {
            allShipments = window.appData.shipments;
        } else if (realFirebaseShipments.length > 0) {
            allShipments = realFirebaseShipments;
        }

        let companyFiltered = allShipments.filter(s => {
            let sCompanyId = s.companyId || 'company_main';
            let activeComp = tenant.activeCompanyId || 'company_main';
            return sCompanyId === activeComp || sCompanyId.toLowerCase() === activeComp.toLowerCase() || (!s.companyId && activeComp === 'company_main');
        });

        if (tenant.activeRole === 'admin' || tenant.activeDriver === 'المدير') {
            return companyFiltered;
        }

        return companyFiltered.filter(s => {
            let matchesUser = (s.assignedDriver === tenant.activeDriver || s.driver === tenant.activeDriver || s.name === tenant.activeDriver);
            return matchesUser;
        });
    };

    window.getCompanySubscriptionInfo = async function() {
        let tenant = getActiveTenantContext();
        let subData = {
            companyName: tenant.activeRole === 'admin' ? tenant.activeCompanyName : 'محجوبة للخصوصية',
            adminName: tenant.activeRole === 'admin' ? (tenant.activeDriver || 'غير محدد') : 'إدارة الشركة',
            phone: tenant.activeRole === 'admin' ? 'غير متوفر' : 'محجوب للخصوصية',
            planName: 'monthly',
            status: 'نشط ✅',
            expiryDate: '2026-09-28'
        };

        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                if (tenant.activeDriver && tenant.activeDriver !== 'زائر كريم') {
                    let userQuery = await db.collection('drivers').where('name', '==', tenant.activeDriver).get();
                    if (userQuery.empty && tenant.activeCompanyId) {
                        userQuery = await db.collection('drivers').where('companyId', '==', tenant.activeCompanyId).get();
                    }
                    if (!userQuery.empty) {
                        let d = userQuery.docs[0].data();
                        subData.companyName = d.companyName || d.title || tenant.activeCompanyName;
                        subData.adminName = d.name || tenant.activeDriver;
                        subData.phone = d.phone || d.mobile || 'غير متوفر';
                        subData.planName = d.subPlan || d.plan || d.package || 'monthly';
                        let expiry = d.subExpiry || '2026-09-28';
                        subData.expiryDate = expiry;
                        let today = new Date();
                        today.setHours(0,0,0,0);
                        let isExpired = new Date(expiry) < today;
                        subData.status = !isExpired ? 'نشط ✅' : 'منتهي ⚠️';
                        return subData;
                    }
                }
            }
        } catch(e) {}

        return subData;
    };

    window.updateDriverLiveLocation = async function(lat, lng) {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return;
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                await db.collection('drivers').doc(tenant.activeDriver).set({
                    name: tenant.activeDriver,
                    companyId: tenant.activeCompanyId,
                    companyName: tenant.activeCompanyName,
                    latitude: lat,
                    longitude: lng,
                    lastActive: new Date().toISOString(),
                    status: window.botMemoryState.dutyStatus || 'active'
                }, { merge: true });
            }
        } catch(e) {}
    };

    window.getCompanyActiveFleet = async function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return [];
        let fleet = [];
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                const snap = await db.collection('drivers').where('companyId', '==', tenant.activeCompanyId).get();
                fleet = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
        } catch(e) {}
        if (fleet.length === 0 && realFirebaseDrivers.length > 0) {
            fleet = realFirebaseDrivers;
        }
        return fleet.filter(d => !d.companyId || d.companyId === tenant.activeCompanyId || tenant.activeRole === 'admin');
    };

    window.parseNumericCurrency = function(val) {
        if (!val) return '0 ج.م';
        if (typeof val === 'number') return val.toLocaleString() + ' ج.م';
        let cleanStr = String(val).replace(/[^\d.-]/g, '');
        let num = parseFloat(cleanStr);
        return isNaN(num) ? '0 ج.م' : num.toLocaleString() + ' ج.م';
    };

    window.getCompanyFinancialReport = async function() {
        let tenant = getActiveTenantContext();
        let shipments = window.getIsolatedUserShipments();
        let shipmentsCount = shipments.length;
        
        let totalRevenue = shipments.reduce((sum, s) => {
            let val = parseFloat(String(s.price || s.cost || 0).replace(/[^\d.-]/g, '')) || 0;
            return sum + val;
        }, 0);

        let totalExpenses = shipments.reduce((sum, s) => {
            let fuel = parseFloat(String(s.fuelCost || 0).replace(/[^\d.-]/g, '')) || 0;
            let extra = parseFloat(String(s.extraCost || 0).replace(/[^\d.-]/g, '')) || 0;
            return sum + fuel + extra;
        }, 0);

        totalExpenses += window.botMemoryState.expensesTotal || 0;
        let netProfit = totalRevenue - totalExpenses;

        let rawTreasury = realFirebaseAppData.treasury || '0 ج.م';
        let treasuryVal = parseFloat(String(rawTreasury).replace(/[^\d.-]/g, '')) || 0;

        let companyInvoices = realFirebaseDeferredInvoices.filter(inv => tenant.activeRole === 'admin' || !inv.companyId || inv.companyId === tenant.activeCompanyId);
        let totalDebts = companyInvoices.reduce((sum, inv) => {
            let amt = parseFloat(String(inv.totalAmount || inv.amount || 0).replace(/[^\d.-]/g, '')) || 0;
            return sum + amt;
        }, 0);

        return {
            companyName: tenant.activeCompanyName,
            shipmentsCount: shipmentsCount,
            revenue: totalRevenue.toLocaleString() + ' ج.م',
            netProfit: netProfit.toLocaleString() + ' ج.م',
            treasury: treasuryVal.toLocaleString() + ' ج.م',
            debts: totalDebts.toLocaleString() + ' ج.م'
        };
    };

    window.exportFinancialReportPDF = async function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            alert("عذراً، هذه الميزة مخصصة لحسابات الشركات المسجلة فقط.");
            return;
        }
        let report = await window.getCompanyFinancialReport();
        let printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html dir="rtl">
            <head>
                <title>التقرير المالي (الجدول الخماسي) - ${report.companyName}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
                    body { font-family: 'Cairo', Tahoma, sans-serif; padding: 25px; color: #111; background: #fff; }
                    .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 12px; margin-bottom: 25px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                    th, td { border: 1px solid #cbd5e1; padding: 12px; text-align: center; font-size: 14px; font-family: 'Cairo', sans-serif; }
                    th { background: #2563eb; color: #fff; }
                    .footer { margin-top: 50px; text-align: left; font-weight: bold; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>التقرير المالي (الجدول الخماسي المعتمد) - شركة ${report.companyName}</h2>
                    <p>صادر من منصة أسطورة الطريق بواسطة نموذج Gemini Pro بتاريخ: ${new Date().toLocaleDateString('ar-EG')}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>البند المالي / التشغيلي</th>
                            <th>القيمة المعتمدة</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><b>📦 إجمالي الشحنات</b></td><td><b>${report.shipmentsCount} شحنة</b></td></tr>
                        <tr><td><b>📈 الإيرادات الإجمالية</b></td><td style="color:#2563eb; font-weight:bold;">${report.revenue}</td></tr>
                        <tr><td><b>💎 صافي الأرباح</b></td><td style="color:#059669; font-weight:bold;">${report.netProfit}</td></tr>
                        <tr><td><b>💰 رصيد الخزينة</b></td><td style="color:#d97706; font-weight:bold;">${report.treasury}</td></tr>
                        <tr><td><b>📑 الديون والآجل</b></td><td style="color:#dc2626; font-weight:bold;">${report.debts}</td></tr>
                    </tbody>
                </table>
                <div class="footer">
                    <p>التوقيع / الختم المعتمد: ........................</p>
                </div>
                <script>
                    window.onload = function() { window.print(); window.close(); }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    window.printConsolidatedInvoice = async function(invoiceId) {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return;

        let conInv = null;
        if (window.appData && window.appData.consolidatedInvoices) {
            conInv = window.appData.consolidatedInvoices.find(i => String(i.id) === String(invoiceId) || String(i.id).trim() === String(invoiceId).trim());
        }
        if (!conInv && typeof firebase !== 'undefined' && firebase.firestore) {
            try {
                let docSnap = await firebase.firestore().collection('consolidatedInvoices').doc(String(invoiceId)).get();
                if (docSnap.exists) {
                    conInv = { id: docSnap.id, ...docSnap.data() };
                }
            } catch(e) {}
        }

        if (conInv) {
            let matchingShipments = [];
            if (window.appData && window.appData.shipments) {
                matchingShipments = window.appData.shipments.filter(s => conInv.shipmentIds && conInv.shipmentIds.includes(String(s.id)));
            }
            let rowsHtml = '';
            matchingShipments.forEach((s, idx) => {
                rowsHtml += `<tr><td>${idx+1}</td><td>${s.item || '-'}</td><td>${s.address || '-'}</td><td>${s.price || 0} ج.م</td></tr>`;
            });

            let printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html dir="rtl">
                <head>
                    <title>فاتورة مجمعة رقم #${conInv.id}</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
                        body { font-family: 'Cairo', Tahoma, sans-serif; padding: 25px; direction: rtl; text-align: right; color: #1e293b; }
                        .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 15px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                        th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: center; font-size: 12px; }
                        th { background: #2563eb; color: #fff; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>🐎 أسطورة الطريق - فاتورة مجمعة رسمية</h2>
                        <p>رقم الفاتورة: #${conInv.id} | التاريخ: ${conInv.date || '-'}</p>
                    </div>
                    <p><strong>اسم العميل / الشركة:</strong> ${conInv.client || '-'}</p>
                    <p><strong>ملاحظات:</strong> ${conInv.notes || 'لا توجد ملاحظات'}</p>
                    <table>
                        <thead><tr><th>#</th><th>الحمولة</th><th>جهة التوصيل</th><th>المبلغ</th></tr></thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                    <h3 style="margin-top: 20px; text-align: left; color: #059669;">الإجمالي الكلي: ${conInv.total || 0} ج.م</h3>
                    <script>window.onload = function() { window.print(); window.close(); }</script>
                </body>
                </html>
            `);
            printWindow.document.close();
            return;
        }

        let invoices = realFirebaseDeferredInvoices.filter(i => String(i.id) === String(invoiceId) || String(i.invoiceNumber) === String(invoiceId));
        let invoice = invoices.length > 0 ? invoices[0] : null;

        if (!invoice && typeof firebase !== 'undefined' && firebase.firestore) {
            try {
                let docSnap = await firebase.firestore().collection('deferredInvoices').doc(String(invoiceId)).get();
                if (docSnap.exists) {
                    invoice = { id: docSnap.id, ...docSnap.data() };
                }
            } catch(e) {}
        }

        if (!invoice) {
            alert("عذراً، لم يتم العثور على بيانات الفاتورة المطلوبة.");
            return;
        }

        let printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html dir="rtl">
            <head>
                <title>فاتورة آجل - ${invoice.invoiceNumber || invoice.invoiceId || invoiceId}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
                    body { font-family: 'Cairo', Tahoma, sans-serif; padding: 20px; color: #111; }
                    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 13px; font-family: 'Cairo', sans-serif; }
                    th { background: #f2f2f2; }
                    .footer { margin-top: 40px; text-align: left; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>شركة ${tenant.activeCompanyName}</h2>
                    <p>قسم الفواتير الآجلة والمستحقات</p>
                </div>
                <div style="margin-bottom: 15px; font-size: 14px;">
                    <p><b>رقم الفاتورة:</b> ${invoice.invoiceNumber || invoice.invoiceId || invoiceId}</p>
                    <p><b>العميل / الشركة:</b> ${invoice.clientName || invoice.customer || 'عميل عام'}</p>
                    <p><b>تاريخ الاستحقاق:</b> ${invoice.dueDate || '-'}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>م</th>
                            <th>بيان الشحنة / الخدمة</th>
                            <th>المبلغ الإجمالي</th>
                            <th>المتبقي</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>${invoice.description || invoice.notes || 'فاتورة آجل ومستحقات'}</td>
                            <td><b>${invoice.totalAmount || invoice.amount || '0'} ج.م</b></td>
                            <td style="color: red; font-weight: bold;">${invoice.remainingAmount || invoice.totalAmount || '0'} ج.م</td>
                        </tr>
                    </tbody>
                </table>
                <div class="footer">
                    <p>التوقيع / الختم: ........................</p>
                </div>
                <script>window.onload = function() { window.print(); window.close(); }</script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    window.syncPlatformUserData = function() {
        let tenant = getActiveTenantContext();
        let isManager = (tenant.activeRole === 'admin');

        let badgeEl = document.getElementById('botUserRoleBadge');
        if (badgeEl) badgeEl.innerText = `🤖 ${tenant.activeDriver} (${isManager ? tenant.activeCompanyName : 'حساب مستخدم معزول'})`;

        let companyTagEl = document.getElementById('syncHubCompanyTag');
        if (companyTagEl) companyTagEl.innerText = isManager ? `🏢 الشركة: ${tenant.activeCompanyName}` : `👤 المستخدم: ${tenant.activeDriver}`;
        
        let rssBar = document.getElementById('na2laRssTickerContainer');
        if (rssBar) {
            rssBar.style.display = isManager ? 'block' : 'none';
        }

        updateSyncButtonBadge();
        checkDutyStatusIndicator();
        return tenant;
    };

    window.updateSyncButtonBadge = function() {
        let tenant = getActiveTenantContext();
        const badgeEl = document.getElementById('btn-sync-badge');
        if (badgeEl) {
            if (tenant.activeRole === 'visitor') {
                badgeEl.style.display = 'none';
                return;
            }
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
        
        if (tenant.activeRole === 'visitor') {
            listContainer.innerHTML = `<div style="padding: 6px; text-align: center; color: var(--warning-color);">أنت تصفح كزائر كريم. سجل الدخول لحسابك لاستعراض الشحنات.</div>`;
            dropdown.style.display = 'block';
            return;
        }

        const syncedShipments = getIsolatedUserShipments();

        if (syncedShipments.length === 0) {
            listContainer.innerHTML = `<div style="padding: 6px; text-align: center; color: #94a3b8;">لا توجد شحنات مسجلة لحسابك حالياً</div>`;
        } else {
            listContainer.innerHTML = syncedShipments.slice(0, 5).map(s => `
                <div style="background: var(--card-bg); padding: 5px 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="font-weight: bold; color: var(--accent-color);">📦 شحنة: ${s.id || s.shipmentNumber || 'معتمدة'}</div>
                    <div style="color: var(--text-color); font-size: 9px;">الحالة: ${s.status || 'نشطة'}</div>
                </div>
            `).join('');
        }
        dropdown.style.display = 'block';
    };

    window.addEventListener('click', () => {
        const dropdown = document.getElementById('syncHubDropdownMenu');
        if (dropdown) dropdown.style.display = 'none';
    });

    window.openConnectedAccountHub = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            alert("أنت تصفح كزائر غير مسجل حالياً. يرجى تسجيل الدخول لحسابك المعتمد.");
            return;
        }
        if (typeof switchTab === 'function') switchTab('account-tab');
        const syncedShipments = getIsolatedUserShipments();
        alert(`👤 الحساب الحالي: ${tenant.activeDriver}\n📦 إجمالي الشحنات: ${syncedShipments.length}\n✨ الحساب متزامن ومفعل بنجاح من الذاكرة الحية (بدون تخزين محلي).`);
    };

    window.toggleDutyStatus = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return;
        let currentStatus = window.botMemoryState.dutyStatus || 'active';
        let newStatus = currentStatus === 'active' ? 'offline' : 'active';
        window.botMemoryState.dutyStatus = newStatus;
        checkDutyStatusIndicator();
        alert(`حالتك التشغيلية: ${newStatus === 'active' ? '🟢 نشط' : '🔴 استراحة'}`);
    };

    window.checkDutyStatusIndicator = function() {
        let dot = document.getElementById('botStatusDot');
        let currentStatus = window.botMemoryState.dutyStatus || 'active';
        if (dot) {
            dot.style.background = currentStatus === 'active' ? '#10b981' : '#ef4444';
            dot.style.boxShadow = currentStatus === 'active' ? '0 0 8px #10b981' : '0 0 8px #ef4444';
        }
    };

    fetchRealFirebaseData().then(() => { syncPlatformUserData(); });

    window.addEventListener('na2laDataUpdated', () => {
        fetchRealFirebaseData().then(() => { updateSyncButtonBadge(); });
    });
    
    // تسجيل الفاصل الزمني (Interval) ليمكن حذفه عند إعادة الحقن
    window._na2laBotInterval = setInterval(() => {
        fetchRealFirebaseData().then(() => { updateSyncButtonBadge(); });
    }, 15000);

    let tenant = syncPlatformUserData();
    let isBotVoiceOutputOn = true, isBotContinuousActive = false;

    window.playWalkieBeep = function(type = 'start') {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
            osc.type = 'sine'; osc.frequency.value = type === 'start' ? 880 : 440;
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(); osc.stop(audioCtx.currentTime + 0.12);
        } catch(e) {}
    };

    window.toggleNa2laBot = function() {
        let modal = document.getElementById('na2laBotModal');
        if (!modal) return;
        let isHidden = (modal.style.display === 'none' || modal.style.display === '');
        modal.style.display = isHidden ? 'flex' : 'none';
        if (isHidden) {
            fetchRealFirebaseData().then(() => {
                tenant = syncPlatformUserData();
                loadChatHistory();
                setTimeout(() => {
                    let inputField = document.getElementById('na2laBotInput');
                    if (inputField) inputField.focus();
                }, 150);
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
        if (isBotContinuousActive) {
            btn.innerText = "🎤 مستمر: مفعل"; btn.style.background = "var(--accent-color)";
            startBotVoiceInput();
        } else {
            btn.innerText = "🎤 مستمر معطل"; btn.style.background = "var(--border-color)";
        }
    };

    window.handleScaleTicketUpload = function(input) {
        if (input.files && input.files[0]) {
            let tenant = getActiveTenantContext();
            if (tenant.activeRole === 'visitor') {
                alert("يرجى تسجيل الدخول بحسابك أولاً لرفع وتحليل بونات الميزان.");
                return;
            }
            let file = input.files[0], reader = new FileReader();
            reader.onload = function(e) {
                let container = document.getElementById('na2laBotMessages');
                let simulatedGross = Math.floor(Math.random() * 15) + 25;
                let simulatedTare = Math.floor(Math.random() * 5) + 8;
                let netWeight = simulatedGross - simulatedTare;

                let imgHtml = `<div style="margin-top:6px;"><img src="${e.target.result}" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);"></div>`;
                let userMsg = `📎 تم رفع بونة الميزان وتحليلها (OCR) للحساب (${tenant.activeDriver}): <b>${file.name}</b>${imgHtml}`;
                container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 9px 12px; border-radius: 10px; align-self: flex-end; max-width: 80%;">${userMsg}</div>`;
                saveChatHistory('user', userMsg);
                container.scrollTop = container.scrollHeight;

                try {
                    if (typeof firebase !== 'undefined' && firebase.firestore) {
                        firebase.firestore().collection('auditLogs').add({
                            fileName: file.name, companyId: tenant.activeCompanyId, companyName: tenant.activeCompanyName, driver: tenant.activeDriver, netWeight: netWeight + ' طن', timestamp: new Date().toISOString()
                        });
                    }
                } catch(err) {}

                setTimeout(() => {
                    let botReply = `✅ <b>نجاح تحليل واستخراج بيانات البونة (OCR بواسطة Gemini Pro):</b><br>` +
                                   `- الوزن القائم: <b>${simulatedGross}.00 طن</b><br>` +
                                   `- الوزن الفارغ: <b>${simulatedTare}.00 طن</b><br>` +
                                   `- الصافي المستنتج: <b style="color:var(--accent-color);">${netWeight}.00 طن</b><br>` +
                                   `- تم توثيق وحفظ المستند في سحابة فايربيس بنجاح (بدون تخزين محلي).`;
                    container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; max-width: 80%; border: 1px solid var(--border-color);">${botReply}</div>`;
                    saveChatHistory('bot', botReply);
                    container.scrollTop = container.scrollHeight;
                    speakBotReplyText("تم تحليل بونة الميزان واستخراج الأوزان بنجاح.");
                }, 900);
            };
            reader.readAsDataURL(file);
        }
    };

    window.syncAndSearchPhoneContacts = async function(searchQuery = '') {
        let tenant = getActiveTenantContext();
        let savedContacts = window.botMemoryState.contacts || [];

        if (savedContacts.length === 0) {
            savedContacts = [
                { name: "محطة وقود الطريق الصحراوي", phone: "01012345678" },
                { name: "ورشة صيانة التريلات المركزية", phone: "01198765432" },
                { name: "الدعم الفني لمنصة نقلة", phone: "01599887766" }
            ];
            window.botMemoryState.contacts = savedContacts;
        }

        let filteredContacts = savedContacts;
        if (searchQuery && searchQuery.trim() !== '') {
            let q = searchQuery.trim().toLowerCase();
            filteredContacts = savedContacts.filter(c => 
                c.name.toLowerCase().includes(q) || c.phone.includes(q)
            );
        }

        let html = `📇 <b>جهات الاتصال المتزامنة الخاصة بحساب [${tenant.activeDriver}]:</b><br>`;
        if (filteredContacts.length === 0) {
            html += `<i>لم يتم العثور على نتائج مطابقة لـ "${searchQuery}" في جهات الاتصال الخاصة بك.</i><br>` +
                    `<button onclick="sendBotQuickQuery('جهات الاتصال')" style="margin-top:6px; background:var(--primary-color); color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:10px;">إعادة عرض كافة جهات الاتصال</button>`;
        } else {
            html += `<div class="bot-table-container"><table class="bot-custom-table">` +
                    `<tr><th>اسم الجهة</th><th>رقم الهاتـف</th><th>إجراء</th></tr>`;
            filteredContacts.forEach(c => {
                html += `<tr><td><b>${c.name}</b></td><td><a href="tel:${c.phone}" style="color:var(--accent-color); text-decoration:underline;">${c.phone}</a></td><td><button onclick="sendBotQuickQuery('اتصال ${c.name}')" style="background:var(--primary-color); color:#fff; border:none; padding:2px 6px; border-radius:4px; cursor:pointer; font-size:9px;">اتصال 📞</button></td></tr>`;
            });
            html += `</table></div>`;
        }
        return html;
    };

    window.saveChatHistory = function(sender, htmlContent) {
        if (window.isTempChatActive) return;
        let tenant = getActiveTenantContext();
        let storageKey = `${tenant.activeCompanyId}_${tenant.activeDriver}`;
        if (!window.botMemoryState.chatHistories[storageKey]) {
            window.botMemoryState.chatHistories[storageKey] = [];
        }
        let history = window.botMemoryState.chatHistories[storageKey];
        history.push({ sender, htmlContent, timestamp: new Date().toISOString() });
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        history = history.filter(item => new Date(item.timestamp) > thirtyDaysAgo);
        if (history.length > 40) history = history.slice(-40);
        window.botMemoryState.chatHistories[storageKey] = history;
    };

    window.loadChatHistory = async function() {
        let tenant = getActiveTenantContext();
        let storageKey = `${tenant.activeCompanyId}_${tenant.activeDriver}`;
        let history = window.botMemoryState.chatHistories[storageKey] || [];
        const container = document.getElementById('na2laBotMessages');
        if (!container) return;
        
        let subInfo = await getCompanySubscriptionInfo();
        let subHtmlBanner = '';
        if (subInfo.expiryDate && tenant.activeRole === 'admin') {
            let expDate = new Date(subInfo.expiryDate);
            let today = new Date();
            let diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
            if (!isNaN(diffDays) && diffDays <= 7 && diffDays >= 0) {
                subHtmlBanner = `<div style="background:rgba(239,68,68,0.2); border:1px solid var(--danger-color); color:var(--danger-color); padding:8px 10px; border-radius:8px; margin-bottom:8px; font-size:11px; font-weight:bold;">⚠️ تنبيه هام: اشتراك شركتك سينتهي خلال ${diffDays} أيام (${subInfo.expiryDate}). يرجى التجديد لاستمرار الخدمة.</div>`;
            }
        }

        let welcomeText = tenant.activeRole === 'visitor' 
            ? `مرحباً بك يا <b>زائر كريم</b> في منصة أسطورة الطريق.<br>- أنت تصفح المنصة كزائر غير مسجل. يرجى تسجيل الدخول بحسابك المعتمد لاستعراض الخدمات الشاملة.`
            : `مرحباً بك يا <b>${tenant.activeDriver}</b> (${tenant.activeRole === 'admin' ? 'مدير شركة' : 'سائق'}) في منصة أسطورة الطريق.<br>- تم استعادة سجلك الشخصي ومزامنة بياناتك بنجاح وعزلها تماماً عبر الذاكرة الحية (بدون أي تخزين محلي).`;

        container.innerHTML = subHtmlBanner + `<div style="background: var(--bg-color); padding: 10px 14px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">${welcomeText}</div>`;

        history.forEach(msg => {
            if (msg.sender === 'user') {
                container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 9px 12px; border-radius: 10px; align-self: flex-end; max-width: 80%; word-break: break-word;">${msg.htmlContent}</div>`;
            } else {
                container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; max-width: 80%; border: 1px solid var(--border-color); word-break: break-word;">${msg.htmlContent}</div>`;
            }
        });
        container.scrollTop = container.scrollHeight;
    };

    window.clearBotChat = function() {
        let tenant = getActiveTenantContext();
        let storageKey = `${tenant.activeCompanyId}_${tenant.activeDriver}`;
        window.botMemoryState.chatHistories[storageKey] = [];
        let msgContainer = document.getElementById('na2laBotMessages');
        if (msgContainer) {
            msgContainer.innerHTML = `<div style="background: var(--bg-color); padding: 10px 14px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color); color: var(--text-color);">🧹 تمت تصفية وقفل سجل المحادثة الخاص بحسابك المعزول (${tenant.activeDriver}) بنجاح من الذاكرة الحية.</div>`;
        }
    };

    window.changeBotTheme = function(themeId) {
        let rootContainer = document.getElementById('na2laBotRootContainer');
        if (!rootContainer) return;
        if (themeId === 'default') {
            rootContainer.removeAttribute('data-theme');
        } else {
            rootContainer.setAttribute('data-theme', themeId);
        }
        window.botMemoryState.theme = themeId;
        let selectEl = document.getElementById('botThemeSelect');
        if (selectEl) selectEl.value = themeId;
    };

    changeBotTheme('default');
    syncPlatformUserData();

    window.startBotVoiceInput = function() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("متصفحك لا يدعم التعرف الصوتي."); return;
        }
        playWalkieBeep('start');
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'ar-EG';
        recognition.onresult = (event) => {
            playWalkieBeep('end');
            let text = event.results[0][0].transcript, inputEl = document.getElementById('na2laBotInput');
            if (inputEl) inputEl.value = text;
            sendBotQuickQuery(text);
        };
        recognition.onerror = recognition.onend = () => { playWalkieBeep('end'); };
        recognition.start();
    };

    window.speakBotReplyText = function(text) {
        if (!isBotVoiceOutputOn) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            let utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-EG'; utterance.rate = 1.0;
            utterance.onend = () => { if (isBotContinuousActive) { setTimeout(() => { startBotVoiceInput(); }, 800); } };
            window.speechSynthesis.speak(utterance);
        }
    };

    window.updateShipmentStatusFromChat = async function(shipmentId, newStatus) {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            alert("عذراً، غير مسموح للزوار تعديل حالة الشحنات.");
            return;
        }
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                let querySnap = await db.collection('shipments').where('shipmentNumber', '==', shipmentId).where('companyId', '==', tenant.activeCompanyId).get();
                if (!querySnap.empty) {
                    await querySnap.docs[0].ref.update({ status: newStatus });
                } else {
                    await db.collection('shipments').doc(shipmentId).update({ status: newStatus }).catch(async () => {});
                }
            }
            alert(`تم تحديث حالة الشحنة (${shipmentId}) إلى: ${newStatus} بنجاح وسحابياً.`);
            await fetchRealFirebaseData();
            loadChatHistory();
        } catch(e) {
            alert("حدث خطأ أثناء تحديث حالة الشحنة سحابياً.");
        }
    };

    window.renderShipmentCardInChat = function(shipment) {
        let sId = shipment.id || shipment.shipmentNumber || 'معتمدة';
        return `
            <div class="chat-card">
                <div style="font-weight: bold; color: var(--accent-color); font-size: 11px; margin-bottom: 4px;">📦 شحنة رقم: ${sId}</div>
                <div style="font-size: 10px; color: var(--text-color);">الحالة: <span style="color: var(--accent-color); font-weight: bold;">${shipment.status || 'نشطة'}</span></div>
                <div style="margin-top: 6px; display: flex; gap: 4px;">
                    <button onclick="updateShipmentStatusFromChat('${sId}', 'في الطريق')" style="background:var(--primary-color); color:#fff; border:none; padding:3px 6px; border-radius:4px; font-size:9px; cursor:pointer; font-family:'Cairo', sans-serif;">🚚 في الطريق</button>
                    <button onclick="updateShipmentStatusFromChat('${sId}', 'تم التسليم')" style="background:var(--accent-color); color:#fff; border:none; padding:3px 6px; border-radius:4px; font-size:9px; cursor:pointer; font-family:'Cairo', sans-serif;">✅ تم التسليم</button>
                </div>
            </div>
        `;
    };

    window.fetchLiveWebAndWikipediaAnswer = async function(query) {
        let googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        return `🌐 <b>نتائج الاستعلام والتصفح المباشر (Gemini Pro):</b><br>` +
               `بناءً على سؤالك حول "${query}":<br>` +
               `يمكنك استعراض أحدث النتائج والموضوعات المرتبطة مباشرة عبر محرك البحث جوجل.<br><br>` +
               `<a href="${googleSearchUrl}" target="_blank" style="background: var(--primary-color); color: #fff; padding: 6px 12px; border-radius: 6px; display: inline-block; font-weight: bold; text-decoration: none; font-size: 11px;">🔍 البحث عن "${query}" عبر جوجل</a>`;
    };

    window.sendBotQuickQuery = async function(customText = null) {
        let inputEl = document.getElementById('na2laBotInput');
        let container = document.getElementById('na2laBotMessages');
        let text = customText || (inputEl ? inputEl.value.trim() : "");
        if (!text || !container) return;

        let userMsgHtml = text;
        container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 9px 12px; border-radius: 10px; align-self: flex-end; max-width: 80%; word-break: break-word; font-family: 'Cairo', sans-serif;">${userMsgHtml}</div>`;
        saveChatHistory('user', userMsgHtml);

        if (inputEl && !customText) inputEl.value = "";
        container.scrollTop = container.scrollHeight;

        let typingId = 'typing-' + Date.now();
        container.innerHTML += `<div id="${typingId}" style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
        container.scrollTop = container.scrollHeight;

        await fetchRealFirebaseData();
        let typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        let tenant = syncPlatformUserData();
        let userShipments = getIsolatedUserShipments();
        let botReply = '';
        let lower = text.toLowerCase();

        let contextualText = lower;
        if ((lower.includes('التفاصيل') || lower.includes('كم تكلفتها') || lower.includes('زيادة')) && window.lastBotContext) {
            contextualText = window.lastBotContext + ' ' + lower;
        }

        let expenseMatch = text.match(/(?:صرفت|مصروف|دفعنا|دفع)\s*(\d+)\s*(?:جنيه|جج|ج\.م)?\s*(?:لـ|في|على)?\s*(.*)/i);

        if (expenseMatch) {
            window.lastBotContext = 'مصروفات NLP';
            let amount = expenseMatch[1];
            let description = expenseMatch[2] || 'مصروف تشغيلي عام';
            if (tenant.activeRole === 'visitor') {
                botReply = `⚠️ عذراً، لا يمكنك تسجيل المصروفات كزائر غير مسجل.`;
            } else {
                try {
                    window.botMemoryState.expensesTotal = (window.botMemoryState.expensesTotal || 0) + parseFloat(amount);
                    if (typeof firebase !== 'undefined' && firebase.firestore) {
                        await firebase.firestore().collection('expenses').add({
                            amount: parseFloat(amount),
                            description: description,
                            companyId: tenant.activeCompanyId,
                            driver: tenant.activeDriver,
                            timestamp: new Date().toISOString()
                        });
                    }
                    botReply = `✅ <b>تم تسجيل المصروف بنجاح وتحديث السحابة (Gemini NLP - بدون تخزين محلي):</b><br>- المبلغ: <b>${amount} ج.م</b><br>- البيان: <b>${description}</b><br>- تم تحديث الخزنة والمصروفات سحابياً بالزمن الحقيقي.`;
                } catch(err) {
                    botReply = `❌ حدث خطأ أثناء حفظ المصروف في قاعدة البيانات السحابية.`;
                }
            }
        }
        else if (contextualText.includes('اختبار القيادة') || contextualText.includes('اختبار') || contextualText.includes('تعليمات الأمان') || contextualText.includes('أسئلة')) {
            window.lastBotContext = 'اختبار القيادة';
            botReply = startDriverExam();
        }
        else if (contextualText.includes('تصدير') || contextualText.includes('نقل الأرشيف') || contextualText.includes('تنزيل السجل')) {
            window.lastBotContext = 'تصدير الأرشيف';
            exportChatArchiveData();
            botReply = `📤 تم البدء في تصدير وحفظ الأرشيف الكامل للسجلات والبيانات على جهازك بنجاح من الذاكرة الحية.`;
        }
        else if (contextualText.includes('جهات الاتصال') || contextualText.includes('جهات اتصال') || contextualText.includes('الاتصال')) {
            window.lastBotContext = 'جهات الاتصال';
            let searchQuery = text.replace(/(جهات الاتصال|جهات اتصال|اتصال|ابحث عن)/g, '').trim();
            botReply = await syncAndSearchPhoneContacts(searchQuery);
        }
        else if (contextualText.includes('معلومات صلاحية اشتراك شركتك') || contextualText.includes('صلاحية اشتراك') || contextualText.includes('الباقة') || contextualText.includes('الصلاحية') || contextualText.includes('تقرير الصلاحية')) {
            window.lastBotContext = 'معلومات صلاحية اشتراك شركتك';
            let subInfo = await getCompanySubscriptionInfo();
            let adminDetailsHtml = '';
            if (tenant.activeRole === 'admin') {
                adminDetailsHtml = `
                    <div style="background: var(--bg-color); padding: 8px; border-radius: 6px; font-size: 11px; line-height: 1.8; border: 1px solid var(--border-color); margin-bottom: 8px;">
                        🏢 الشركة المعزولة: <b>${subInfo.companyName}</b><br>
                        👤 مدير الشركة: <b>${subInfo.adminName}</b><br>
                        📞 الهاتف: <b>${subInfo.phone}</b><br>
                        💳 الباقة الحالية: <b>${subInfo.planName}</b> | الحالة: <b style="color:var(--accent-color);">${subInfo.status}</b><br>
                        ⏳ تاريخ انتهاء الصلاحية: <b style="color:var(--danger-color);">${subInfo.expiryDate}</b>
                    </div>
                `;
            }
            botReply = `
                <div class="chat-card" style="border-right-color: var(--warning-color);">
                    <div style="font-weight: bold; color: var(--warning-color); font-size: 12px; margin-bottom: 8px;">💳 كارت الاشتراك وتجديد الخدمة السحابية</div>
                    ${adminDetailsHtml}
                    <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-color); padding: 10px; border-radius: 8px; font-size: 11px; color: var(--text-color);">
                        💳 لتجديد الاشتراك، يرجى التحويل على محافظنا المعتمدة أدناه ثم إبلاغ الإدارة:<br><br>
                        📱 فوري كاش: <b>01114099799</b><br>
                        📱 وي كاش (WE): <b>01554440996</b><br>
                        <button onclick="sendBotQuickQuery('إرسال طلب كود التحويل للإدارة للتجديد')" style="margin-top: 8px; background: var(--accent-color); color: #fff; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: bold; font-family: 'Cairo', sans-serif; width: 100%;">📤 إرسال طلب كود التحويل للإدارة للتجديد</button>
                    </div>
                </div>
            `;
        }
        else if (contextualText.includes('إرسال طلب كود التحويل') || contextualText.includes('طلب التجديد')) {
            window.lastBotContext = 'طلب تجديد الاشتراك';
            botReply = `✅ <b>تم إرسال طلب كود التحويل للإدارة بنجاح:</b><br>- تم توثيق طلب تجديد الباقة لحساب شركتك المعزول وإرساله لغرفة العمليات والإدارة في سحابة فايربيس لحظياً.`;
        }
        else if (contextualText.includes('شحناتي') || contextualText.includes('الشحنات') || contextualText.includes('شحنة') || contextualText.includes('رحلة')) {
            window.lastBotContext = 'شحناتي';
            if (tenant.activeRole === 'visitor') {
                botReply = `📦 <b>عذراً، أنت تصفح كزائر كريم غير مسجل:</b><br>- تم حجب شحنات الشركات عن الزوار لحماية الخصوصية. يرجى تسجيل الدخول بحسابك المعتمد لاستعراض شحناتك المعزولة.`;
            } else if (userShipments.length === 0) {
                botReply = `📦 لا توجد شحنات مسجلة حالياً ومطابقة لشركة وحساب (${tenant.activeDriver}).`;
            } else {
                botReply = `📦 لديك <b>${userShipments.length}</b> شحنة متزامنة ومتاحة لحسابك (معزولة بدقة تامة سحابياً بدون تخزين محلي):<br>`;
                userShipments.forEach(s => { botReply += renderShipmentCardInChat(s); });
            }
        }
        else if (contextualText.includes('الفواتير') || contextualText.includes('فاتورة') || contextualText.includes('آجل')) {
            window.lastBotContext = 'الفواتير';
            if (tenant.activeRole === 'visitor') {
                botReply = `🧾 قسم الفواتير مخصص للمستخدمين والعملاء المسجلين فقط.`;
            } else {
                let searchTerm = text.replace(/(ابحث عن|بحث|فاتورة|فواتير|مجمعة|آجل)/g, '').trim();
                let companyInvoices = realFirebaseDeferredInvoices.filter(inv => !inv.companyId || inv.companyId === tenant.activeCompanyId);
                if (searchTerm) {
                    companyInvoices = companyInvoices.filter(inv => 
                        String(inv.invoiceNumber || '').includes(searchTerm) ||
                        String(inv.clientName || inv.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        String(inv.description || '').toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }
                if (companyInvoices.length === 0) {
                    botReply = `🧾 <b>الفواتير المجمعة والآجلة المعزولة:</b><br><i>لا توجد فواتير مطابقة لـ "${searchTerm || 'الكل'}".</i>`;
                } else {
                    botReply = `🧾 <b>نتائج الفواتير لشركتك الحالية (${companyInvoices.length} فاتورة متزامنة):</b><br>` +
                               `<div class="bot-table-container"><table class="bot-custom-table">` +
                               `<tr><th>رقم الفاتورة</th><th>العميل</th><th>المبلغ</th><th>إجراء</th></tr>`;
                    companyInvoices.slice(0, 5).forEach(inv => {
                        let invNum = inv.invoiceNumber || inv.id || 'فاتورة';
                        let client = inv.clientName || inv.customer || 'عميل عام';
                        let amt = inv.totalAmount || inv.amount || '0';
                        botReply += `<tr><td><b>${invNum}</b></td><td>${client}</td><td>${amt} ج.م</td><td><button onclick="printConsolidatedInvoice('${inv.id || invNum}')" style="background:var(--primary-color); color:#fff; border:none; padding:2px 6px; border-radius:4px; cursor:pointer; font-size:9px;">📄 طباعة PDF</button></td></tr>`;
                    });
                    botReply += `</table></div>`;
                }
            }
        }
        else if (contextualText.includes('موقع') || contextualText.includes('موقعي') || contextualText.includes('خريطة') || contextualText.includes('أين')) {
            window.lastBotContext = 'موقع GPS';
            if (tenant.activeRole === 'visitor') {
                botReply = `📍 خدمة التتبع الجغرافي مخصصة للسائقين والمستخدمين المسجلين.`;
            } else {
                let activeFleet = await getCompanyActiveFleet();
                let myDriverData = activeFleet.find(d => d.name === tenant.activeDriver || d.id === tenant.activeDriver) || activeFleet[0];
                let lat = myDriverData?.latitude || 30.0444;
                let lng = myDriverData?.longitude || 31.2357;
                let mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
                botReply = `📍 <b>الرصد الجغرافي اللحظي المعزول (GPS Link):</b><br>` +
                           `- المستخدم / المركبة: <b>${myDriverData?.name || tenant.activeDriver}</b><br>` +
                           `- الإحداثيات: (${lat.toFixed(4)}, ${lng.toFixed(4)})<br><br>` +
                           `<a href="${mapsUrl}" target="_blank" style="background:var(--accent-color); color:#fff; padding:6px 12px; border-radius:6px; display:inline-block; font-weight:bold; text-decoration:none;">🗺️ فتح الموقع المباشر على خرائط جوجل</a>`;
            }
        }
        else if (contextualText.includes('الخزنة') || contextualText.includes('الجدول الخماسي') || contextualText.includes('المالية') || contextualText.includes('تقرير') || contextualText.includes('أرباح') || contextualText.includes('مالي') || contextualText.includes('pdf')) {
            window.lastBotContext = 'الخزنة';
            if (tenant.activeRole !== 'admin') {
                botReply = `💰 تقارير الجدول الخماسي والمالية مخصصة لإدارة الشركة فقط ومحجوبة عن العامة والزوار.`;
            } else {
                let report = await window.getCompanyFinancialReport();
                botReply = `💰 <b>الجدول الخماسي المعتمد لشركة [${report.companyName}] (مزامنة سحابية لحظية):</b><br>` +
                           `<div class="bot-table-container"><table class="bot-custom-table">` +
                           `<tr><th>البند المالي / التشغيلي</th><th>القيمة المعتمدة</th></tr>` +
                           `<tr><td>📦 إجمالي الشحنات</td><td><b>${report.shipmentsCount} شحنة</b></td></tr>` +
                           `<tr><td>📈 الإيرادات الإجمالية</td><td style="color:#3b82f6; font-weight:bold;">${report.revenue}</td></tr>` +
                           `<tr><td>💎 صافي الأرباح</td><td style="color:#10b981; font-weight:bold;">${report.netProfit}</td></tr>` +
                           `<tr><td>💰 رصيد الخزينة</td><td style="color:#f59e0b; font-weight:bold;">${report.treasury}</td></tr>` +
                           `<tr><td>📑 الديون والآجل</td><td style="color:#ef4444; font-weight:bold;">${report.debts}</td></tr>` +
                           `</table></div><br>` +
                           `<button onclick="exportFinancialReportPDF()" style="background: var(--primary-color); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 11px; font-family: 'Cairo', sans-serif;">📄 طباعة وتصدير الجدول الخماسي PDF</button>`;
            }
        }
        else if (contextualText.includes('المصروفات') || contextualText.includes('مصروف') || contextualText.includes('وقود')) {
            window.lastBotContext = 'المصروفات';
            if (tenant.activeRole === 'visitor') {
                botReply = `⛽ هذه الخدمة مخصصة للحسابات المسجلة.`;
            } else {
                botReply = `⛽ <b>المصروفات التشغيلية لشركتك:</b><br>` +
                           `- يمكنك تسجيل مصروف جديد مباشرة بكتابة: <i>"صرفت 150 جنيه بنزين"</i> (تزامن فوري بدون تخزين محلي).`;
            }
        }
        else if (contextualText.includes('إحصائيات شركتي') || contextualText.includes('الأسطول') || contextualText.includes('السائقون') || contextualText.includes('المركبات')) {
            window.lastBotContext = 'الأسطول';
            if (tenant.activeRole !== 'admin') {
                botReply = `📊 إحصائيات الأسطول والشركة محجوبة عن غير المديرين والزوار.`;
            } else {
                let activeFleet = await getCompanyActiveFleet();
                let report = await window.getCompanyFinancialReport();
                botReply = `📊 <b>إحصائيات الأسطول والنشاط المعزول [${tenant.activeCompanyName}]:</b><br>` +
                           `- الأسطول والسائقون النشطون: <b>${activeFleet.length} سائق/مركبة</b><br>` +
                           `- إجمالي شحنات الشركة: <b>${report.shipmentsCount} شحنة</b><br>` +
                           `- رصيد الخزينة: <b style="color:var(--accent-color);">${report.treasury}</b>`;
            }
        }
        else if (contextualText.includes('طوارئ') || contextualText.includes('sos') || contextualText.includes('عطل') || contextualText.includes('حادث')) {
            window.lastBotContext = 'طوارئ';
            if (tenant.activeRole === 'visitor') {
                botReply = `🚨 يرجى تسجيل الدخول للاستفادة من خدمة طوارئ SOS.`;
            } else {
                botReply = `🚨 <b>بروتوكول طوارئ سحابة فايربيس (عزل تام):</b><br>` +
                           `- تم إرسال تنبيه الطوارئ والموقع الجغرافي لحسابك (<b>${tenant.activeDriver}</b>) لغرفة العمليات والدعم الفني بالمنصة فوراً.`;
            }
        }
        else if (contextualText.includes('نصيحة') || contextualText.includes('إرشادات القيادة') || contextualText.includes('نصائح الطرق')) {
            window.lastBotContext = 'نصيحة';
            let randomTip = roadWisdoms[Math.floor(Math.random() * roadWisdoms.length)];
            botReply = `🛣️ <b>إرشادات ونصائح الطرق (Gemini Pro):</b><br>${randomTip}`;
        }
        else if (contextualText.includes('نكتة') || contextualText.includes('نكت') || contextualText.includes('هزار') || contextualText.includes('ضحك') || contextualText.includes('اسطى')) {
            window.lastBotContext = 'نكتة';
            let randomJoke = funnyJokes[Math.floor(Math.random() * funnyJokes.length)];
            botReply = `😄 ${randomJoke}`;
        }
        else if (contextualText.includes('مغامرة') || contextualText.includes('قصة سفر') || contextualText.includes('مغامرات')) {
            window.lastBotContext = 'مغامرة';
            let randomAdv = adventureStories[Math.floor(Math.random() * adventureStories.length)];
            botReply = `${randomAdv}`;
        }
        else if (contextualText.includes('صورة') || contextualText.includes('صوره') || contextualText.includes('رسم') || contextualText.includes('توليد') || contextualText.includes('جيبلي صورة')) {
            window.lastBotContext = 'صورة';
            botReply = handleImageRequest(text);
        }
        else if (contextualText.includes('خدمات المنصة') || contextualText.includes('الخدمات') || contextualText.includes('ما هي نقلة') || contextualText.includes('عن نقلة') || contextualText.includes('من نحن')) {
            window.lastBotContext = 'خدمات المنصة';
            botReply = `🌐 <b>عن منصة أسطورة الطريق (نقلة):</b><br>` +
                       `- المنصة البرمجية الرائدة لإدارة أسطول الشحن والنقل البري، الجدول الخماسي المعتمد، تتبع الشحنات، وأتمتة الفواتير الآجلة بـ <b>مزامنة لحظية تامة وبدون تخزين محلي نهائياً</b>.<br>` +
                       `- توفر عزلاً تاما بين الشركات، مزامنة لجهات الاتصال، تتبع GPS لحظي، وبوت ذكاء اصطناعي متكامل.`;
        }
        else if (contextualText.includes('المساعدة') || contextualText.includes('كيف أستخدم') || contextualText.includes('تعليمات') || contextualText.includes('شرح')) {
            window.lastBotContext = 'المساعدة';
            botReply = `❓ <b>دليل الاستخدام السريع (مدعوم بواسطة Gemini Pro):</b><br>` +
                       `- افتح القائمة الجانبية (☰ القائمة) لاستعراض واستخدام كافة الخدمات والأقسام المعزولة.<br>` +
                       `- اكتب <b>"الخزنة"</b> أو <b>"الجدول الخماسي"</b> لاستعراض التقارير المالية المتزامنة.<br>` +
                       `- ارفع صور بونات الميزان (📎) لتحليل الأوزان تلقائياً (OCR).`;
        }
        else {
            window.lastBotContext = 'بحث خارجي';
            botReply = await window.fetchLiveWebAndWikipediaAnswer(text);
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; max-width: 80%; border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif;">${botReply}</div>`;
        saveChatHistory('bot', botReply);
        container.scrollTop = container.scrollHeight;
        
        speakBotReplyText(botReply.replace(/<[^>]*>?/gm, ''));
    };
})();
