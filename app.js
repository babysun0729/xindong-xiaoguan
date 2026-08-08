/* ========================================
   心动小馆 v3.0 · 双模式完整版
   实物外卖馆 + 情侣互动馆 + 套餐推荐
   ======================================== */

// ========================================
// 一、数据定义
// ========================================

// --- 实物外卖分类 ---
const REAL_CATEGORIES = [
  { name: '奶茶店', emoji: '🧋', desc: '6大品牌 · 2-30币', brands: ['全部','蜜雪冰城','茶百道','古茗','书亦烧仙草','喜茶','奈雪的茶'] },
  { name: '西式快餐', emoji: '🍔', desc: '麦当劳/肯德基/华莱士 · 4-45币', brands: ['全部','麦当劳','肯德基','华莱士'] },
  { name: '中式快餐', emoji: '🍱', desc: '盖饭/粉面/家常菜 · 11-26币', brands: ['全部','隆江猪脚饭','黄焖鸡米饭','日式照烧','家常盖饭','粉面小吃'] },
  { name: '街边小吃', emoji: '🍿', desc: '烤肠到手抓饼 · 4-18币', brands: ['全部'] }
];

// --- 实物外卖菜品 ---
const REAL_ITEMS = [
  // 🧋 蜜雪冰城
  { id:'r001', cat:0, brand:'蜜雪冰城', emoji:'🍋', name:'冰鲜柠檬水', desc:'清爽柠檬水', price:3, tags:['实物'] },
  { id:'r002', cat:0, brand:'蜜雪冰城', emoji:'🍑', name:'蜜桃四季春', desc:'蜜桃果香四季春茶', price:6, tags:['实物'] },
  { id:'r003', cat:0, brand:'蜜雪冰城', emoji:'🍊', name:'棒打鲜橙', desc:'鲜橙果肉捣制', price:5, tags:['实物'] },
  { id:'r004', cat:0, brand:'蜜雪冰城', emoji:'🧀', name:'芝士奶盖四季春', desc:'芝士奶盖+四季春', price:9, tags:['实物'] },
  { id:'r005', cat:0, brand:'蜜雪冰城', emoji:'🧋', name:'珍珠奶茶', desc:'经典珍珠奶茶', price:7, tags:['实物'] },
  { id:'r006', cat:0, brand:'蜜雪冰城', emoji:'🥭', name:'杨枝甘露', desc:'芒果西米露', price:11, tags:['实物'] },
  { id:'r007', cat:0, brand:'蜜雪冰城', emoji:'🍦', name:'摩天脆脆冰淇淋', desc:'脆皮冰淇淋', price:2, tags:['实物'] },
  { id:'r008', cat:0, brand:'蜜雪冰城', emoji:'🍨', name:'雪王大圣代', desc:'草莓/巧克力圣代', price:4, tags:['实物'] },
  // 🧋 茶百道
  { id:'r009', cat:0, brand:'茶百道', emoji:'🥛', name:'豆乳玉麒麟', desc:'豆乳奶盖+玉麒麟茶', price:16, tags:['实物'] },
  { id:'r010', cat:0, brand:'茶百道', emoji:'🍵', name:'茉莉奶绿', desc:'茉莉花茶+鲜奶', price:11, tags:['实物'] },
  { id:'r011', cat:0, brand:'茶百道', emoji:'🍮', name:'铁观音奶冻', desc:'铁观音+奶冻', price:12, tags:['实物'] },
  { id:'r012', cat:0, brand:'茶百道', emoji:'🥭', name:'杨枝甘露', desc:'芒果西柚西米', price:18, tags:['实物'] },
  { id:'r013', cat:0, brand:'茶百道', emoji:'🍉', name:'西瓜生椰', desc:'西瓜+生椰乳', price:15, tags:['实物'] },
  { id:'r014', cat:0, brand:'茶百道', emoji:'🍠', name:'手捣芋泥红茶', desc:'手捣芋泥+红茶', price:14, tags:['实物'] },
  { id:'r015', cat:0, brand:'茶百道', emoji:'🥥', name:'黄金椰椰乌龙', desc:'椰乳+乌龙茶', price:13, tags:['实物'] },
  // 🧋 古茗
  { id:'r016', cat:0, brand:'古茗', emoji:'🍇', name:'超A芝士葡萄', desc:'芝士+葡萄果茶', price:18, tags:['实物'] },
  { id:'r017', cat:0, brand:'古茗', emoji:'🍮', name:'布蕾脆脆奶芙', desc:'布蕾+脆波波', price:15, tags:['实物'] },
  { id:'r018', cat:0, brand:'古茗', emoji:'🍉', name:'西瓜椰椰', desc:'西瓜+椰乳', price:16, tags:['实物'] },
  { id:'r019', cat:0, brand:'古茗', emoji:'🥭', name:'杨枝甘露椰奶', desc:'芒果+椰奶版', price:17, tags:['实物'] },
  { id:'r020', cat:0, brand:'古茗', emoji:'🧋', name:'大叔奶茶', desc:'古茗经典奶茶', price:12, tags:['实物'] },
  { id:'r021', cat:0, brand:'古茗', emoji:'🍃', name:'云雾栀子青', desc:'栀子花茶+青梅', price:13, tags:['实物'] },
  // 🧋 书亦烧仙草
  { id:'r022', cat:0, brand:'书亦烧仙草', emoji:'🍮', name:'书亦烧仙草', desc:'招牌烧仙草', price:11, tags:['实物'] },
  { id:'r023', cat:0, brand:'书亦烧仙草', emoji:'🍇', name:'葡萄芋圆冻冻', desc:'葡萄+芋圆冻冻', price:14, tags:['实物'] },
  { id:'r024', cat:0, brand:'书亦烧仙草', emoji:'🥭', name:'杨枝甘露', desc:'芒果西米版本', price:16, tags:['实物'] },
  { id:'r025', cat:0, brand:'书亦烧仙草', emoji:'🥥', name:'生椰烧仙草', desc:'生椰乳+仙草', price:13, tags:['实物'] },
  // 🧋 喜茶
  { id:'r026', cat:0, brand:'喜茶', emoji:'🍇', name:'多肉葡萄', desc:'芝士多肉葡萄', price:22, tags:['实物'] },
  { id:'r027', cat:0, brand:'喜茶', emoji:'🟤', name:'烤黑糖波波牛乳', desc:'黑糖珍珠+牛乳', price:19, tags:['实物'] },
  { id:'r028', cat:0, brand:'喜茶', emoji:'🍇', name:'多肉青提', desc:'多肉青提果茶', price:23, tags:['实物'] },
  { id:'r029', cat:0, brand:'喜茶', emoji:'🍓', name:'芝芝莓莓', desc:'芝士草莓', price:21, tags:['实物'] },
  { id:'r030', cat:0, brand:'喜茶', emoji:'☕', name:'生椰拿铁', desc:'生椰乳+浓缩咖啡', price:18, tags:['实物'] },
  { id:'r031', cat:0, brand:'喜茶', emoji:'🥭', name:'杨枝甘露', desc:'喜茶版杨枝甘露', price:24, tags:['实物'] },
  // 🧋 奈雪的茶
  { id:'r032', cat:0, brand:'奈雪的茶', emoji:'🍇', name:'霸气葡萄', desc:'芝士霸气葡萄', price:23, tags:['实物'] },
  { id:'r033', cat:0, brand:'奈雪的茶', emoji:'🍓', name:'霸气草莓', desc:'芝士霸气草莓', price:22, tags:['实物'] },
  { id:'r034', cat:0, brand:'奈雪的茶', emoji:'🍊', name:'霸气橙子', desc:'鲜橙果茶', price:19, tags:['实物'] },
  { id:'r035', cat:0, brand:'奈雪的茶', emoji:'🍠', name:'芋泥宝藏茶', desc:'芋泥+宝藏茶底', price:21, tags:['实物'] },
  { id:'r036', cat:0, brand:'奈雪的茶', emoji:'🥭', name:'杨枝甘露', desc:'奈雪版杨枝甘露', price:25, tags:['实物'] },

  // 🍔 麦当劳
  { id:'r037', cat:1, brand:'麦当劳', emoji:'🍔', name:'麦辣鸡腿堡', desc:'辣鸡腿堡', price:16, tags:['实物'] },
  { id:'r038', cat:1, brand:'麦当劳', emoji:'🍔', name:'板烧鸡腿堡', desc:'板烧鸡腿堡', price:17, tags:['实物'] },
  { id:'r039', cat:1, brand:'麦当劳', emoji:'🍔', name:'巨无霸', desc:'双层牛肉堡', price:22, tags:['实物'] },
  { id:'r040', cat:1, brand:'麦当劳', emoji:'🍔', name:'安格斯厚牛堡', desc:'安格斯牛肉堡', price:32, tags:['实物'] },
  { id:'r041', cat:1, brand:'麦当劳', emoji:'🍔', name:'麦香鸡', desc:'经典麦香鸡', price:11, tags:['实物'] },
  { id:'r042', cat:1, brand:'麦当劳', emoji:'🍟', name:'中份薯条', desc:'金黄薯条', price:9, tags:['实物'] },
  { id:'r043', cat:1, brand:'麦当劳', emoji:'🍗', name:'麦乐鸡5块', desc:'5块麦乐鸡', price:10, tags:['实物'] },
  { id:'r044', cat:1, brand:'麦当劳', emoji:'鸡翅', name:'麦辣鸡翅一对', desc:'一对辣鸡翅', price:12, tags:['实物'] },
  { id:'r045', cat:1, brand:'麦当劳', emoji:'🍗', name:'麦麦脆汁鸡一块', desc:'一块脆汁鸡', price:14, tags:['实物'] },
  { id:'r046', cat:1, brand:'麦当劳', emoji:'🥧', name:'香芋派', desc:'香芋馅派', price:6, tags:['实物'] },
  { id:'r047', cat:1, brand:'麦当劳', emoji:'🥤', name:'中杯可乐', desc:'冰镇可乐', price:8, tags:['实物'] },
  { id:'r048', cat:1, brand:'麦当劳', emoji:'🍦', name:'圆筒冰淇淋', desc:'香草冰淇淋', price:4, tags:['实物'] },
  { id:'r049', cat:1, brand:'麦当劳', emoji:'🍪', name:'奥利奥麦旋风', desc:'奥利奥碎冰淇淋', price:11, tags:['实物'] },
  { id:'r050', cat:1, brand:'麦当劳', emoji:'☕', name:'拿铁', desc:'麦当劳拿铁', price:13, tags:['实物'] },
  { id:'r051', cat:1, brand:'麦当劳', emoji:'🍱', name:'麦辣鸡腿堡套餐', desc:'堡+中薯+中可', price:28, tags:['实物','套餐'] },
  { id:'r052', cat:1, brand:'麦当劳', emoji:'🍱', name:'板烧鸡腿堡套餐', desc:'堡+中薯+中可', price:29, tags:['实物','套餐'] },
  // 🍔 肯德基
  { id:'r053', cat:1, brand:'肯德基', emoji:'🍔', name:'香辣鸡腿堡', desc:'KFC辣堡', price:18, tags:['实物'] },
  { id:'r054', cat:1, brand:'肯德基', emoji:'🍔', name:'汁汁嫩牛堡', desc:'嫩牛堡', price:20, tags:['实物'] },
  { id:'r055', cat:1, brand:'肯德基', emoji:'🌯', name:'老北京鸡肉卷', desc:'老北京卷', price:16, tags:['实物'] },
  { id:'r056', cat:1, brand:'肯德基', emoji:'🍗', name:'吮指原味鸡一块', desc:'一块原味鸡', price:13, tags:['实物'] },
  { id:'r057', cat:1, brand:'肯德基', emoji:'鸡翅', name:'奥尔良烤翅一对', desc:'一对烤翅', price:14, tags:['实物'] },
  { id:'r058', cat:1, brand:'肯德基', emoji:'🍗', name:'黄金鸡块5块', desc:'5块黄金鸡块', price:11, tags:['实物'] },
  { id:'r059', cat:1, brand:'肯德基', emoji:'🥧', name:'红豆派', desc:'红豆馅派', price:7, tags:['实物'] },
  { id:'r060', cat:1, brand:'肯德基', emoji:'🥤', name:'可乐中杯', desc:'冰镇可乐', price:9, tags:['实物'] },
  { id:'r061', cat:1, brand:'肯德基', emoji:'🍨', name:'圣代', desc:'草莓/巧克力圣代', price:10, tags:['实物'] },
  { id:'r062', cat:1, brand:'肯德基', emoji:'🍱', name:'香辣鸡腿堡套餐', desc:'堡+薯条+可乐', price:31, tags:['实物','套餐'] },
  // 🍔 华莱士
  { id:'r063', cat:1, brand:'华莱士', emoji:'🍔', name:'香辣鸡腿堡', desc:'华莱士辣堡', price:11, tags:['实物'] },
  { id:'r064', cat:1, brand:'华莱士', emoji:'🌯', name:'鸡肉卷', desc:'脆皮鸡肉卷', price:9, tags:['实物'] },
  { id:'r065', cat:1, brand:'华莱士', emoji:'🍔', name:'黑椒牛肉堡', desc:'黑椒牛肉饼', price:14, tags:['实物'] },
  { id:'r066', cat:1, brand:'华莱士', emoji:'🍟', name:'薯条小份', desc:'小份薯条', price:7, tags:['实物'] },
  { id:'r067', cat:1, brand:'华莱士', emoji:'🍗', name:'黑椒鸡块', desc:'黑椒风味鸡块', price:8, tags:['实物'] },
  { id:'r068', cat:1, brand:'华莱士', emoji:'🟤', name:'香芋地瓜丸', desc:'香芋地瓜丸', price:8, tags:['实物'] },
  { id:'r069', cat:1, brand:'华莱士', emoji:'🍗', name:'脆鸡半只', desc:'半只脆皮鸡', price:22, tags:['实物'] },
  { id:'r070', cat:1, brand:'华莱士', emoji:'🥤', name:'冰可乐', desc:'冰镇可乐', price:6, tags:['实物'] },
  { id:'r071', cat:1, brand:'华莱士', emoji:'🧋', name:'港式奶茶', desc:'华莱士港式奶茶', price:9, tags:['实物'] },
  { id:'r072', cat:1, brand:'华莱士', emoji:'🍱', name:'华莱士四件套', desc:'堡+薯条+鸡块+饮料', price:24, tags:['实物','套餐'] },

  // 🍱 隆江猪脚饭
  { id:'r073', cat:2, brand:'隆江猪脚饭', emoji:'🍛', name:'招牌猪脚饭', desc:'卤猪脚+米饭', price:18, tags:['实物'] },
  { id:'r074', cat:2, brand:'隆江猪脚饭', emoji:'🍛', name:'蜜汁叉烧饭', desc:'蜜汁叉烧+米饭', price:17, tags:['实物'] },
  { id:'r075', cat:2, brand:'隆江猪脚饭', emoji:'🍛', name:'卤鸡腿饭', desc:'卤鸡腿+米饭', price:15, tags:['实物'] },
  { id:'r076', cat:2, brand:'隆江猪脚饭', emoji:'🍛', name:'烧鸭饭', desc:'烧鸭+米饭', price:20, tags:['实物'] },
  { id:'r077', cat:2, brand:'隆江猪脚饭', emoji:'🍛', name:'猪脚拼叉烧饭', desc:'猪脚+叉烧双拼', price:23, tags:['实物'] },
  { id:'r078', cat:2, brand:'隆江猪脚饭', emoji:'🍛', name:'猪肘饭', desc:'卤猪肘+米饭', price:22, tags:['实物'] },
  // 🍱 黄焖鸡米饭
  { id:'r079', cat:2, brand:'黄焖鸡米饭', emoji:'🍲', name:'黄焖鸡小份', desc:'小份黄焖鸡', price:15, tags:['实物'] },
  { id:'r080', cat:2, brand:'黄焖鸡米饭', emoji:'🍲', name:'黄焖鸡大份', desc:'大份黄焖鸡', price:19, tags:['实物'] },
  { id:'r081', cat:2, brand:'黄焖鸡米饭', emoji:'🍲', name:'黄焖排骨饭', desc:'黄焖排骨+米饭', price:22, tags:['实物'] },
  // 🍱 日式照烧
  { id:'r082', cat:2, brand:'日式照烧', emoji:'🍱', name:'照烧鸡腿饭', desc:'照烧鸡腿+米饭', price:16, tags:['实物'] },
  { id:'r083', cat:2, brand:'日式照烧', emoji:'🍱', name:'咖喱鸡肉饭', desc:'日式咖喱鸡', price:17, tags:['实物'] },
  { id:'r084', cat:2, brand:'日式照烧', emoji:'🍱', name:'滑蛋牛肉饭', desc:'滑蛋+牛肉饭', price:20, tags:['实物'] },
  { id:'r085', cat:2, brand:'日式照烧', emoji:'🍱', name:'土豆牛肉盖饭', desc:'土豆炖牛肉', price:18, tags:['实物'] },
  // 🍱 家常盖饭
  { id:'r086', cat:2, brand:'家常盖饭', emoji:'🍚', name:'鱼香肉丝盖饭', desc:'鱼香肉丝', price:14, tags:['实物'] },
  { id:'r087', cat:2, brand:'家常盖饭', emoji:'🍚', name:'青椒肉丝盖饭', desc:'青椒肉丝', price:15, tags:['实物'] },
  { id:'r088', cat:2, brand:'家常盖饭', emoji:'🍚', name:'宫保鸡丁盖饭', desc:'宫保鸡丁', price:15, tags:['实物'] },
  { id:'r089', cat:2, brand:'家常盖饭', emoji:'🍚', name:'番茄炒蛋盖饭', desc:'番茄炒蛋', price:13, tags:['实物'] },
  { id:'r090', cat:2, brand:'家常盖饭', emoji:'🍚', name:'梅菜扣肉饭', desc:'梅菜扣肉', price:19, tags:['实物'] },
  { id:'r091', cat:2, brand:'家常盖饭', emoji:'🍚', name:'红烧牛肉饭', desc:'红烧牛肉', price:20, tags:['实物'] },
  { id:'r092', cat:2, brand:'家常盖饭', emoji:'🍚', name:'洋葱肥牛饭', desc:'洋葱肥牛', price:18, tags:['实物'] },
  // 🍱 粉面小吃
  { id:'r093', cat:2, brand:'粉面小吃', emoji:'🍜', name:'螺蛳粉加炸蛋', desc:'螺蛳粉+炸蛋', price:17, tags:['实物'] },
  { id:'r094', cat:2, brand:'粉面小吃', emoji:'🍜', name:'牛肉拉面', desc:'兰州牛肉拉面', price:16, tags:['实物'] },
  { id:'r095', cat:2, brand:'粉面小吃', emoji:'🍲', name:'麻辣烫单人餐', desc:'单人麻辣烫', price:19, tags:['实物'] },
  { id:'r096', cat:2, brand:'粉面小吃', emoji:'🍲', name:'麻辣香锅单人', desc:'单人麻辣香锅', price:20, tags:['实物'] },

  // 🍿 街边小吃
  { id:'r097', cat:3, brand:'街边小吃', emoji:'🌭', name:'烤肠', desc:'原味/辣味烤肠', price:4, tags:['实物'] },
  { id:'r098', cat:3, brand:'街边小吃', emoji:'🥞', name:'手抓饼全套加料', desc:'鸡蛋+火腿+生菜', price:12, tags:['实物'] },
  { id:'r099', cat:3, brand:'街边小吃', emoji:'🌯', name:'烤冷面双蛋', desc:'双蛋烤冷面', price:11, tags:['实物'] },
  { id:'r100', cat:3, brand:'街边小吃', emoji:'🥔', name:'狼牙土豆', desc:'川味狼牙土豆', price:9, tags:['实物'] },
  { id:'r101', cat:3, brand:'街边小吃', emoji:'🍡', name:'章鱼小丸子', desc:'6粒章鱼烧', price:13, tags:['实物'] },
  { id:'r102', cat:3, brand:'街边小吃', emoji:'🍗', name:'炸鸡单人小份', desc:'炸鸡+可乐', price:18, tags:['实物'] }
];

