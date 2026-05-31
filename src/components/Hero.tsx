import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24 dark:from-gray-900 dark:to-gray-950"
      id="home"
    >
      <div className="particle-bg">
        <div
          className="particle"
          style={{
            width: "15px",
            height: "15px",
            top: "10%",
            left: "20%",
            animationDuration: "25s",
          }}
        />
        <div
          className="particle"
          style={{
            width: "20px",
            height: "20px",
            top: "30%",
            left: "70%",
            animationDuration: "20s",
            animationDelay: "2s",
          }}
        />
        <div
          className="particle"
          style={{
            width: "10px",
            height: "10px",
            top: "50%",
            left: "40%",
            animationDuration: "18s",
            animationDelay: "5s",
          }}
        />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[480px] max-w-7xl flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tighter text-green-700 drop-shadow-md md:text-5xl lg:text-6xl dark:text-green-400">
          Hi, I&apos;m Naveen, a Full-Stack Developer
        </h1>
        <p className="mb-10 max-w-3xl text-lg text-green-900 drop-shadow-sm md:text-xl dark:text-green-200/80">
          I craft seamless web experiences with a focus on performance and user
          engagement. Reach out to me for innovative digital solutions.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            className="inline-flex transform items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700"
            href="/#repos"
          >
            View My Work
          </Link>
          <Link
            className="inline-flex transform items-center justify-center rounded-lg bg-gray-200 px-8 py-3 font-bold text-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            href="/#contact"
          >
            Let&apos;s Chat
          </Link>
        </div>
      </div>
    </section>
  );
}
