import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import FeedbackForm from "@/components/FeedbackForm";
import DisclaimerModal from "@/components/DisclaimerModal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${SITE_NAME} | 关于与反馈`,
  description:
    "了解平台愿景与非营利定位，并通过反馈表单与我们取得联系。",
};

export default function AboutPage() {
  return (
    <>
      <DisclaimerModal page="/about" />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-slate-800/80 pb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-600/80">
            About Us
          </p>
          <h1 className="font-serif text-3xl font-bold text-slate-100 sm:text-4xl">
            关于平台
          </h1>
        </header>

        <section className="mb-16 space-y-6">
          <h2 className="font-serif text-xl font-semibold text-amber-100">
            平台愿景
          </h2>
          <p className="text-base leading-[1.9] text-slate-300">
            本站目前为一个<strong className="font-medium text-slate-200">非营利性</strong>
            的法律研究、学术文献索引与普法导读平台。我们致力于为关注
            <strong className="font-medium text-slate-200">儿童未成年人权益保护</strong>、
            <strong className="font-medium text-slate-200">性侵案追诉时效改革</strong>、以及
            <strong className="font-medium text-slate-200">降低未成年人刑事责任年龄</strong>
            等领域的学者、法律从业人员及普通大众，提供国际前沿研究的中文索引与信息参考。
          </p>
          <p className="text-base leading-[1.9] text-slate-300">
            我们坚信，知识的传播是守护儿童权益的重要力量。通过将散落在世界各地的学术成果以中文导读的形式呈现，
            我们希望降低信息获取的门槛，推动相关领域的立法完善与公众认知提升。
          </p>
          <div className="rounded-lg border border-amber-800/25 bg-amber-950/20 p-5">
            <p className="text-sm leading-relaxed text-amber-200/80">
              ⚖️ 本站内容仅供学术参考与普法导读，不构成任何法律意见。如需具体法律帮助，请咨询具有执业资格的专业律师。
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-amber-100">
            用户反馈
          </h2>
          <p className="mb-8 text-sm text-slate-400">
            您的意见对我们至关重要。请留下邮箱与反馈内容，我们将认真研读每一条建议。
          </p>
          <FeedbackForm />
        </section>
      </div>
    </>
  );
}