// --- 虚拟互动分类 ---
const VIRTUAL_CATEGORIES = [
  { name: '开胃小食', emoji: '🥟', desc: '碎片快速互动 · 1-5币' },
  { name: '暖心简餐', emoji: '🥪', desc: '日常升温 · 6-12币' },
  { name: '深夜夜宵', emoji: '🌙', desc: '睡前陪伴 · 7-18币' },
  { name: '约会正餐', emoji: '🍝', desc: '深度陪伴 · 15-35币' },
  { name: '宠爱大餐', emoji: '🍣', desc: '纪念日补偿 · 36-85币' },
  { name: '家务工作餐', emoji: '🧹', desc: '分工合作 · 8-28币' },
  { name: '趣味特调', emoji: '🍹', desc: '打闹小游戏 · 6-22币' },
  { name: '赎罪道歉', emoji: '✉️', desc: '吵架和解 · 25-70币' },
  { name: '季节限定', emoji: '🎄', desc: '节日限定混合菜单' }
];

// --- 虚拟互动菜品 ---
const VIRTUAL_ITEMS = [
  // 一、开胃小食 (1-5币)
  { id:'v001', cat:0, emoji:'🤚', name:'摸摸头套餐', desc:'温柔摸摸头', price:2, tags:['虚拟任务'], scene:'轻轻摸摸对方的头，可以是线下也可以是视频里做动作。温柔、不敷衍。' },
  { id:'v002', cat:0, emoji:'💕', name:'一句土味情话', desc:'说一句土味情话', price:1, tags:['虚拟任务'], scene:'说一句让对方又好气又好笑的土味情话，越肉麻越好。' },
  { id:'v003', cat:0, emoji:'💬', name:'夸夸短句一则', desc:'认真夸对方一句', price:2, tags:['虚拟任务'], scene:'认认真真夸对方一句，要具体、真诚，不能敷衍。' },
  { id:'v004', cat:0, emoji:'😍', name:'发送心动表情包', desc:'发3个心动表情包', price:1, tags:['虚拟任务'], scene:'连发3个心动/爱意表情包，让对方感受到你的心意。' },
  { id:'v005', cat:0, emoji:'📍', name:'报备当下在干什么', desc:'拍照报备当前状态', price:2, tags:['虚拟任务'], scene:'拍一张当下的照片，告诉对方你在做什么，给对方安全感。' },
  { id:'v006', cat:0, emoji:'🗣️', name:'叫专属昵称三次', desc:'连叫三次专属昵称', price:3, tags:['虚拟任务'], scene:'用你们的专属昵称叫对方三次，语音或文字都行。' },
  { id:'v007', cat:0, emoji:'💗', name:'比心三连', desc:'连发三张比心照片', price:2, tags:['虚拟任务'], scene:'拍三张不同手势的比心照片发给对方。' },
  { id:'v008', cat:0, emoji:'🥺', name:'回复"我想你"', desc:'立刻回复我想你', price:1, tags:['虚拟任务'], scene:'立刻回复一句"我想你"，不带任何附加内容。' },
  { id:'v009', cat:0, emoji:'👀', name:'对视十秒', desc:'线下/视频对视10秒', price:3, tags:['虚拟任务','异地可用'], scene:'面对面或视频对视10秒，不许笑场、不许移开视线。' },
  { id:'v010', cat:0, emoji:'🤪', name:'拍一张搞怪鬼脸', desc:'拍搞怪鬼脸照', price:3, tags:['虚拟任务'], scene:'拍一张最搞怪的鬼脸照发给对方，越丑越好。' },
  { id:'v011', cat:0, emoji:'👍', name:'给对方朋友圈点赞', desc:'点赞最新3条朋友圈', price:2, tags:['虚拟任务'], scene:'去对方朋友圈点赞最新3条，并留言一条暖心的评论。' },
  { id:'v012', cat:0, emoji:'🌙', name:'语音说晚安短句', desc:'录制晚安语音', price:2, tags:['虚拟任务'], scene:'录一段温柔的晚安语音，轻声说晚安。' },

  // 二、暖心简餐 (6-12币)
  { id:'v013', cat:1, emoji:'🤗', name:'三分钟拥抱套餐', desc:'视频/线下拥抱3分钟', price:6, tags:['虚拟任务','异地可用'], scene:'异地视频拥抱或线下真实拥抱3分钟，感受彼此的心跳。' },
  { id:'v014', cat:1, emoji:'💆', name:'五分钟肩颈按摩', desc:'线下5分钟按摩', price:8, tags:['虚拟任务'], scene:'线下给Ta按5分钟肩颈，力度适中。异地可替换为语音指导放松。' },
  { id:'v015', cat:1, emoji:'👂', name:'五分钟倾听套餐', desc:'认真倾听5分钟', price:7, tags:['虚拟任务'], scene:'放下手机，认真倾听对方说5分钟话，不插嘴、不评判。' },
  { id:'v016', cat:1, emoji:'⚡', name:'30分钟秒回特权', desc:'30分钟内秒回', price:10, tags:['虚拟任务'], scene:'激活后30分钟内所有消息必须秒回，不能已读不回。' },
  { id:'v017', cat:1, emoji:'💬', name:'专属夸奖5条', desc:'连续夸5条优点', price:9, tags:['虚拟任务'], scene:'认认真真夸对方5条优点，每一条都要具体、真诚。' },
  { id:'v018', cat:1, emoji:'😴', name:'哄睡语音一条', desc:'录制哄睡语音', price:6, tags:['虚拟任务','异地可用'], scene:'录制一段温柔的哄睡语音，让对方伴着你的声音入睡。' },
  { id:'v019', cat:1, emoji:'📸', name:'即时自拍投喂', desc:'立刻发自拍', price:7, tags:['虚拟任务'], scene:'立刻拍一张当下自拍发给对方，让对方看到你此刻的样子。' },
  { id:'v020', cat:1, emoji:'📝', name:'记住小提醒', desc:'帮记住一件小事', price:8, tags:['虚拟任务'], scene:'帮对方记住一件Ta容易忘的小事，到时间提醒Ta。' },
  { id:'v021', cat:1, emoji:'👔', name:'帮对方挑选穿搭', desc:'帮选明日穿搭', price:10, tags:['虚拟任务'], scene:'帮对方挑选明天的穿搭，拍照或视频确认。' },
  { id:'v022', cat:1, emoji:'😊', name:'分享今日开心三件事', desc:'分享3件开心事', price:9, tags:['虚拟任务'], scene:'认真分享今天最开心的三件事，传递正能量。' },
  { id:'v023', cat:1, emoji:'📱', name:'帮整理手机相册截图', desc:'整理相册截图', price:11, tags:['虚拟任务'], scene:'帮对方整理手机相册，截图分类结果发给对方。' },
  { id:'v024', cat:1, emoji:'🧴', name:'揉太阳穴服务', desc:'线下揉太阳穴', price:8, tags:['虚拟任务'], scene:'线下帮对方揉太阳穴5分钟，缓解头痛和疲劳。' },
  { id:'v025', cat:1, emoji:'📔', name:'记住喜好备忘录', desc:'建立喜好备忘录', price:12, tags:['虚拟任务'], scene:'认真整理一份对方的喜好备忘录，包括食物、颜色、爱好等。' },
  { id:'v026', cat:1, emoji:'🫂', name:'安慰抱抱语音', desc:'录制安慰语音', price:7, tags:['虚拟任务','异地可用'], scene:'录制一段温柔的安慰语音，让对方感到被关心。' },

  // 三、深夜夜宵 (7-18币)
  { id:'v027', cat:2, emoji:'📖', name:'睡前故事套餐', desc:'讲一个睡前故事', price:12, tags:['虚拟任务','异地可用'], scene:'给对方讲一个温柔的睡前故事，语音或文字都行。' },
  { id:'v028', cat:2, emoji:'💬', name:'深夜碎碎念聊天', desc:'深夜随心聊天', price:15, tags:['虚拟任务','异地可用'], scene:'深夜放下手机之外的一切，随心碎碎念聊天30分钟。' },
  { id:'v029', cat:2, emoji:'🐱', name:'一起熬夜云撸猫', desc:'连麦看猫视频', price:10, tags:['虚拟任务','异地可用'], scene:'连麦一起看猫咪视频，边看边聊，享受治愈时光。' },
  { id:'v030', cat:2, emoji:'吐槽', name:'夜间温柔吐槽局', desc:'互相温柔吐槽', price:14, tags:['虚拟任务'], scene:'互相温柔吐槽对方的小习惯，不能生气，笑着聊。' },
  { id:'v031', cat:2, emoji:'🎵', name:'夜间情歌点播', desc:'唱/放一首情歌', price:11, tags:['虚拟任务','异地可用'], scene:'给对方唱一首或放一首情歌，深夜专属。' },
  { id:'v032', cat:2, emoji:'💭', name:'深夜回忆杀', desc:'聊最初在一起的事', price:16, tags:['虚拟任务','异地可用'], scene:'深夜一起回忆最初在一起时的故事，重温心动的感觉。' },
  { id:'v033', cat:2, emoji:'💌', name:'晚安连环消息', desc:'连发5条晚安消息', price:9, tags:['虚拟任务','异地可用'], scene:'连发5条不同风格的晚安消息，让对方被温暖包围。' },
  { id:'v034', cat:2, emoji:'🛏️', name:'失眠陪伴套餐', desc:'失眠时全程陪伴', price:18, tags:['虚拟任务','异地可用'], scene:'对方失眠时全程陪伴，聊天、讲故事直到对方睡着。' },
  { id:'v035', cat:2, emoji:'🌌', name:'夜晚脑洞幻想局', desc:'聊未来幻想', price:13, tags:['虚拟任务','异地可用'], scene:'深夜一起大开脑洞，聊未来的幻想和计划。' },

  // 四、约会正餐 (15-35币)
  { id:'v036', cat:3, emoji:'🎬', name:'云电影双人套餐', desc:'同步看一部电影', price:18, tags:['虚拟任务','异地可用'], scene:'选一部电影，同时按下播放键，连麦边看边吐槽。' },
  { id:'v037', cat:3, emoji:'🚶', name:'牵手户外散步套餐', desc:'线下散步/云逛街', price:22, tags:['虚拟任务'], scene:'线下出门牵手散步一小时。异地连麦一起逛各自的街区。' },
  { id:'v038', cat:3, emoji:'🌙', name:'深度谈心40分钟', desc:'不玩手机深度聊', price:26, tags:['虚拟任务','异地可用'], scene:'放下手机，面对面或视频深度聊天40分钟。' },
  { id:'v039', cat:3, emoji:'🎮', name:'双人联机游戏套餐', desc:'一起打一局游戏', price:16, tags:['虚拟任务','异地可用'], scene:'陪Ta打一局Ta喜欢的游戏，全程不吵架。' },
  { id:'v040', cat:3, emoji:'📷', name:'互拍氛围感照片', desc:'互相拍10张照片', price:28, tags:['虚拟任务'], scene:'互相给对方拍10张有氛围感的照片，完成后交换。' },
  { id:'v041', cat:3, emoji:'🛒', name:'云逛超市/云逛街', desc:'连麦云逛街', price:20, tags:['虚拟任务','异地可用'], scene:'连麦一起去逛超市或逛街，分享沿途见闻。' },
  { id:'v042', cat:3, emoji:'🧩', name:'一起拼图/做手工', desc:'一起完成一个手工', price:32, tags:['虚拟任务'], scene:'一起完成一个拼图或手工，享受合作的乐趣。' },
  { id:'v043', cat:3, emoji:'🍳', name:'一起做饭套餐', desc:'线下一起做饭', price:30, tags:['虚拟任务'], scene:'线下一起去买菜做饭，享受二人世界的烟火气。' },
  { id:'v044', cat:3, emoji:'📔', name:'回忆相册复盘', desc:'一起翻看回忆', price:24, tags:['虚拟任务','异地可用'], scene:'一起翻看回忆相册，聊聊每张照片背后的故事。' },
  { id:'v045', cat:3, emoji:'🏛️', name:'线上逛博物馆', desc:'云逛博物馆', price:21, tags:['虚拟任务','异地可用'], scene:'连麦一起线上逛博物馆，边逛边聊。' },
  { id:'v046', cat:3, emoji:'❓', name:'真心话回合5题', desc:'5轮真心话', price:23, tags:['虚拟任务','异地可用'], scene:'互相问5个真心话问题，必须如实回答。' },
  { id:'v047', cat:3, emoji:'✈️', name:'一起规划短途旅行', desc:'规划一次旅行', price:33, tags:['虚拟任务','异地可用'], scene:'一起规划一次短途旅行，行程、住宿、美食全规划好。' },
  { id:'v048', cat:3, emoji:'🎶', name:'听歌云歌会', desc:'连麦一起听歌', price:17, tags:['虚拟任务','异地可用'], scene:'连麦一起听歌，互相分享最近喜欢的歌。' },

  // 五、宠爱豪华大餐 (36-85币)
  { id:'v049', cat:4, emoji:'👑', name:'全天优先陪伴特权', desc:'当天优先陪伴', price:42, tags:['虚拟任务'], scene:'激活当天，优先陪伴对方，不敷衍、不冷暴力。' },
  { id:'v050', cat:4, emoji:'🌟', name:'任意小愿望兑换券', desc:'满足一个小愿望', price:65, tags:['虚拟任务'], scene:'满足对方一个合理的小愿望，需提前沟通。' },
  { id:'v051', cat:4, emoji:'🧹', name:'一日贴身管家服务', desc:'包揽当天琐事', price:52, tags:['虚拟任务'], scene:'当天包揽所有琐事：洗碗、拿快递、点外卖。' },
  { id:'v052', cat:4, emoji:'🎁', name:'惊喜盲盒大餐', desc:'随机准备惊喜', price:78, tags:['虚拟任务'], scene:'随机准备一份惊喜，不告诉对方是什么，满满的仪式感！' },
  { id:'v053', cat:4, emoji:'听话', name:'专属一天听话卡', desc:'一天无条件听话', price:48, tags:['虚拟任务'], scene:'当天无条件听话，对方说什么就做什么（合理范围内）。' },
  { id:'v054', cat:4, emoji:'✉️', name:'手写长情书套餐', desc:'手写一封情书', price:55, tags:['虚拟任务'], scene:'手写一封长情书，拍照或寄给对方。' },
  { id:'v055', cat:4, emoji:'📹', name:'专属短视频纪念', desc:'制作纪念短视频', price:72, tags:['虚拟任务','异地可用'], scene:'制作一段专属你们的纪念短视频，配上喜欢的音乐。' },
  { id:'v056', cat:4, emoji:'💝', name:'仪式感纪念日全套', desc:'完整纪念日策划', price:80, tags:['虚拟任务'], scene:'完整策划一个纪念日：礼物+惊喜+仪式感，让对方感动到哭。' },
  { id:'v057', cat:4, emoji:'🤝', name:'无条件迁就半天', desc:'半天无条件迁就', price:40, tags:['虚拟任务'], scene:'半天内无条件迁就对方，对方说什么都对。' },
  { id:'v058', cat:4, emoji:'📋', name:'未来规划深度会谈', desc:'深度聊未来规划', price:60, tags:['虚拟任务','异地可用'], scene:'认真深度聊未来规划：事业、生活、家庭，坦诚交流。' },

  // 六、家务工作餐 (8-28币)
  { id:'v059', cat:5, emoji:'🍽️', name:'洗碗一次', desc:'包揽一次洗碗', price:10, tags:['虚拟任务'], scene:'包揽一次洗碗任务，洗得干干净净。' },
  { id:'v060', cat:5, emoji:'🧹', name:'全屋简单扫地拖地', desc:'全屋打扫', price:22, tags:['虚拟任务'], scene:'全屋简单扫地+拖地，让家里焕然一新。' },
  { id:'v061', cat:5, emoji:'📦', name:'取快递全套', desc:'帮取快递', price:8, tags:['虚拟任务'], scene:'帮对方取快递，拆好整理好。' },
  { id:'v062', cat:5, emoji:'🍎', name:'投喂水果切盘', desc:'切好水果端上', price:14, tags:['虚拟任务'], scene:'切好水果拼盘端到对方面前。' },
  { id:'v063', cat:5, emoji:'🧹', name:'收拾桌面杂物', desc:'整理桌面', price:12, tags:['虚拟任务'], scene:'收拾整理桌面杂物，让桌面整洁。' },
  { id:'v064', cat:5, emoji:'👔', name:'洗衣服晾晒全套', desc:'洗衣+晾晒', price:25, tags:['虚拟任务'], scene:'洗衣服+晾晒+收叠全套服务。' },
  { id:'v065', cat:5, emoji:'🗑️', name:'倒垃圾连续三天', desc:'连续3天倒垃圾', price:16, tags:['虚拟任务'], scene:'连续三天负责倒垃圾，不用对方操心。' },
  { id:'v066', cat:5, emoji:'🍱', name:'规划今日三餐', desc:'规划一天吃饭', price:18, tags:['虚拟任务'], scene:'规划好今天的三餐，包括外卖或做饭。' },
  { id:'v067', cat:5, emoji:'🛏️', name:'帮对方整理床铺', desc:'整理床铺', price:9, tags:['虚拟任务'], scene:'帮对方整理床铺，铺好被子。' },
  { id:'v068', cat:5, emoji:'💻', name:'异地版：帮做资料整理', desc:'帮整理资料', price:28, tags:['虚拟任务','异地可用'], scene:'异地版：帮对方整理电子资料、文档分类等。' },

  // 七、调皮趣味特调 (6-22币)
  { id:'v069', cat:6, emoji:'🥺', name:'撒娇三分钟', desc:'连续撒娇3分钟', price:8, tags:['虚拟任务','异地可用'], scene:'连续撒娇三分钟，越肉麻越好，不能中断、不能笑场。' },
  { id:'v070', cat:6, emoji:'🐱', name:'模仿小动物表演', desc:'模仿小动物1分钟', price:7, tags:['虚拟任务','异地可用'], scene:'模仿小猫或小狗的叫声和动作一分钟，全程录制。' },
  { id:'v071', cat:6, emoji:'📱', name:'朋友圈公开夸对方', desc:'发朋友圈夸对方', price:19, tags:['虚拟任务'], scene:'发一条朋友圈公开夸对方，保留至少24小时。' },
  { id:'v072', cat:6, emoji:'🎤', name:'清唱完整情歌一首', desc:'清唱一首情歌', price:13, tags:['虚拟任务','异地可用'], scene:'清唱一首情歌给对方听，不能放伴奏。' },
  { id:'v073', cat:6, emoji:'😎', name:'素颜自拍一张', desc:'发素颜自拍', price:11, tags:['虚拟任务','异地可用'], scene:'立刻拍一张素颜自拍发给对方，不能滤镜。' },
  { id:'v074', cat:6, emoji:'💃', name:'模仿网红魔性小舞蹈', desc:'跳网红舞蹈', price:16, tags:['虚拟任务','异地可用'], scene:'模仿一个网红魔性小舞蹈，录制视频发给对方。' },
  { id:'v075', cat:6, emoji:'🖼️', name:'聊天背景换成对方照片', desc:'换聊天背景', price:9, tags:['虚拟任务'], scene:'把聊天背景换成对方照片，截图为证。' },
  { id:'v076', cat:6, emoji:'🙇', name:'叫对方老大一整天', desc:'全天叫老大', price:14, tags:['虚拟任务'], scene:'一整天叫对方"老大"，每次对话都要带。' },
  { id:'v077', cat:6, emoji:'😂', name:'讲5个冷笑话', desc:'讲5个冷笑话', price:6, tags:['虚拟任务','异地可用'], scene:'讲5个冷笑话给对方听，必须讲完。' },
  { id:'v078', cat:6, emoji:'🎭', name:'模仿对方说话语气', desc:'模仿对方说话', price:12, tags:['虚拟任务'], scene:'模仿对方说话语气3分钟，越像越好。' },
  { id:'v079', cat:6, emoji:'🤡', name:'起搞怪外号全程使用', desc:'给自己起外号', price:10, tags:['虚拟任务'], scene:'给自己起一个搞怪外号，全天聊天中使用。' },
  { id:'v080', cat:6, emoji:'🤳', name:'拍丑照一张不许删', desc:'拍丑照不删', price:15, tags:['虚拟任务'], scene:'拍一张最丑的照片发给对方，不许删除。' },
  { id:'v081', cat:6, emoji:'💧', name:'含水憋笑挑战', desc:'含水憋笑', price:17, tags:['虚拟任务','异地可用'], scene:'含一口水，对方讲笑话，憋住不笑，喷出来算输。' },
  { id:'v082', cat:6, emoji:'🌈', name:'夸夸彩虹屁30秒', desc:'30秒彩虹屁', price:8, tags:['虚拟任务','异地可用'], scene:'连续30秒对对方输出彩虹屁，不能停顿。' },

  // 八、赎罪道歉套餐 (25-70币)
  { id:'v083', cat:7, emoji:'🙏', name:'基础认错套餐', desc:'认错+小情话', price:28, tags:['虚拟任务'], scene:'主动认错 + 说一段走心的小情话，态度诚恳。' },
  { id:'v084', cat:7, emoji:'📝', name:'反省小作文', desc:'写反省小作文', price:35, tags:['虚拟任务'], scene:'写一篇300字以上的反省小作文，深刻分析自己的问题。' },
  { id:'v085', cat:7, emoji:'👂', name:'罚听吐槽半小时', desc:'听对方吐槽30分钟', price:42, tags:['虚拟任务'], scene:'安静听对方吐槽自己30分钟，不许反驳、不许辩解。' },
  { id:'v086', cat:7, emoji:'💆', name:'补偿按摩全套', desc:'全套按摩补偿', price:32, tags:['虚拟任务'], scene:'线下全套按摩服务：肩颈+头部+腰部，作为补偿。' },
  { id:'v087', cat:7, emoji:'🤐', name:'禁止顶嘴一天', desc:'一天不顶嘴', price:45, tags:['虚拟任务'], scene:'一天内无论对方说什么都不许顶嘴，乖乖听话。' },
  { id:'v088', cat:7, emoji:'🎟️', name:'许愿补偿券', desc:'满足一个愿望', price:62, tags:['虚拟任务'], scene:'给对方一张许愿补偿券，对方可以随时兑换一个愿望。' },
  { id:'v089', cat:7, emoji:'🎙️', name:'认错语音录制', desc:'录制认错语音', price:26, tags:['虚拟任务','异地可用'], scene:'录制一段诚恳的认错语音，语气温柔、态度端正。' },
  { id:'v090', cat:7, emoji:'🧹', name:'赎罪家务全套', desc:'包揽全部家务', price:50, tags:['虚拟任务'], scene:'包揽当天全部家务作为赎罪：洗碗、扫地、洗衣、做饭。' },
  { id:'v091', cat:7, emoji:'💝', name:'情绪优先券', desc:'对方情绪优先', price:70, tags:['虚拟任务'], scene:'一周内对方情绪永远优先，对方不开心立刻放下一切陪伴。' },

  // 九、季节限定混合菜单
  { id:'v092', cat:8, emoji:'🕯️', name:'情人节云烛光晚餐', desc:'奶茶+连麦陪伴', price:45, tags:['混合','季节限定'], scene:'情人节限定：点一杯奶茶，连麦烛光晚餐，仪式感拉满。' },
  { id:'v093', cat:8, emoji:'🎂', name:'生日限定六寸小蛋糕', desc:'实物小蛋糕', price:38, tags:['实物','季节限定'], scene:'生日限定：为对方点一个六寸小蛋糕，线下或外卖送达。' },
  { id:'v094', cat:8, emoji:'☕', name:'跨年限定双人咖啡套餐', desc:'双人咖啡+跨年', price:55, tags:['混合','季节限定'], scene:'跨年限定：双人咖啡套餐 + 跨年倒计时连麦。' },
  { id:'v095', cat:8, emoji:'🥩', name:'七夕双人烤肉大餐', desc:'线下烤肉大餐', price:88, tags:['实物','季节限定'], scene:'七夕限定：线下双人烤肉大餐，满满的仪式感。' }
];

