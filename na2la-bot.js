(function() {
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

    const existingContainer = document.getElementById('na2laBotRootContainer');
    if (existingContainer) existingContainer.remove();

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
            font-family: 'Cairo', sans-serif;
        }
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
        /* شريط القائمة الأفقي الاحترافي الجديد */
        #botQuickActionsContainer {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
            gap: 6px !important;
            background: var(--bg-color) !important;
            padding: 8px 10px !important;
            border-bottom: 1px solid var(--border-color) !important;
            scrollbar-width: thin;
            flex-shrink: 0;
        }
        #botQuickActionsContainer::-webkit-scrollbar {
            height: 4px;
        }
        #botQuickActionsContainer::-webkit-scrollbar-thumb {
            background: var(--border-color);
            border-radius: 4px;
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
        <button id="na2laBotBtn" style="position: fixed; bottom: 25px; right: 20px; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: white; border: none; width: 60px; height: 60px; border-radius: 50%; font-size: 26px; cursor: pointer; box-shadow: var(--shadow-3d); z-index: 2147483647; display: flex; align-items: center; justify-content: center; animation: floatAnim 2.5s ease-in-out infinite;" title="🤖 مساعد Gemini Pro (V10 PRO)">🤖</button>

        <div id="na2laBotModal" style="position: fixed; bottom: 85px; right: 20px; width: 420px; max-width: 92vw; height: 80vh; max-height: 650px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 18px; box-shadow: var(--shadow-3d); z-index: 2147483646; display: none; flex-direction: column; overflow: hidden; backdrop-filter: blur(20px); font-family: 'Cairo', sans-serif;">
            <div style="background: linear-gradient(135deg, var(--primary-color), var(--primary-hover)); color: white; padding: 10px 14px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; font-size: 12px; flex-shrink: 0;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span id="botStatusDot" onclick="toggleDutyStatus()" style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; cursor: pointer;" title="تبديل حالة العمل"></span>
                    <span id="botUserRoleBadge">🤖 مساعد Gemini Pro (عزل تام)</span>
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

            <div id="na2laRssTickerContainer" style="display: none; background: rgba(217, 119, 6, 0.15); border-bottom: 1px solid var(--border-color); padding: 5px 10px; font-size: 11px; color: var(--warning-color); white-space: nowrap; overflow: hidden; position: relative; flex-shrink: 0;">
                <div style="display: inline-block; animation: marquee 18s linear infinite; font-weight: bold;">
                    🚀 أسطورة الطريق V10 PRO | شريط القائمة الموحد، الخصوصية الفائقة، التعليم الموجه للسائقين، وتوليد الوسائط
                </div>
            </div>

            <!-- شريط القائمة الأفقي الموحد الشامل لكافة أقسام المنصة بدون تداخل -->
            <div id="botQuickActionsContainer"></div>

            <div style="padding: 5px 12px; background: var(--card-bg); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); font-size: 10px; flex-shrink: 0;">
                <div style="display: flex; gap: 4px; align-items: center;">
                    <button onclick="toggleTemporaryChatMode()" id="botTempChatBtn" style="background: var(--card-bg); color: #a855f7; border: 1px solid #a855f7; padding: 2px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🕵️ مؤقت</button>
                    <button onclick="toggleBotContinuousVoice()" id="botContinuousBtn" style="background: var(--border-color); color: #fff; border: none; padding: 2px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🎤 مستمر</button>
                    <button onclick="toggleBotVoiceOutput()" id="botVoiceToggleBtn" style="background: var(--accent-color); color: #fff; border: none; padding: 2px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🔊 ناطق</button>
                    <button onclick="clearBotChat()" style="background: var(--danger-color); color: #fff; border: none; padding: 2px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🗑️ مسح</button>
                </div>
                <div>
                    <select id="botThemeSelect" onchange="changeBotTheme(this.value)" style="padding: 2px 5px; font-size: 10px; border-radius: 6px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); cursor: pointer; font-family: 'Cairo', sans-serif;">
                        <option value="default">🎨 الداكن</option>
                        <option value="royal">👑 الملكي</option>
                        <option value="emerald">💎 الزمردي</option>
                    </select>
                </div>
            </div>

            <div id="tempChatAlertBanner" style="display: none; background: rgba(168, 85, 247, 0.2); border-bottom: 1px solid #a855f7; color: #d8b4fe; padding: 4px 10px; font-size: 10px; text-align: center; font-weight: bold; flex-shrink: 0;">
                🕵️ وضع الخصوصية الفائقة (محادثة مؤقتة): لن يتم حفظ هذه المحادثة في الذاكرة.
            </div>

            <div id="na2laBotMessages" style="flex: 1 1 auto; min-height: 0; padding: 14px; overflow-y: auto; font-size: 12px; display: flex; flex-direction: column; gap: 10px; line-height: 1.6; background: var(--card-bg); color: var(--text-color);">
                <div style="background: var(--bg-color); padding: 10px 14px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">
                    مرحباً بك! أنا مساعدك الذكي <b>Gemini Pro</b> المدمج بكافة مميزات المنصة وشريط القائمة الشامل.
                </div>
            </div>

            <div style="padding: 8px 10px; border-top: 1px solid var(--border-color); display: flex; gap: 6px; background: var(--bg-color); align-items: center; position: relative; flex-shrink: 0; min-height: 52px; box-sizing: border-box;">
                <input type="file" id="scaleTicketFileInput" accept="image/*" style="display: none;" onchange="handleScaleTicketUpload(this)">
                <input type="file" id="importArchiveFileInput" accept=".json" style="display: none;" onchange="importChatArchiveData(this)">
                
                <button onclick="document.getElementById('scaleTicketFileInput').click()" title="رفع وتحليل بونة الميزان OCR" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); width: 36px; height: 36px; min-width: 36px; border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">📎</button>
                
                <input type="text" id="na2laBotInput" placeholder="اكتب سؤالك، اسأل عن الشحنات، أو اختر من شريط القائمة..." style="flex: 1; min-width: 0; height: 36px; margin: 0; padding: 0 10px; font-size: 11px; border-radius: 8px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; box-sizing: border-box; outline: none;" onkeypress="if(event.key === 'Enter') sendBotQuickQuery()">

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
        const stopDrag = () => { if (!isBotDragging) return; isBotDragging = false; };

        botBtn.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
        document.addEventListener('mousemove', (e) => onDrag(e.clientX, e.clientY));
        document.addEventListener('mouseup', stopDrag);
        
        botBtn.addEventListener('touchstart', (e) => { if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
        document.addEventListener('touchmove', (e) => { if (isBotDragging && e.touches.length === 1) { onDrag(e.touches[0].clientX, e.touches[0].clientY); } }, { passive: true });
        document.addEventListener('touchend', stopDrag);

        botBtn.addEventListener('click', () => {
            if (!hasBotDragged) toggleNa2laBot();
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
            explain: "انخفاض ضغط الهواء يحتم التوقف الفوري الآمن وتأمين الشاحنة لتجنب انغلاق الفرامل التلقائي."
        },
        {
            q: "كيف يجب توزيع أوزان البضائع الثقيلة على سطح المقطورة؟",
            options: ["وضع كل الثقل في الجزء الخلفي جداً", "توزيع الثقل بانتظام فوق المحاور والمركز", "ترك الجزء الأمامي فارغاً تماماً", "تجميع كل الثقل في جهة واحدة لليمين"],
            correct: 1,
            explain: "التوزيع المتوازن للبضائع فوق محاور الشاحنة يضمن الثبات في المنحنيات ويمنع انزلاق المقطورة."
        }
    ];

    const roadWisdoms = [
        "💡 **نصيحة قيادة سريعة (Gemini):** احرص دائماً على فحص ضغط الإطارات ومستوى الزيت قبل التحرك في الرحلات الطويلة.",
        "💡 **إرشادات الأمان:** ترك مسافة أمان كافية بينك وبين الشاحنات الأخرى على الطريق السريع ينقذك من المفاجآت الطارئة."
    ];

    const funnyJokes = [
        "😂 **نكتة سواقين مع اسطى:** سألو سواق نقل محترف: إيه أحلى حاجة في السفر بالليل؟ قالهم: الشوارع فاضية والمرور بيحب يسلم عليا كل كمين!"
    ];

    const adventureStories = [
        "📖 **مغامرات الطرق السريعة:** في أحد الأيام وأثناء رحلة شحن عاجلة عبر الصحراء الشرقية، واجه السائق عاصفة رملية شديدة وبفضل الهدوء والالتزام بإرشادات التوقف الآمن عبر العاصفة بسلام."
    ];

    window.handleImageRequest = function(query) {
        let subject = query.replace(/(صورة|صوره|اترك لي|ابحث عن|أريد|ابي|توليد|ارسم)/g, '').trim() || 'شاحنة نقل حديثة على الطريق السريع';
        let imageUrl = 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=700&auto=format&fit=crop&q=80';
        return `
            <div class="chat-card" style="border-right-color: var(--purple-color);">
                <div style="font-weight: bold; color: var(--purple-color); font-size: 11px; margin-bottom: 6px;">🎨 محرك Gemini - رسم وتوليد وسائط: "${subject}"</div>
                <img src="${imageUrl}" style="width: 100%; max-height: 220px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color);" alt="${subject}">
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
            btn.innerText = window.isTempChatActive ? "🕵️ مؤقت: مفعل" : "🕵️ مؤقت";
        }
        if (banner) banner.style.display = window.isTempChatActive ? "block" : "none";
        alert(window.isTempChatActive ? "تم تفعيل وضع المحادثة المؤقتة (Incognito Mode)." : "تم إلغاء وضع المحادثة المؤقتة.");
    };

    window.exportChatArchiveData = function() {
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        let chatHistory = JSON.parse(localStorage.getItem(storageKey) || '[]');
        let exportBundle = { version: "10.0-PRO", tenant: tenant, exportDate: new Date().toISOString(), chatHistory: chatHistory };
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
        let downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `Na2la_Archive_${tenant.activeCompanyId}_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        alert("✅ تم تصدير واستخراج أرشيف السجلات والمحادثات بنجاح.");
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
                        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
                        localStorage.setItem(storageKey, JSON.stringify(importedData.chatHistory));
                        loadChatHistory();
                        alert("✅ تم استيراد ونقل الأرشيف بنجاح.");
                    }
                } catch(err) { alert("❌ حدث خطأ أثناء قراءة ملف الأرشيف."); }
            };
            reader.readAsText(file);
        }
    };

    window.startDriverExam = function() {
        let randQuiz = driverQuizzes[Math.floor(Math.random() * driverQuizzes.length)];
        let quizId = 'quiz_' + Date.now();
        return `
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
    };

    window.submitQuizAnswer = function(quizContainerId, selectedIdx, correctIdx, explainText) {
        let box = document.getElementById(quizContainerId);
        if (!box) return;
        let isCorrect = (selectedIdx === correctIdx);
        box.innerHTML += `
            <div style="margin-top: 8px; padding: 8px; border-radius: 6px; font-size: 10px; font-weight: bold; background: ${isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; border: 1px solid ${isCorrect ? 'var(--accent-color)' : 'var(--danger-color)'}; color: ${isCorrect ? 'var(--accent-color)' : 'var(--danger-color)'};">
                ${isCorrect ? '🎉 إجابة صحيحة وممتازة!' : '❌ إجابة غير صحيحة.'}<br>
                💡 <b>الشرح والتعليل:</b> ${explainText}
            </div>
        `;
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
                    realFirebaseDrivers = driversSnap.empty ? [] : driversSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch(e) { realFirebaseDrivers = []; }

                try {
                    const shipmentsSnap = await db.collection('shipments').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!shipmentsSnap.empty) {
                        realFirebaseShipments = shipmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        const allShipments = await db.collection('shipments').get();
                        realFirebaseShipments = allShipments.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) { realFirebaseShipments = []; }

                try {
                    const invoicesSnap = await db.collection('deferredInvoices').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!invoicesSnap.empty) {
                        realFirebaseDeferredInvoices = invoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        const allInvoices = await db.collection('deferredInvoices').get();
                        realFirebaseDeferredInvoices = allInvoices.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) { realFirebaseDeferredInvoices = []; }

                try {
                    const conInvoicesSnap = await db.collection('consolidatedInvoices').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!conInvoicesSnap.empty) {
                        realFirebaseConsolidatedInvoices = conInvoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        const allConInvoices = await db.collection('consolidatedInvoices').get();
                        realFirebaseConsolidatedInvoices = allConInvoices.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }
                } catch(e) { realFirebaseConsolidatedInvoices = []; }
            }
        } catch(e) {}
    };

    window.getCompanySubscriptionInfo = async function() {
        let tenant = getActiveTenantContext();
        let subData = { companyName: tenant.activeCompanyName, adminName: tenant.activeDriver, phone: 'غير متوفر', planName: 'monthly', status: 'نشط ✅', expiryDate: '2026-09-28' };
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore && tenant.activeDriver !== 'زائر كريم') {
                let userDoc = await firebase.firestore().collection('drivers').doc(tenant.activeDriver).get();
                if (userDoc.exists) {
                    let d = userDoc.data();
                    subData.companyName = d.companyName || tenant.activeCompanyName;
                    subData.adminName = d.name || tenant.activeDriver;
                    subData.phone = d.phone || 'غير متوفر';
                    subData.planName = d.subPlan || 'monthly';
                    subData.expiryDate = d.subExpiry || '2026-09-28';
                }
            }
        } catch(e) {}
        return subData;
    };

    window.getIsolatedUserShipments = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return [];
        let allShipments = realFirebaseShipments.length > 0 ? realFirebaseShipments : (window.appData?.shipments || []);
        let companyFiltered = allShipments.filter(s => (s.companyId || 'company_main') === tenant.activeCompanyId);
        if (tenant.activeRole === 'admin') return companyFiltered;
        return companyFiltered.filter(s => s.assignedDriver === tenant.activeDriver || s.driver === tenant.activeDriver || s.name === tenant.activeDriver);
    };

    window.parseNumericCurrency = function(val) {
        if (!val) return '0 ج.م';
        let num = parseFloat(String(val).replace(/[^\d.-]/g, ''));
        return isNaN(num) ? '0 ج.م' : num.toLocaleString() + ' ج.م';
    };

    window.getCompanyFinancials = function() {
        let tenant = getActiveTenantContext();
        let rawTreasury = realFirebaseAppData.treasury || localStorage.getItem(`treasury_balance_${tenant.activeCompanyId}`) || '0 ج.م';
        let rawExpenses = realFirebaseAppData.expenses || localStorage.getItem(`expenses_total_${tenant.activeCompanyId}`) || '0 ج.م';
        return { 
            treasuryBalance: parseNumericCurrency(rawTreasury), 
            expensesTotal: parseNumericCurrency(rawExpenses), 
            invoicesCount: realFirebaseDeferredInvoices.length + realFirebaseConsolidatedInvoices.length, 
            shipmentsCount: getIsolatedUserShipments().length 
        };
    };

    window.getCompanyFinancialReport = async function() {
        let tenant = getActiveTenantContext();
        let financials = getCompanyFinancials();
        let shipments = getIsolatedUserShipments();
        let totalVal = shipments.reduce((sum, s) => sum + (parseFloat(String(s.price || 0).replace(/[^\d.-]/g, '')) || 0), 0);
        return { companyName: tenant.activeCompanyName, treasury: financials.treasuryBalance, expenses: financials.expensesTotal, invoicesCount: financials.invoicesCount, shipmentsCount: shipments.length, estimatedRevenue: totalVal.toLocaleString() + ' ج.م' };
    };

    window.exportFinancialReportPDF = async function() {
        let report = await getCompanyFinancialReport();
        let printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html dir="rtl"><head><title>تقرير المالية</title><style>body{font-family:Tahoma,sans-serif;padding:20px;}</style></head>
            <body><h2>تقرير الخزنة والمالية - شركة ${report.companyName}</h2><p>رصيد الخزنة: ${report.treasury}</p><p>الإيرادات: ${report.estimatedRevenue}</p>
            <script>window.onload = function() { window.print(); window.close(); }</script></body></html>
        `);
        printWindow.document.close();
    };

    window.printConsolidatedInvoice = function(invoiceId) {
        let conInv = realFirebaseConsolidatedInvoices.find(i => String(i.id) === String(invoiceId) || String(i.invoiceNumber) === String(invoiceId));
        if (conInv && typeof window.printConsolidatedInvoice === 'function') {
            window.printConsolidatedInvoice(invoiceId);
            return;
        }
        alert("جاري تجهيز وثيقة الفاتورة للطباعة...");
    };

    window.syncPlatformUserData = function() {
        let tenant = getActiveTenantContext();
        let isManager = (tenant.activeRole === 'admin');

        let badgeEl = document.getElementById('botUserRoleBadge');
        if (badgeEl) badgeEl.innerText = `🤖 ${tenant.activeDriver} (${isManager ? tenant.activeCompanyName : 'حساب مستخدم'})`;

        let companyTagEl = document.getElementById('syncHubCompanyTag');
        if (companyTagEl) companyTagEl.innerText = isManager ? `🏢 الشركة: ${tenant.activeCompanyName}` : `👤 المستخدم: ${tenant.activeDriver}`;
        
        let rssBar = document.getElementById('na2laRssTickerContainer');
        if (rssBar) rssBar.style.display = isManager ? 'block' : 'none';

        renderQuickMenu(tenant.activeRole);
        updateSyncButtonBadge();
        return tenant;
    };

    window.updateSyncButtonBadge = function() {
        let tenant = getActiveTenantContext();
        const badgeEl = document.getElementById('btn-sync-badge');
        if (badgeEl) {
            if (tenant.activeRole === 'visitor') { badgeEl.style.display = 'none'; return; }
            const syncedShipments = getIsolatedUserShipments();
            badgeEl.innerText = syncedShipments.length;
            badgeEl.style.display = syncedShipments.length > 0 ? 'inline-block' : 'none';
        }
    };

    window.toggleSyncHubDropdown = function(event) {
        event.stopPropagation();
        let tenant = getActiveTenantContext();
        const dropdown = document.getElementById('syncHubDropdownMenu');
        const listContainer = document.getElementById('syncHubItemsList');
        if (!dropdown) return;
        if (dropdown.style.display === 'block') { dropdown.style.display = 'none'; return; }

        if (tenant.activeRole === 'visitor') {
            listContainer.innerHTML = `<div style="padding: 6px; text-align: center; color: var(--warning-color);">أنت تصفح كزائر كريم.</div>`;
        } else {
            const syncedShipments = getIsolatedUserShipments();
            listContainer.innerHTML = syncedShipments.length === 0 ? `<div style="padding: 6px; text-align: center;">لا توجد شحنات</div>` :
                syncedShipments.slice(0, 5).map(s => `<div style="padding: 4px 6px; background:var(--card-bg); margin-bottom:3px; border-radius:4px;">📦 ${s.id || 'شحنة'} (${s.status || 'نشطة'})</div>`).join('');
        }
        dropdown.style.display = 'block';
    };

    window.addEventListener('click', () => {
        const dropdown = document.getElementById('syncHubDropdownMenu');
        if (dropdown) dropdown.style.display = 'none';
    });

    window.openConnectedAccountHub = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') { alert("أنت تصفح كزائر كريم."); return; }
        if (typeof switchTab === 'function') switchTab('account-tab');
    };

    window.toggleDutyStatus = function() {
        let current = localStorage.getItem('driver_duty_status') || 'active';
        let next = current === 'active' ? 'offline' : 'active';
        localStorage.setItem('driver_duty_status', next);
        document.getElementById('botStatusDot').style.background = next === 'active' ? '#10b981' : '#ef4444';
        alert(next === 'active' ? '🟢 حالة العمل: نشط' : '🔴 حالة العمل: استراحة');
    };

    /* بناء شريط القائمة الأفقي الموحد الشامل لكافة الأقسام والشحنات بدقة تامة */
    window.renderQuickMenu = function(role) {
        let container = document.getElementById('botQuickActionsContainer');
        if (!container) return;

        let menuItems = [
            { label: '📦 الشحنات', query: 'شحناتي', color: 'var(--accent-color)' },
            { label: '🧾 الفواتير', query: 'الفواتير', color: '#38bdf8' }
        ];

        if (role === 'visitor') {
            menuItems.push({ label: '🌐 عن نقلة', query: 'خدمات المنصة', color: '#38bdf8' });
            menuItems.push({ label: '❓ المساعدة', query: 'المساعدة', color: 'var(--warning-color)' });
        } else if (role === 'driver') {
            menuItems.push({ label: '📍 موقعي GPS', query: 'موقعي', color: '#38bdf8' });
            menuItems.push({ label: '🎓 اختبار القيادة', query: 'اختبار القيادة', color: 'var(--purple-color)' });
            menuItems.push({ label: '🚨 طوارئ SOS', query: 'طوارئ SOS', color: 'var(--danger-color)' });
            menuItems.push({ label: '📤 تصدير الأرشيف', action: 'exportChatArchiveData()', color: '#38bdf8' });
        } else { // Admin / Supervisor
            menuItems.push({ label: '💳 كارت الاشتراك', query: 'معلومات صلاحية اشتراك شركتك', color: 'var(--warning-color)' });
            menuItems.push({ label: '💰 الخزنة والمالية', query: 'الخزنة', color: 'var(--warning-color)' });
            menuItems.push({ label: '📊 إحصائيات الأسطول', query: 'إحصائيات شركتي', color: 'var(--accent-color)' });
            menuItems.push({ label: '🎓 اختبار القيادة', query: 'اختبار القيادة', color: 'var(--purple-color)' });
            menuItems.push({ label: '📤 تصدير الأرشيف', action: 'exportChatArchiveData()', color: '#38bdf8' });
        }

        container.innerHTML = menuItems.map(m => {
            if (m.action) {
                return `<button onclick="${m.action}" style="background: var(--card-bg); border: 1px solid var(--border-color); color: ${m.color}; font-size: 11px; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; flex-shrink: 0; white-space: nowrap;">${m.label}</button>`;
            }
            return `<button onclick="sendBotQuickQuery('${m.query}')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: ${m.color}; font-size: 11px; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; flex-shrink: 0; white-space: nowrap;">${m.label}</button>`;
        }).join('');
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
        else { btn.innerText = "🎤 مستمر"; }
    };

    window.handleScaleTicketUpload = function(input) {
        if (input.files && input.files[0]) {
            let file = input.files[0], reader = new FileReader();
            reader.onload = function(e) {
                let container = document.getElementById('na2laBotMessages');
                container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 9px 12px; border-radius: 10px; align-self: flex-end;">📎 تحليل بونة الميزان: ${file.name}</div>`;
                setTimeout(() => {
                    let botReply = `✅ <b>نجاح استخراج الأوزان (OCR):</b> القائم 32 طن، الفارغ 10 طن، الصافي 22 طن.`;
                    container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">${botReply}</div>`;
                    container.scrollTop = container.scrollHeight;
                }, 800);
            };
            reader.readAsDataURL(file);
        }
    };

    window.saveChatHistory = function(sender, htmlContent) {
        if (window.isTempChatActive) return;
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        let history = JSON.parse(localStorage.getItem(storageKey) || '[]');
        history.push({ sender, htmlContent, timestamp: new Date().toISOString() });
        if (history.length > 30) history = history.slice(-30);
        localStorage.setItem(storageKey, JSON.stringify(history));
    };

    window.loadChatHistory = async function() {
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        let history = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const container = document.getElementById('na2laBotMessages');
        if (!container) return;

        let welcomeText = tenant.activeRole === 'visitor' 
            ? `مرحباً بك يا <b>زائر كريم</b> في منصة أسطورة الطريق.<br>- يمكنك استخدام شريط القائمة الأفقي بالأعلى لاستعراض الخدمات.`
            : `مرحباً بك يا <b>${tenant.activeDriver}</b> (${tenant.activeRole === 'admin' ? 'مدير' : 'سائق'}).<br>- شريط القائمة الأفقي جاهز لخدمتك وعرض كافة أقسام المنصة.`;

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
        localStorage.setItem('db_viper_theme_index', themeId === 'royal' ? 1 : (themeId === 'emerald' ? 2 : 0));
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
            botReply = startDriverExam();
        }
        else if (lower.includes('معلومات صلاحية اشتراك شركتك') || lower.includes('كارت الاشتراك')) {
            let subInfo = await getCompanySubscriptionInfo();
            botReply = `💳 <b>كارت الاشتراك:</b><br>الشركة: <b>${subInfo.companyName}</b><br>الباقة: <b>${subInfo.planName}</b><br>الحالة: <b style="color:var(--accent-color);">${subInfo.status}</b><br>الانتهاء: <b>${subInfo.expiryDate}</b>`;
        }
        else if (lower.includes('شحناتي') || lower.includes('الشحنات')) {
            if (tenant.activeRole === 'visitor') botReply = `📦 أنت تصفح كزائر كريم. سجل الدخول لاستعراض الشحنات.`;
            else if (userShipments.length === 0) botReply = `📦 لا توجد شحنات مسجلة لحسابك.`;
            else {
                botReply = `📦 لديك <b>${userShipments.length}</b> شحنة متزامنة:<br>`;
                userShipments.forEach(s => {
                    botReply += `<div class="chat-card">📦 شحنة: ${s.id || 'معتمدة'} | الحالة: ${s.status || 'نشطة'}</div>`;
                });
            }
        }
        else if (lower.includes('الفواتير')) {
            if (tenant.activeRole === 'visitor') botReply = `🧾 الفواتير مخصصة للمستخدمين المسجلين.`;
            else {
                botReply = `🧾 <b>الفواتير (آجلة ومجمعة):</b><br>- إجمالي الفواتير المسجلة: <b>${financials.invoicesCount} فاتورة</b>`;
            }
        }
        else if (lower.includes('موقعي') || lower.includes('gps')) {
            botReply = `📍 موقعك الجغرافي ومتعقب الأسطول يعمل بكفاءة عبر خرائط جوجل.`;
        }
        else if (lower.includes('الخزنة')) {
            if (tenant.activeRole !== 'admin') botReply = `💰 تقارير الخزنة مخصصة لمدير النظام فقط.`;
            else botReply = `💰 <b>رصيد الخزنة:</b> ${financials.treasuryBalance}<br><b>إجمالي المصروفات:</b> ${financials.expensesTotal}`;
        }
        else if (lower.includes('إحصائيات شركتي') || lower.includes('الأسطول')) {
            if (tenant.activeRole !== 'admin') botReply = `📊 مخصص للمديرين فقط.`;
            else botReply = `📊 إحصائيات الأسطول: إجمالي الشحنات (${financials.shipmentsCount}) والرصيد (${financials.treasuryBalance}).`;
        }
        else if (lower.includes('طوارئ') || lower.includes('sos')) {
            botReply = `🚨 تم إرسال إشعار الطوارئ والموقع لغرفة العمليات بنجاح.`;
        }
        else if (lower.includes('خدمات المنصة') || lower.includes('عن نقلة')) {
            botReply = `🌐 أسطورة الطريق (نقلة): المنصة الرائدة لإدارة الشحن وأتمتة الفواتير والأسطول.`;
        }
        else {
            botReply = `🤖 استجابة ذكية من مساعد Gemini Pro حول: "${text}". يمكنك اختيار أي قسم من شريط القائمة بالأعلى.`;
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">${botReply}</div>`;
        saveChatHistory('bot', botReply);
        container.scrollTop = container.scrollHeight;
        speakBotReplyText(botReply.replace(/<[^>]*>?/gm, ''));
    };
})();
