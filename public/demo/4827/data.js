window.AIDP_FILTERS = [
  { key: "level", title: "院校层次", options: ["全部", "专科", "本科", "双一流", "211", "985", "QS200", "QS100"] },
  { key: "security", title: "安全等级", options: ["全部", "基础", "L4", "L3"] },
  { key: "feature", title: "院校特色", options: ["全部", "国防军工", "通信电子", "财经", "师范", "外语", "美术", "音乐"] },
  { key: "employment", title: "用工属性", options: ["全部", "全职", "兼职"] }
];

window.AIDP_SCHOOLS = [
  {
    id: 1, name: "哈尔滨工业大学", code: "EFS", logo: "card-assets/Property 1=哈尔滨工业大学-logo 1.svg", level: "985",
    city: "黑龙江省哈尔滨市", security: "基础", status: "合作中",
    feature: "国防军工", featureFull: "国防军工-国防七子", employment: ["兼职"],
    recruitSpeed: 60, seats: 215,
    talent: [{ label: "本科生", value: 30 }, { label: "硕士生", value: 20 }, { label: "博士生", value: 10 }],
    majors: ["数学", "物理", "生物", "化学", "计算机", "其他"],
    projectTags: ["方舟tob-评估-agent/llm评测", "Coding与GUI_GUI", "写作-评估", "视觉理解-评估-基模", "视觉理解-评估-应用", "GUI-采集-PC GUI"],
    contacts: ["周鸿翔", "王孟玉"]
  },
  {
    id: 2, name: "西安交通大学", code: "EFM", logo: "card-assets/Property 1=西安交通大学-logo 1.svg", level: "211",
    city: "陕西省西安市", security: "L3", status: "合作中",
    feature: "通信电子", featureFull: "通信电子-两电一邮", employment: ["兼职"],
    recruitSpeed: 60, seats: 215,
    talent: [{ label: "本科生", value: 30 }, { label: "硕士生", value: 20 }, { label: "博士生", value: 10 }],
    majors: ["数学", "物理", "计算机", "金融"],
    projectTags: ["数学-SFT-Horizon", "GUI-评估-PC GUI", "代码-SFT-代码通用", "视频生成-标注"],
    contacts: ["周鸿翔", "王孟玉"]
  },
  {
    id: 3, name: "复旦大学", code: "EFT", logo: "card-assets/Property 1=复旦大学-logo 1.svg", level: "QS100",
    city: "上海市", security: "L3", status: "合作中",
    feature: "财经", featureFull: "财经-综合重点", employment: ["兼职"],
    recruitSpeed: 223, seats: 684,
    talent: [{ label: "本科生", value: 100 }, { label: "硕士生", value: 100 }, { label: "博士生", value: 20 }],
    majors: ["数学", "化学", "物理", "生物", "计算机", "金融", "法律", "医疗"],
    projectTags: ["Agent数据-SFT-Horizon", "Coding与GUI_GUI", "视觉理解-评估-应用", "图片生成-SFT"],
    contacts: ["周鸿翔", "王孟玉"]
  },
  {
    id: 4, name: "中南大学", code: "EEW", logo: "card-assets/Property 1=中南大学-logo 1.svg", level: "本科",
    city: "湖南省长沙市", security: "L3", status: "合作中",
    feature: "美术", featureFull: "美术-综合设计", employment: ["全职", "兼职"],
    recruitSpeed: 88, seats: 269,
    talent: [{ label: "本科生", value: 50 }, { label: "硕士生", value: 25 }, { label: "博士生", value: 5 }],
    majors: ["数学", "物理", "化学", "生物", "计算机", "医疗", "小语种"],
    projectTags: ["垂类-SFT-新闻/热点", "模型-评估", "视频通话-RM-Seed", "方舟tob-评估-agent/llm评测"],
    contacts: ["周鸿翔", "王孟玉"]
  },
  {
    id: 5, name: "北京理工大学", code: "EGH", logo: "card-assets/Property 1=北京理工大学-logo 1.svg", level: "985",
    city: "北京市", security: "基础", status: "合作中",
    feature: "国防军工", featureFull: "国防军工-国防七子", employment: ["兼职"],
    recruitSpeed: 30, seats: 96,
    talent: [{ label: "本科生", value: 20 }, { label: "硕士生", value: 8 }, { label: "博士生", value: 2 }],
    majors: ["数学", "物理", "化学", "计算机", "视觉传达"],
    projectTags: ["GUI-评估-PC GUI", "视觉理解-评估-应用", "代码-SFT-代码人评", "模型数据采集"],
    contacts: ["周鸿翔", "王孟玉"]
  },
  {
    id: 6, name: "电子科技大学", code: "EFW", logo: "card-assets/Property 1=电子科技大学-logo 1.svg", level: "985",
    city: "四川省成都市", security: "基础", status: "合作中",
    feature: "通信电子", featureFull: "通信电子-两电一邮", employment: ["兼职"],
    recruitSpeed: 5, seats: 35,
    talent: [{ label: "本科生", value: 5 }, { label: "硕士生", value: 3 }, { label: "博士生", value: 1 }],
    majors: ["数学", "物理", "计算机", "金融", "化学", "医疗"],
    projectTags: ["AI医疗-评估", "代码-SFT", "视觉理解-SFT", "豆包-采集-ASR"],
    contacts: ["周鸿翔", "王孟玉"]
  },
  {
    id: 7, name: "贵州大学", code: "EET", logo: "card-assets/Property 1=贵州大学-logo 1.svg", level: "211",
    city: "贵州省贵阳市", security: "L4", status: "到期未续签",
    feature: "财经", featureFull: "财经-区域重点", employment: ["兼职", "全职"],
    recruitSpeed: 1500, seats: 4536,
    talent: [{ label: "本科生", value: 1000 }, { label: "硕士生", value: 500 }],
    majors: ["数学", "物理", "化学", "生物", "计算机", "美术", "音乐", "法律"],
    projectTags: ["视觉理解-评估", "代码-SFT-代码人评", "模型数据采集", "GUI-SFT-PC GUI"],
    contacts: ["周鸿翔", "王孟玉"]
  },
  {
    id: 8, name: "中国矿业大学", code: "EFK", logo: "card-assets/Property 1=中国矿业大学-logo 1.svg", level: "211",
    city: "江苏省徐州市", security: "基础", status: "到期未续签",
    feature: "国防军工", featureFull: "国防军工-能源矿业", employment: ["兼职"],
    recruitSpeed: 78, seats: 274,
    talent: [{ label: "本科生", value: 50 }, { label: "硕士生", value: 28 }],
    majors: ["计算机", "物理", "工程", "美术"],
    projectTags: ["GUI-采集", "GUI-SFT", "视频生成-标注", "代码-SFT"],
    contacts: ["周鸿翔", "王孟玉"]
  }
];
