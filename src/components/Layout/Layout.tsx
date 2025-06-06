import { Header } from "@/components/Layout";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