// --- 套餐推荐 ---
const COMBO_ITEMS = [
  { id:'c001', cat:0, emoji:'💝', name:'甜蜜下午茶套餐', desc:'喜茶多肉葡萄 + 撒娇三分钟', price:28, tags:['混合套餐'], scene:'一杯喜茶多肉葡萄搭配三分钟撒娇，甜蜜加倍！原价30币，套餐价28币。', includes:['r026','v069'] },
  { id:'c002', cat:0, emoji:'🌙', name:'深夜暖心套餐', desc:'螺蛳粉加炸蛋 + 睡前故事', price:26, tags:['混合套餐'], scene:'一碗热腾腾的螺蛳粉搭配睡前故事语音，深夜治愈系。原价29币，套餐价26币。', includes:['r093','v027'] },
  { id:'c003', cat:0, emoji:'🎮', name:'麦当劳快乐套餐', desc:'麦辣鸡腿堡套餐 + 联机游戏', price:40, tags:['混合套餐'], scene:'麦当劳套餐+一起打游戏，边吃边玩超开心！原价44币，套餐价40币。', includes:['r051','v039'] },
  { id:'c004', cat:0, emoji:'🌅', name:'早餐投喂套餐', desc:'手抓饼全套 + 摸摸头', price:12, tags:['混合套餐'], scene:'一份手抓饼搭配温柔的摸摸头，开启美好一天。原价14币，套餐价12币。', includes:['r098','v001'] },
  { id:'c005', cat:0, emoji:'📺', name:'炸鸡追剧套餐', desc:'炸鸡小份 + 云电影双人', price:32, tags:['混合套餐'], scene:'炸鸡配电影，异地恋也能一起看。原价36币，套餐价32币。', includes:['r102','v036'] },
  { id:'c006', cat:0, emoji:'🧋', name:'奶茶撒娇套餐', desc:'蜜雪冰城珍珠奶茶 + 撒娇三分钟', price:13, tags:['混合套餐'], scene:'一杯珍珠奶茶搭配撒娇三分钟，甜度爆表。原价15币，套餐价13币。', includes:['r005','v069'] },
  { id:'c007', cat:0, emoji:'🍛', name:'猪脚饭陪伴套餐', desc:'招牌猪脚饭 + 深度谈心40分钟', price:40, tags:['混合套餐'], scene:'一份猪脚饭搭配深度谈心，吃饱了聊透了。原价44币，套餐价40币。', includes:['r073','v038'] },
  { id:'c008', cat:0, emoji:'🍺', name:'炸鸡啤酒夜聊套餐', desc:'炸鸡小份 + 深夜碎碎念', price:30, tags:['混合套餐'], scene:'炸鸡配深夜碎碎念聊天，越聊越开心。原价33币，套餐价30币。', includes:['r102','v028'] },
  { id:'c009', cat:0, emoji:'🍦', name:'甜品安慰套餐', desc:'雪王大圣代 + 安慰抱抱语音', price:10, tags:['混合套餐'], scene:'一份圣代搭配温柔的安慰语音，瞬间被治愈。原价11币，套餐价10币。', includes:['r008','v026'] },
  { id:'c010', cat:0, emoji:'🍱', name:'加班投喂套餐', desc:'黄焖鸡大份 + 记住小提醒', price:25, tags:['混合套餐'], scene:'一份黄焖鸡搭配帮记住小事，加班也不孤单。原价27币，套餐价25币。', includes:['r080','v020'] }
];

