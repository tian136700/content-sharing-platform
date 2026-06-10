import type { Article, Category } from "@/types";
import { getArticles, getArticleById as getStoredArticleById, initArticlesStore } from "@/lib/storage";

export const categories: Category[] = [
  {
    id: "statute-of-limitations",
    name: "追诉时效改革",
    description: "性侵案件追诉时效的国际比较与立法改革研究",
  },
  {
    id: "criminal-responsibility-age",
    name: "刑事责任年龄",
    description: "未成年人刑事责任年龄降低的域外经验与学理探讨",
  },
  {
    id: "child-protection-policy",
    name: "儿童保护政策",
    description: "儿童权益保护制度、预防机制与司法实践",
  },
];

const seedArticles: Article[] = [
  {
    id: "art-001",
    categoryId: "statute-of-limitations",
    titleZh: "儿童性虐待案件追诉时效改革的比较法研究",
    titleEn:
      "Comparative Analysis of Statute of Limitations Reforms in Child Sexual Abuse Cases",
    keywords: ["追诉时效", "儿童性虐待", "比较法", "立法改革", "受害者权益"],
    abstract:
      "本文系统梳理了美国、英国、澳大利亚等国近年来针对儿童性虐待案件追诉时效的立法改革动向。研究发现，「延迟发现规则」（delayed discovery rule）与「回溯窗口」（lookback window）成为各国立法的共同趋势，旨在解决受害者成年后方能披露创伤而时效已过的问题。文章进一步分析了改革背后的法理学基础，包括正义理论、恢复性司法理念以及对国家保护义务的再诠释，为我国相关立法完善提供了可借鉴的域外经验与规范路径。",
    introduction:
      "引言部分指出，传统追诉时效制度以「知道或应当知道」作为起算标准，在儿童性虐待案件中往往导致受害者因心理创伤、威胁恐吓或认知能力不足而无法在时效内寻求法律救济。第一章回顾了追诉时效的历史渊源及其在现代刑法中的功能定位，并批判性地审视了「时效届满即消灭诉权」的传统观念在涉童案件中的局限性。",
    scholarUrl:
      "https://scholar.google.com/scholar?q=statute+of+limitations+child+sexual+abuse+reform",
  },
  {
    id: "art-002",
    categoryId: "statute-of-limitations",
    titleZh: "延迟发现规则在性侵追诉时效中的适用与边界",
    titleEn:
      "The Delayed Discovery Rule in Sexual Assault Statute of Limitations: Application and Boundaries",
    keywords: ["延迟发现", "起算点", "性侵", "证据规则", "程序法"],
    abstract:
      "延迟发现规则允许追诉时效自受害者「发现或应当发现」损害及其因果关系之日起算，而非自侵权行为发生时起算。本文通过判例分析，探讨该规则在美国各州的适用差异、证明责任分配以及对被告程序权利的影响，并评估其在平衡被害人保护与被告不受无限期追诉之间的规范张力。",
    introduction:
      "第一章从实体法与程序法交叉视角出发，界定「发现」的法律含义——究竟是指物理伤害的察觉，还是指对虐待行为性质的法律认知？文章引述联邦及各州关键判例，展示司法实践中对「应当发现」标准的不同解释路径。",
    scholarUrl:
      "https://scholar.google.com/scholar?q=delayed+discovery+rule+sexual+assault",
  },
  {
    id: "art-003",
    categoryId: "criminal-responsibility-age",
    titleZh: "降低未成年人刑事责任年龄：国际趋势与规范反思",
    titleEn:
      "Lowering the Age of Criminal Responsibility: International Trends and Normative Reflections",
    keywords: ["刑事责任年龄", "少年司法", "联合国儿童权利公约", "罪责原则"],
    abstract:
      "近年来，部分国家因恶性低龄未成年人犯罪案件而重新审视刑事责任年龄门槛。本文梳理了英格兰、威尔士、苏格兰及北欧国家的少年司法制度，重点分析《联合国儿童权利公约》第40条对会员国立法的影响，并从「罪责能力」（criminal capacity）的发展心理学与神经科学证据出发，对降低刑责年龄的立法动因进行规范层面的批判性评估。",
    introduction:
      "引言回顾了「恶意补足年龄」（doli incapax）普通法传统及其在现代少年刑法中的式微。第一章比较了大陆法系与英美法系对未成年人罪责能力的不同构造，并指出单纯降低年龄门槛并不能有效回应少年犯罪治理的复杂性，制度设计需与分级处遇、教育矫正及社会支持体系协同推进。",
    scholarUrl:
      "https://scholar.google.com/scholar?q=age+criminal+responsibility+juvenile+justice",
  },
  {
    id: "art-004",
    categoryId: "child-protection-policy",
    titleZh: "学校场景下的儿童保护义务：域外立法与我国的制度回应",
    titleEn:
      "Child Protection Duties in School Settings: Foreign Legislation and Institutional Responses",
    keywords: ["强制报告", "学校", "儿童保护", "预防机制", "法律义务"],
    abstract:
      "学校是儿童接触社会的重要场域，也是性侵害等风险的高发环境。本文介绍了澳大利亚、加拿大等国建立的「强制报告」（mandatory reporting）制度，分析教师、校医等特定职业主体在发现疑似虐待时的法定报告义务、豁免规则及违法责任，并探讨我国《未成年人保护法》框架下相关条款的完善空间。",
    introduction:
      "第一章从国家作为「儿童最高监护人」（parens patriae）的理论基础出发，论证国家通过立法课以特定主体报告义务的必要性。文章进一步讨论了强制报告制度可能带来的「过度报告」与「报告不足」双重风险，以及如何通过培训、指引与多机构协作机制加以平衡。",
    scholarUrl:
      "https://scholar.google.com/scholar?q=mandatory+reporting+child+abuse+schools",
  },
];

initArticlesStore(seedArticles);

export function getArticleById(id: string) {
  return getStoredArticleById(id);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getAllArticles(): Article[] {
  return getArticles();
}

export function getArticlesByCategory(categoryId: string): Article[] {
  return getArticles().filter((a) => a.categoryId === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return getArticles();

  return getArticles().filter(
    (a) =>
      a.titleZh.toLowerCase().includes(q) ||
      a.titleEn.toLowerCase().includes(q) ||
      a.keywords.some((k) => k.toLowerCase().includes(q)) ||
      a.abstract.toLowerCase().includes(q)
  );
}
