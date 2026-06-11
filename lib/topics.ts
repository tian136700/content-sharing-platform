export interface TopicSection {
  heading: string;
  paragraphs: string[];
}

export interface Topic {
  slug: string;
  categoryId: string;
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  sections: TopicSection[];
}

export const topics: Topic[] = [
  {
    slug: "quxiao-suosong-shixiao",
    categoryId: "statute-of-limitations",
    title: "取消诉讼时效与追诉时效改革",
    subtitle: "Statute of Limitations Reform",
    description:
      "汇集关于取消诉讼时效、取消性侵案件诉讼时效、取消强奸案诉讼时效的国际学术研究与立法比较，为儿童保护领域的追诉时效改革提供文献导读。",
    keywords: [
      "取消诉讼时效",
      "取消性侵案件诉讼时效",
      "取消强奸案诉讼时效",
      "追诉时效改革",
      "儿童性虐待追诉时效",
      "诉讼时效",
    ],
    sections: [
      {
        heading: "为什么关注取消诉讼时效",
        paragraphs: [
          "在儿童性虐待案件中，追诉时效往往成为成年幸存者寻求司法救济的主要障碍。许多受害者在童年时期遭受侵害，却因心理创伤、羞耻感或缺乏认知，直到成年后才能够披露或理解自身经历。",
          "因此，学界与立法者持续讨论是否应取消诉讼时效，或至少对性侵案件适用特殊的追诉时效规则，使受害者不因时间流逝而永久失去诉权。",
        ],
      },
      {
        heading: "取消性侵案件诉讼时效",
        paragraphs: [
          "取消性侵案件诉讼时效的核心议题，在于平衡被告人的程序保障与受害者的正义诉求。美国部分州已通过「窗口立法」（window legislation），在特定期限内暂停或延长对儿童性虐待案件的追诉时效。",
          "本站收录相关国际文献，比较不同法域如何处理性侵案件诉讼时效，为中国的追诉时效改革提供学术参考。",
        ],
      },
      {
        heading: "取消强奸案诉讼时效",
        paragraphs: [
          "强奸案与儿童性虐待案件在追诉时效问题上具有相似的政策张力：证据随时间消逝，但受害者的心理创伤与披露障碍使得严格时效限制尤为不公。",
          "关于取消强奸案诉讼时效的学术讨论，涉及被害人权益保护、证据规则改革及刑事政策选择，是本专题持续关注的方向之一。",
        ],
      },
    ],
  },
  {
    slug: "yanchi-pilu",
    categoryId: "statute-of-limitations",
    title: "延迟披露与延迟披露规则",
    subtitle: "Delayed Disclosure Rule",
    description:
      "聚焦儿童性虐待延迟披露、延迟披露规则及成年幸存者寻求正义的法律议题，提供相关国际学术文献的中文导读与索引。",
    keywords: [
      "延迟披露",
      "延迟披露规则",
      "儿童性侵延迟披露",
      "儿童性虐待延迟披露",
      "成年幸存者",
      "延迟发现规则",
    ],
    sections: [
      {
        heading: "什么是延迟披露",
        paragraphs: [
          "延迟披露（delayed disclosure）是指儿童性虐待的受害者在事件发生后很长时间才向他人讲述或报告受害经历。研究表明，许多受害者直到成年后才首次披露，这与一般刑事案件中即时报案的假设截然不同。",
          "儿童性侵被延迟披露的现象，促使法律界重新审视传统的追诉时效起算点，并发展出延迟披露规则（delayed discovery rule）等特殊法律机制。",
        ],
      },
      {
        heading: "延迟披露规则的法律意义",
        paragraphs: [
          "延迟披露规则允许追诉时效从受害者「发现」或「应当发现」损害及其与虐待行为之间的因果关系时起算，而非从侵害行为发生之日起算。这一规则旨在回应儿童性虐待受害者普遍面临的披露障碍。",
          "然而，延迟披露规则的应用也引发争议，包括「压抑理论」（repressed memory）的科学可靠性，以及是否应仅适用于性虐待案件而忽视其他形式虐待等问题。",
        ],
      },
      {
        heading: "儿童性虐待与成年幸存者的正义诉求",
        paragraphs: [
          "当儿童性侵被延迟披露时，成年幸存者往往面临双重困境：一方面需要面对心理创伤，另一方面可能因诉讼时效届满而无法通过司法途径寻求救济。",
          "本站收录的学术文献深入探讨了延迟披露规则的历史演变、司法实践及文化叙事，为理解这一复杂法律议题提供系统性的学术导读。",
        ],
      },
    ],
  },
  {
    slug: "xingshi-zeren-nianling",
    categoryId: "criminal-responsibility-age",
    title: "降低未成年人刑事责任年龄",
    subtitle: "Criminal Responsibility Age",
    description:
      "汇集降低儿童刑事责任年龄、未成年人刑事责任年龄改革的国际学术研究与域外立法经验，提供中文文献导读。",
    keywords: [
      "降低刑事责任年龄",
      "降低儿童刑事责任年龄",
      "未成年人刑事责任年龄",
      "刑事责任年龄改革",
    ],
    sections: [
      {
        heading: "刑事责任年龄改革的背景",
        paragraphs: [
          "未成年人刑事责任年龄是儿童保护法律体系中的核心议题。当低龄未成年人实施严重暴力犯罪时，各国立法者面临如何在惩戒、教育与保护之间取得平衡的难题。",
          "近年来，多国围绕是否降低未成年人刑事责任年龄展开激烈讨论，本站持续收录相关国际学术文献，为中国的立法与学理探讨提供参考。",
        ],
      },
      {
        heading: "域外经验与学理探讨",
        paragraphs: [
          "不同国家对刑事责任年龄的设定差异显著，从大陆法系的严格年龄门槛到普通法系的功能性责任能力评估，各有其法理基础与实践经验。",
          "降低儿童刑事责任年龄并非简单的「从严」或「从宽」选择，而是涉及少年司法制度、神经科学证据、恢复性司法等多重因素的综合性政策判断。",
        ],
      },
    ],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getAllTopicSlugs(): string[] {
  return topics.map((topic) => topic.slug);
}