const ACHIEVEMENTS = [
  { id: 'a1', icon: '🥪', name: '暖心达人', desc: '累计完成50次暖心简餐互动', target: 50, type: 'cat1' },
  { id: 'a2', icon: '🍝', name: '约会常客', desc: '累计完成30次约会正餐', target: 30, type: 'cat3' },
  { id: 'a3', icon: '✉️', name: '温柔致歉官', desc: '使用10次道歉套餐', target: 10, type: 'apology' },
  { id: 'a4', icon: '🌍', name: '异地坚守者', desc: '连续30天签到', target: 30, type: 'streak' },
  { id: 'a5', icon: '💰', name: '宠妻/宠夫大师', desc: '累计消费500爱心币', target: 500, type: 'spent' },
  { id: 'a6', icon: '💖', name: '甜蜜初恋', desc: '累计完成10个互动订单', target: 10, type: 'total' },
  { id: 'a7', icon: '🏆', name: '全菜单猎人', desc: '尝试过全部9大分类', target: 9, type: 'categories' },
  { id: 'a8', icon: '🍔', name: '美食家', desc: '完成20次实物外卖订单', target: 20, type: 'real' },
  { id: 'a9', icon: '📅', name: '坚持签到7天', desc: '连续签到满7天', target: 7, type: 'checkin7' },
  { id: 'a10', icon: '💝', name: '套餐达人', desc: '使用5次套餐推荐', target: 5, type: 'combo' }
];

const DEFAULT_ANNIVERSARIES = [
  { id: 'an1', name: '在一起的纪念日', emoji: '💑', month: 1, day: 1 },
  { id: 'an2', name: '我的生日', emoji: '🎂', month: 6, day: 15 },
  { id: 'an3', name: 'Ta的生日', emoji: '🎂', month: 9, day: 20 }
];

// ========================================
// 二、状态管理
// ========================================

const STORAGE_KEY = 'xin_dong_xiao_guan_v3';
const API_BASE = ''; // 同源部署，空字符串即可

// API 请求封装
async function api(path, method = 'GET', body = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  try {
    const res = await fetch(API_BASE + '/api/' + path, opts);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error('API错误:', e);
    return { success: false, msg: '网络错误，请检查服务器是否启动' };
  }
}

// 防抖保存
let saveTimer = null;
let syncTimer = null;

let state = {
  user: null,
  isLoggedIn: false,
  rememberMe: true,
  isBound: false,
  inviteCode: '',
  couple: { name1: '小甜心', name2: '大笨蛋', avatar1: '🌸', avatar2: '🌙', togetherDate: '2024-01-01' },
  coins: 100,
  coinLog: [],
  totalSpent: 0,
  cart: [],
  orders: [],
  customItems: [],
  wishlist: [],
  blacklist: [],
  anniversaries: [],
  checkin: { lastDate: '', streak: 0, totalDays: 0, partnerCheckin: false },
  unlockedAchievements: [],
  anniversaryClaimed: []
};

let currentMode = 'real';
let currentCat = 0;
let currentBrand = '全部';
let currentOrderTab = 'pending';

function initState() {
  // 从 localStorage 恢复会话信息（登录状态、用户信息）
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const savedState = JSON.parse(saved);
      state.user = savedState.user || null;
      state.isLoggedIn = savedState.isLoggedIn || false;
      state.isBound = savedState.isBound || false;
      state.inviteCode = savedState.inviteCode || '';
      state.userId = savedState.userId || null;
    } catch(e) {}
  }
  if (!state.anniversaries || state.anniversaries.length === 0) state.anniversaries = [...DEFAULT_ANNIVERSARIES];
  if (!state.coinLog) state.coinLog = [];
  if (!state.orders) state.orders = [];
  if (!state.customItems) state.customItems = [];
  if (!state.wishlist) state.wishlist = [];
  if (!state.blacklist) state.blacklist = [];
  if (!state.unlockedAchievements) state.unlockedAchievements = [];
  if (!state.anniversaryClaimed) state.anniversaryClaimed = [];
}

// 保存会话信息到 localStorage（仅登录相关）
function saveSession() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    isBound: state.isBound,
    inviteCode: state.inviteCode,
    userId: state.userId
  }));
}

// 保存共享状态到后端（防抖）
function saveState() {
  saveSession();
  if (!state.userId || !state.isBound) return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    // 只同步共享数据，不同步登录信息
    const syncData = {
      coins: state.coins,
      coinLog: state.coinLog,
      totalSpent: state.totalSpent,
      cart: state.cart,
      orders: state.orders,
      customItems: state.customItems,
      wishlist: state.wishlist,
      blacklist: state.blacklist,
      anniversaries: state.anniversaries,
      couple: state.couple,
      checkin: state.checkin,
      unlockedAchievements: state.unlockedAchievements,
      anniversaryClaimed: state.anniversaryClaimed
    };
    await api('state/' + state.userId, 'POST', { state: syncData });
  }, 800);
}

// 从后端拉取最新共享状态
async function syncFromServer() {
  if (!state.userId || !state.isBound) return;
  const res = await api('state/' + state.userId);
  if (res.success && res.state) {
    applyServerState(res.state);
    // 刷新当前页面
    if ($('#main-app') && !$('#main-app').classList.contains('hidden')) {
      const activePage = $('.page.active')?.id?.replace('page-', '');
      if (activePage === 'home') renderHome();
      if (activePage === 'menu') renderMenu();
      if (activePage === 'orders') renderOrders();
      if (activePage === 'album') renderAlbum();
      if (activePage === 'achievements') renderAchievements();
      if (activePage === 'profile') renderProfile();
    }
  }
}

function generateCode(len) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < len; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// ========================================
// 三、工具函数
// ========================================

function $(s) { return document.querySelector(s); }
function $$(s) { return document.querySelectorAll(s); }

function formatDate(d) {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
}

function formatDateShort(d) {
  const dt = new Date(d);
  return `${dt.getMonth()+1}月${dt.getDate()}日`;
}

function daysBetween(d1, d2) {
  return Math.floor(Math.abs(new Date(d1) - new Date(d2)) / 86400000);
}

function todayStr() { return formatDate(new Date()); }

// 获取当前模式分类
function getCategories() {
  if (currentMode === 'real') return REAL_CATEGORIES;
  if (currentMode === 'virtual') return VIRTUAL_CATEGORIES;
  return [{ name: '全部套餐', emoji: '💝', desc: '精选搭配，实惠又甜蜜' }];
}

// 获取当前模式菜品
function getModeItems() {
  if (currentMode === 'real') return [...REAL_ITEMS, ...state.customItems.filter(i => i.modeType === 'real')];
  if (currentMode === 'virtual') return [...VIRTUAL_ITEMS, ...state.customItems.filter(i => i.modeType === 'virtual')];
  return [...COMBO_ITEMS, ...state.customItems.filter(i => i.modeType === 'combo')];
}

// 获取所有菜品（跨模式，用于查找）
function getAllItems() {
  return [...REAL_ITEMS, ...VIRTUAL_ITEMS, ...COMBO_ITEMS, ...state.customItems];
}

function findItem(id) { return getAllItems().find(i => i.id === id); }
function getItemName(id) { const i = findItem(id); return i ? i.name : '未知菜品'; }
function getItemEmoji(id) { const i = findItem(id); return i ? i.emoji : '🍽️'; }
function getItemPrice(id) { const i = findItem(id); return i ? i.price : 0; }
function getItemType(id) {
  const i = findItem(id);
  if (!i) return 'unknown';
  if (i.id.startsWith('r')) return 'real';
  if (i.id.startsWith('v') && !i.tags?.includes('实物')) return 'virtual';
  if (i.id.startsWith('c')) return 'combo';
  if (i.tags?.includes('实物')) return 'real';
  return 'virtual';
}

function getVisibleItems(cat) {
  let items = getModeItems().filter(i => i.cat === cat && !state.blacklist.includes(i.id));
  if (currentMode === 'real' && currentBrand !== '全部') {
    items = items.filter(i => i.brand === currentBrand);
  }
  return items;
}

// ========================================
// 四、Toast & 动画
// ========================================

function toast(msg, type = '') {
  const c = $('#toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'coin' ? '🪙' : '💡';
  t.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => t.remove(), 2100);
}

function floatHeart(x, y) {
  const hearts = ['💕','💖','💗','💘','❤️','🧡'];
  const h = document.createElement('div');
  h.className = 'float-heart';
  h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  h.style.left = (x || innerWidth/2) + 'px';
  h.style.top = (y || innerHeight/2) + 'px';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 1500);
}

function coinFlyAnim() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      floatHeart(innerWidth/2 + (Math.random()-0.5)*100, innerHeight/2 + (Math.random()-0.5)*80);
    }, i * 100);
  }
}

// ========================================
// 五、爱心币系统
// ========================================

function addCoins(amount, reason) {
  state.coins += amount;
  state.coinLog.unshift({ amount, reason, date: new Date().toISOString(), type: amount > 0 ? 'earn' : 'spend' });
  if (state.coinLog.length > 100) state.coinLog = state.coinLog.slice(0, 100);
  saveState();
  updateCoinDisplay();
}

function spendCoins(amount, reason) {
  if (state.coins < amount) return false;
  state.coins -= amount;
  state.totalSpent += amount;
  state.coinLog.unshift({ amount: -amount, reason, date: new Date().toISOString(), type: 'spend' });
  if (state.coinLog.length > 100) state.coinLog = state.coinLog.slice(0, 100);
  saveState();
  updateCoinDisplay();
  return true;
}

function updateCoinDisplay() {
  const el = $('#coin-count');
  if (el) el.textContent = state.coins;
}

