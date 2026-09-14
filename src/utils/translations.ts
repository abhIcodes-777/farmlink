export interface LanguageStrings {
  code: string;
  native: string;
  label: string;
  tag: string;
  title1: string;
  title2: string;
  sub: string;
  voicePrompt: string;
  voiceListening: string;
  btnOpenMarket: string;
  btnLogistics: string;
  btnWhyFarmlink: string;
  btnListProduce: string;
  apmcTicker: string;
  navOverview: string;
  navMarketplace: string;
  navBidding: string;
  navAI: string;
  navLogistics: string;
  navEscrow: string;
  metrics: { label: string; val: string; desc: string; subtext: string }[];
  storyHeaderTag: string;
  storyTitle: string;
  storySub: string;
  legacyTitle: string;
  legacyBadge: string;
  farmlinkTitle: string;
  farmlinkBadge: string;
  vegCatalogTitle: string;
  vegCatalogSub: string;
  vegVerifiedCount: string;
  btnBuyDirect: string;
  btnB2B: string;
  mandiRate: string;
  farmlinkRate: string;
}

export const TRANSLATIONS: Record<string, LanguageStrings> = {
  // 1. TELUGU
  te: {
    code: 'te',
    native: 'తెలుగు',
    label: 'Telugu',
    tag: 'SIH సొల్యూషన్ 2026 • నేరుగా రైతు నుండి వినియోగదారుడికి',
    title1: 'భారతదేశ ఆహార నెట్‌వర్క్ నుండి దళారుల తొలగింపు.',
    title2: 'రైతులకు నేరుగా పూర్తి ఆదాయం. సున్నా కమీషన్ దోపిడీ.',
    sub: 'వ్యవసాయ ఉత్పత్తిదారులు మరియు వినియోగదారుల మధ్య ఉన్న 5-7 దళారీ వ్యవస్థలను నిర్మూలించడం. అదానీ అగ్రి లాజిస్టిక్స్ కోల్డ్ సైలోస్ మరియు కిసాన్ సభ వాహన పూలింగ్‌తో అనుసంధానించబడింది.',
    voicePrompt: "వాయిస్ అసిస్టెంట్: 'టమాటా రేటు ఎంత?' లేదా 'కిసాన్ సభ ట్రక్ బుక్ చేయండి' అని చెప్పండి...",
    voiceListening: 'వినబడుతోంది...',
    btnOpenMarket: 'డైరెక్ట్ మార్కెట్‌ప్లేస్ తెరవండి',
    btnLogistics: 'అదానీ సైలోస్ & కిసాన్ సభ లాజిస్టిక్స్',
    btnWhyFarmlink: 'ఫార్మ్‌లింక్ ఎందుకు? (కథ & మూలాలు)',
    btnListProduce: 'పంటను అమ్మండి (రైతు)',
    apmcTicker: 'మార్కెట్ యార్డ్ లైవ్ ధరలు:',
    navOverview: 'మూలాలు & కథ',
    navMarketplace: 'మార్కెట్‌ప్లేస్',
    navBidding: 'లైవ్ వేలం',
    navAI: 'AI డిమాండ్ అంచనా',
    navLogistics: 'లాజిస్టిక్స్ హబ్',
    navEscrow: 'నమ్మకం & ఎస్క్రో',
    metrics: [
      { label: 'రైతులకు అధిక ఆదాయం', val: '+38.4%', desc: 'మండి కమీషన్ల కోత లేకుండా', subtext: 'నేరుగా బ్యాంకు ఖాతాలో జమ' },
      { label: 'వినియోగదారులకు ఆదా', val: '-24.6%', desc: 'ఖరీదైన దళారీ మార్కప్‌లు లేవు', subtext: 'తాజా పంట నేరుగా ఇంటికే' },
      { label: 'పంట నష్టం తగ్గింపు', val: '<1.2%', desc: '28% నష్టం నుండి భారీ తగ్గుదల', subtext: 'అదానీ రీఫర్ కోల్డ్ చైన్' },
      { label: 'స్మార్ట్ ఎస్క్రో చెల్లింపు', val: '24-48 గం', desc: 'డెలివరీ కాగానే తక్షణ నగదు విడుదల', subtext: 'సాంప్రదాయ 3 వారాల బదులు' }
    ],
    storyHeaderTag: 'వ్యవస్థాగత సంస్కరణ • SIH సొల్యూషన్ 2026',
    storyTitle: 'ఫార్మ్‌లింక్ ఎందుకు పుట్టింది?',
    storySub: 'సాంప్రదాయ మార్కెట్లలో వాతావరణం మరియు శ్రమ రిస్క్ భరించే రైతుకు వినియోగదారుడు చెల్లించే రూపాయిలో కేవలం 25-35 పైసలు మాత్రమే అందుతాయి. మిగిలిన మొత్తం మధ్యవర్తుల జేబుల్లోకి వెళ్తుంది.',
    legacyTitle: 'లోపభూయిష్ట సాంప్రదాయ దళారీ వ్యవస్థ',
    legacyBadge: '65% ఆదాయం నష్టం',
    farmlinkTitle: 'ఫార్మ్‌లింక్ డైరెక్ట్ ప్రొటోకాల్',
    farmlinkBadge: 'నేరుగా 1-2 దశలు',
    vegCatalogTitle: '25+ తాజా కూరగాయల డైరెక్ట్ మార్కెట్',
    vegCatalogSub: 'మహారాష్ట్ర, కర్ణాటక, ఆంధ్రప్రదేశ్, మరియు తమిళనాడు రైతుల నుండి నేరుగా తాజా కూరగాయలు. దళారుల దోపిడీకి స్వస్తి పలికి నేరుగా పొందండి.',
    vegVerifiedCount: '25 ధృవీకరించబడిన తాజా కూరగాయలు లైవ్‌లో ఉన్నాయి',
    btnBuyDirect: 'నేరుగా కొనండి',
    btnB2B: 'హోల్‌సేల్ B2B',
    mandiRate: 'మండి రేటు:',
    farmlinkRate: 'రైతు రేటు:'
  },

  // 2. ENGLISH
  en: {
    code: 'en',
    native: 'English',
    label: 'English',
    tag: 'SIH SOLUTION 2026 • DIRECT AGRI-DISINTERMEDIATION',
    title1: "Disintermediating India's Food Grid.",
    title2: 'Direct Farmer Payouts. Zero Parasitic Margins.',
    sub: 'Eliminating the 5-7 exploitative intermediary layers between agricultural producers and consumers. Integrated with Adani Agri Logistics scientific cold silos and Kisan Sabha rural freight pooling.',
    voicePrompt: "Voice Assistant: Speak 'Tomato price today' or 'Book Kisan Sabha pool'...",
    voiceListening: 'LISTENING...',
    btnOpenMarket: 'Open Direct Marketplace',
    btnLogistics: 'Adani Silos & Kisan Sabha Logistics',
    btnWhyFarmlink: 'Why Farmlink? (Disintermediation Story)',
    btnListProduce: 'List Produce (Farmer)',
    apmcTicker: 'APMC LIVE MANDI TICKER:',
    navOverview: 'Origins & Story',
    navMarketplace: 'Marketplace',
    navBidding: 'Live Bidding',
    navAI: 'AI Forecasting',
    navLogistics: 'Logistics Hub',
    navEscrow: 'Trust & Escrow',
    metrics: [
      { label: 'Realized Farmer Payout', val: '+38.4%', desc: 'Direct vs 4-tier APMC cuts', subtext: 'Zero commission agents' },
      { label: 'Consumer Basket Savings', val: '-24.6%', desc: 'Farm-gate fresh direct to door', subtext: 'No artificial inflation' },
      { label: 'Cold Chain Transit Spoilage', val: '<1.2%', desc: 'Down from 28% in open transit', subtext: 'Adani Reefer Fleet' },
      { label: 'Smart Escrow UPI Settlement', val: '24-48 hrs', desc: 'Instant release on delivery OTP', subtext: 'vs 3-4 weeks in mandis' }
    ],
    storyHeaderTag: 'SYSTEMIC DIAGNOSIS • SIH SOLUTION 2026',
    storyTitle: 'Why Did Farmlink Originate?',
    storySub: 'In traditional Indian agriculture, the farmer who bears 100% of the climate and production risk receives merely 25-35% of the final consumer rupee. Five to seven parasitic intermediary tiers pocket the rest, while 30% of perishable vegetables rot in open transit.',
    legacyTitle: 'The Broken Legacy Chain',
    legacyBadge: '65% Margin Drain',
    farmlinkTitle: 'The Farmlink Protocol',
    farmlinkBadge: '1–2 Hops Direct',
    vegCatalogTitle: 'Direct Farm-Gate Vegetables (25+ Catalog)',
    vegCatalogSub: 'Inspect 25+ vegetables directly connected from smallholder farmers & FPOs across Maharashtra, Karnataka, Gujarat, UP, and Tamil Nadu. Compare the unfair middleman cut against Farmlink direct farm price.',
    vegVerifiedCount: '25 Verified Vegetables in Live Network',
    btnBuyDirect: 'Buy Direct',
    btnB2B: 'B2B Wholesale',
    mandiRate: 'Mandi Rate:',
    farmlinkRate: 'Farmer Rate:'
  },

  // 3. HINDI
  hi: {
    code: 'hi',
    native: 'हिन्दी',
    label: 'Hindi',
    tag: 'एसआईएच सोल्यूशन 2026 • सीधा किसान से उपभोक्ता',
    title1: 'बिचौलियों का अंत, किसानों को पूरा दाम।',
    title2: 'सीधा खेत से उपभोक्ता तक पारदर्शी व्यापार।',
    sub: 'खेत और खरीदार के बीच 5-7 मध्यस्थों की लूट खत्म। अडानी एग्री लॉजिस्टिक्स साइलो और किसान सभा वाहन पूलिंग के साथ आधुनिक कोल्ड-चेन सप्लाई।',
    voicePrompt: "आवाज़ से खोजें: 'टमाटर का मंडी भाव दिखाओ' या 'ट्रक बुक करो'...",
    voiceListening: 'सुन रहे हैं...',
    btnOpenMarket: 'सीधा बाज़ार खोलें',
    btnLogistics: 'अडानी साइलो और किसान सभा लॉजिस्टिक्स',
    btnWhyFarmlink: 'फार्मलिंक क्यों? (मूल कहानी)',
    btnListProduce: 'फसल बेचें (किसान)',
    apmcTicker: 'मंडी लाइव रेट:',
    navOverview: 'मूल और कहानी',
    navMarketplace: 'मार्केटप्लेस',
    navBidding: 'लाइव नीलामी',
    navAI: 'AI मांग पूर्वानुमान',
    navLogistics: 'लॉजिस्टिक्स हब',
    navEscrow: 'भरोसा और एस्क्रो',
    metrics: [
      { label: 'किसान को अधिक कमाई', val: '+38.4%', desc: 'बिचौलियों के कमीशन से मुक्ति', subtext: 'सीधा बैंक में पैसा' },
      { label: 'उपभोक्ता को बचत', val: '-24.6%', desc: 'ताज़ा सब्ज़ियां सीधे खेत से', subtext: 'सस्ता और पौष्टिक' },
      { label: 'फसल बर्बादी में कमी', val: '<1.2%', desc: '28% नुकसान से घटकर 1%', subtext: 'अडानी कोल्ड चेन' },
      { label: 'त्वरित एस्क्रो भुगतान', val: '24-48 घंटे', desc: 'डिलीवरी होते ही यूपीआई भुगतान', subtext: 'पारंपरिक 3 हफ्तों की जगह' }
    ],
    storyHeaderTag: 'सिस्टम का सच • एसआईएच सोल्यूशन 2026',
    storyTitle: 'फार्मलिंक की शुरुआत क्यों हुई?',
    storySub: 'पारंपरिक खेती में पूरा जोखिम उठाने वाले किसान को उपभोक्ता के ₹100 में से केवल ₹25-35 मिलते हैं। बाकी 65% बिचौलिये लूट लेते हैं और 30% सब्ज़ियां खुले ट्रकों में सड़ जाती हैं।',
    legacyTitle: 'टूटी हुई पुरानी बिचौलिया व्यवस्था',
    legacyBadge: '65% कमीशन नुकसान',
    farmlinkTitle: 'फार्मलिंक सीधा प्रोटोकॉल',
    farmlinkBadge: 'सीधे 1-2 कदम',
    vegCatalogTitle: '25+ ताज़ा सब्ज़ियों का सीधा बाज़ार',
    vegCatalogSub: 'महाराष्ट्र, कर्नाटक, गुजरात, यूपी और तमिलनाडु के किसानों से सीधे जुड़ी ताज़ा सब्ज़ियां। मंडी भाव और किसान भाव की सीधी तुलना।',
    vegVerifiedCount: '25 प्रमाणित ताज़ा सब्ज़ियां उपलब्ध',
    btnBuyDirect: 'सीधा खरीदें',
    btnB2B: 'थोक B2B ऑर्डर',
    mandiRate: 'मंडी भाव:',
    farmlinkRate: 'किसान भाव:'
  },

  // 4. TAMIL
  ta: {
    code: 'ta',
    native: 'தமிழ்',
    label: 'Tamil',
    tag: 'SIH தீர்வு 2026 • இடைத்தரகர்கள் இல்லா நேரடி விவசாயம்',
    title1: 'விவசாயத்திற்கும் நுகர்வோருக்கும் இடையே உள்ள இடைத்தரகர்கள் ஒழிப்பு.',
    title2: 'விவசாயிகளுக்கு முழு வருமானம். கமிஷன் சுரண்டல் இல்லை.',
    sub: '5-7 இடைத்தரகர்களை நீக்கி, அதானி அக்ரி குளிர்சாதன கிடங்குகள் மற்றும் கிசான் சபா வாகன பகிர்வுடன் நவீன விநியோகம்.',
    voicePrompt: "குரல் வழி தேடல்: 'தக்காளி விலை என்ன?' அல்லது 'வண்டி பதிவு செய்க'...",
    voiceListening: 'கேட்கிறது...',
    btnOpenMarket: 'நேரடி சந்தையைத் திறக்கவும்',
    btnLogistics: 'அதானி கிடங்கு மற்றும் கிசான் சபா',
    btnWhyFarmlink: 'பார்ம்லிங்க் ஏன்? (வரலாறு)',
    btnListProduce: 'பயிரை விற்கவும் (விவசாயி)',
    apmcTicker: 'சந்தை நேரடி விலை:',
    navOverview: 'வரலாறு & கதை',
    navMarketplace: 'சந்தை',
    navBidding: 'நேரடி ஏலம்',
    navAI: 'AI தேவை கணிப்பு',
    navLogistics: 'போக்குவரத்து',
    navEscrow: 'பாதுகாப்பு & பணம்',
    metrics: [
      { label: 'விவசாயிக்கு கூடுதல் லாபம்', val: '+38.4%', desc: 'கமிஷன் பிடித்தம் இல்லை', subtext: 'வங்கி கணக்கில் நேரடி பணம்' },
      { label: 'நுகர்வோருக்கு சேமிப்பு', val: '-24.6%', desc: 'நேரடி தோட்டத்து காய்கறிகள்', subtext: 'குறைந்த விலை, அதிக புத்துணர்ச்சி' },
      { label: 'பயிர் விரயம் குறைப்பு', val: '<1.2%', desc: '28% விரயத்திலிருந்து குறைப்பு', subtext: 'குளிர்சாதனப் பெட்டி வாகனங்கள்' },
      { label: 'உடனடி UPI பணம் செலுத்துதல்', val: '24-48 மணி', desc: 'டெலிவரி முடிந்ததும் பணம்', subtext: '3 வார தாமதத்திற்கு முற்றுப்புள்ளி' }
    ],
    storyHeaderTag: 'அமைப்பு மறுசீரமைப்பு • SIH 2026',
    storyTitle: 'பார்ம்லிங்க் ஏன் உருவானது?',
    storySub: 'பாரம்பரிய முறையில் பயிர் செய்யும் விவசாயிக்கு நுகர்வோர் தரும் பணத்தில் 25-35% மட்டுமே கிடைக்கிறது. மீதமுள்ள பணத்தை இடைத்தரகர்கள் அபகரிக்கின்றனர்.',
    legacyTitle: 'சிதைந்த பழைய இடைத்தரகர் முறை',
    legacyBadge: '65% கமிஷன் சுரண்டல்',
    farmlinkTitle: 'பார்ம்லிங்க் நேரடி முறை',
    farmlinkBadge: 'நேரடி 1-2 நிலைகள்',
    vegCatalogTitle: '25+ நேரடி காய்கறிகள் சந்தை',
    vegCatalogSub: 'விவசாயிகளிடமிருந்து நேரடியாக கிடைக்கும் 25-க்கும் மேற்பட்ட பசுமை காய்கறிகள்.',
    vegVerifiedCount: '25 சரிபார்க்கப்பட்ட காய்கறிகள்',
    btnBuyDirect: 'நேரடியாக வாங்கவும்',
    btnB2B: 'மொத்த விற்பனை B2B',
    mandiRate: 'சந்தை விலை:',
    farmlinkRate: 'விவசாயி விலை:'
  },

  // 5. KANNADA
  kn: {
    code: 'kn',
    native: 'ಕನ್ನಡ',
    label: 'Kannada',
    tag: 'SIH ಪರಿಹಾರ 2026 • ದಲ್ಲಾಳಿ ಮುಕ್ತ ಕೃಷಿ ವೇದಿಕೆ',
    title1: 'ಕೃಷಿ ಮಾರುಕಟ್ಟೆಯಿಂದ ಮಧ್ಯವರ್ತಿಗಳ ಸಂಪೂರ್ಣ ನಿರ್ಮೂಲನೆ.',
    title2: 'ರೈತರಿಗೆ ನೇರ ಪೂರ್ಣ ಲಾಭ. ಶೂನ್ಯ ಕಮಿಷನ್ ದಂಧೆ.',
    sub: 'ರೈತರು ಮತ್ತು ಗ್ರಾಹಕರ ನಡುವಿನ 5-7 ಹಂತದ ದಲ್ಲಾಳಿಗಳನ್ನು ತೆಗೆದುಹಾಕಿ, ಅದಾನಿ ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್ ಮತ್ತು ಕಿಸಾನ್ ಸಭಾ ವಾಹನ ಪೂಲಿಂಗ್ ಮೂಲಕ ನೇರ ಸಂಪರ್ಕ.',
    voicePrompt: "ಧ್ವನಿ ಸಹಾಯಕ: 'ಟೊಮ್ಯಾಟೊ ಬೆಲೆ ಎಷ್ಟು?' ಅಥವಾ 'ವಾಹನ ಬುಕ್ ಮಾಡಿ' ಎಂದು ಹೇಳಿ...",
    voiceListening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...',
    btnOpenMarket: 'ನೇರ ಮಾರುಕಟ್ಟೆ ತೆರೆಯಿರಿ',
    btnLogistics: 'ಅದಾನಿ ಸೈಲೋಸ್ & ಕಿಸಾನ್ ಸಭಾ',
    btnWhyFarmlink: 'ಫಾರ್ಮ್‌ಲಿಂಕ್ ಏಕೆ? (ಹಿನ್ನೆಲೆ)',
    btnListProduce: 'ಬೆಳೆ ಮಾರಾಟ (ರೈತ)',
    apmcTicker: 'ಮಂಡಿ ಲೈವ್ ದರಗಳು:',
    navOverview: 'ಹಿನ್ನೆಲೆ & ಕಥೆ',
    navMarketplace: 'ಮಾರುಕಟ್ಟೆ',
    navBidding: 'ಲೈವ್ ಹರಾಜು',
    navAI: 'AI ಬೆಲೆ ಮುನ್ಸೂಚನೆ',
    navLogistics: 'ಸಾರಿಗೆ ಕೇಂದ್ರ',
    navEscrow: 'ನಂಬಿಕೆ & ಎಸ್ಕ್ರೋ',
    metrics: [
      { label: 'ರೈತರಿಗೆ ಹೆಚ್ಚುವರಿ ಆದಾಯ', val: '+38.4%', desc: 'ದಲ್ಲಾಳಿಗಳ ಕಮಿಷನ್ ಇಲ್ಲದೆ', subtext: 'ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ' },
      { label: 'ಗ್ರಾಹಕರಿಗೆ ಉಳಿತಾಯ', val: '-24.6%', desc: 'ನೇರವಾಗಿ ತೋಟದಿಂದ ಮನೆ ಬಾಗಿಲಿಗೆ', subtext: 'ಕಡಿಮೆ ಬೆಲೆ, ತಾಜಾ ತರಕಾರಿ' },
      { label: 'ಬೆಳೆ ಹಾಳಾಗುವಿಕೆ ಕಡಿತ', val: '<1.2%', desc: 'ಶೇ 28 ರಷ್ಟು ನಷ್ಟದಿಂದ ಮುಕ್ತಿ', subtext: 'ಅದಾನಿ ಕೋಲ್ಡ್ ಚೈನ್ ವ್ಯವಸ್ಥೆ' },
      { label: 'ತಕ್ಷಣದ UPI ಹಣ ಪಾವತಿ', val: '24-48 ಗಂಟೆ', desc: 'ಡೆಲಿವರಿ ಆದ ತಕ್ಷಣವೇ ಹಣ ಬಿಡುಗಡೆ', subtext: '3 ವಾರಗಳ ವಿಳಂಬಕ್ಕೆ ಮುಕ್ತಿ' }
    ],
    storyHeaderTag: 'ವ್ಯವಸ್ಥೆಯ ಬದಲಾವಣೆ • SIH 2026',
    storyTitle: 'ಫಾರ್ಮ್‌ಲಿಂಕ್ ಏಕೆ ಆರಂಭವಾಯಿತು?',
    storySub: 'ಸಾಂಪ್ರದಾಯಿಕ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ರೈತನಿಗೆ ಗ್ರಾಹಕ ನೀಡುವ ಹಣದಲ್ಲಿ ಕೇವಲ 25-35% ಮಾತ್ರ ಸಿಗುತ್ತದೆ. ಉಳಿದ ಹಣ ಮಧ್ಯವರ್ತಿಗಳ ಪಾಲಾಗುತ್ತದೆ.',
    legacyTitle: 'ಹಾಳಾದ ಸಾಂಪ್ರದಾಯಿಕ ದಲ್ಲಾಳಿ ಸರಪಳಿ',
    legacyBadge: '65% ಕಮಿಷನ್ ಲೂಟಿ',
    farmlinkTitle: 'ಫಾರ್ಮ್‌ಲಿಂಕ್ ನೇರ ಪ್ರೋಟೋಕಾಲ್',
    farmlinkBadge: 'ನೇರ 1-2 ಹಂತಗಳು',
    vegCatalogTitle: '25+ ತಾಜಾ ತರಕಾರಿಗಳ ನೇರ ಮಾರುಕಟ್ಟೆ',
    vegCatalogSub: 'ಕರ್ನಾಟಕ, ಮಹಾರಾಷ್ಟ್ರ, ತಮಿಳುನಾಡಿನ ರೈತರಿಂದ ನೇರವಾಗಿ ತಾಜಾ ತರಕಾರಿಗಳು.',
    vegVerifiedCount: '25 ದೃಢೀಕೃತ ತರಕಾರಿಗಳು ಲಭ್ಯ',
    btnBuyDirect: 'ನೇರವಾಗಿ ಖರೀದಿಸಿ',
    btnB2B: 'ಸಗಟು B2B',
    mandiRate: 'ಮಂಡಿ ದರ:',
    farmlinkRate: 'ರೈತರ ದರ:'
  },

  // 6. MARATHI
  mr: {
    code: 'mr',
    native: 'मराठी',
    label: 'Marathi',
    tag: 'SIH सोल्यूशन 2026 • थेट शेतकरी ते ग्राहक',
    title1: 'कृषी क्षेत्रातील दलालीचा अंत, बळीराजाला पूर्ण दाम.',
    title2: 'थेट शेतातून ग्राहकांच्या दारापर्यंत पारदर्शक व्यापार.',
    sub: 'शेतकरी आणि ग्राहकांमधील 5-7 मध्यस्थांची साखळी संपवून, अदानी ॲग्री लॉजिस्टिक्स सायलो आणि किसान सभा वाहन पूलिंगद्वारे आधुनिक पुरवठा.',
    voicePrompt: "आवाजाने शोधा: 'टोमॅटोचा भाव काय आहे?' किंवा 'ट्रक बुक करा'...",
    voiceListening: 'ऐकत आहे...',
    btnOpenMarket: 'थेट बाजारपेठ उघडा',
    btnLogistics: 'अदानी सायलो आणि किसान सभा लॉजिस्टिक्स',
    btnWhyFarmlink: 'फार्मलिंक का? (मूळ कथा)',
    btnListProduce: 'शेतमाल विका (शेतकरी)',
    apmcTicker: 'कृषी उत्पन्न बाजार समिती थेट दर:',
    navOverview: 'मूळ & कथा',
    navMarketplace: 'बाजारपेठ',
    navBidding: 'थेट लिलाव',
    navAI: 'AI मागणी अंदाज',
    navLogistics: 'लॉजिस्टिक्स हब',
    navEscrow: 'विश्वास & एस्क्रो',
    metrics: [
      { label: 'शेतकऱ्यांना जादा नफा', val: '+38.4%', desc: 'दलालांच्या कमिशनपासून मुक्ती', subtext: 'थेट बँक खात्यात पैसे' },
      { label: 'ग्राहकांची मोठी बचत', val: '-24.6%', desc: 'थेट शेतातून ताजी भाजी दारात', subtext: 'स्वस्त आणि दर्जेदार' },
      { label: 'नासाडीत मोठी घट', val: '<1.2%', desc: '28% नुकसानीवरून 1 टक्क्यावर', subtext: 'अदानी कोल्ड चेन वाहने' },
      { label: 'त्वरित एस्क्रो UPI पेमेंट', val: '24-48 तास', desc: 'माल मिळताच तत्काळ पैसे जमा', subtext: '3 आठवड्यांच्या प्रतीक्षेला पूर्णविराम' }
    ],
    storyHeaderTag: 'यंत्रणेचे वास्तव • SIH 2026',
    storyTitle: 'फार्मलिंकची गरज का भासली?',
    storySub: 'पारंपरिक मंडईत राबणाऱ्या शेतकऱ्याला ग्राहकाच्या 100 रुपयांपैकी फक्त 25-35 रुपये मिळतात. उरलेले 65% दलाल लाटतात आणि 30% भाजीपाला उघड्यावर सडतो.',
    legacyTitle: 'दलालांची शोषण करणारी साखळी',
    legacyBadge: '65% कमिशन नुकसान',
    farmlinkTitle: 'फार्मलिंक थेट डिजिटल पद्धत',
    farmlinkBadge: 'थेट 1-2 टप्पे',
    vegCatalogTitle: '25+ ताज्या भाज्यांची थेट बाजारपेठ',
    vegCatalogSub: 'नाशिक, पुणे, सातारा आणि कोल्हापूरच्या शेतकऱ्यांकडून थेट ताजी भाजी.',
    vegVerifiedCount: '25 प्रमाणित भाज्या थेट उपलब्ध',
    btnBuyDirect: 'थेट खरेदी करा',
    btnB2B: 'घाऊक B2B',
    mandiRate: 'मंडई दर:',
    farmlinkRate: 'शेतकरी दर:'
  },

  // 7. GUJARATI
  gu: {
    code: 'gu',
    native: 'ગુજરાતી',
    label: 'Gujarati',
    tag: 'SIH સોલ્યુશન 2026 • વચેટિયા વગર સીધો ખેડૂત-ગ્રાહક વેપાર',
    title1: 'ખેડૂતો અને ગ્રાહકો વચ્ચેથી દલાલોની બાદબાકી.',
    title2: 'ખેડૂતને પૂરો ભાવ, ગ્રાહકને વાજબી ભાવ.',
    sub: 'ખેડૂત અને ગ્રાહક વચ્ચેના 5-7 વચેટિયાઓને હટાવીને અદાણી સાયલો અને કિસાન સભા ટ્રાન્સપોર્ટ પૂલિંગ દ્વારા સીધું જોડાણ.',
    voicePrompt: "અવાજ દ્વારા શોધો: 'ટામેટાનો ભાવ શું છે?' અથવા 'વાહન બુક કરો'...",
    voiceListening: 'સાંભળી રહ્યા છીએ...',
    btnOpenMarket: 'ડાયરેક્ટ માર્કેટ ખોલો',
    btnLogistics: 'અદાણી સાયલો અને કિસાન સભા',
    btnWhyFarmlink: 'ફાર્મલિંક શા માટે? (ઇતિહાસ)',
    btnListProduce: 'પાક વેચો (ખેડૂત)',
    apmcTicker: 'APMC માર્કેટ યાર્ડ લાઈવ ભાવ:',
    navOverview: 'વાર્તા & મૂળ',
    navMarketplace: 'માર્કેટપ્લેસ',
    navBidding: 'લાઈવ હરાજી',
    navAI: 'AI માંગ અંદાજ',
    navLogistics: 'લોજિસ્ટિક્સ હબ',
    navEscrow: 'વિશ્વાસ & પેમેન્ટ',
    metrics: [
      { label: 'ખેડૂતની વધારાની આવક', val: '+38.4%', desc: 'દલાલી અને કમિશન મુક્ત', subtext: 'સીધા બેંક ખાતામાં જમા' },
      { label: 'ગ્રાહકોની વાસ્તવિક બચત', val: '-24.6%', desc: 'સીધું ખેતરમાંથી ઘરે ડિલિવરી', subtext: 'તાજા અને સસ્તા શાકભાજી' },
      { label: 'પાક બગાડમાં ઘટાડો', val: '<1.2%', desc: '28% બગાડ ઘટીને માત્ર 1%', subtext: 'કોલ્ડ-ચેઈન વ્યવસ્થા' },
      { label: 'ઝડપી એસ્ક્રો UPI ચુકવણી', val: '24-48 કલાક', desc: 'ડિલિવરી થતાં જ તુરંત પૈસા', subtext: 'મહિનાઓની રાહ જોવાની મુક્તિ' }
    ],
    storyHeaderTag: 'સિસ્ટમ રિફોર્મ • SIH 2026',
    storyTitle: 'ફાર્મલિંકની સ્થાપના શા માટે થઈ?',
    storySub: 'પરંપરાગત બજારોમાં મહેનત કરતા ખેડૂતને ગ્રાહકના ₹100માંથી માત્ર ₹25-35 જ મળે છે, બાકીના ₹65 વચેટિયા ખાઈ જાય છે.',
    legacyTitle: 'વચેટિયાઓની જૂની શોષણ વ્યવસ્થા',
    legacyBadge: '65% કમિશન નુકસાન',
    farmlinkTitle: 'ફાર્મલિંક ડાયરેક્ટ પ્રોટોકોલ',
    farmlinkBadge: 'સીધા 1-2 તબક્કા',
    vegCatalogTitle: '25+ તાજા શાકભાજીનું ડાયરેક્ટ માર્કેટ',
    vegCatalogSub: 'ગુજરાત અને મહારાષ્ટ્રના ખેડૂતો પાસેથી સીધા તાજા શાકભાજી.',
    vegVerifiedCount: '25 પ્રમાણિત શાકભાજી ઉપલબ્ધ',
    btnBuyDirect: 'સીધું ખરીદો',
    btnB2B: 'જથ્થાબંધ B2B',
    mandiRate: 'યાર્ડ ભાવ:',
    farmlinkRate: 'ખેડૂત ભાવ:'
  },

  // 8. BENGALI
  bn: {
    code: 'bn',
    native: 'বাংলা',
    label: 'Bengali',
    tag: 'SIH সমাধান 2026 • মধ্যস্বত্বভোগী মুক্ত সরাসরি কৃষি বাজার',
    title1: 'ভারতের খাদ্য সরবরাহ ব্যবস্থা থেকে দালালদের বিলোপ।',
    title2: 'কৃষকের পুরো পারিশ্রমিক, ভোক্তার সর্বোচ্চ সঞ্চয়।',
    sub: 'কৃষক ও ভোক্তার মাঝের ৫-৭ স্তরের দালাল রাজ বন্ধ করে আদানি সাইলো ও কিষাণ সভা ফ্রেইট পুলিং এর মাধ্যমে সরাসরি সংযোগ।',
    voicePrompt: "ভয়েস অ্যাসিস্ট্যান্ট: 'টমেটোর আজকের দর কত?' বলুন...",
    voiceListening: 'শুনছি...',
    btnOpenMarket: 'সরাসরি মার্কেট খুলুন',
    btnLogistics: 'আদানি সাইলো ও কিষাণ সভা',
    btnWhyFarmlink: 'ফার্মলিংক কেন? (ইতিহাস)',
    btnListProduce: 'ফসল বিক্রি করুন (কৃষক)',
    apmcTicker: 'মান্ডি লাইভ রেট:',
    navOverview: 'মূল ও ইতিহাস',
    navMarketplace: 'মার্কেটপ্লেস',
    navBidding: 'লাইভ নিলাম',
    navAI: 'AI পূর্বাভাস',
    navLogistics: 'লজিস্টিক হাব',
    navEscrow: 'ট্রাস্ট ও এসক্রো',
    metrics: [
      { label: 'কৃষকের বেশি লাভ', val: '+38.4%', desc: 'দালালদের কমিশন ছাড়া', subtext: 'সরাসরি ব্যাংক অ্যাকাউন্টে' },
      { label: 'ভোক্তার আর্থিক সাশ্রয়', val: '-24.6%', desc: 'ক্ষেত থেকে সরাসরি ঘরে', subtext: 'তাজা ও সস্তা ফসল' },
      { label: 'ফসল নষ্টের হার হ্রাস', val: '<1.2%', desc: '২৮% ক্ষয়ক্ষতি থেকে হ্রাস', subtext: 'হিমাগার ও কোল্ড চেইন' },
      { label: 'দ্রুত এসক্রো UPI পেমেন্ট', val: '২৪-৪৮ ঘণ্টা', desc: 'ডেলিভারি হতেই অ্যাকাউন্টে টাকা', subtext: 'সপ্তাহের অপেক্ষার অবসান' }
    ],
    storyHeaderTag: 'সিস্টেম সংস্কার • SIH 2026',
    storyTitle: 'কেন ফার্মলিংকের উৎপত্তি?',
    storySub: 'প্রচলিত ব্যবস্থায় ঘাম ঝরানো কৃষক পায় ভোক্তার দেওয়া টাকার মাত্র ২৫-৩৫%, বাকি টাকা মধ্যস্বত্বভোগীরা আত্মসাৎ করে।',
    legacyTitle: 'পুরোনো দালাল নির্ভর ব্যবস্থা',
    legacyBadge: '৬৫% কমিশন অপচয়',
    farmlinkTitle: 'ফার্মলিংক সরাসরি প্রোটোকল',
    farmlinkBadge: 'সরাসরি ১-২ ধাপ',
    vegCatalogTitle: '২৫+ তাজা শাকসবজির সরাসরি বাজার',
    vegCatalogSub: 'সরাসরি কৃষকদের কাছ থেকে তাজা সবজি কেনাকাটা করুন।',
    vegVerifiedCount: '২৫টি যাচাইকৃত তাজা সবজি লাইভ',
    btnBuyDirect: 'সরাসরি কিনুন',
    btnB2B: 'পাইকারি B2B',
    mandiRate: 'মান্ডি দর:',
    farmlinkRate: 'কৃষক দর:'
  },

  // 9. MALAYALAM
  ml: {
    code: 'ml',
    native: 'മലയാളം',
    label: 'Malayalam',
    tag: 'SIH സൊല്യൂഷൻ 2026 • ഇടനിലക്കാരില്ലാത്ത നേരിട്ടുള്ള കർഷക വിപണി',
    title1: 'കാർഷിക വിപണിയിൽ നിന്ന് ഇടനിലക്കാരെ പൂർണ്ണമായി ഒഴിവാക്കുന്നു.',
    title2: 'കർഷകന് ന്യായമായ വില, ഉപഭോക്താവിന് വലിയ ലാഭം.',
    sub: '5-7 തലത്തിലുള്ള ഇടനിലക്കാരെ ഒഴിവാക്കി അദാനി കോൾഡ് സൈലോകളും കിസാൻ സഭ ട്രാൻസ്‌പോർട്ട് പൂളിംഗും വഴി നേരിട്ടുള്ള വിപണനം.',
    voicePrompt: "ശബ്ദത്തിലൂടെ ചോദിക്കൂ: 'തക്കാളി വില എത്രയാണ്?'...",
    voiceListening: 'കേൾക്കുന്നു...',
    btnOpenMarket: 'നേരിട്ടുള്ള മാർക്കറ്റ് തുറക്കുക',
    btnLogistics: 'അദാനി സൈലോസ് & കിസാൻ സഭ',
    btnWhyFarmlink: 'എന്തുകൊണ്ട് ഫാംലിങ്ക്? (ചരിത്രം)',
    btnListProduce: 'ഉൽപ്പന്നങ്ങൾ വിൽക്കുക (കർഷകൻ)',
    apmcTicker: 'മാർക്കറ്റ് ലൈവ് നിരക്കുകൾ:',
    navOverview: 'ചരിത്രം & കഥ',
    navMarketplace: 'മാർക്കറ്റ്പ്ലേസ്',
    navBidding: 'തത്സമയ ലേലം',
    navAI: 'AI ഡിമാൻഡ് പ്രവചനം',
    navLogistics: 'ലോജിസ്റ്റിക്സ്',
    navEscrow: 'വിശ്വാസ്യത & പേയ്‌മെന്റ്',
    metrics: [
      { label: 'കർഷകന് ഉയർന്ന വരുമാനം', val: '+38.4%', desc: 'കമ്മീഷൻ ഇല്ലാതെ', subtext: 'നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിൽ' },
      { label: 'ഉപഭോക്താവിന് ലാഭം', val: '-24.6%', desc: 'തോട്ടത്തിൽ നിന്ന് നേരിട്ട് വീട്ടിലേക്ക്', subtext: 'ഫ്രഷ് പച്ചക്കറികൾ' },
      { label: 'വിളവ് നഷ്ടം കുറയ്ക്കൽ', val: '<1.2%', desc: '28% നഷ്ടത്തിൽ നിന്നുള്ള കുറവ്', subtext: 'റീഫർ കോൾഡ് ചെയിൻ' },
      { label: 'ഉടനടി UPI പേയ്‌മെന്റ്', val: '24-48 മണിക്കൂർ', desc: 'ഡെലിവറി പൂർത്തിയാകുമ്പോൾ തന്നെ', subtext: 'ആഴ്ചകളുടെ കാത്തിരിപ്പില്ല' }
    ],
    storyHeaderTag: 'സിസ്റ്റം മാറ്റം • SIH 2026',
    storyTitle: 'ഫാംലിങ്ക് എന്തിന്?',
    storySub: 'പരമ്പരാഗത രീതിയിൽ കഠിനാധ്വാനം ചെയ്യുന്ന കർഷകന് ലഭിക്കുന്നത് ഉപഭോക്താവ് നൽകുന്ന തുകയുടെ 25-35% മാത്രമാണ്.',
    legacyTitle: 'പഴഞ്ചൻ ഇടനിലക്കാരുടെ ചൂഷണം',
    legacyBadge: '65% കമ്മീഷൻ നഷ്ടം',
    farmlinkTitle: 'ഫാംലിങ്ക് ഡയറക്റ്റ് പ്രോട്ടോക്കോൾ',
    farmlinkBadge: 'നേരിട്ട് 1-2 ഘട്ടങ്ങൾ',
    vegCatalogTitle: '25+ പച്ചക്കറികളുടെ നേരിട്ടുള്ള വിപണി',
    vegCatalogSub: 'കർഷകരിൽ നിന്ന് നേരിട്ട് ലഭിക്കുന്ന 25-ലധികം ഇനം പച്ചക്കറികൾ.',
    vegVerifiedCount: '25 ഉറപ്പുവരുത്തിയ പച്ചക്കറികൾ',
    btnBuyDirect: 'നേരിട്ട് വാങ്ങുക',
    btnB2B: 'മൊത്തക്കച്ചവടം B2B',
    mandiRate: 'മാർക്കറ്റ് നിരക്ക്:',
    farmlinkRate: 'കർഷക നിരക്ക്:'
  },

  // 10. PUNJABI
  pa: {
    code: 'pa',
    native: 'ਪੰਜਾਬੀ',
    label: 'Punjabi',
    tag: 'SIH ਹੱਲ 2026 • ਵਿਚੋਲਿਆਂ ਤੋਂ ਮੁਕਤ ਸਿੱਧੀ ਕਿਸਾਨ ਮੰਡੀ',
    title1: 'ਖੇਤੀਬਾੜੀ ਵਿੱਚੋਂ ਵਿਚੋਲਿਆਂ ਤੇ ਆੜ੍ਹਤੀਆਂ ਦੀ ਲੁੱਟ ਦਾ ਖ਼ਾਤਮਾ।',
    title2: 'ਕਿਸਾਨ ਨੂੰ ਪੂਰਾ ਮੁੱਲ, ਗਾਹਕ ਨੂੰ ਵਾਜਬ ਭਾਅ।',
    sub: '5-7 ਪੱਧਰ ਦੇ ਵਿਚੋਲਿਆਂ ਨੂੰ ਹਟਾ ਕੇ ਅਡਾਨੀ ਕੋਲਡ ਸਾਈਲੋ ਅਤੇ ਕਿਸਾਨ ਸਭਾ ਟਰਾਂਸਪੋਰਟ ਪੂਲਿੰਗ ਰਾਹੀਂ ਸਿੱਧਾ ਸੰਪਰਕ।',
    voicePrompt: "ਆਵਾਜ਼ ਰਾਹੀਂ ਪੁੱਛੋ: 'ਟਮਾਟਰ ਦਾ ਰੇਟ ਕੀ ਹੈ?'...",
    voiceListening: 'ਸੁਣ ਰਹੇ ਹਾਂ...',
    btnOpenMarket: 'ਸਿੱਧੀ ਮੰਡੀ ਖੋਲ੍ਹੋ',
    btnLogistics: 'ਅਡਾਨੀ ਸਾਈਲੋ ਅਤੇ ਕਿਸਾਨ ਸਭਾ',
    btnWhyFarmlink: 'ਫਾਰਮਲਿੰਕ ਕਿਉਂ? (ਪਿਛੋਕੜ)',
    btnListProduce: 'ਫ਼ਸਲ ਵੇਚੋ (ਕਿਸਾਨ)',
    apmcTicker: 'ਮੰਡੀ ਲਾਈਵ ਭਾਅ:',
    navOverview: 'ਪਿਛੋਕੜ & ਕਹਾਣੀ',
    navMarketplace: 'ਮਾਰਕੀਟਪਲੇਸ',
    navBidding: 'ਲਾਈਵ ਬੋਲੀ',
    navAI: 'AI ਮੰਗ ਅਨੁਮਾਨ',
    navLogistics: 'ਲੌਜਿਸਟਿਕਸ ਹੱਬ',
    navEscrow: 'ਭਰੋਸਾ & ਐਸਕਰੋ',
    metrics: [
      { label: 'ਕਿਸਾਨ ਦੀ ਵਧੇਰੇ ਕਮਾਈ', val: '+38.4%', desc: 'ਆੜ੍ਹਤ ਤੇ ਕਟੌਤੀ ਤੋਂ ਮੁਕਤ', subtext: 'ਸਿੱਧਾ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਪੈਸੇ' },
      { label: 'ਗਾਹਕ ਦੀ ਬੱਚਤ', val: '-24.6%', desc: 'ਸਿੱਧਾ ਖੇਤ ਵਿੱਚੋਂ ਘਰ ਤੱਕ', subtext: 'ਤਾਜ਼ੀਆਂ ਤੇ ਸਸਤੀਆਂ ਸਬਜ਼ੀਆਂ' },
      { label: 'ਫ਼ਸਲ ਦੀ ਬਰਬਾਦੀ ਘਟੀ', val: '<1.2%', desc: '28% ਨੁਕਸਾਨ ਤੋਂ ਘਟ ਕੇ 1%', subtext: 'ਕੋਲਡ ਚੇਨ ਰੀਫ਼ਰ ਗੱਡੀਆਂ' },
      { label: 'ਤੁਰੰਤ ਐਸਕਰੋ UPI ਭੁਗਤਾਨ', val: '24-48 ਘੰਟੇ', desc: 'ਡਿਲੀਵਰੀ ਹੁੰਦਿਆਂ ਹੀ ਪੈਸੇ ਜਮ੍ਹਾ', subtext: 'ਹਫ਼ਤਿਆਂ ਦੀ ਉਡੀਕ ਖ਼ਤਮ' }
    ],
    storyHeaderTag: 'ਸਿਸਟਮ ਦਾ ਸੱਚ • SIH 2026',
    storyTitle: 'ਫਾਰਮਲਿੰਕ ਦੀ ਲੋੜ ਕਿਉਂ ਪਈ?',
    storySub: 'ਰਵਾਇਤੀ ਮੰਡੀਆਂ ਵਿੱਚ ਹੱਡ-ਭੰਨਵੀਂ ਮਿਹਨਤ ਕਰਨ ਵਾਲੇ ਕਿਸਾਨ ਨੂੰ ਗਾਹਕ ਦੇ ₹100 ਵਿੱਚੋਂ ਸਿਰਫ਼ ₹25-35 ਮਿਲਦੇ ਹਨ, ਬਾਕੀ 65% ਵਿਚੋਲੀਏ ਖਾ ਜਾਂਦੇ ਹਨ।',
    legacyTitle: 'ਵਿਚੋਲਿਆਂ ਦੀ ਪੁਰਾਣੀ ਲੁੱਟ-ਖਸੁੱਟ',
    legacyBadge: '65% ਕਮਿਸ਼ਨ ਨੁਕਸਾਨ',
    farmlinkTitle: 'ਫਾਰਮਲਿੰਕ ਸਿੱਧਾ ਡਿਜੀਟਲ ਤਰੀਕਾ',
    farmlinkBadge: 'ਸਿੱਧੇ 1-2 ਪੜਾਅ',
    vegCatalogTitle: '25+ ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ ਦੀ ਸਿੱਧੀ ਮੰਡੀ',
    vegCatalogSub: 'ਸਿੱਧਾ ਖੇਤਾਂ ਵਿੱਚੋਂ ਖ਼ਰੀਦੋ 25 ਤੋਂ ਵੱਧ ਪ੍ਰਮਾਣਿਤ ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ।',
    vegVerifiedCount: '25 ਪ੍ਰਮਾਣਿਤ ਸਬਜ਼ੀਆਂ ਲਾਈਵ ਉਪਲਬਧ',
    btnBuyDirect: 'ਸਿੱਧਾ ਖ਼ਰੀਦੋ',
    btnB2B: 'ਥੋਕ B2B',
    mandiRate: 'ਮੰਡੀ ਭਾਅ:',
    farmlinkRate: 'ਕਿਸਾਨ ਭਾਅ:'
  }
};

export function getTranslation(langCode: string): LanguageStrings {
  return TRANSLATIONS[langCode] || TRANSLATIONS.en;
}
