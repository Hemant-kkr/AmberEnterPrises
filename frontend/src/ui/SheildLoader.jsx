import { motion } from "framer-motion";

export function ShieldLoader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 z-50 bg-card/80 backdrop-blur-[1px] supports-[backdrop-filter]:bg-card/60">
      <div className="relative h-32 w-32">
        {/* Shield */}
        <motion.svg
          viewBox="0 0 64 64"
          className="absolute inset-0 h-32 w-32"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Shield outer - amber fill */}
          <motion.path
            d="M32 4L8 16v16c0 14.2 10.2 27.4 24 30 13.8-2.6 24-15.8 24-30V16L32 4z"
            fill="hsl(38 92% 50%)"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "center" }}
          />
          {/* Shield inner - dark for depth */}
          <motion.path
            d="M32 8L12 18v14c0 11.8 8.5 22.8 20 25 11.5-2.2 20-13.2 20-25V18L32 8z"
            fill="hsl(220 20% 12%)"
            opacity={0.88}
          />
          {/* Heraldic inner border */}
          <motion.path
            d="M32 10L14 19v13c0 10.8 7.8 20.8 18 23.2 10.2-2.4 18-12.4 18-23.2V19L32 10z"
            fill="none"
            stroke="hsl(38 92% 65%)"
            strokeWidth="0.6"
            opacity={0.5}
          />
          {/* Letter A */}
          <motion.text
            x="32"
            y="39"
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="bold"
            fontSize="20"
            fill="hsl(38 92% 60%)"
          >
            A
          </motion.text>
        </motion.svg>

        {/* Sword — tall viewBox for a long realistic blade */}
        <motion.svg
          viewBox="0 0 24 90"
          className="absolute -right-6 -top-8"
          style={{ width: "22px", height: "90px" }}
          initial={{ rotate: -42, x: 32, y: -32, opacity: 0 }}
          animate={{
            rotate: [-42, 8, -42],
            x: [32, 0, 32],
            y: [-32, 0, -32],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.3,
          }}
        >
          <defs>
            <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="hsl(220 15% 58%)" />
              <stop offset="30%"  stopColor="hsl(0 0% 92%)" />
              <stop offset="55%"  stopColor="hsl(0 0% 98%)" />
              <stop offset="75%"  stopColor="hsl(0 0% 88%)" />
              <stop offset="100%" stopColor="hsl(220 15% 52%)" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="hsl(38 92% 68%)" />
              <stop offset="50%"  stopColor="hsl(38 92% 50%)" />
              <stop offset="100%" stopColor="hsl(38 92% 35%)" />
            </linearGradient>
          </defs>

          {/* Blade — long tapered, pointed tip */}
          <polygon
            points="12,2 14.5,60 12,68 9.5,60"
            fill="url(#steelGrad)"
          />
          {/* Fuller groove */}
          <line x1="12" y1="6" x2="12" y2="56"
            stroke="hsl(220 20% 45%)" strokeWidth="1" opacity="0.4" />
          {/* Ricasso */}
          <rect x="10" y="58" width="4" height="4" fill="hsl(220 15% 62%)" />

          {/* Cross-guard — wide heraldic */}
          <rect x="3" y="62" width="18" height="4" rx="2"
            fill="url(#goldGrad)"
            stroke="hsl(38 92% 30%)"
            strokeWidth="0.5"
          />
          <circle cx="3.5"  cy="64" r="2.2" fill="hsl(38 92% 45%)" stroke="hsl(38 92% 30%)" strokeWidth="0.5" />
          <circle cx="20.5" cy="64" r="2.2" fill="hsl(38 92% 45%)" stroke="hsl(38 92% 30%)" strokeWidth="0.5" />

          {/* Grip */}
          <rect x="10" y="66" width="4" height="14" rx="1.5"
            fill="hsl(25 40% 18%)"
          />
          {[68, 71, 74, 77].map((y) => (
            <line key={y} x1="10" y1={y} x2="14" y2={y}
              stroke="hsl(38 70% 40%)" strokeWidth="1" opacity="0.65" />
          ))}

          {/* Pommel */}
          <ellipse cx="12" cy="83" rx="4" ry="3"
            fill="url(#goldGrad)"
            stroke="hsl(38 92% 30%)"
            strokeWidth="0.5"
          />
          <circle cx="12" cy="83" r="1" fill="hsl(38 92% 68%)" opacity="0.7" />
        </motion.svg>

        {/* Spark effects */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
            style={{ backgroundColor: i % 2 === 0 ? "hsl(38 92% 60%)" : "hsl(25 95% 55%)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              x: [0, (i - 1) * 20],
              y: [0, (i - 1) * -15 - 5],
            }}
            transition={{
              duration: 0.4,
              delay: 0.55,
              repeat: Infinity,
              repeatDelay: 1.1,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <motion.p
        className="text-sm font-medium uppercase tracking-widest"
        style={{ color: "hsl(38 92% 45%)", fontFamily: "Georgia, serif", letterSpacing: "0.18em" }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
}