function checkIn() {
  const today = todayStr();
  if (state.checkin.lastDate === today) { toast('今天已经签到过啦~'); return; }
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  state.checkin.streak = state.checkin.lastDate === formatDate(yesterday) ? state.checkin.streak + 1 : 1;
  state.checkin.lastDate = today;
  state.checkin.totalDays += 1;

  let reward = 5;
  let msg = `签到成功！+${reward}爱心币`;

  if (!state.checkin.partnerCheckin) {
    state.checkin.partnerCheckin = true;
    reward += 10;
    msg = `双人签到！+${reward}爱心币（含共同签到奖励+10）`;
  } else {
    state.checkin.partnerCheckin = false;
  }

  if (state.checkin.streak === 7) { reward += 30; msg += `\n连续签到7天！额外+30爱心币`; }
  else if (state.checkin.streak > 0 && state.checkin.streak % 30 === 0) { reward += 50; msg += `\n连续签到${state.checkin.streak}天！额外+50爱心币`; }

  addCoins(reward, `每日签到（连续${state.checkin.streak}天）`);
  toast(msg, 'coin');
  coinFlyAnim();
  updateCheckinBtn();
  checkAchievements();
  saveState();
}

function updateCheckinBtn() {
  const btn = $('#checkin-btn');
  if (!btn) return;
  if (state.checkin.lastDate === todayStr()) {
    btn.classList.add('checked');
    btn.innerHTML = '<span class="checkin-icon">✅</span><span>已签到</span>';
  } else {
    btn.classList.remove('checked');
    btn.innerHTML = '<span class="checkin-icon">📅</span><span>签到</span>';
  }
}

function checkAnniversaryReward() {
  const today = new Date();
  const todayKey = `${today.getMonth()+1}-${today.getDate()}`;
  state.anniversaries.forEach(an => {
    const anKey = `${an.month}-${an.day}`;
    if (anKey === todayKey && !state.anniversaryClaimed.includes(an.id + '_' + today.getFullYear())) {
      state.anniversaryClaimed.push(an.id + '_' + today.getFullYear());
      addCoins(50, `纪念日打卡：${an.name}`);
      toast(`🎉 ${an.name}！+50爱心币`, 'coin');
      coinFlyAnim();
    }
  });
  saveState();
}

// ========================================
// 六、认证 & 绑定流程
// ========================================

function showAuthPage() {
  $('#splash-screen').style.display = 'none';
  $('#auth-page').classList.remove('hidden');
  $('#binding-page').classList.add('hidden');
  $('#main-app').classList.add('hidden');
}

function showBindingPage() {
  $('#auth-page').classList.add('hidden');
  $('#binding-page').classList.remove('hidden');
  $('#main-app').classList.add('hidden');
  $('#my-invite-code').textContent = state.inviteCode;
}

function showMainApp() {
  $('#auth-page').classList.add('hidden');
  $('#binding-page').classList.add('hidden');
  $('#main-app').classList.remove('hidden');
  switchPage('home');
  startAutoSync();
}

async function handleLogin() {
  const account = $('#login-account').value.trim();
  const password = $('#login-password').value.trim();
  if (!account || !password) { toast('请输入账号和密码', 'error'); return; }

  const btn = $('#login-submit');
  const oldText = btn.textContent;
  btn.textContent = '登录中...';
  btn.disabled = true;

  const res = await api('login', 'POST', { account, password });
  btn.textContent = oldText;
  btn.disabled = false;

  if (!res.success) { toast(res.msg || '登录失败', 'error'); return; }

  const u = res.user;
  state.user = { account: u.phone, nickname: u.nickname, phone: u.phone };
  state.userId = u.id;
  state.inviteCode = u.invite_code;
  state.isLoggedIn = true;
  state.isBound = u.is_bound;
  state.rememberMe = $('#remember-me').checked;

  // 如果已绑定，从服务器拉取共享状态
  if (u.is_bound && res.state) {
    applyServerState(res.state);
    if (u.partner) {
      state.couple.name2 = u.partner.nickname;
    }
  }

  saveSession();
  toast('登录成功！', 'success');
  setTimeout(() => { if (state.isBound) showMainApp(); else showBindingPage(); }, 500);
}

async function handleRegister() {
  const phone = $('#reg-phone').value.trim();
  const nickname = $('#reg-nickname').value.trim();
  const pwd = $('#reg-password').value.trim();
  const pwd2 = $('#reg-password2').value.trim();
  if (!phone || phone.length < 11) { toast('请输入正确的手机号', 'error'); return; }
  if (!nickname) { toast('请输入昵称', 'error'); return; }
  if (pwd.length < 6) { toast('密码至少6位', 'error'); return; }
  if (pwd !== pwd2) { toast('两次密码不一致', 'error'); return; }

  const btn = $('#register-submit');
  const oldText = btn.textContent;
  btn.textContent = '注册中...';
  btn.disabled = true;

  const res = await api('register', 'POST', { phone, nickname, password: pwd });
  btn.textContent = oldText;
  btn.disabled = false;

  if (!res.success) { toast(res.msg || '注册失败', 'error'); return; }

  const u = res.user;
  state.user = { account: phone, nickname, phone };
  state.userId = u.id;
  state.inviteCode = u.invite_code;
  state.isLoggedIn = true;
  state.isBound = false;
  state.couple.name1 = nickname;
  state.couple.name2 = '未绑定';
  saveSession();
  toast('注册成功！你的邀请码是 ' + u.invite_code, 'success');
  setTimeout(() => showBindingPage(), 600);
}

async function handleBind() {
  const code = $('#partner-code-input').value.trim().toUpperCase();
  if (code.length < 5) { toast('请输入5位邀请码', 'error'); return; }

  const btn = $('#bind-submit');
  const oldText = btn.textContent;
  btn.textContent = '绑定中...';
  btn.disabled = true;

  const res = await api('bind', 'POST', { user_id: state.userId, partner_code: code });
  btn.textContent = oldText;
  btn.disabled = false;

  if (!res.success) { toast(res.msg || '绑定失败', 'error'); return; }

  state.isBound = true;
  // 应用服务器返回的初始共享状态
  if (res.state) {
    applyServerState(res.state);
  }
  if (res.partner) {
    state.couple.name2 = res.partner.nickname;
  }
  saveSession();
  toast('绑定成功！开启你们的甜蜜空间~', 'success');
  coinFlyAnim();
  setTimeout(() => showMainApp(), 600);
}

// 将服务器返回的状态应用到本地
function applyServerState(s) {
  if (!s) return;
  state.coins = s.coins ?? state.coins;
  state.coinLog = s.coinLog ?? state.coinLog;
  state.totalSpent = s.totalSpent ?? state.totalSpent;
  state.cart = s.cart ?? state.cart;
  state.orders = s.orders ?? state.orders;
  state.customItems = s.customItems ?? state.customItems;
  state.wishlist = s.wishlist ?? state.wishlist;
  state.blacklist = s.blacklist ?? state.blacklist;
  state.anniversaries = s.anniversaries ?? state.anniversaries;
  state.couple = s.couple ?? state.couple;
  state.checkin = s.checkin ?? state.checkin;
  state.unlockedAchievements = s.unlockedAchievements ?? state.unlockedAchievements;
  state.anniversaryClaimed = s.anniversaryClaimed ?? state.anniversaryClaimed;
}

function handleLogout() {
  showConfirmModal('🚪', '退出登录？', '退出后需要重新登录才能使用', () => {
    state.isLoggedIn = false;
    state.isBound = false;
    state.user = null;
    state.userId = null;
    state.inviteCode = '';
    localStorage.removeItem(STORAGE_KEY);
    closeGenericModal();
    showAuthPage();
    toast('已退出登录', '');
  });
}

function handleUnbind() {
  showConfirmModal('💔', '解除情侣绑定？', '解除后共同订单与爱心币将被清空，双方都会解除绑定。', async () => {
    const res = await api('unbind', 'POST', { user_id: state.userId });
    if (!res.success) { toast(res.msg || '解绑失败', 'error'); return; }
    state.isBound = false;
    state.orders = [];
    state.coins = 100;
    state.coinLog = [];
    state.totalSpent = 0;
    state.cart = [];
    state.unlockedAchievements = [];
    state.checkin = { lastDate: '', streak: 0, totalDays: 0, partnerCheckin: false };
    state.couple.name2 = '未绑定';
    saveSession();
    closeGenericModal();
    showBindingPage();
    toast('已解除绑定', '');
  });
}

// ========================================
// 七、页面导航
// ========================================

function switchPage(pageName) {
  $$('.page').forEach(p => p.classList.remove('active'));
  const target = $(`#page-${pageName}`);
  if (target) target.classList.add('active');
  $$('.tab-item').forEach(t => t.classList.remove('active'));
  const tab = $(`.tab-item[data-page="${pageName}"]`);
  if (tab) tab.classList.add('active');
  if (target) target.scrollTop = 0;

  if (pageName === 'home') renderHome();
  if (pageName === 'menu') renderMenu();
  if (pageName === 'orders') renderOrders();
  if (pageName === 'album') renderAlbum();
  if (pageName === 'achievements') renderAchievements();
  if (pageName === 'profile') renderProfile();
}

// ========================================
// 八、首页渲染
// ========================================

function renderHome() {
  $('#name-1').textContent = state.couple.name1;
  $('#name-2').textContent = state.couple.name2;
  $('#avatar-1').textContent = state.couple.avatar1;
  $('#avatar-2').textContent = state.couple.avatar2;
  $('#days-together').textContent = daysBetween(state.couple.togetherDate, new Date());
  updateCoinDisplay();
  updateCheckinBtn();
  const pending = state.orders.filter(o => ['pending','accepted','delayed','proof-uploaded','confirming'].includes(o.status)).length;
  $('#home-pending-count').textContent = pending;
  checkAnniversaryReward();
  renderCountdown();
  renderRecommend();
}

function renderCountdown() {
  const c = $('#countdown-row');
  c.innerHTML = '';
  const now = new Date();
  const y = now.getFullYear();
  state.anniversaries.forEach(an => {
    let d = new Date(y, an.month - 1, an.day);
    if (d < now) d = new Date(y + 1, an.month - 1, an.day);
    const days = Math.ceil((d - now) / 86400000);
    const card = document.createElement('div');
    card.className = 'countdown-card' + (days <= 7 ? ' urgent' : '');
    card.innerHTML = `<div class="countdown-emoji">${an.emoji}</div><div class="countdown-name">${an.name}</div><div><span class="countdown-num">${days}</span><span class="countdown-unit">天后</span></div><div class="countdown-date">${an.month}月${an.day}日</div>`;
    c.appendChild(card);
  });
}

function renderRecommend() {
  const c = $('#recommend-card');
  const visible = getAllItems().filter(i => !state.blacklist.includes(i.id) && !i.tags?.includes('季节限定'));
  if (visible.length === 0) { c.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-light);font-size:13px;">暂无推荐菜品</div>'; return; }
  const item = visible[Math.floor(Math.random() * visible.length)];
  const typeBadge = item.id.startsWith('r') ? '<span class="recommend-type type-real">实物</span>' : item.id.startsWith('c') ? '<span class="recommend-type type-combo">套餐</span>' : '<span class="recommend-type type-virtual">互动</span>';
  c.innerHTML = `
    <div class="recommend-emoji">${item.emoji}</div>
    <div class="recommend-body">
      <div class="recommend-name">${typeBadge}${item.name}</div>
      <div class="recommend-desc">${item.desc}</div>
    </div>
    <div class="recommend-price">${item.price}币</div>`;
  c.onclick = () => { addToCart(item.id); switchPage('menu'); toast('已加入购物车~', 'success'); };
}

// ========================================
// 九、菜单渲染 & 模式切换
// ========================================

function renderMenu() { renderMenuTabs(); renderMenuList(); updateCartFloat(); }

function renderMenuTabs() {
  const cats = getCategories();
  const sidebar = $('#menu-sidebar');
  sidebar.innerHTML = cats.map((cat, i) =>
    `<div class="sidebar-item ${i === currentCat ? 'active' : ''}" data-cat="${i}"><span class="sidebar-emoji">${cat.emoji}</span><span class="sidebar-name">${cat.name}</span></div>`
  ).join('');
  $$('.sidebar-item').forEach(item => {
    item.onclick = () => {
      $$('.sidebar-item').forEach(t => t.classList.remove('active'));
      item.classList.add('active');
      currentCat = parseInt(item.dataset.cat);
      currentBrand = '全部';
      renderBrandFilter();
      renderMenuList();
    };
  });
  renderBrandFilter();
}

function renderBrandFilter() {
  const filter = $('#brand-filter');
  const cats = getCategories();
  if (currentMode !== 'real' || !cats[currentCat] || !cats[currentCat].brands) {
    filter.classList.add('hidden');
    return;
  }
  filter.classList.remove('hidden');
  const brands = cats[currentCat].brands;
  filter.innerHTML = brands.map(b =>
    `<button class="brand-chip ${b === currentBrand ? 'active' : ''}" data-brand="${b}">${b}</button>`
  ).join('');
  $$('.brand-chip').forEach(chip => {
    chip.onclick = () => {
      currentBrand = chip.dataset.brand;
      renderBrandFilter();
      renderMenuList();
    };
  });
}

function renderMenuList() {
  const items = getVisibleItems(currentCat);
  const c = $('#menu-list');
  const cats = getCategories();
  const cat = cats[currentCat];
  $('#cat-desc').textContent = cat ? cat.desc : '';

  if (items.length === 0) {
    c.innerHTML = `<div class="empty-state"><div class="empty-emoji">🍽️</div><div class="empty-text">这个分类还没有菜品</div><div class="empty-hint">去"我的"页面添加自定义菜品吧</div></div>`;
    return;
  }

  c.innerHTML = items.map((item, idx) => {
    const inCart = state.cart.some(ci => ci.id === item.id);
    const tagsHtml = (item.tags || []).map(t => `<span class="item-tag">${t}</span>`).join('');
    const brandHtml = item.brand ? `<span class="item-brand">${item.brand}</span>` : '';
    const typeIcon = item.id.startsWith('r') ? '🍔' : item.id.startsWith('c') ? '💝' : '🧸';
    const comboDesc = item.includes ? `<div class="item-combo-includes">含${item.includes.length}件单品</div>` : '';
    return `
      <div class="menu-item cat-${currentMode}-${item.cat}" style="animation-delay:${idx*0.05}s" data-item-id="${item.id}">
        <div class="item-emoji">${item.emoji}</div>
        <div class="item-body" data-detail-id="${item.id}">
          <div class="item-name">${brandHtml}${item.name}</div>
          <div class="item-desc">${item.desc}</div>
          ${comboDesc}
          ${tagsHtml ? `<div class="item-tags">${tagsHtml}</div>` : ''}
        </div>
        <div class="item-right">
          <div class="item-price"><span class="price-num">${item.price}</span><span class="price-unit">币</span></div>
          <button class="item-add-btn ${inCart ? 'in-cart' : ''}" data-add-id="${item.id}">${inCart ? '✓' : '+'}</button>
        </div>
      </div>`;
  }).join('');

  $$('.item-add-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.dataset.addId;
      const r = btn.getBoundingClientRect();
      floatHeart(r.left + r.width/2, r.top);
      addToCart(id);
    };
  });
  $$('[data-detail-id]').forEach(el => {
    el.onclick = () => showDishDetail(el.dataset.detailId);
  });
}

