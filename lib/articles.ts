import type { Category } from "@/types";

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

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
