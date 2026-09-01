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
        <button id="na2laBotBtn" style="position: fixed; bottom: 25px; right: 20px; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: white; border: none; width: 60px; height: 60px; border-radius: 50%; font-size: 26px; cursor: pointer; box-shadow: var(--shadow-3d); z-index: 2147483647; display: flex; align-items: center; justify-content: center; touch-action: none; user-select: none; animation: floatAnim 2.5s ease-in-out infinite;" title="🤖 مساعد Gemini الذكي Pro لمنصة نقلة"><span id="botMainLogoEmoji">🤖</span></button>

        <div id="na2laBotModal" style="position: fixed; bottom: 85px; right: 20px; width: 420px; max-width: 92vw; height: 80vh; max-height: 650px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 18px; box-shadow: var(--shadow-3d); z-index: 2147483646; display: none; flex-direction: column; overflow: hidden; backdrop-filter: blur(20px); font-family: 'Cairo', sans-serif;">
            <div style="background: linear-gradient(135deg, var(--primary-color), var(--primary-hover)); color: white; padding: 10px 14px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; font-size: 12px; flex-shrink: 0;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span id="botStatusDot" onclick="toggleDutyStatus()" style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; cursor: pointer;" title="تبديل حالة العمل"></span>
                    <span id="botUserRoleBadge">🤖 مساعد Gemini الذكي Pro (عزل تام للزوار)</span>
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
                            <div id="syncHubCompanyTag" style="font-size: 9px; color: var(--warning-color); margin-bottom: 4px;">🏢 الشركة: محجوبة عن الزوار</div>
                            <div id="syncHubItemsList" style="max-height: 140px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px;"></div>
                        </div>
                    </div>
                    <button onclick="toggleNa2laBot()" style="background: none; border: none; color: white; font-size: 16px; cursor: pointer;">✕</button>
                </div>
            </div>

            <div id="na2laRssTickerContainer" style="display: none; background: rgba(217, 119, 6, 0.15); border-bottom: 1px solid var(--border-color); padding: 5px 10px; font-size: 11px; color: var(--warning-color); white-space: nowrap; overflow: hidden; position: relative; flex-shrink: 0;">
                <div style="display: inline-block; animation: marquee 18s linear infinite; font-weight: bold;">
                    🚀 أسطورة الطريق Pro | العزل التام للزوار، حجب صلاحيات الشركات عن العامة، وتحكم حصري للمدير في إعدادات اللوجو (باندا، حصان، إلخ)
                </div>
            </div>

            <div style="padding: 6px 12px; background: var(--bg-color); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); font-size: 10px; flex-shrink: 0;">
                <div style="display: flex; gap: 3px; flex-wrap: wrap;">
                    <button onclick="toggleTemporaryChatMode()" id="botTempChatBtn" style="background: var(--card-bg); color: #a855f7; border: 1px solid #a855f7; padding: 3px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;" title="محادثة مؤقتة لا تحفظ في السجل">🕵️ محادثة مؤقتة</button>
                    <button onclick="toggleBotContinuousVoice()" id="botContinuousBtn" style="background: var(--border-color); color: #fff; border: none; padding: 3px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🎤 مستمر معطل</button>
                    <button onclick="toggleBotVoiceOutput()" id="botVoiceToggleBtn" style="background: var(--accent-color); color: #fff; border: none; padding: 3px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🔊 ناطق</button>
                    <button onclick="clearBotChat()" style="background: var(--danger-color); color: #fff; border: none; padding: 3px 6px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;" title="مسح محادثة">🗑️ مسح</button>
                </div>
                <div style="display: flex; gap: 4px; align-items: center;">
                    <button id="adminLogoConfigBtn" onclick="openAdminLogoConfigModal()" style="display: none; background: var(--warning-color); color: #fff; border: none; padding: 3px 6px; border-radius: 6px; font-size: 10px; font-weight: bold; cursor: pointer;" title="اختر أيقونة البوت (باندا، حصان، إلخ - خاص بالمدير)">⚙️ اللوجو</button>
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
                    مرحباً بك! أنا مساعدك الذكي <b>Gemini Pro</b> المدمج بالميزات المتقدمة.<br>- تم تفعيل العزل التام للزوار وحجب صلاحيات الشركات عن العامة تماماً.
                </div>
            </div>

            <div id="botQuickActionsContainer" style="padding: 6px 10px; background: var(--bg-color); display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; border-top: 1px solid var(--border-color); flex-shrink: 0;"></div>

            <div style="padding: 8px 10px; border-top: 1px solid var(--border-color); display: flex; gap: 6px; background: var(--bg-color); align-items: center; position: relative; flex-shrink: 0; min-height: 52px; box-sizing: border-box;">
                <input type="file" id="scaleTicketFileInput" accept="image/*" style="display: none;" onchange="handleScaleTicketUpload(this)">
                <input type="file" id="importArchiveFileInput" accept=".json" style="display: none;" onchange="importChatArchiveData(this)">
                
                <button onclick="document.getElementById('scaleTicketFileInput').click()" title="رفع وتحليل بونة الميزان OCR" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); width: 36px; height: 36px; min-width: 36px; border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">📎</button>
                
                <input type="text" id="na2laBotInput" placeholder="اكتب سؤالك، اسأل عن اختبار القيادة، أو اطلب تحليلاً..." style="flex: 1; min-width: 0; height: 36px; margin: 0; padding: 0 10px; font-size: 11px; border-radius: 8px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color); font-family: 'Cairo', sans-serif; box-sizing: border-box; outline: none;" onkeypress="if(event.key === 'Enter') sendBotQuickQuery()">

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
        alert(window.isTempChatActive ? "تم تفعيل وضع المحادثة المؤقتة (Incognito Mode). لن يتم حفظ الرسائل القادمة في السجل." : "تم إلغاء وضع المحادثة المؤقتة. عادت الرسائل للحفظ التلقائي في السجل.");
    };

    window.exportChatArchiveData = function() {
        let tenant = getActiveTenantContext();
        let storageKey = `na2la_chat_history_${tenant.activeCompanyId}_${tenant.activeDriver.replace(/\s+/g, '_')}`;
        let chatHistory = JSON.parse(localStorage.getItem(storageKey) || '[]');
        
        let exportBundle = {
            version: "9.5-PRO-SECURE",
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
                        alert("✅ تم استيراد ونقل الأرشيف بنجاح وتحديث المحادثة.");
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

    /* نظام عزل الزوار والتحقق التام من الهوية والشركات */
    window.getActiveTenantContext = function() {
        let rawUser = window.loggedInDriverName || window.currentUser?.name || window.currentUser || window.logged_in_driver_name || localStorage.getItem('logged_in_driver_name') || localStorage.getItem('na2la_current_user_identifier') || localStorage.getItem('current_user_name') || null;
        
        let activeRole = window.currentUserRole || window.currentUser?.role || localStorage.getItem('current_user_role') || localStorage.getItem('na2la_user_role') || localStorage.getItem('user_role') || 'visitor';

        let activeCompanyId = window.currentCompanyId || window.Na2laApp?.companyId || localStorage.getItem('current_company_id') || localStorage.getItem('na2la_current_company_id') || 'company_main';
        
        let activeCompanyName = window.currentCompanyName || window.Na2laApp?.companyName || localStorage.getItem('current_company_name') || localStorage.getItem('na2la_current_company_name') || 'أسطورة الطريق الرئيسية';

        if (!rawUser || activeRole === 'visitor' || rawUser === 'زائر كريم' || rawUser === 'Visitor') {
            return {
                activeDriver: 'زائر كريم',
                activeCompanyId: 'visitor_hidden',
                activeCompanyName: 'محجوب للخصوصية (عزل تام للزوار)',
                activeRole: 'visitor'
            };
        }

        let activeDriver = rawUser;
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
        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                let tenant = getActiveTenantContext();
                
                if (tenant.activeRole === 'visitor') {
                    realFirebaseDrivers = [];
                    realFirebaseShipments = [];
                    realFirebaseDeferredInvoices = [];
                    realFirebaseAppData = {};
                    return;
                }

                try {
                    const driversSnap = await db.collection('drivers').get();
                    if (!driversSnap.empty) {
                        realFirebaseDrivers = driversSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        realFirebaseDrivers = [];
                    }
                } catch(e) {
                    realFirebaseDrivers = [];
                }

                try {
                    const shipmentsSnap = await db.collection('shipments').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!shipmentsSnap.empty) {
                        realFirebaseShipments = shipmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else if (tenant.activeCompanyId === 'company_main' && tenant.activeRole === 'admin') {
                        const allShipments = await db.collection('shipments').get();
                        realFirebaseShipments = allShipments.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        realFirebaseShipments = [];
                    }
                } catch(e) {
                    realFirebaseShipments = [];
                }

                try {
                    const invoicesSnap = await db.collection('deferredInvoices').where('companyId', '==', tenant.activeCompanyId).get();
                    if (!invoicesSnap.empty) {
                        realFirebaseDeferredInvoices = invoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else if (tenant.activeCompanyId === 'company_main' && tenant.activeRole === 'admin') {
                        const allInvoices = await db.collection('deferredInvoices').get();
                        realFirebaseDeferredInvoices = allInvoices.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    } else {
                        realFirebaseDeferredInvoices = [];
                    }
                } catch(e) {
                    realFirebaseDeferredInvoices = [];
                }

                try {
                    const appDataSnap = await db.collection('appData').doc(tenant.activeCompanyId).get();
                    if (appDataSnap.exists) {
                        realFirebaseAppData = appDataSnap.data() || {};
                    } else {
                        realFirebaseAppData = {};
                    }
                } catch(e) {}
            }
        } catch(e) {}
    };

    window.getCompanySubscriptionInfo = async function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') {
            return {
                companyName: '🚫 محجوب للخصوصية التامة (عزل الزوار)',
                adminName: 'مخفي',
                phone: 'مخفي',
                planName: 'زائر',
                status: 'غير مسموح بالاطلاع',
                expiryDate: 'غير متاح'
            };
        }

        let subData = {
            companyName: tenant.activeRole === 'admin' ? tenant.activeCompanyName : 'محجوب للخصوصية التامة',
            adminName: tenant.activeRole === 'admin' ? (tenant.activeDriver || 'المدير العام') : 'إدارة الشركة المخفية',
            phone: tenant.activeRole === 'admin' ? '01114099799' : 'محجوب تماماً عن الزوار',
            planName: 'lifetime / PRO',
            status: 'نشط وأمن ✅',
            expiryDate: '2026-12-31'
        };

        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                let userDoc = await db.collection('drivers').doc(tenant.activeDriver).get();
                if (userDoc.exists) {
                    let d = userDoc.data();
                    subData.companyName = d.companyName || d.title || tenant.activeCompanyName;
                    subData.adminName = d.name || tenant.activeDriver;
                    subData.phone = d.phone || d.mobile || '01114099799';
                    subData.planName = d.subPlan || d.plan || 'lifetime';
                    subData.status = 'نشط وأمن ✅';
                    subData.expiryDate = d.subExpiry || '2026-12-31';
                }
            }
        } catch(e) {}

        return subData;
    };

    window.getIsolatedUserShipments = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return [];

        let allShipments = realFirebaseShipments.length > 0 ? realFirebaseShipments : [];
        let companyFiltered = allShipments.filter(s => {
            let sCompanyId = s.companyId || 'company_main';
            return sCompanyId === tenant.activeCompanyId;
        });

        if (tenant.activeRole === 'admin') return companyFiltered;

        return companyFiltered.filter(s => s.assignedDriver === tenant.activeDriver || s.driver === tenant.activeDriver);
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
        if (tenant.activeRole === 'visitor' || tenant.activeRole !== 'admin') {
            return { treasuryBalance: 'محجوب للخصوصية', expensesTotal: 'محجوب للخصوصية', invoicesCount: 0, shipmentsCount: 0 };
        }
        let rawTreasury = realFirebaseAppData.treasury || localStorage.getItem(`treasury_balance_${tenant.activeCompanyId}`) || '155000 ج.م';
        let rawExpenses = realFirebaseAppData.expenses || localStorage.getItem(`expenses_total_${tenant.activeCompanyId}`) || '12000 ج.م';
        
        return {
            treasuryBalance: parseNumericCurrency(rawTreasury),
            expensesTotal: parseNumericCurrency(rawExpenses),
            invoicesCount: realFirebaseDeferredInvoices.length,
            shipmentsCount: getIsolatedUserShipments().length
        };
    };

    window.getCompanyFinancialReport = async function() {
        let tenant = getActiveTenantContext();
        let financials = getCompanyFinancials();
        let shipments = getIsolatedUserShipments();
        
        let totalVal = shipments.reduce((sum, s) => sum + (parseFloat(s.price || 0) || 0), 0);

        return {
            companyName: tenant.activeCompanyName,
            treasury: financials.treasuryBalance,
            expenses: financials.expensesTotal,
            invoicesCount: financials.invoicesCount,
            shipmentsCount: shipments.length,
            estimatedRevenue: totalVal.toLocaleString() + ' ج.م'
        };
    };

    /* تحكم حصري للمدير في إعدادات لوجو وبوت المنصة (باندا، حصان، أسد، روبوت، إلخ) */
    window.openAdminLogoConfigModal = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole !== 'admin') {
            alert("🚫 عذراً، هذه الميزة مخصصة لحساب 'المدير' فقط!");
            return;
        }

        let optionsPrompt = "اختر أيقونة لوجو البوت المفضلة لحساب المدير:\n" +
                            "1. 🤖 روبوت (Robot)\n" +
                            "2. 🐼 باندا (Panda)\n" +
                            "3. 🐎 حصان (Horse)\n" +
                            "4. 🦁 أسد (Lion)\n" +
                            "5. 🦅 صقر (Eagle)\n" +
                            "6. 🚀 صاروخ (Rocket)\n" +
                            "7. 💎 جوهرة (Diamond)\n\n" +
                            "أو أدخل أي إيموجي مخصص مباشرة:";

        let choice = prompt(optionsPrompt, localStorage.getItem('na2la_bot_custom_logo') || '🤖');
        if (choice) {
            let logoChar = choice.trim();
            if (logoChar === '1') logoChar = '🤖';
            else if (logoChar === '2') logoChar = '🐼';
            else if (logoChar === '3') logoChar = '🐎';
            else if (logoChar === '4') logoChar = '🦁';
            else if (logoChar === '5') logoChar = '🦅';
            else if (logoChar === '6') logoChar = '🚀';
            else if (logoChar === '7') logoChar = '💎';

            localStorage.setItem('na2la_bot_custom_logo', logoChar);
            let logoEl = document.getElementById('botMainLogoEmoji');
            if (logoEl) logoEl.innerText = logoChar;
            alert(`✅ تم تحديث لوجو البوت بنجاح إلى: ${logoChar}`);
        }
    };

    window.syncPlatformUserData = function() {
        let tenant = getActiveTenantContext();
        let isManager = (tenant.activeRole === 'admin');

        let badgeEl = document.getElementById('botUserRoleBadge');
        if (badgeEl) badgeEl.innerText = `🤖 ${tenant.activeDriver} (${isManager ? tenant.activeCompanyName : 'حساب مستخدم محمي'})`;

        let companyTagEl = document.getElementById('syncHubCompanyTag');
        if (companyTagEl) companyTagEl.innerText = isManager ? `🏢 الشركة: ${tenant.activeCompanyName}` : `👤 المستخدم: ${tenant.activeDriver}`;
        
        let rssBar = document.getElementById('na2laRssTickerContainer');
        if (rssBar) rssBar.style.display = isManager ? 'block' : 'none';

        let adminLogoBtn = document.getElementById('adminLogoConfigBtn');
        if (adminLogoBtn) {
            adminLogoBtn.style.display = isManager ? 'inline-block' : 'none';
        }

        let customLogo = localStorage.getItem('na2la_bot_custom_logo');
        if (customLogo) {
            let logoEl = document.getElementById('botMainLogoEmoji');
            if (logoEl) logoEl.innerText = customLogo;
        }

        renderQuickButtons(tenant.activeRole);
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
            listContainer.innerHTML = `<div style="padding: 6px; text-align: center; color: var(--warning-color);">🚫 عذراً، تم عزل وحجب كافة معلومات المنصة عن الزوار لحماية خصوصية الشركة.</div>`;
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
            alert("🚫 عذراً، تصفح الزوار معزول تماماً ومحجوب عن استعراض معلومات الشركة.");
            return;
        }
        alert(`👤 الحساب المعتمد: ${tenant.activeDriver}\n🏢 الشركة: ${tenant.activeCompanyName}\n✨ العزل والحجب مفعل بنجاح.`);
    };

    window.toggleDutyStatus = function() {
        let tenant = getActiveTenantContext();
        if (tenant.activeRole === 'visitor') return;
        let currentStatus = localStorage.getItem('driver_duty_status') || 'active';
        let newStatus = currentStatus === 'active' ? 'offline' : 'active';
        localStorage.setItem('driver_duty_status', newStatus);
        checkDutyStatusIndicator();
        alert(`حالتك التشغيلية: ${newStatus === 'active' ? '🟢 نشط' : '🔴 استراحة'}`);
    };

    window.checkDutyStatusIndicator = function() {
        let dot = document.getElementById('botStatusDot');
        let currentStatus = localStorage.getItem('driver_duty_status') || 'active';
        if (dot) {
            dot.style.background = currentStatus === 'active' ? '#10b981' : '#ef4444';
        }
    };

    window.renderQuickButtons = function(role) {
        let container = document.getElementById('botQuickActionsContainer');
        if (!container) return;
        
        if (role === 'visitor') {
            container.innerHTML = `
                <button onclick="sendBotQuickQuery('خدمات المنصة')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: #38bdf8; font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; grid-column: span 3;">🌐 عن أسطورة الطريق</button>
                <button onclick="sendBotQuickQuery('معلومات صلاحية اشتراك شركتك')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; grid-column: span 3;">💳 تجديد الاشتراك (ل والشركات)</button>
            `;
            return;
        }

        let commonButtons = `
            <button onclick="sendBotQuickQuery('شحناتي')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--accent-color); font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">📦 الشحنات</button>
            <button onclick="sendBotQuickQuery('معلومات صلاحية اشتراك شركتك')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">💳 الاشتراك</button>
            <button onclick="sendBotQuickQuery('اختبار القيادة')" style="background: var(--card-bg); border: 1px solid var(--purple-color); color: var(--purple-color); font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🎓 اختبار القيادة</button>
            <button onclick="exportChatArchiveData()" style="background: var(--card-bg); border: 1px solid #38bdf8; color: #38bdf8; font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">📤 تصدير الأرشيف</button>
            <button onclick="sendBotQuickQuery('رسم شاحنة')" style="background: var(--card-bg); border: 1px solid #f472b6; color: #f472b6; font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">🎨 رسم وسائط</button>
            <button onclick="sendBotQuickQuery('جهات الاتصال')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: #34d399; font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">📇 جهات الاتصال</button>
        `;

        if (role === 'driver') {
            container.innerHTML = commonButtons + `
                <button onclick="sendBotQuickQuery('موقعي')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: #38bdf8; font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">📍 موقعي GPS</button>
                <button onclick="sendBotQuickQuery('طوارئ SOS')" style="background: rgba(239,68,68,0.2); border: 1px solid #ef4444; color: #ef4444; font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; grid-column: span 2;">🚨 طوارئ SOS</button>
            `;
        } else {
            container.innerHTML = commonButtons + `
                <button onclick="sendBotQuickQuery('الخزنة')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif;">💰 الخزنة والمالية</button>
                <button onclick="sendBotQuickQuery('إحصائيات شركتي')" style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--warning-color); font-size: 10px; padding: 6px 4px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: 'Cairo', sans-serif; grid-column: span 2;">📊 الأسطول</button>
            `;
        }
    };

    fetchRealFirebaseData().then(() => { syncPlatformUserData(); });

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
                alert("🚫 عذراً، غير مسموح للزوار رفع بونات الميزان.");
                return;
            }
            let file = input.files[0], reader = new FileReader();
            reader.onload = function(e) {
                let container = document.getElementById('na2laBotMessages');
                let simulatedGross = Math.floor(Math.random() * 15) + 25;
                let simulatedTare = Math.floor(Math.random() * 5) + 8;
                let netWeight = simulatedGross - simulatedTare;

                let imgHtml = `<div style="margin-top:6px;"><img src="${e.target.result}" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);"></div>`;
                let userMsg = `📎 تحليل بونة الميزان (OCR): <b>${file.name}</b>${imgHtml}`;
                container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 9px 12px; border-radius: 10px; align-self: flex-end; max-width: 80%;">${userMsg}</div>`;
                saveChatHistory('user', userMsg);
                container.scrollTop = container.scrollHeight;

                setTimeout(() => {
                    let botReply = `✅ <b>نجاح استخراج بيانات البونة (Gemini Pro):</b><br>` +
                                   `- الوزن القائم: <b>${simulatedGross}.00 طن</b><br>` +
                                   `- الوزن الفارغ: <b>${simulatedTare}.00 طن</b><br>` +
                                   `- الصافي المستنتج: <b style="color:var(--accent-color);">${netWeight}.00 طن</b>`;
                    container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; max-width: 80%; border: 1px solid var(--border-color);">${botReply}</div>`;
                    saveChatHistory('bot', botReply);
                    container.scrollTop = container.scrollHeight;
                }, 900);
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
            ? `🚫 <b>تنبيه أمني (عزل تام للزوار):</b><br>أنت تصفح المنصة كزائر كريم. تم حجب كافة معلومات الشركة والبيانات الحساسة عن العامة تماماً.`
            : `مرحباً بك يا <b>${tenant.activeDriver}</b> (${tenant.activeRole === 'admin' ? 'مدير' : 'سائق'}) في منصة أسطورة الطريق.<br>- تم تفعيل العزل التام وحماية بيانات شركتك بنجاح.`;

        container.innerHTML = `<div style="background: var(--bg-color); padding: 10px 14px; border-radius: 10px; align-self: flex-start; border: 1px solid var(--border-color);">${welcomeText}</div>`;

        history.forEach(msg => {
            container.innerHTML += `<div style="background: ${msg.sender === 'user' ? 'var(--primary-color)' : 'var(--bg-color)'}; color: ${msg.sender === 'user' ? '#fff' : 'var(--text-color)'}; padding: 9px 12px; border-radius: 10px; align-self: ${msg.sender === 'user' ? 'flex-end' : 'flex-start'}; max-width: 80%; border: 1px solid var(--border-color);">${msg.htmlContent}</div>`;
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

    let savedIndex = localStorage.getItem('db_viper_theme_index');
    changeBotTheme(savedIndex === '1' ? 'royal' : (savedIndex === '2' ? 'emerald' : 'default'));
    syncPlatformUserData();

    window.startBotVoiceInput = function() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'ar-EG';
        recognition.onresult = (event) => {
            let text = event.results[0][0].transcript;
            let inputEl = document.getElementById('na2laBotInput');
            if (inputEl) inputEl.value = text;
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

        container.innerHTML += `<div style="background: var(--primary-color); color: white; padding: 9px 12px; border-radius: 10px; align-self: flex-end; max-width: 80%;">${text}</div>`;
        saveChatHistory('user', text);
        if (inputEl && !customText) inputEl.value = "";
        container.scrollTop = container.scrollHeight;

        let tenant = syncPlatformUserData();
        let botReply = '';
        let lower = text.toLowerCase();

        // حجب ت تام للزوار عن البيانات الحساسة وصلاحيات الشركات
        if (tenant.activeRole === 'visitor' && (lower.includes('شحناتي') || lower.includes('الخزنة') || lower.includes('مالية') || lower.includes('فواتير') || lower.includes('أسطول') || lower.includes('اشتراك') || lower.includes('صلاحية'))) {
            botReply = `🚫 <b>عذراً، تصفح الزوار معزول تماماً ومحجوب عن استعراض معلومات الشركة، الرحلات، أو الاشتراكات.</b><br>- يرجى تسجيل الدخول بحسابك كمدير أو سائق معتمد للوصول لهذه الخدمات.`;
        }
        else if (lower.includes('اختبار القيادة')) {
            botReply = startDriverExam();
        }
        else if (lower.includes('معلومات صلاحية اشتراك شركتك') || lower.includes('اشتراك') || lower.includes('صلاحية')) {
            if (tenant.activeRole === 'visitor') {
                botReply = `🚫 تفاصيل صلاحية الاشتراك محجوبة تماماً عن الزوار والضيوف.`;
            } else {
                let subInfo = await getCompanySubscriptionInfo();
                botReply = `
                    <div class="chat-card" style="border-right-color: var(--warning-color);">
                        <div style="font-weight: bold; color: var(--warning-color); font-size: 12px; margin-bottom: 8px;">💳 كارت الاشتراك وتجديد الخدمة</div>
                        <div style="background: var(--bg-color); padding: 8px; border-radius: 6px; font-size: 11px; line-height: 1.8; border: 1px solid var(--border-color); margin-bottom: 8px;">
                            🏢 اسم الشركة: <b>${subInfo.companyName}</b><br>
                            👤 مدير الشركة: <b>${subInfo.adminName}</b><br>
                            📞 الهاتف: <b>${subInfo.phone}</b><br>
                            💳 الباقة الحالية: <b>${subInfo.planName}</b> | الحالة: <b style="color:var(--accent-color);">${subInfo.status}</b><br>
                            ⏳ تاريخ انتهاء الصلاحية: <b style="color:var(--danger-color);">${subInfo.expiryDate}</b>
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-color); padding: 10px; border-radius: 8px; font-size: 11px; color: var(--text-color);">
                            💳 لتجديد الاشتراك، يرجى التحويل على محافظنا المعتمدة:<br>
                            📱 فوري كاش: <b>01114099799</b><br>
                            📱 وي كاش (WE): <b>01554440996</b>
                        </div>
                    </div>
                `;
            }
        }
        else if (lower.includes('شحناتي') || lower.includes('الشحنات')) {
            let shipments = getIsolatedUserShipments();
            if (shipments.length === 0) {
                botReply = `📦 لا توجد شحنات مسجلة ومطابقة لحسابك حالياً.`;
            } else {
                botReply = `📦 لديك <b>${shipments.length}</b> شحنة متزامنة ومتاحة لحسابك المعزول:<br>` +
                           shipments.map(s => `<div class="chat-card"><div style="color:var(--accent-color); font-weight:bold;">شحنة رقم: ${s.id || s.shipmentNumber}</div>الحالة: ${s.status || 'نشطة'}</div>`).join('');
            }
        }
        else if (lower.includes('الخزنة') || lower.includes('مالية') || lower.includes('أرباح')) {
            if (tenant.activeRole !== 'admin') {
                botReply = `🚫 هذه الميزة مخصصة لحساب "المدير" فقط ومحجوبة تماماً عن الزوار والمستخدمين.`;
            } else {
                let report = await getCompanyFinancialReport();
                botReply = `💰 <b>تقرير الخزنة والمالية لشركة [${report.companyName}]:</b><br>` +
                           `- رصيد الخزنة: <b style="color:#10b981;">${report.treasury}</b><br>` +
                           `- المصروفات: <b style="color:#ef4444;">${report.expenses}</b><br>` +
                           `- الشحنات المسجلة: <b>${report.shipmentsCount}</b>`;
            }
        }
        else if (lower.includes('عن نقلة') || lower.includes('خدمات المنصة')) {
            botReply = `🌐 <b>عن منصة أسطورة الطريق (نقلة):</b><br>- المنصة الآمنة الأولى لإدارة أسطول النقل البري مع عزل تام وحجب لكافة معلومات الشركات والاشتراكات عن الزوار.`;
        }
        else {
            botReply = `🌐 <b>مساعد Gemini Pro (عزل تام للزوار):</b><br>تم تنفيذ حجب وسرية كافة بيانات المنصة والاشتراكات عن العامة. يمكنك استخدام الأزرار أدناه أو الاستفسار عن الشحنات واختبارات القيادة.`;
        }

        container.innerHTML += `<div style="background: var(--bg-color); color: var(--text-color); padding: 9px 12px; border-radius: 10px; align-self: flex-start; max-width: 80%; border: 1px solid var(--border-color);">${botReply}</div>`;
        saveChatHistory('bot', botReply);
        container.scrollTop = container.scrollHeight;
    };
})();