function showDishDetail(itemId) {
  const item = findItem(itemId);
  if (!item) return;
  const cats = getCategories();
  const allCats = [...REAL_CATEGORIES, ...VIRTUAL_CATEGORIES];
  const catName = allCats.find((c, i) => {
    const catItems = currentMode === 'real' ? REAL_ITEMS : currentMode === 'virtual' ? VIRTUAL_ITEMS : COMBO_ITEMS;
    return catItems.some(it => it.id === itemId);
  });
  const typeLabel = item.id.startsWith('r') ? '🍔 实物外卖' : item.id.startsWith('c') ? '💝 套餐推荐' : '🧸 虚拟互动';
  const proofHint = item.id.startsWith('r') ? '实物订单核销：下单人需给对方点外卖/线下购买，上传小票、食物照片完成核销。' : '虚拟订单核销：完成互动任务后，上传合照、截图、语音等凭证。';
  const includesHtml = item.includes ? `<div class="dish-detail-section"><div class="dish-detail-section-title">📦 套餐内容</div><div class="dish-detail-section-text">${item.includes.map(id => { const it = findItem(id); return it ? `${it.emoji} ${it.name}` : ''; }).join(' + ')}</div></div>` : '';
  const modal = $('#dish-detail-modal');
  modal.innerHTML = `
    <div class="dish-detail-hero">
      <button class="dish-detail-close" id="dish-detail-close">✕</button>
      <div class="dish-detail-emoji">${item.emoji}</div>
      <div class="dish-detail-name">${item.name}</div>
      <div class="dish-detail-cat">${typeLabel}${item.brand ? ' · ' + item.brand : ''}</div>
    </div>
    <div class="dish-detail-body">
      <div class="dish-detail-section">
        <div class="dish-detail-section-title">📋 套餐说明</div>
        <div class="dish-detail-section-text">${item.desc}</div>
      </div>
      ${item.scene ? `<div class="dish-detail-section"><div class="dish-detail-section-title">🎭 适用场景</div><div class="dish-detail-section-text">${item.scene}</div></div>` : ''}
      ${includesHtml}
      <div class="dish-detail-section">
        <div class="dish-detail-section-title">💡 玩法规则</div>
        <div class="dish-detail-section-text">${proofHint}</div>
      </div>
      <div class="dish-detail-price-row">
        <div class="dish-detail-price"><span class="dish-detail-price-num">${item.price}</span><span class="dish-detail-price-unit">爱心币</span></div>
        <button class="dish-detail-add-btn" id="dish-detail-add">加入购物车</button>
      </div>
    </div>`;
  $('#dish-detail-overlay').classList.remove('hidden');
  $('#dish-detail-close').onclick = closeDishDetail;
  $('#dish-detail-add').onclick = () => { addToCart(itemId); closeDishDetail(); };
}

function closeDishDetail() { $('#dish-detail-overlay').classList.add('hidden'); }

// ========================================
// 十、购物车系统
// ========================================

function addToCart(itemId) {
  const ex = state.cart.find(c => c.id === itemId);
  if (ex) ex.qty += 1; else state.cart.push({ id: itemId, qty: 1 });
  saveState();
  if ($('#page-menu').classList.contains('active')) renderMenuList();
  updateCartFloat();
  toast(`已加入：${getItemName(itemId)}`, 'success');
}

function removeFromCart(itemId) {
  state.cart = state.cart.filter(c => c.id !== itemId);
  saveState(); renderCartModal();
  if ($('#page-menu').classList.contains('active')) renderMenuList();
  updateCartFloat();
}

