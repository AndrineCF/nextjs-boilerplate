import Image from "next/image";
import Link from "next/link";
import ForgotPasswordForm from "@/components/glemt-passord/ForgotPasswordForm";

export default function GlemtPassord() {
  return (
    <main className="flex min-h-screen">

      {/* Venstre side */}
      <div className="flex flex-col w-full max-w-xl px-16 py-12 justify-between">

        <Link href="/">
          <Image src="/logoer/full-logo.svg" alt="GrøntTak" width={160} height={50} />
        </Link>

        <ForgotPasswordForm />

        <div className="flex flex-col gap-2">
          <Link
            href="/login"
            className="w-full border-2 border-dark-green text-dark-green font-semibold py-3.5 rounded-xl hover:bg-light-green transition-all text-center"
          >
            Tilbake til innlogging
          </Link>
        </div>

      </div>

      {/* Høyre side - bilde */}
      <div className="flex-1 relative hidden md:block">
        <Image src="/img/login.png  " alt="Grønt tak" fill className="object-cover" />
        <div className="absolute inset-0 bg-dark-green/40 flex flex-col justify-end p-16">
          <blockquote className="text-white text-2xl font-semibold max-w-sm leading-relaxed">
            "Fremtidens byer er grønne — start med taket."
          </blockquote>
        </div>
      </div>

    </main>
  );
}