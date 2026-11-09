import { AdminVideoPanel } from "@/components/admin-video-panel";

export function PublicLessonPreview() {
  return (
    <section className="bg-[#030014] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <AdminVideoPanel />
      </div>
    </section>
  );
}