function changeQty(itemId, delta) {
  const item = state.cart.find(c => c.id === itemId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(itemId);
  else { saveState(); renderCartModal(); updateCartFloat(); }
}

function getCartTotal() { return state.cart.reduce((s, c) => s + getItemPrice(c.id) * c.qty, 0); }
function getCartCount() { return state.cart.reduce((s, c) => s + c.qty, 0); }

function updateCartFloat() {
  const f = $('#cart-float');
  const n = getCartCount();
  if (n > 0) { f.classList.remove('hidden'); $('#cart-badge').textContent = n; $('#cart-total-coin').textContent = getCartTotal(); }
  else f.classList.add('hidden');
}

function openCartModal() { renderCartModal(); $('#cart-modal-overlay').classList.remove('hidden'); }
function closeCartModal() { $('#cart-modal-overlay').classList.add('hidden'); }

function renderCartModal() {
  const c = $('#cart-items');
  if (state.cart.length === 0) {
    c.innerHTML = `<div class="empty-state" style="padding:30px 10px;"><div class="empty-emoji">🛒</div><div class="empty-text">购物车空空如也</div><div class="empty-hint">去菜单选几份甜蜜互动吧</div></div>`;
    $('#cart-modal-total').textContent = 0;
    $('#cart-checkout-btn').disabled = true;
    return;
  }
  c.innerHTML = state.cart.map(ci => {
    const item = findItem(ci.id); if (!item) return '';
    const typeIcon = ci.id.startsWith('r') ? '🍔' : ci.id.startsWith('c') ? '💝' : '🧸';
    const brandTxt = item.brand ? ` · ${item.brand}` : '';
    return `
      <div class="cart-item-row">
        <div class="cart-item-emoji">${item.emoji}</div>
        <div class="cart-item-info"><div class="cart-item-name">${typeIcon} ${item.name}</div><div class="cart-item-price">${item.price}币/份${brandTxt}</div></div>
        <div class="cart-qty-control">
          <button class="cart-qty-btn" data-action="minus" data-id="${ci.id}">−</button>
          <span class="cart-qty-num">${ci.qty}</span>
          <button class="cart-qty-btn" data-action="plus" data-id="${ci.id}">+</button>
        </div>
      </div>`;
  }).join('');
  $('#cart-modal-total').textContent = getCartTotal();
  $('#cart-checkout-btn').disabled = state.coins < getCartTotal();
  $$('.cart-qty-btn').forEach(btn => {
    btn.onclick = () => changeQty(btn.dataset.id, btn.dataset.action === 'plus' ? 1 : -1);
  });
}

// ========================================
// 十一、下单 & 订单核销流程
// ========================================

function checkout() {
  const total = getCartTotal();
  if (state.coins < total) { toast('爱心币不足！去签到或完成任务赚取吧', 'error'); return; }
  if (state.cart.length === 0) return;

  const names = state.cart.map(c => `${getItemName(c.id)}×${c.qty}`).join('、');
  spendCoins(total, `下单：${names}`);

  // 判断订单类型
  const hasReal = state.cart.some(c => c.id.startsWith('r'));
  const hasVirtual = state.cart.some(c => c.id.startsWith('v'));
  const hasCombo = state.cart.some(c => c.id.startsWith('c'));
  const orderType = hasCombo ? 'combo' : (hasReal && hasVirtual ? 'mixed' : (hasReal ? 'real' : 'virtual'));

  const order = {
    id: 'O' + Date.now().toString().slice(-8),
    items: state.cart.map(c => ({...c})),
    status: 'pending',
    date: new Date().toISOString(),
    totalCoin: total,
    proof: '',
    sender: state.couple.name1,
    completedDate: null,
    orderType: orderType
  };
  state.orders.unshift(order);
  state.cart = [];
  saveState();
  closeCartModal();
  if ($('#page-menu').classList.contains('active')) renderMenuList();
  updateCartFloat();
  toast('下单成功！等待Ta接单~', 'success');
  coinFlyAnim();
  setTimeout(() => switchPage('orders'), 600);
}

// ========================================
// 十二、订单管理
// ========================================

function renderOrders() {
  $$('.order-tab').forEach(t => t.classList.remove('active'));
  $(`.order-tab[data-type="${currentOrderTab}"]`).classList.add('active');
  const c = $('#order-list');

  if (currentOrderTab === 'pending') {
    const pending = state.orders.filter(o => ['pending','accepted','delayed','proof-uploaded','confirming'].includes(o.status));
    const badge = $('#pending-badge');
    if (pending.length > 0) { badge.textContent = pending.length; badge.classList.remove('hidden'); }
    else badge.classList.add('hidden');
    if (pending.length === 0) {
      c.innerHTML = `<div class="empty-state"><div class="empty-emoji">📋</div><div class="empty-text">暂无待完成的订单</div><div class="empty-hint">去菜单点一份甜蜜互动吧</div></div>`;
      return;
    }
    c.innerHTML = pending.map((o, i) => renderOrderCard(o, i)).join('');
    bindOrderActions();
  } else if (currentOrderTab === 'completed') {
    const done = state.orders.filter(o => o.status === 'completed');
    if (done.length === 0) {
      c.innerHTML = `<div class="empty-state"><div class="empty-emoji">✅</div><div class="empty-text">还没有已完成的订单</div><div class="empty-hint">完成互动后会显示在这里</div></div>`;
      return;
    }
    c.innerHTML = done.map((o, i) => renderMemoryCard(o, i)).join('');
  } else if (currentOrderTab === 'album') {
    renderAlbumInOrders(c);
  }
}

function renderAlbumInOrders(c) {
  const done = state.orders.filter(o => o.status === 'completed' && o.proof);
  if (done.length === 0) {
    c.innerHTML = `<div class="empty-state"><div class="empty-emoji">📷</div><div class="empty-text">回忆相册是空的</div><div class="empty-hint">完成订单并上传凭证后会自动保存</div></div>`;
    return;
  }
  c.innerHTML = done.map((o, i) => renderMemoryCard(o, i)).join('');
}

const STATUS_MAP = {
  'pending': { text: '待接单', cls: 'status-pending' },
  'accepted': { text: '已接单', cls: 'status-accepted' },
  'delayed': { text: '已延后', cls: 'status-delayed' },
  'proof-uploaded': { text: '待确认', cls: 'status-proof' },
  'confirming': { text: '核销中', cls: 'status-confirming' },
  'completed': { text: '已完成', cls: 'status-completed' }
};

const ORDER_TYPE_MAP = {
  'real': { icon: '🍔', text: '实物外卖' },
  'virtual': { icon: '🧸', text: '虚拟互动' },
  'mixed': { icon: '🍱', text: '混合订单' },
  'combo': { icon: '💝', text: '套餐订单' }
};

function renderOrderCard(order, idx) {
  const st = STATUS_MAP[order.status] || STATUS_MAP['pending'];
  const ot = ORDER_TYPE_MAP[order.orderType] || ORDER_TYPE_MAP['virtual'];
  const itemsHtml = order.items.map(c => {
    const item = findItem(c.id); if (!item) return '';
    return `<div class="order-item-row"><div class="order-item-emoji">${item.emoji}</div><div class="order-item-info"><div class="order-item-name">${item.name}</div><div class="order-item-price">${item.price}币${item.brand ? ' · ' + item.brand : ''}</div></div><div class="order-item-qty">×${c.qty}</div></div>`;
  }).join('');

  let proofHtml = '';
  if (order.proof) {
    proofHtml = `<div class="order-proof-display"><div class="order-proof-display-label">📎 完成凭证</div><div class="order-proof-display-text">${order.proof}</div></div>`;
  }

  let actions = '';
  if (order.status === 'pending') {
    actions = `<button class="order-action-btn btn-accept" data-action="accept" data-id="${order.id}">立刻接单</button><button class="order-action-btn btn-delay" data-action="delay" data-id="${order.id}">延后完成</button><button class="order-action-btn btn-replace" data-action="replace" data-id="${order.id}">协商换菜</button>`;
  } else if (order.status === 'accepted' || order.status === 'delayed') {
    const proofLabel = order.orderType === 'real' ? '上传小票/食物照' : '上传互动凭证';
    actions = `<button class="order-action-btn btn-proof" data-action="proof" data-id="${order.id}">${proofLabel}</button>`;
  } else if (order.status === 'proof-uploaded') {
    actions = `<div style="width:100%;text-align:center;font-size:12px;color:var(--text-light);padding:4px;">等待下单人确认核销...</div><button class="order-action-btn btn-confirm" data-action="confirm" data-id="${order.id}">确认核销</button>`;
  }

  return `
    <div class="order-card" style="animation-delay:${idx*0.05}s">
      <div class="order-card-header">
        <div class="order-meta"><span class="order-id">${ot.icon} ${ot.text} · ${order.id}</span><span class="order-date">${formatDateShort(order.date)} · ${order.sender}下单</span></div>
        <span class="order-status ${st.cls}">${st.text}</span>
      </div>
      <div class="order-items-list">${itemsHtml}</div>
      ${proofHtml}
      <div class="order-total-row"><span class="order-total-label">合计</span><span class="order-total-num">${order.totalCoin}</span><span class="order-total-label">爱心币</span></div>
      ${actions ? `<div class="order-actions">${actions}</div>` : ''}
    </div>`;
}

function renderMemoryCard(order, idx) {
  const ot = ORDER_TYPE_MAP[order.orderType] || ORDER_TYPE_MAP['virtual'];
  const itemsHtml = order.items.map(c => {
    const item = findItem(c.id); if (!item) return '';
    return `<div class="memory-item-chip">${item.emoji} ${item.name} ×${c.qty}</div>`;
  }).join('');
  const proofHtml = order.proof ? `<div class="memory-proof"><div class="memory-proof-label">📎 完成凭证</div><div class="memory-proof-text">${order.proof}</div></div>` : '';
  return `
    <div class="memory-card" style="animation-delay:${idx*0.05}s">
      <div class="memory-header"><span class="memory-date-badge">${ot.icon} 📅 ${formatDateShort(order.date)}</span><span class="order-status status-completed">已完成</span></div>
      <div class="memory-items">${itemsHtml}</div>
      <div class="order-total-row"><span class="order-total-label">消耗</span><span class="order-total-num">${order.totalCoin}</span><span class="order-total-label">爱心币</span></div>
      ${proofHtml}
    </div>`;
}

function bindOrderActions() {
  $$('.order-action-btn').forEach(btn => {
    btn.onclick = () => handleOrderAction(btn.dataset.action, btn.dataset.id);
  });
}

function handleOrderAction(action, orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;
  switch(action) {
    case 'accept': order.status = 'accepted'; toast('已接单！快去完成吧~', 'success'); break;
    case 'delay': order.status = 'delayed'; toast('已延后，记得找时间完成哦'); break;
    case 'replace': showReplaceModal(order); return;
    case 'proof': showProofModal(order); return;
    case 'confirm': confirmOrder(order); return;
  }
  saveState(); renderOrders(); renderHome();
}

function showReplaceModal(order) {
  const all = getAllItems().filter(i => !state.blacklist.includes(i.id));
  openGenericModal('🔄 协商更换菜品', `
    <p style="font-size:13px;color:var(--text-sub);margin-bottom:14px;">选择想要更换的菜品：</p>
    <div style="max-height:300px;overflow-y:auto;">
      ${all.map(item => `<div class="modal-list-item"><div class="modal-list-emoji">${item.emoji}</div><div class="modal-list-body"><div class="modal-list-name">${item.name}</div><div class="modal-list-desc">${item.desc}</div></div><button class="modal-list-action action-add" data-replace-id="${item.id}" data-order-id="${order.id}">更换</button></div>`).join('')}
    </div>`);
  $$('.modal-list-action[data-replace-id]').forEach(btn => {
    btn.onclick = () => {
      const ord = state.orders.find(o => o.id === btn.dataset.orderId);
      if (ord) { ord.items = [{ id: btn.dataset.replaceId, qty: 1 }]; ord.totalCoin = getItemPrice(btn.dataset.replaceId); toast(`已更换为：${getItemName(btn.dataset.replaceId)}`, 'success'); }
      closeGenericModal(); saveState(); renderOrders();
    };
  });
}

function showProofModal(order) {
  const isReal = order.orderType === 'real' || order.orderType === 'mixed';
  const proofTitle = isReal ? '📎 上传外卖小票/食物照片' : '📎 上传互动凭证';
  const proofHint = isReal ? '请上传外卖小票照片、食物实物照片，或描述购买情况' : '描述完成情况（如截图内容、合照说明、语音内容等）';
  const placeholder = isReal ? '例如：帮Ta点了喜茶多肉葡萄，外卖已送达，小票已拍照' : '例如：我们一起视频看了《你的名字》，超感动！';
  openGenericModal(proofTitle, `
    <div class="form-group">
      <label class="form-label">完成凭证</label>
      <p style="font-size:12px;color:var(--text-light);margin-bottom:8px;">${proofHint}</p>
      <textarea class="form-textarea" id="proof-input" placeholder="${placeholder}" style="min-height:100px;">${order.proof || ''}</textarea>
    </div>
    <button class="form-btn" id="save-proof-btn">提交凭证</button>`);
  $('#save-proof-btn').onclick = () => {
    const text = $('#proof-input').value.trim();
    if (!text) { toast('请填写凭证内容', 'error'); return; }
    order.proof = text;
    order.status = 'proof-uploaded';
    saveState();
    toast('凭证已提交！等待对方确认核销~', 'success');
    closeGenericModal(); renderOrders();
  };
}

function confirmOrder(order) {
  order.status = 'completed';
  order.completedDate = new Date().toISOString();
  addCoins(10, `完成任务奖励：${order.id}`);
  toast('核销成功！+10爱心币奖励', 'coin');
  coinFlyAnim();
  saveState(); renderOrders(); renderHome(); checkAchievements();
}

// ========================================
// 十三、回忆相册页
// ========================================

function renderAlbum() {
  const c = $('#album-grid');
  const keyword = ($('#album-search') ? $('#album-search').value.trim().toLowerCase() : '');
  let done = state.orders.filter(o => o.status === 'completed');
  if (keyword) {
    done = done.filter(o => o.items.some(ci => getItemName(ci.id).toLowerCase().includes(keyword)));
  }
  if (done.length === 0) {
    c.innerHTML = `<div class="empty-state"><div class="empty-emoji">📷</div><div class="empty-text">${keyword ? '没有找到匹配的回忆' : '回忆相册是空的'}</div><div class="empty-hint">${keyword ? '试试其他关键词' : '完成订单后凭证会自动保存到这里'}</div></div>`;
    return;
  }
  c.innerHTML = done.map((o, i) => {
    const ot = ORDER_TYPE_MAP[o.orderType] || ORDER_TYPE_MAP['virtual'];
    const itemsHtml = o.items.map(ci => `<div class="memory-item-chip">${getItemEmoji(ci.id)} ${getItemName(ci.id)} ×${ci.qty}</div>`).join('');
    const proofHtml = o.proof ? `<div class="album-card-proof"><div class="album-card-proof-label">📎 互动凭证</div><div class="album-card-proof-text">${o.proof}</div></div>` : '';
    return `
      <div class="album-card" style="animation-delay:${i*0.05}s">
        <div class="album-card-header"><span class="album-card-date">${ot.icon} 📅 ${formatDateShort(o.date)}</span><span class="order-status status-completed">已完成</span></div>
        <div class="album-card-items">${itemsHtml}</div>
        <div class="order-total-row"><span class="order-total-label">消耗</span><span class="order-total-num">${o.totalCoin}</span><span class="order-total-label">爱心币</span></div>
        ${proofHtml}
      </div>`;
  }).join('');
}

// ========================================
// 十四、成就系统
// ========================================

function renderAchievements() {
  const stats = calcAchievementProgress();
  $('#achievement-stats').innerHTML = `
    <div class="stat-card"><div class="stat-num">${stats.totalCompleted}</div><div class="stat-label">完成订单</div></div>
    <div class="stat-card"><div class="stat-num">${stats.totalUnlocked}</div><div class="stat-label">解锁勋章</div></div>
    <div class="stat-card"><div class="stat-num">${state.totalSpent}</div><div class="stat-label">累计消费</div></div>`;
  $('#achievement-grid').innerHTML = ACHIEVEMENTS.map((a, i) => {
    const p = stats[a.id] || { current: 0, target: a.target, unlocked: false };
    const pct = Math.min(100, Math.floor(p.current / a.target * 100));
    const u = p.unlocked;
    return `<div class="achievement-card ${u ? 'unlocked' : 'locked'}" style="animation-delay:${i*0.05}s">
      ${!u ? '<div class="achievement-lock">🔒</div>' : ''}
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-name">${a.name}</div>
      <div class="achievement-desc">${a.desc}</div>
      <div class="achievement-progress"><div class="achievement-progress-bar" style="width:${pct}%"></div></div>
      <div class="achievement-progress-text">${u ? '✨ 已解锁' : `${p.current} / ${a.target}`}</div>
    </div>`;
  }).join('');
}

function calcAchievementProgress() {
  const done = state.orders.filter(o => o.status === 'completed');
  let cat1 = 0, cat3 = 0, apology = 0, realCount = 0, comboCount = 0, spentCats = new Set();
  done.forEach(o => {
    if (o.orderType === 'real') realCount++;
    if (o.orderType === 'combo') comboCount++;
    o.items.forEach(c => {
      const item = findItem(c.id); if (!item) return;
      if (item.cat === 1 && item.id.startsWith('v')) cat1 += c.qty;
      if (item.cat === 3 && item.id.startsWith('v')) cat3 += c.qty;
      if (item.id === 'v083' || item.id === 'v084' || item.id === 'v085' || item.id === 'v086' || item.id === 'v087' || item.id === 'v088' || item.id === 'v089' || item.id === 'v090' || item.id === 'v091') apology += c.qty;
      if (item.id.startsWith('v')) spentCats.add('v' + item.cat);
    });
  });
  return {
    totalCompleted: done.length,
    totalUnlocked: state.unlockedAchievements.length,
    a1: { current: cat1, target: 50, unlocked: state.unlockedAchievements.includes('a1') },
    a2: { current: cat3, target: 30, unlocked: state.unlockedAchievements.includes('a2') },
    a3: { current: apology, target: 10, unlocked: state.unlockedAchievements.includes('a3') },
    a4: { current: state.checkin.streak, target: 30, unlocked: state.unlockedAchievements.includes('a4') },
    a5: { current: state.totalSpent, target: 500, unlocked: state.unlockedAchievements.includes('a5') },
    a6: { current: done.length, target: 10, unlocked: state.unlockedAchievements.includes('a6') },
    a7: { current: spentCats.size, target: 9, unlocked: state.unlockedAchievements.includes('a7') },
    a8: { current: realCount, target: 20, unlocked: state.unlockedAchievements.includes('a8') },
    a9: { current: state.checkin.streak, target: 7, unlocked: state.unlockedAchievements.includes('a9') },
    a10: { current: comboCount, target: 5, unlocked: state.unlockedAchievements.includes('a10') }
  };
}

function checkAchievements() {
  const stats = calcAchievementProgress();
  let newOnes = [];
  ACHIEVEMENTS.forEach(a => {
    if (!state.unlockedAchievements.includes(a.id)) {
      const p = stats[a.id];
      if (p && p.current >= p.target) {
        state.unlockedAchievements.push(a.id);
        newOnes.push(a);
        addCoins(20, `解锁成就：${a.name}`);
      }
    }
  });
  if (newOnes.length > 0) {
    saveState();
    newOnes.forEach(a => { toast(`🏅 解锁成就：${a.name}！+20爱心币`, 'coin'); coinFlyAnim(); });
  }
}

// ========================================
// 十五、我的页面 & 弹窗
// ========================================

function renderProfile() {
  $('#profile-avatar').textContent = state.couple.avatar1;
  $('#profile-name').textContent = state.couple.name1;
  $('#profile-days').textContent = daysBetween(state.couple.togetherDate, new Date());
  $('#room-code').textContent = state.inviteCode;
}

function openGenericModal(title, bodyHtml) {
  $('#generic-modal').innerHTML = `
    <div class="generic-modal-header"><span class="generic-modal-title">${title}</span><button class="cart-close" onclick="closeGenericModal()">✕</button></div>
    <div class="generic-modal-body">${bodyHtml}</div>`;
  $('#generic-modal-overlay').classList.remove('hidden');
}

function closeGenericModal() { $('#generic-modal-overlay').classList.add('hidden'); }

function showConfirmModal(emoji, title, msg, onConfirm) {
  $('#generic-modal').innerHTML = `
    <div class="confirm-modal">
      <div class="confirm-emoji">${emoji}</div>
      <div class="confirm-title">${title}</div>
      <div class="confirm-msg">${msg}</div>
      <div class="confirm-actions">
        <button class="confirm-btn confirm-no" id="confirm-no-btn">取消</button>
        <button class="confirm-btn confirm-yes" id="confirm-yes-btn">确定</button>
      </div>
    </div>`;
  $('#generic-modal-overlay').classList.remove('hidden');
  $('#confirm-no-btn').onclick = closeGenericModal;
  $('#confirm-yes-btn').onclick = onConfirm;
}

function showWishlistModal() {
  openGenericModal('🌟 双人心愿清单', `
    <p style="font-size:13px;color:var(--text-sub);margin-bottom:14px;">双方可以提前上架想点的新菜品，互相攒币兑换~</p>
    ${state.wishlist.length === 0 ? `<div class="empty-state" style="padding:30px 10px;"><div class="empty-emoji">🌟</div><div class="empty-text">心愿清单是空的</div><div class="empty-hint">添加你们想要的互动菜品吧</div></div>` :
      state.wishlist.map(w => `<div class="modal-list-item"><div class="modal-list-emoji">${w.emoji}</div><div class="modal-list-body"><div class="modal-list-name">${w.name}</div><div class="modal-list-desc">${w.desc || '暂无描述'} · ${w.price}币</div></div><button class="modal-list-action action-remove" data-wish-id="${w.id}">删除</button></div>`).join('')}
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--bg-warm);">
      <div class="form-group"><label class="form-label">添加新心愿</label>
        <div style="display:flex;gap:8px;margin-bottom:8px;"><input class="form-input" id="wish-emoji" placeholder="表情" style="width:60px;flex-shrink:0;text-align:center;" maxlength="2"><input class="form-input" id="wish-name" placeholder="菜品名称" style="flex:1;"></div>
        <input class="form-input" id="wish-desc" placeholder="简短描述（选填）" style="margin-bottom:8px;">
        <div style="display:flex;gap:8px;"><input class="form-input" id="wish-price" type="number" min="1" placeholder="爱心币" style="flex:1;"><button class="form-btn" id="add-wish-btn" style="width:auto;padding:10px 20px;">添加</button></div>
      </div>
    </div>`);
  $('#add-wish-btn').onclick = () => {
    const emoji = $('#wish-emoji').value.trim() || '💝';
    const name = $('#wish-name').value.trim();
    const desc = $('#wish-desc').value.trim();
    const price = parseInt($('#wish-price').value) || 5;
    if (!name) { toast('请输入菜品名称', 'error'); return; }
    state.wishlist.push({ id: 'w' + Date.now(), emoji, name, desc, price });
    saveState(); toast('心愿已添加！', 'success'); showWishlistModal();
  };
  $$('.modal-list-action[data-wish-id]').forEach(btn => {
    btn.onclick = () => { state.wishlist = state.wishlist.filter(w => w.id !== btn.dataset.wishId); saveState(); toast('已删除'); showWishlistModal(); };
  });
}

function showBlacklistModal() {
  const all = getAllItems();
  openGenericModal('🚫 屏蔽菜品', `
    <p style="font-size:13px;color:var(--text-sub);margin-bottom:14px;">不喜欢的互动/食物可以屏蔽，不会出现在菜单中~</p>
    <div style="max-height:400px;overflow-y:auto;">
      ${all.map(item => {
        const blocked = state.blacklist.includes(item.id);
        const typeIcon = item.id.startsWith('r') ? '🍔' : item.id.startsWith('c') ? '💝' : '🧸';
        return `<div class="modal-list-item"><div class="modal-list-emoji">${item.emoji}</div><div class="modal-list-body"><div class="modal-list-name">${typeIcon} ${item.name}</div><div class="modal-list-desc">${item.desc}</div></div><button class="modal-list-action ${blocked ? 'action-toggle-off' : 'action-toggle-on'}" data-bl-id="${item.id}">${blocked ? '已屏蔽' : '屏蔽'}</button></div>`;
      }).join('')}
    </div>`);
  $$('.modal-list-action[data-bl-id]').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.blId;
      if (state.blacklist.includes(id)) { state.blacklist = state.blacklist.filter(b => b !== id); toast('已解除屏蔽'); }
      else { state.blacklist.push(id); toast('已屏蔽'); }
      saveState(); showBlacklistModal();
    };
  });
}

