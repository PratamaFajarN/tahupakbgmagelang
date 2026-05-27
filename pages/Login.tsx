import { useState } from "react";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const admins: Record<string, { password: string; role: string }> = {
    admin1: { password: "admin1", role: "Sansan" },
    admin2: { password: "admin2", role: "Bayu" },
    operator: { password: "operator", role: "FAJAR" },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (admins[email] && admins[email].password === password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminEmail", email);
      localStorage.setItem("role", admins[email].role);

      router.push("/admin/dashboard");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/assets/banner1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 text-white"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <Image
            src="/assets/pakBG.png"
            alt="Logo"
            width={60}
            height={60}
            className="mb-2"
          />
          <h2 className="text-2xl font-bold">Login Admin</h2>
        </div>

        {/* Input Username */}
        <div className="mb-4">
          <label className="text-sm">Username</label>
          <input
            type="text"
            placeholder="Masukkan username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Input Password */}
        <div className="mb-5 relative">
          <label className="text-sm">Password</label>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10 transition"
          />

          {/* Eye Icon */}
          <div
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-9 cursor-pointer text-gray-300 hover:text-white"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition duration-300 shadow-md"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-xs text-center mt-4 text-gray-300">
          © Tahu Magelang
        </p>
      </form>
    </div>
  );
};

export default Login;