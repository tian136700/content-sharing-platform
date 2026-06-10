export const SITE_NAME = "儿童保护法律研究平台";
export const SITE_DESCRIPTION =
  "非营利性法律研究、学术文献索引与普法导读平台，聚焦儿童未成年人权益保护、性侵案追诉时效改革及刑事责任年龄等领域。";

export const DISCLAIMER_STORAGE_KEY = "csp_disclaimer_accepted";
export const DISCLAIMER_EXPIRY_DAYS = 30;

export const NAV_LINKS = [
  { href: "/", label: "文献导读" },
  { href: "/guide", label: "检索与翻译指南" },
  { href: "/about", label: "关于与反馈" },
] as const;

export const DISCLAIMER_TEXT = {
  title: "免责与宗旨声明",
  body: `本站目前为一个非营利性的法律研究、学术文献索引与普法导读平台。我们致力于为关注儿童未成年人权益保护、性侵案追诉时效改革、以及降低未成年人刑事责任年龄等领域的学者、法律从业人员及普通大众，提供国际前沿研究的中文索引与信息参考。目前本站暂不以盈利为目的。

本站所提供的内容仅为学术导读与信息索引，不构成任何法律意见或专业咨询。如需具体法律帮助，请咨询具有执业资格的专业律师。`,
  button: "已阅读并同意进入",
};