function showCustomItemModal() {
  openGenericModal('✏️ 自定义菜品', `
    <p style="font-size:13px;color:var(--text-sub);margin-bottom:14px;">添加你们专属的菜品~</p>
    ${state.customItems.length > 0 ? `<div style="margin-bottom:16px;">${state.customItems.map(item => {
      const typeIcon = item.modeType === 'real' ? '🍔' : item.modeType === 'combo' ? '💝' : '🧸';
      return `<div class="modal-list-item"><div class="modal-list-emoji">${item.emoji}</div><div class="modal-list-body"><div class="modal-list-name">${typeIcon} ${item.name}</div><div class="modal-list-desc">${item.desc} · ${item.price}币</div></div><button class="modal-list-action action-remove" data-custom-id="${item.id}">删除</button></div>`;
    }).join('')}</div>` : ''}
    <div style="padding-top:16px;border-top:1px solid var(--bg-warm);">
      <div class="form-group">
        <label class="form-label">新增专属菜品</label>
        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <input class="form-input" id="custom-emoji" placeholder="🎨" style="width:60px;flex-shrink:0;text-align:center;" maxlength="2">
          <input class="form-input" id="custom-name" placeholder="菜品名称" style="flex:1;">
        </div>
        <textarea class="form-textarea" id="custom-desc" placeholder="描述这个菜品~" style="margin-bottom:8px;min-height:50px;"></textarea>
        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <select class="form-select" id="custom-mode-type" style="flex:1;">
            <option value="real">🍔 实物外卖</option>
            <option value="virtual">🧸 虚拟互动</option>
            <option value="combo">💝 套餐</option>
          </select>
          <input class="form-input" id="custom-price" type="number" min="1" placeholder="币" style="width:80px;flex-shrink:0;">
        </div>
        <select class="form-select" id="custom-cat" style="width:100%;margin-bottom:8px;">
          ${currentMode === 'real' ? REAL_CATEGORIES.map((c, i) => `<option value="${i}">${c.emoji} ${c.name}</option>`).join('') : VIRTUAL_CATEGORIES.map((c, i) => `<option value="${i}">${c.emoji} ${c.name}</option>`).join('')}
        </select>
        <button class="form-btn" id="add-custom-btn">添加菜品</button>
      </div>
    </div>`);
  $('#add-custom-btn').onclick = () => {
    const emoji = $('#custom-emoji').value.trim() || '💝';
    const name = $('#custom-name').value.trim();
    const desc = $('#custom-desc').value.trim();
    const modeType = $('#custom-mode-type').value;
    const cat = parseInt($('#custom-cat').value);
    const price = parseInt($('#custom-price').value) || 5;
    if (!name) { toast('请输入菜品名称', 'error'); return; }
    if (!desc) { toast('请描述菜品', 'error'); return; }
    state.customItems.push({ id: 'u' + Date.now(), cat, modeType, emoji, name, desc, price, tags: ['自定义'], scene: desc, brand: modeType === 'real' ? '自定义' : undefined });
    saveState(); toast('专属菜品已添加！', 'success'); showCustomItemModal();
  };
  $$('.modal-list-action[data-custom-id]').forEach(btn => {
    btn.onclick = () => { state.customItems = state.customItems.filter(c => c.id !== btn.dataset.customId); saveState(); toast('已删除'); showCustomItemModal(); };
  });
}

function showAnniversaryModal() {
  openGenericModal('🎂 纪念日管理', `
    <p style="font-size:13px;color:var(--text-sub);margin-bottom:14px;">管理你们的纪念日，首页会显示倒计时~</p>
    ${state.anniversaries.map(an => `<div class="modal-list-item"><div class="modal-list-emoji">${an.emoji}</div><div class="modal-list-body"><div class="modal-list-name">${an.name}</div><div class="modal-list-desc">${an.month}月${an.day}日</div></div><button class="modal-list-action action-remove" data-an-id="${an.id}">删除</button></div>`).join('')}
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--bg-warm);">
      <div class="form-group"><label class="form-label">添加纪念日</label>
        <div style="display:flex;gap:8px;margin-bottom:8px;"><input class="form-input" id="an-emoji" placeholder="🎂" style="width:60px;flex-shrink:0;text-align:center;" maxlength="2"><input class="form-input" id="an-name" placeholder="纪念日名称" style="flex:1;"></div>
        <div style="display:flex;gap:8px;align-items:center;"><select class="form-select" id="an-month" style="flex:1;">${Array.from({length:12},(_,i)=>`<option value="${i+1}">${i+1}月</option>`).join('')}</select><select class="form-select" id="an-day" style="flex:1;">${Array.from({length:31},(_,i)=>`<option value="${i+1}">${i+1}日</option>`).join('')}</select><button class="form-btn" id="add-an-btn" style="width:auto;padding:10px 16px;">添加</button></div>
      </div>
    </div>`);
  $('#add-an-btn').onclick = () => {
    const emoji = $('#an-emoji').value.trim() || '🎂';
    const name = $('#an-name').value.trim();
    const month = parseInt($('#an-month').value);
    const day = parseInt($('#an-day').value);
    if (!name) { toast('请输入名称', 'error'); return; }
    state.anniversaries.push({ id: 'an' + Date.now(), name, emoji, month, day });
    saveState(); toast('纪念日已添加！', 'success'); showAnniversaryModal();
  };
  $$('.modal-list-action[data-an-id]').forEach(btn => {
    btn.onclick = () => { state.anniversaries = state.anniversaries.filter(a => a.id !== btn.dataset.anId); saveState(); toast('已删除'); showAnniversaryModal(); };
  });
}

function showCoupleInfoModal() {
  openGenericModal('💑 情侣信息设置', `
    <div class="form-group"><label class="form-label">你的昵称</label><input class="form-input" id="info-name1" value="${state.couple.name1}"></div>
    <div class="form-group"><label class="form-label">你的头像（表情）</label><input class="form-input" id="info-avatar1" value="${state.couple.avatar1}" maxlength="2"></div>
    <div class="form-group"><label class="form-label">Ta的昵称</label><input class="form-input" id="info-name2" value="${state.couple.name2}"></div>
    <div class="form-group"><label class="form-label">Ta的头像（表情）</label><input class="form-input" id="info-avatar2" value="${state.couple.avatar2}" maxlength="2"></div>
    <div class="form-group"><label class="form-label">在一起的日期</label><input class="form-input" id="info-date" type="date" value="${state.couple.togetherDate}"></div>
    <button class="form-btn" id="save-couple-btn">保存信息</button>`);
  $('#save-couple-btn').onclick = () => {
    state.couple.name1 = $('#info-name1').value.trim() || '小甜心';
    state.couple.avatar1 = $('#info-avatar1').value.trim() || '🌸';
    state.couple.name2 = $('#info-name2').value.trim() || '大笨蛋';
    state.couple.avatar2 = $('#info-avatar2').value.trim() || '🌙';
    state.couple.togetherDate = $('#info-date').value || '2024-01-01';
    saveState(); toast('信息已保存！', 'success'); closeGenericModal(); renderHome();
  };
}

function showCoinLogModal() {
  if (state.coinLog.length === 0) {
    openGenericModal('💰 爱心币收支明细', `<div class="empty-state" style="padding:40px 10px;"><div class="empty-emoji">💰</div><div class="empty-text">还没有记录</div><div class="empty-hint">签到、下单、完成任务都会记录在这里</div></div>`);
    return;
  }
  openGenericModal('💰 爱心币收支明细', `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;padding:12px 16px;background:linear-gradient(135deg,var(--accent-yellow),var(--accent-gold));border-radius:14px;">
      <span style="color:var(--white);font-size:13px;">当前余额</span><span style="font-family:var(--font-display);font-size:24px;color:var(--white);">${state.coins} 币</span>
    </div>
    <div style="max-height:400px;overflow-y:auto;">${state.coinLog.map(log => {
      const d = new Date(log.date);
      const ds = `${d.getMonth()+1}/${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
      const earn = log.amount > 0;
      return `<div class="modal-list-item"><div class="modal-list-emoji" style="background:${earn?'#E8F5E9':'#FFEBEE'};">${earn?'📈':'📉'}</div><div class="modal-list-body"><div class="modal-list-name">${log.reason}</div><div class="modal-list-desc">${ds}</div></div><div style="font-family:var(--font-display);font-size:16px;color:${earn?'#2E7D32':'#C62828'};">${earn?'+':''}${log.amount}</div></div>`;
    }).join('')}</div>`);
}

// ========================================
// 十六、事件绑定 & 初始化
// ========================================

function bindEvents() {
  // 认证页 Tab
  $$('.auth-tab').forEach(tab => {
    tab.onclick = () => {
      $$('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.dataset.mode;
      if (mode === 'login') { $('#login-form').classList.remove('hidden'); $('#register-form').classList.add('hidden'); }
      else { $('#login-form').classList.add('hidden'); $('#register-form').classList.remove('hidden'); }
    };
  });
  $('#login-submit').onclick = handleLogin;
  $('#register-submit').onclick = handleRegister;

  // 绑定页
  $('#copy-invite-code').onclick = () => {
    const code = state.inviteCode;
    if (navigator.clipboard) navigator.clipboard.writeText(code).then(() => toast('邀请码已复制！', 'success'));
    else { const inp = document.createElement('input'); inp.value = code; document.body.appendChild(inp); inp.select(); document.execCommand('copy'); document.body.removeChild(inp); toast('邀请码已复制！', 'success'); }
  };
  $('#bind-submit').onclick = handleBind;

  // 底部导航
  $$('.tab-item').forEach(tab => { tab.onclick = () => switchPage(tab.dataset.page); });

  // 快捷入口
  $$('.quick-item').forEach(item => { item.onclick = () => switchPage(item.dataset.nav); });

  // 待完成点击跳转
  $('#pending-pill').onclick = () => switchPage('orders');

  // 签到
  $('#checkin-btn').onclick = checkIn;

  // 模式切换
  $$('.mode-tab').forEach(tab => {
    tab.onclick = () => {
      $$('.mode-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentMode = tab.dataset.mode;
      currentCat = 0;
      currentBrand = '全部';
      renderMenu();
    };
  });

  // 购物车
  $('#cart-float-btn').onclick = openCartModal;
  $('#cart-close').onclick = closeCartModal;
  $('#cart-modal-overlay').onclick = (e) => { if (e.target === $('#cart-modal-overlay')) closeCartModal(); };
  $('#cart-checkout-btn').onclick = checkout;

  // 菜品详情关闭
  $('#dish-detail-overlay').onclick = (e) => { if (e.target === $('#dish-detail-overlay')) closeDishDetail(); };

  // 订单标签
  $$('.order-tab').forEach(tab => { tab.onclick = () => { currentOrderTab = tab.dataset.type; renderOrders(); }; });

  // 相册搜索
  if ($('#album-search')) $('#album-search').oninput = renderAlbum;

  // 我的页面
  $('#copy-room-code').onclick = () => {
    const code = state.inviteCode;
    if (navigator.clipboard) navigator.clipboard.writeText(code).then(() => toast('房间码已复制！', 'success'));
    else { const inp = document.createElement('input'); inp.value = code; document.body.appendChild(inp); inp.select(); document.execCommand('copy'); document.body.removeChild(inp); toast('房间码已复制！', 'success'); }
  };

  $$('.profile-menu-item[data-modal]').forEach(item => {
    item.onclick = () => {
      const modal = item.dataset.modal;
      if (modal === 'wishlist') showWishlistModal();
      if (modal === 'blacklist') showBlacklistModal();
      if (modal === 'custom') showCustomItemModal();
      if (modal === 'anniversary') showAnniversaryModal();
      if (modal === 'couple-info') showCoupleInfoModal();
      if (modal === 'coin-log') showCoinLogModal();
    };
  });

  $('#open-unbind').onclick = handleUnbind;
  $('#logout-btn').onclick = handleLogout;

  // 通用弹窗
  $('#generic-modal-overlay').onclick = (e) => { if (e.target === $('#generic-modal-overlay')) closeGenericModal(); };
}

function initCarousel() {
  const carousel = $('#carousel');
  const track = $('#carousel-track');
  const dotsContainer = $('#carousel-dots');
  if (!carousel || !track || !dotsContainer) return;

  const slideCount = 4;
  let current = 0;
  let timer = null;
  let startX = 0;

  function updateSlide() {
    track.style.transform = `translateX(-${current * 100}%)`;
    renderDots();
  }

  function renderDots() {
    dotsContainer.innerHTML = Array.from({ length: slideCount }, (_, i) =>
      `<div class="carousel-dot ${i === current ? 'active' : ''}" data-slide="${i}"></div>`
    ).join('');
    $$('.carousel-dot').forEach(dot => {
      dot.onclick = () => {
        goToSlide(parseInt(dot.dataset.slide));
      };
    });
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(() => {
      current = (current + 1) % slideCount;
      updateSlide();
    }, 3500);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function goToSlide(index) {
    current = (index + slideCount) % slideCount;
    updateSlide();
    startTimer();
  }

  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);

  carousel.addEventListener('touchstart', (e) => {
    stopTimer();
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        goToSlide(current - 1);
      } else {
        goToSlide(current + 1);
      }
    } else {
      startTimer();
    }
  }, { passive: true });

  updateSlide();
  startTimer();
}

function init() {
  initState();
  bindEvents();
  initCarousel();
  setTimeout(async () => {
    $('#splash-screen').classList.add('fade-out');
    setTimeout(async () => {
      $('#splash-screen').style.display = 'none';
      if (state.isLoggedIn && state.isBound) {
        // 已登录且已绑定：从服务器同步最新状态
        await syncFromServer();
        showMainApp();
        // 启动定时同步（每30秒拉取一次最新数据）
        startAutoSync();
      } else if (state.isLoggedIn && !state.isBound) {
        showBindingPage();
      } else {
        showAuthPage();
      }
    }, 600);
  }, 1800);
}

// 定时从服务器同步（让双方数据保持一致）
let autoSyncInterval = null;
function startAutoSync() {
  if (autoSyncInterval) clearInterval(autoSyncInterval);
  autoSyncInterval = setInterval(async () => {
    if (state.isLoggedIn && state.isBound) {
      await syncFromServer();
    }
  }, 30000); // 每30秒同步一次
}

function stopAutoSync() {
  if (autoSyncInterval) { clearInterval(autoSyncInterval); autoSyncInterval = null; }
}

document.addEventListener('DOMContentLoaded', init);
