interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function SettingsSection({ title, description, children }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white">
      <div className="border-b border-zinc-100 px-6 py-4">
        <h2 className="font-semibold text-zinc-900">{title}</h2>
        <p className="mt-0.5 text-sm text-zinc-500">{description}</p>
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}